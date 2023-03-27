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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDefaultFile = void 0;
const utils_1 = require("../../utils");
const ast_1 = require("../../utils/ast");
function useDefaultFile(path) {
    return __awaiter(this, void 0, void 0, function* () {
        // 创建该目录下所需要的模板文件
        let modelPath = `${process.cwd()}/${path}`;
        let hasDir = yield (0, utils_1.mkdir)(modelPath);
        let file = '/default.vue';
        (0, utils_1.createFile)({ filePath: `${modelPath}${file}` });
        const rootDir = yield (0, utils_1.getSourcePath)();
        const sourcePath = `${rootDir}/src/template/default/template/vue.vue`;
        let templateResult;
        let componentsAst = new ast_1.Ast(sourcePath, { parseOptions: { language: 'vue' } });
        componentsAst.writeFile(`${modelPath}${file}`);
    });
}
exports.useDefaultFile = useDefaultFile;
