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
const logger = __importStar(require("../../utils/logger"));
const prompts_1 = __importDefault(require("prompts"));
const ast_1 = require("../../utils/ast");
const index_1 = require("../../utils/index");
const node_fetch_1 = __importDefault(require("node-fetch"));
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
//---------------------------------
function generatorTypes() {
    return __awaiter(this, void 0, void 0, function* () {
        let resources = yield getDocResources();
        if (!resources)
            return;
        let docAddress = resources;
        (0, node_fetch_1.default)(docAddress, {
            headers: {
                'Accept': 'application/json'
            }
        }).then(res => {
            res.json().then(response => {
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
                let businessInterfaceModel = generateASTNode(interfaceResultArr, analysisDefinitionsResult);
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
        // logger.success('请查看浏览器地址栏的接口文档地址,完成表单填写')
        // logger.info('比如：http://172.16.208.12:18340/lp_building_manage_api/doc.html#/home')
        // let docOptions: any[] = [
        //   {
        //     type: 'text',
        //     name: 'ip',
        //     message: '请输入文档的IP地址 + 端口号 比如上面的:172.16.208.12:18340',
        //   },
        //   {
        //     type: 'text',
        //     name: 'businessName',
        //     message: '清输入接口文档的业务标识名称,比如上面的lp_building_manage_api',
        //   },
        // ]
        // let { ip, businessName } = await prompts(docOptions)
        // if (!(ip && businessName)) {
        //   logger.error('未按要求输入IP地址加业务名称')
        //   return
        // }
        // km_gyy_gov_main_api   220.163.127.146:8146
        // ip + 业务前缀 + swagger-resources
        let ip = '172.16.208.12:18550';
        let businessName = 'zhaoshang-project-api';
        let docResourcesPath = `http://${ip}/${businessName}/swagger-resources`;
        (0, node_fetch_1.default)(docResourcesPath, {
            headers: {
                'Accept': 'application/json'
            }
        }).then(res => {
            res.json().then((resources) => __awaiter(this, void 0, void 0, function* () {
                let resourcesOptions = [
                    {
                        type: 'select',
                        name: 'checkedResources',
                        message: '请选择需要下载的模块',
                        choices: resources.map((item) => {
                            // console.log(`http://${ip}/${businessName}${item.url}`);
                            return {
                                title: item.name,
                                value: `http://${ip}/${businessName}${item.url}`
                            };
                        })
                    },
                ];
                let { checkedResources } = yield (0, prompts_1.default)(resourcesOptions);
                resolve(checkedResources);
            })).catch(error => {
                logger.error(error);
                resolve(false);
            });
        }).catch(error => {
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
function generateASTNode(interfaceResultArr, analysisDefinitionsResult) {
    let businessInterfaceModel = {};
    for (let index = 0; index < interfaceResultArr.length; index++) {
        const element = interfaceResultArr[index];
        let { interfaceResult, businessName, interfaceParamResult } = element;
        // 业务模块的type.ts文件
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
        // 这里递归判断下字段里头还有没有实体类嵌套
        deepCheckInterface(interfaceResult ? interfaceResult.interface : undefined, interfaceAst, analysisDefinitionsResult, false);
        deepCheckInterface(interfaceParamResult ? interfaceParamResult.interface : undefined, interfaceAst, analysisDefinitionsResult, false);
    }
    Object.keys(businessInterfaceModel).forEach(key => {
        let element = businessInterfaceModel[key];
    });
    logger.success(`一共成功生成了${pathUseCount}个接口定义`);
    return businessInterfaceModel;
}
function generateFunctionModelASTNode(interfaceResultArr, analysisDefinitionsResult) {
    // 业务实体类模块
    let businessFunctionModel = {};
    for (let index = 0; index < interfaceResultArr.length; index++) {
        const element = interfaceResultArr[index];
        let { apiName, apiModel, interfaceResult, requestWay, modelName, businessName, interfaceParamResult } = element;
        let functionAst = new ast_1.Ast(`
    `, {}, true);
        if (businessFunctionModel[businessName]) {
            businessFunctionModel[businessName].push(functionAst);
        }
        else {
            businessFunctionModel[businessName] = [functionAst];
        }
        if (index == 0) {
            console.log(element);
        }
        // 生成的interface定义需要区分是 params 还是 response
        pushAstNode(interfaceResult, functionAst, element, true);
        pushAstNode(interfaceParamResult, functionAst, element, false);
    }
    Object.keys(businessFunctionModel).forEach(key => {
        let element = businessFunctionModel[key];
    });
    return businessFunctionModel;
}
function pushAstNode(interfaceResult, interfaceAst, interfaceInfo, isResponse) {
    if (!interfaceResult)
        return;
    pathUseCount++;
    let { businessName, apiName, apiModel, modelName } = interfaceInfo;
    let interfaceName = interfaceAst.definitionInterfaceName(apiName, isResponse ? 1 : 2);
    let { hasT, interface: interfaceState } = interfaceResult;
    //注释
    let interfaceComment = `【${modelName}】,${apiName} `;
    // 检查字段是否为通用接口回复,是的话就不生成了
    if (isResponse && checkAPIFixedRo(interfaceState))
        return;
    let IdentifierNode = interfaceAst.generateIdentifierNode(interfaceName, hasT, interfaceComment);
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
        let node = interfaceAst.generateTSTypeAnnotationNode(key, type, fieldConfig, interfaceName, required);
        node && fieldNodes.push(node);
    });
    IdentifierNode.declaration.body.body = fieldNodes;
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
                        //           let exportNode = new Ast(
                        //             `
                        // export interface template {
                        // }
                        //             `
                        //             , {}, true)
                        //           let replaceNode = exportNode.ast.attr('program.body')[0]
                        //           replaceNode.declaration = node
                        resutAst.ast.attr('program.body').push(node);
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
/**
 * 递归判断实体类里是否嵌套其他实体类
 * @param interfaces
 * @param interfaceAst
 * @param interfaceInfo
 */
function deepCheckInterface(interfaceFields, interfaceAst, analysisDefinitionsResult, isDeep) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!interfaceFields)
            return;
        // let interfaceFields = interfaceResult.interface
        // 需要生成嵌套下的实体类
        let needGenerateInterface = [];
        Object.keys(interfaceFields).forEach(key => {
            let field = interfaceFields[key];
            let { type } = field;
            if (type === 'array' && 'items' in field) {
                if (field.items.originalRef) {
                    let interfaceName = interfaceAst.definitionInterfaceName(field.items.originalRef, 1);
                    let isExist = interfaceAst.checkedInterfaceExist(interfaceName, interfaceAst);
                    needGenerateInterface.push(field.items.originalRef);
                    let definition = analysisDefinitionsResult[field.items.originalRef];
                    if (definition) {
                        // 遇到过无限嵌套的 definition,所以判断当前Ast中是否生成过该definition,没有则生成
                        if (!isExist) {
                            let IdentifierNode = interfaceAst.generateIdentifierNode(interfaceName, false);
                            interfaceAst.ast.attr('program').body.push(IdentifierNode);
                            // 生成interface字段
                            let interfaceFields = definition.properties;
                            let fieldNodes = [];
                            Object.keys(interfaceFields).forEach((key, index) => {
                                let { type } = interfaceFields[key];
                                let node = interfaceAst.generateTSTypeAnnotationNode(key, type, interfaceFields[key], interfaceName, []);
                                node && fieldNodes.push(node);
                            });
                            IdentifierNode.declaration.body.body = fieldNodes;
                        }
                        Object.keys(definition.properties).forEach(key => {
                            let field = definition.properties[key];
                            if (field.type === 'array' && field.items) {
                                if (!isExist) {
                                    deepCheckInterface({
                                        [key]: field
                                    }, interfaceAst, analysisDefinitionsResult, true);
                                }
                            }
                        });
                    }
                }
            }
        });
    });
}
/**
 * 判断返回实体类是就为消息类型(data、errMsg、status、success)
 * @param interface
 */
function checkAPIFixedRo(interfaceFields) {
    let isFixedRo = ['data', 'errMsg', 'status', 'success'];
    return JSON.stringify(isFixedRo) === JSON.stringify(Object.keys(interfaceFields));
}
