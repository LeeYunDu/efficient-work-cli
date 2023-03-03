"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatorTypes = void 0;
const logger = __importStar(require("../utils/logger"));
const prompts_1 = __importDefault(require("prompts"));
const ast_1 = require("../utils/ast");
const index_1 = require("../utils/index");
/**
 * @param {*} data
 * @description
 * 自动生成showDoc文档下业务接口模块的请求参数和返回参数的interface类型 <br>
 * @todo 请求showDoc文档接口地址,获取resources配置,比如移动端接口文档,PC端接口文档
 * @todo 交互-拿到resources后可勾选生成模板
 * @todo 拆分接口数据结构
 * @todo 筛选出业务代码所需要的实体类定义,接口的数据类型存在数组嵌套,需要做判断,进行递归解析
 * @todo AST 创造 interface 相关的node节点,用于复制和编辑
 * @todo 生成interface模板
 * @todo 番外-生成接口请求模板,分为POST、GET
 * @todo AST写入文件
 */
const node_fetch_1 = __importDefault(require("node-fetch"));
function generatorTypes() {
    return __awaiter(this, void 0, void 0, function* () {
        let resources = yield getDocResources();
        if (!resources)
            return;
        let docAddress = resources;
        (0, node_fetch_1.default)(docAddress).then((res) => {
            res.json().then((response) => {
                let { tags, paths, definitions } = response;
                if (!(tags && paths && definitions)) {
                    logger.error(`选中的业务模块没有接口定义,definitions、tags、paths`);
                    return;
                }
                /**
                 * response结构的keys:swagger、info、host、basePath、tags、schemes、paths、definitions
                 * 其中paths可以理解为定义的接口,举例：/pc/ads/area/getFxByArea,可以根据这样的字符串直接在接口文档中查询接口
                 * 接口定义后,会有请求实体类跟状态200的返回结果实体类
                 * 筛选业务path,在找到该path所需要的实体类收集起来
                 */
                let needWriteDefinitions = [];
                let { analysisPathsResult, analysisTagsResult, analysisDefinitionsResult } = analysisResponse(response);
                /**
                 * 通过接口的originalRef找到接口对应的definitions
                 */
                for (let index = 0; index < analysisPathsResult.length; index++) {
                    const apiConfig = analysisPathsResult[index];
                    // 这里查找接口返回的实体类定义
                    let definition = analysisDefinitionsResult[apiConfig.originalRef] || undefined;
                    let resultDefinition = findDefinition(definition, index);
                    // 这里查找接口请求Param的参数定义
                    let resultParamDefinition = apiConfig.originalRefOfParam;
                    if (resultParamDefinition) {
                        apiConfig.definitionParam = resultParamDefinition;
                    }
                    else {
                        apiConfig.definitionParam = null;
                    }
                    if (resultDefinition) {
                        apiConfig.definition = resultDefinition;
                        apiConfig.businessName = getBusinessName(apiConfig.apiName);
                        needWriteDefinitions.push(apiConfig);
                    }
                    if (!definition.properties.data.originalRef && definition.properties.data.type === 'string') {
                        // logger.error(`${apiConfig.apiName}没有originalRef,找不到接口返回的实体类`)
                        continue;
                    }
                }
                // 解构接口实体类
                let interfaceResultArr = generatorInterfaceTemplate(needWriteDefinitions, analysisDefinitionsResult);
                // 业务模块组合接口
                let businessInterfaceModel = generateASTNode(interfaceResultArr);
                // 创建业务接口文件夹,进行分类
                generateBusinessDir(businessInterfaceModel);
                /**
                 * 目前只有返回的实体类需要查找
                 * @param {*} definition
                 * @returns
                 */
                function findDefinition(definition, index) {
                    if (!definition)
                        return null;
                    let type = '';
                    try {
                        type = (definition.properties.data.type) || undefined;
                    }
                    catch (error) {
                        return null;
                    }
                    let resultDefinition = null;
                    switch (type) {
                        case 'object':
                            // 偏向于保存、删除、编辑、更改状态等类型的接口
                            resultDefinition = analysisDefinitionsResult[definition.title];
                            // 举例:'R«Map«string,object»»'
                            break;
                        case 'array':
                            resultDefinition = analysisDefinitionsResult[definition.properties.data.items.originalRef];
                            break;
                        case 'string':
                            resultDefinition = analysisDefinitionsResult[definition.title];
                            // 偏向于保存、删除、编辑、更改状态等类型的接口
                            break;
                        case undefined:
                            // 该类接口更偏向项目业务方面的实体类,也有后端列表List实体类,list中还会包含着一个实体
                            resultDefinition = analysisDefinitionsResult[definition.properties.data.originalRef];
                            break;
                        default:
                            break;
                    }
                    return resultDefinition;
                }
            });
        });
    });
}
exports.generatorTypes = generatorTypes;
function getDocResources() {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        logger.success('请查看浏览器地址栏的接口文档地址,完成表单填写');
        logger.info('比如：http://192.168.1.1:18340/business_name/doc.html#/home');
        let docOptions = [
            {
                type: 'text',
                name: 'ip',
                message: '请输入文档的IP地址 + 端口号 比如上面的:192.168.1.1:18340',
            },
            {
                type: 'text',
                name: 'businessName',
                message: '清输入接口文档的业务标识名称,比如上面的business_name',
            },
        ];
        let { ip, businessName } = yield (0, prompts_1.default)(docOptions);
        if (!(ip && businessName)) {
            logger.error('未按要求输入IP地址加业务名称');
            return;
        }
        // ip + 业务前缀 + swagger-resources
        let docResourcesPath = `http://${ip}/${businessName}/swagger-resources`;
        (0, node_fetch_1.default)(docResourcesPath).then((res) => {
            res.json().then((resources) => __awaiter(this, void 0, void 0, function* () {
                let resourcesOptions = [
                    {
                        type: 'select',
                        name: 'checkedResources',
                        message: '请选择需要下载的模块',
                        choices: resources.map((item) => {
                            return {
                                title: item.name,
                                value: `http://${ip}/${businessName}${item.url}`
                            };
                        })
                    },
                ];
                let { checkedResources } = yield (0, prompts_1.default)(resourcesOptions);
                resolve(checkedResources);
            })).catch((error) => {
                logger.error(error);
                resolve(false);
            });
        }).catch((error) => {
            logger.error('解析showDoc文档resources失败');
            resolve(false);
        });
    }));
}
/**
 * 解析文件结构返回的数据结构
 * @param {*} tags
 * @todo 根据文档左侧接口菜单模块,将后端框架自带接口添加黑名单后过滤
 */
