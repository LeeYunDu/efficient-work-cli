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
exports.useGeneratorModel = void 0;
const utils_1 = require("../..//utils");
const ast_1 = require("../../utils/ast");
const prompts_1 = __importDefault(require("prompts"));
const logger = __importStar(require("../../utils/logger"));
function useGeneratorModel(path = 'cli') {
    return __awaiter(this, void 0, void 0, function* () {
        const rootDir = yield (0, utils_1.getSourcePath)();
        // 根据路径扫描出该路径下有什么文件夹
        let models = (0, utils_1.getFoldersInDirectory)(`${rootDir}/src/template/model`);
        let { modelType } = yield (0, prompts_1.default)(getOptions('modelType', '请选择模块', models.map(item => {
            return {
                title: item,
                value: item
            };
        })));
        if (!modelType)
            return;
        let files = (0, utils_1.getAllFilesInDirectory)(`${rootDir}/src/template/model/${modelType}`);
        let { activeIndex } = yield (0, prompts_1.default)(getOptions('activeIndex', '请选择生成的文件', files.map(item => {
            item.title = item.file;
            return item;
        })));
        if (files.length == 0) {
            logger.info('该模块下没有文件');
            return;
        }
        let model = files[activeIndex];
        if (!model)
            return;
        let modelFiles = [];
        let modelPath = `${process.cwd()}/${path}`;
        let hasDir = yield (0, utils_1.mkdir)(modelPath);
        // 文件夹的话需要遍历文件夹生成所有文件地址
        if (model.type === 'folder') {
            modelFiles = (0, utils_1.getAllFilesInFolder)(model.filePath);
            let createFilePromise = [];
            modelFiles.map((modelFile) => {
                generatorFile(modelFile, { modelPath, rootDir, modelType });
            });
        }
        else {
            generatorFile(model, { modelPath, rootDir, modelType });
        }
    });
}
exports.useGeneratorModel = useGeneratorModel;
function getOptions(key, message = '', options = []) {
    return {
        type: 'select',
        name: key,
        message,
        choices: options,
    };
}
function generatorFile(modelFile, options) {
    return __awaiter(this, void 0, void 0, function* () {
        let createFilePromise = [];
        let { modelPath, rootDir, modelType } = options;
        // 处理文件路径字符串，拼接文件地址，生成文件
        let filePath = `\\${modelFile.filePath.slice(modelFile.filePath.indexOf(modelType) + modelType.length)}`;
        const regex = /\\/g;
        let replaceFile = filePath.replace(regex, '/');
        let createFilePath = `${modelPath}${replaceFile}`;
        // 创建该目录下所需要的模板文件
        createFilePromise.push((0, utils_1.createFile)({ filePath: createFilePath }));
        yield Promise.all(createFilePromise);
        // 拼接源文件地址,即本地全局 node_modules包的位置 + 需要被生成的文件的地址
        let sourcePath = `${modelFile.filePath.replace(regex, '/')}`;
        // 根据文件类型定义AST解析文件的方式
        let fileType = filePath.split('.').pop();
        let componentsAst = null;
        switch (fileType) {
            case 'ts':
            case 'javascript':
                componentsAst = new ast_1.Ast(sourcePath, {});
                break;
            case 'vue':
                componentsAst = new ast_1.Ast(sourcePath, { parseOptions: { language: 'vue' } });
                let FormAst = new ast_1.Ast(sourcePath, { parseOptions: { language: 'vue' } });
                let onChange = FormAst.getFunctoinNode('onClosed', componentsAst.jsAst);
                console.log(onChange.attr('body.body')[1].expression.arguments[0].value = 555);
                break;
        }
        setTimeout(() => {
            componentsAst && componentsAst.writeFile(createFilePath);
        }, 0);
    });
}
