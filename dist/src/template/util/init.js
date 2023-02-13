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
exports.useInitUtil = void 0;
const prompts_1 = __importDefault(require("prompts"));
const utils_1 = require("../../utils");
const ast_1 = require("../../utils/ast");
const logger = __importStar(require("../../utils/logger"));
function useInitUtil() {
    return __awaiter(this, void 0, void 0, function* () {
        // 文件默认位置 src/units/
        const UTIL_FILE_PATH = 'src/utils/';
        let { checkedModels } = yield (0, prompts_1.default)(promptsOptions);
        const MODEL_PATH = `${process.cwd()}/${UTIL_FILE_PATH}`;
        const rootDir = yield (0, utils_1.getSourcePath)();
        let promiseArr = [];
        checkedModels.forEach((model) => __awaiter(this, void 0, void 0, function* () {
            // 验证文件是否存在
            let state = (0, utils_1.checkExists)(`${UTIL_FILE_PATH}${model}`);
            if (state) {
                logger.error(`${model}文件已存在,跳过下载`);
            }
            else {
                promiseArr.push({
                    model,
                    state: (0, utils_1.createFile)({
                        filePath: `${MODEL_PATH}${model}`
                    })
                });
            }
        }));
        Promise.all(promiseArr.map((file) => file.state)).then(result => {
            result.forEach((e, index) => {
                let { model } = promiseArr[index];
                const sourcePath = `${rootDir}/src/template/util/template/${model}`;
                let componentsAst = new ast_1.Ast(sourcePath, {});
                // 按理来讲，文件已经生成了啊
                setTimeout(() => {
                    componentsAst.writeFile(`${MODEL_PATH}${model}`);
                }, 0);
            });
        });
    });
}
exports.useInitUtil = useInitUtil;
const promptsOptions = [
    {
        type: 'multiselect',
        name: 'checkedModels',
        message: '请选择需要下载的工具',
        choices: [
            { title: '表单字段正则验证', value: 'validator.ts' },
        ]
    }
];