function analysisResponse(response) {
    const BLACK_LIST = [
        '上传接口', '下载接口', '系统日志表', '类目表',
        '系统日志表', '系统设置-系统配置', '用户登录接口'
    ];
    const TYPE_BLACK_LIST = ['string,boolean,number'];
    let { paths, tags, definitions } = response;
    /**
     * paths
     */
    let analysisPathsResult = [];
    let analysisDefinitionsResult = definitions;
    Object.keys(paths).forEach((key, index) => {
        try {
            let apiModel = paths[key];
            let requestWay = Object.keys(apiModel)[0];
            let tag = apiModel[requestWay].tags[0];
            if (!BLACK_LIST.includes(tag)) {
                // paths结构
                let apiName = key;
                let modelName = apiModel[requestWay].summary;
                // 返回实体类锚点
                let apiResponses = apiModel[requestWay].responses[200];
                // 请求实体锚点
                let apiParam = apiModel[requestWay].parameters && apiModel[requestWay].parameters[0] || undefined;
                if (!apiResponses) {
                    logger.error('接口未定义数据返回结构');
                }
                else {
                    let originalRef = apiResponses.schema.originalRef || '';
                    let originalRefOfParam = null;
                    if (apiParam) {
                        if (apiParam.schema && 'originalRef' in apiParam.schema) {
                            originalRefOfParam = analysisDefinitionsResult[apiParam.schema.originalRef] || undefined;
                        }
                        else {
                            originalRefOfParam = apiParam;
                        }
                    }
                    if (originalRef) {
                        analysisPathsResult.push({
                            apiName,
                            apiModel: apiModel[requestWay],
                            requestWay,
                            modelName,
                            originalRef,
                            originalRefOfParam //实体锚点
                        });
                    }
                    else {
                        logger.error(`${key}没有originalRef`);
                    }
                }
            }
        }
        catch (error) {
            logger.error(`接口${key}的结构方式不对,请后端排查下`);
            logger.error(error);
        }
    });
    /**
     * tags
     */
    let analysisTagsResult = tags.filter((tag) => {
        return !BLACK_LIST.includes(tag.name);
    });
    return {
        analysisPathsResult,
        analysisTagsResult,
        analysisDefinitionsResult
    };
}
function generatorInterfaceTemplate(needWriteDefinitions, analysisDefinitionsResult) {
    let interfaceResultArr = [];
    for (let index = 0; index < needWriteDefinitions.length; index++) {
        const { definition, modelName, apiName, requestWay, definitionParam } = needWriteDefinitions[index];
        let interfaceResult = getInterfaceResult(definition, analysisDefinitionsResult);
        let interfaceParamResult = getInterfaceResult(definitionParam, analysisDefinitionsResult);
        interfaceResultArr.push(Object.assign({
            interfaceResult,
            interfaceParamResult
        }, needWriteDefinitions[index]));
    }
    return interfaceResultArr;
}
function getInterfaceResult(definition, analysisDefinitionsResult) {
    if (!definition)
        return null;
    const TYPE_MAP = {
        integer: 'number',
        string: 'string',
        boolean: 'boolean',
        number: 'number'
    };
    let properties = definition.properties;
    if (!properties)
        return null;
    let interfaceResult = {
        hasList: false,
        listHasT: false,
        listInterface: {},
        hasT: false,
        interface: {}
    };
    let hasT = false;
    let interfaceState = {};
    /**
     * 字段的类型推断,首先满足基本类型推断
     * 如果是列表类型实体则赋予list
     * 找不到的类型赋予T
     */
    Object.keys(properties).forEach((key) => {
        let type = '';
        if (TYPE_MAP[properties[key].type]) {
            type = TYPE_MAP[properties[key].type];
        }
        else if (key === 'list') {
            type = 'list';
        }
        else {
            type = 'T';
        }
        interfaceState[key] = {
            type,
            fieldConfig: properties[key]
        };
        if (type === 'T')
            hasT = true;
    });
    // 列表实体类额外判断,复制一份上面的逻辑,看似很冗余
    if ('list' in properties) {
        let definition = analysisDefinitionsResult[properties.list.items.originalRef] || undefined;
        let listProperties = definition.properties;
        let listInterface = {};
        let listHasT = false;
        Object.keys(listProperties).forEach((key) => {
            let type = TYPE_MAP[listProperties[key].type] || 'T';
            listInterface[key] = {
                type,
                fieldConfig: listProperties[key]
            };
            if (type === 'T')
                listHasT = true;
        });
        interfaceResult.listHasT = listHasT;
        interfaceResult.listInterface = listInterface;
        interfaceResult.hasList = true;
    }
    interfaceResult.hasT = hasT;
    interfaceResult.interface = interfaceState;
    return interfaceResult;
}
let pathUseCount = 0;
function generateASTNode(interfaceResultArr) {
    let businessInterfaceModel = {};
    for (let index = 0; index < interfaceResultArr.length; index++) {
        const element = interfaceResultArr[index];
        let { apiName, apiModel, interfaceResult, requestWay, modelName, businessName, interfaceParamResult } = element;
        let interfaceAst = new ast_1.Ast(`
    `, {}, true);
        if (businessInterfaceModel[businessName]) {
            businessInterfaceModel[businessName].push(interfaceAst);
        }
        else {
            businessInterfaceModel[businessName] = [interfaceAst];
        }
        // 生成的interface定义需要区分是 params 还是 response
        pushAstNode(interfaceResult, interfaceAst, element, true);
        pushAstNode(interfaceParamResult, interfaceAst, element, false);
    }
    Object.keys(businessInterfaceModel).forEach(key => {
        let element = businessInterfaceModel[key];
    });
    logger.success(`一共成功生成了${pathUseCount}个接口定义`);
    return businessInterfaceModel;
}
function pushAstNode(interfaceResult, interfaceAst, interfaceInfo, isResponse) {
    if (!interfaceResult)
        return;
    pathUseCount++;
    let { businessName, apiName } = interfaceInfo;
    let sliptIndex = apiName.lastIndexOf('/');
    let interfaceName = apiName.slice(sliptIndex + 1, apiName.length);
    let { listHasT, hasList, listInterface, hasT, interface: interfaceState } = interfaceResult;
    // list Node 判断,几乎是复制一份逻辑,看着冗余
    if (hasList) {
        let IdentifierListNode = interfaceAst.generateIdentifierNode(interfaceName + 'List', listHasT);
        interfaceAst.ast.attr('program').body.push(IdentifierListNode);
        // 生成interface字段
        let interfaceListFields = listInterface;
        let fieldListNodes = [];
        Object.keys(interfaceListFields).forEach((key, index) => {
            let { type, fieldConfig } = interfaceListFields[key];
            let node = interfaceAst.generateTSTypeAnnotationNode(key, type, fieldConfig.example, interfaceName);
            node && fieldListNodes.push(node);
        });
        IdentifierListNode.body.body = fieldListNodes;
    }
    let IdentifierNode = interfaceAst.generateIdentifierNode(interfaceName + `${isResponse ? 'Response' : 'Param'}`, hasT);
    interfaceAst.ast.attr('program').body.push(IdentifierNode);
    // 生成interface字段
    let interfaceFields = interfaceState;
    let fieldNodes = [];
    let required = [];
    if (!isResponse) {
        required = interfaceInfo.definitionParam.required || [];
    }
    Object.keys(interfaceFields).forEach((key, index) => {
        let { type, fieldConfig } = interfaceFields[key];
        let node = interfaceAst.generateTSTypeAnnotationNode(key, type, fieldConfig.example, interfaceName, required);
        node && fieldNodes.push(node);
    });
    IdentifierNode.body.body = fieldNodes;
}
// 根据接口定义截取业务标识
function getBusinessName(apiName) {
    let sliptArr = apiName.split('/');
    let adsIndex = sliptArr.indexOf('ads') === -1 ? 0 : sliptArr.indexOf('ads') + 1;
    let nameBlock = sliptArr.slice(adsIndex, sliptArr.length - 1);
    let result = nameBlock.map((e, index) => {
        if (index > 0) {
            e = e.replace(e[0], e[0].toUpperCase());
        }
        return e;
    }).join('');
    return result;
}
/**
 * 接口定义名称
 * @param {*} definition
 * @returns
 * @deprecated
 */
