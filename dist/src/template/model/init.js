"use strict";
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
exports.useGeneratorModel = void 0;
const utils_1 = require("../..//utils");
const ast_1 = require("../../utils/ast");
const prompts_1 = __importDefault(require("prompts"));
const COMPONENT_PATH_MAP = {
    default: ''
};
function useGeneratorModel() {
    return __awaiter(this, void 0, void 0, function* () {
        let models = (0, utils_1.getFoldersInDirectory)('./src/template/model');
        console.log(models, 'models');
        return;
        let { type } = yield (0, prompts_1.default)(promptsOptions);
        // 创建该目录下所需要的模板文件
        let modelPath = `${process.cwd()}/${path}`;
        let hasDir = yield (0, utils_1.mkdir)(modelPath);
        let file = `/${type}.vue`;
        (0, utils_1.createFile)({ filePath: `${modelPath}${file}` });
        const rootDir = yield (0, utils_1.getSourcePath)();
        if (type === 'json') {
        }
        else {
        }
        let sourcePath = '';
        let templateResult = '';
        let componentsAst;
        switch (type) {
            case 'json':
                sourcePath = `${rootDir}/src/template/default/template/${type}.ts`;
                componentsAst = new ast_1.Ast(sourcePath, {});
                componentsAst.writeFile(`${modelPath}/json.ts`);
                break;
            default:
                sourcePath = `${rootDir}/src/template/default/template/${type}.vue`;
                componentsAst = new ast_1.Ast(sourcePath, { parseOptions: { language: 'vue' } });
                componentsAst.writeFile(`${modelPath}${file}`);
                break;
        }
    });
}
exports.useGeneratorModel = useGeneratorModel;
const promptsOptions = [
    {
        type: 'select',
        name: 'type',
        message: '选择生成模板',
        choices: [
            { title: 'setup+ts的单组件文件', value: 'vue' },
            { title: '大屏Vue单组件文件', value: 'vue.screen' },
            { title: 'list-view', value: 'list-view' },
            { title: '表格', value: 'table' },
            { title: '弹窗', value: 'dialog' },
            { title: '弹窗-表格', value: 'dialog.table' },
            { title: '弹窗-表单', value: 'dialog.form' },
            { title: 'json', value: 'json' },
        ]
    },
];
