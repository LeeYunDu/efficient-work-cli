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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGenretor = void 0;
const generator_types_1 = require("../template/generator.types");
const init_1 = require("../template/util/init");
const init_2 = require("../template/default/init");
const logger = __importStar(require("../utils/logger"));
const init_3 = require("../template/items/init");
const init_4 = require("../template/listPage/init");
const init_5 = require("../template/model/init");
/**
 *
 * ..param option
 */
function useGenretor(option) {
    let { type, path, force } = option;
    const ENUM = ['listPage', 'util', 'types', 'default', 'items', 'model'];
    switch (type) {
        case 'listPage':
            (0, init_4.useInitListPage)(path);
            break;
        case 'util':
            (0, init_1.useInitUtil)();
            break;
        case 'types':
            (0, generator_types_1.generatorTypes)();
            break;
        case 'items':
            (0, init_3.useGenretorItems)();
            break;
        case 'default':
            (0, init_2.useDefaultFile)(path);
            break;
        case 'model':
            (0, init_5.useGeneratorModel)();
            break;
        default:
            logger.error(`未找到模块,枚举：${ENUM.join('、')}`);
            break;
    }
}
exports.useGenretor = useGenretor;
