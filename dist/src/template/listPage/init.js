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
exports.useInitListPage = void 0;
const index_1 = require("../../utils/index");
const ast_1 = require("../../utils/ast");
const prompts_1 = __importDefault(require("prompts"));
const logger = __importStar(require("../../utils/logger"));
// import child_process from 'child_process'
// let gitPath = 'git clone git@codeup.aliyun.com:60810cde35f5934d3af8e181/szzt/Gov-Group/Industrial-Brain-Group/KunMing-GongXin-Group/Frontend-Group/Portal-PC.git'
// child_process.exec(gitPath, { encoding: 'utf-8' }, (stdout, error) => {
//   console.log(stdout);
// })
/**
 *
 * @param path
 * @description 根据输入的文件路径先依次创建文件,再往文件里写代码
 * @param force
 */
function useInitListPage(path) {
    return __awaiter(this, void 0, void 0, function* () {
        // let rootDir1 = await getSourcePath()
        // const sourcePath = `${rootDir1}/src/template/listModel/template//json.ts`
        // let componentsAst1 = new Ast(sourcePath, {})
        // console.log(componentsAst1.getExportNode('tableColumns').remove());
        let { checkedModels, force } = yield (0, prompts_1.default)(promptsOptions);
        if (!checkedModels || checkedModels.length === 0) {
            logger.info(`${checkedModels && checkedModels.length === 0 ? '因为未选择模块,' : ''}已取消操作`);
            return;
        }
        // 创建该目录下所需要的模板文件
        let modelPath = `${process.cwd()}/${path}`;
        let hasDir = yield (0, index_1.mkdir)(modelPath);
        // 是否覆盖文件判断
        // if (hasDir) {
        //   let { force } = await prompts({
        //     type: 'select',//单选
        //     name: 'force',
        //     message: '输入的文件路径已存在,是否覆盖原有的文件',
        //     choices: [
        //       { title: '否', value: false },
        //       { title: '是', value: true }
        //     ]
        //   })
        //   if (!force) {
        //     logger.success('已取消操作')
        //     return
        //   }
        // }
        const defailtFiles = [
            '/业务模块中文名称',
            '/json.ts',
        ];
        const modelFilePathMap = {
            list: '/view.vue',
            detail: '/components/detail.model.vue',
            add: '/components/add.model.vue',
            mock: '/json.ts',
        };
        let renderModel = new Array(0).concat(checkedModels.map((model) => modelFilePathMap[model])).concat(defailtFiles);
        renderModel.forEach(file => {
            (0, index_1.createFile)({ filePath: `${modelPath}${file}` });
        });
        // 文件写入
        const rootDir = yield (0, index_1.getSourcePath)();
        let componentsAst;
        [...checkedModels, 'mock'].forEach((model, index) => {
            const sourcePath = `${rootDir}/src/template/listPage/template/${modelFilePathMap[model]}`;
            let templateResult;
            switch (model) {
                case 'list':
                    componentsAst = new ast_1.Ast(sourcePath, { parseOptions: { language: 'vue' } });
                    // 列表模块需要根据选中的模块来引入组件
                    const importMap = {
                        add: `import addDialog from './components/add.model.vue';`,
                        detail: `import detailDialog from './components/detail.model.vue';`,
                    };
                    const importComponentTag = {
                        add: 'addModel',
                        detail: 'detailModel'
                    };
                    Object.keys(importMap).forEach((key) => {
                        if (checkedModels.includes(key)) {
                            componentsAst.insertImport(importMap[key], componentsAst.jsAst);
                        }
                        else {
                            // // 不引入则删除 <template> 下的组件标签，这次选择删除节点，是因为删除比插入简单
                            // let tagName = importComponentTag[key]
                            // let tagNodes = componentsAst.getElementByTagName(tagName);
                            // tagNodes.forEach((node: any) => {
                            //   node.remove()
                            // })
                        }
                    });
                    let nodes = componentsAst.getElementByTagName('ui-table');
                    nodes.forEach((node) => {
                        // console.log(componentsAst.editAttributes(node, 'ref', 'tt'))
                        // console.log(componentsAst.removeAttributes(node, 'ref'))
                        console.log(componentsAst.addAttributes(node, 'ref2', 'tet'));
                        console.log(componentsAst.getSingleAttribute(node, 'ref'));
                    });
                    componentsAst.writeFile(`${modelPath}${modelFilePathMap[model]}`);
                    // writeFile({ filePath: `${modelPath}${renderModel[index]}`, data: templateResult })
                    break;
                case 'detail':
                case 'add':
                    componentsAst = new ast_1.Ast(sourcePath, { parseOptions: { language: 'vue' } });
                    componentsAst.writeFile(`${modelPath}${modelFilePathMap[model]}`);
                    break;
                case 'mock':
                    /**
                     * 根据选择的模块,生成对应的mock字段数据
                     */
                    componentsAst = new ast_1.Ast(sourcePath, {});
                    let mockFieldMap = {
                        list: 'tableColumn',
                        add: 'formFields',
                        detail: 'detailFields',
                    };
                    Object.keys(mockFieldMap).forEach((key) => {
                        if (!checkedModels.includes(key)) {
                            componentsAst.removeNode(componentsAst.getExportNode(mockFieldMap[key]));
                        }
                    });
                    componentsAst.writeFile(`${modelPath}${modelFilePathMap[model]}`);
                    break;
                default:
                    break;
            }
        });
    });
}
exports.useInitListPage = useInitListPage;
const promptsOptions = [
    {
        type: 'multiselect',
        name: 'checkedModels',
        message: '请选择需要下载的模块',
        choices: [
            { title: '列表', value: 'list' },
            { title: '详情弹窗', value: 'detail' },
            { title: '新增/修改表单弹窗', value: 'add' }
        ]
    },
    // {
    //   type: 'select',//单选
    //   name: 'hasMock',
    //   message: '是否生成模拟数据/字段',
    //   choices: [
    //     { title: '是', value: true },
    //     { title: '否', value: false }
    //   ]
    // },
];
