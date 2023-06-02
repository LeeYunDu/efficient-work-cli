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
exports.useGenretorItems = void 0;
const prompts_1 = __importDefault(require("prompts"));
function useGenretorItems() {
    return __awaiter(this, void 0, void 0, function* () {
        let { items } = yield (0, prompts_1.default)(promptsOptions);
        console.log(2);
    });
}
exports.useGenretorItems = useGenretorItems;
const promptsOptions = [
    {
        type: 'multiselect',
        name: 'items',
        message: '选择生成的组件',
        choices: [
            { title: 'model标题', value: 'title' },
            { title: '渐变文字', value: 'font' },
            { title: 'item.block', value: 'item.block' },
            { title: 'item.block.topicon', value: 'item.block.topicon' },
            { title: 'item.block.bg', value: 'item.block.bg' },
            { title: 'item.progress', value: 'item.progress' },
            { title: 'banner', value: 'banner' },
            { title: '移动端-select-box', value: 'select.box' },
        ]
    },
];