function getDefinitionName(definition) {
    let title = definition.title;
    let hasIconLeft = title.indexOf('«');
    let hasIconRight = title.indexOf('»');
    if (hasIconLeft > -1 && hasIconRight > -1) {
        title = title.slice(hasIconLeft + 1, hasIconRight);
    }
    let hasADS = title.indexOf('Ads');
    if (hasADS > -1) {
        title = title.slice(3, title.length);
    }
    let hasResult = title.indexOf('Result');
    if (hasResult > -1) {
        title = title.slice(0, hasResult);
    }
    // 首字母小写
    return title.replace(title[0], title[0].toLowerCase());
}
/**
 * 将业务模块的AST存储到文件中
 * @param {*} businessInterfaceModel
 * @returns
 */
function generateBusinessDir(businessInterfaceModel) {
    return __awaiter(this, void 0, void 0, function* () {
        const INTERFACE_BASE_DIR = `${process.cwd()}/src/api/types`;
        let hasDir = yield (0, index_1.mkdir)(INTERFACE_BASE_DIR);
        if (hasDir) {
            Object.keys(businessInterfaceModel).forEach((key, index) => {
                let businessModel = businessInterfaceModel[key];
                // 创建文件
                let businessModelFileName = `${key}.type.ts`;
                let filePath = `${INTERFACE_BASE_DIR}/${businessModelFileName}`;
                (0, index_1.createFile)({ filePath });
                let resutAst = new ast_1.Ast(`
`, {}, true);
                businessModel.forEach((model) => {
                    let modelAst = model.ast.attr('program.body');
                    modelAst.forEach((node) => {
                        let exportNode = new ast_1.Ast(`
export interface template {

}
            `, {}, true);
                        let replaceNode = exportNode.ast.attr('program.body')[0];
                        replaceNode.declaration = node;
                        resutAst.ast.attr('program.body').push(replaceNode);
                    });
                });
                setTimeout(() => {
                    resutAst.writeFile(filePath);
                }, 500);
            });
        }
        return;
    });
}
