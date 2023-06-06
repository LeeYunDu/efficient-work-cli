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
exports.useGenretorItems = void 0;
const ast_1 = require("../../utils/ast");
const utils_1 = require("../../utils");
function useGenretorItems() {
    return __awaiter(this, void 0, void 0, function* () {
        // let { items } = await prompts(promptsOptions)
        const rootDir = yield (0, utils_1.getSourcePath)();
        const filePath = rootDir + `/src/template/items/template/item.date.picker.vue`;
        let currentAst = new ast_1.Ast(filePath, { parseOptions: { language: 'vue' } });
        // currentAst.ast.find('<Teleport><Teleport/>').each((item: any) => {
        //   console.log(item[0], 'item')
        // })
        // console.log(currentAst.htmlAst.find('<Teleport></Teleport>'))
        // currentAst.htmlAst.find('<Teleport></Teleport>').each((node: any) => {
        //   console.log(node[0].nodePath.value, 'node')
        // })
        // console.log(currentAst.htmlAst.node.content.children)
        // console.log(currentAst.htmlAst.node.content.children[0].content.children, 'currentAst');
        // currentAst.htmlAst.node.content.children[0].content.name = 'section'
        let tags = deepQuery(currentAst.htmlAst.node, 'div');
        let changeNode = tags[1];
        changeNode.content.attributes.forEach(e => {
            if (e.key.content == 'class') {
                console.log(e.value);
                e.value.content = 'test3';
            }
        });
        console.log(currentAst.ast.generate());
        // currentAst.htmlAst.node.content.children.forEach((node: any) => {
        //   if (node.nodeType === 'tag') {
        //     console.log(node.content.children)
        //   }
        // })
        /**
         * css Ast测试
         */
        // // console.log(currentAst.ast.node.styles[0].content, 'currentAst');
        // const cssAst = csstree.parse(currentAst.ast.node.styles[0].content)
        // // console.log(cssAst.children.head);
        // const ast = csstree.parse('.example { world: "!" }');
        // csstree.walk(cssAst, (node) => {
        //   if (node) {
        //     console.log(node);
        //   }
        // });
        // const ast2 = csstree.parse('red 1px solid', { context: 'value' });
        // console.log(csstree.generate(ast2));
        // console.log(csstree.generate(cssAst));
    });
}
exports.useGenretorItems = useGenretorItems;
function deepQuery(node, tagName) {
    let tagNodes = [];
    if (node.content.children) {
        node.content.children.forEach(node => {
            if (node.content.name === tagName) {
                tagNodes.push(node);
            }
            if (node.nodeType === 'tag') {
                let deepNodes = deepQuery(node, tagName);
                tagNodes = tagNodes.concat(deepNodes);
            }
        });
    }
    return tagNodes;
}
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
            { title: 'h5-area-select', value: 'item.area.picker' },
            { title: 'h5-date-select', value: 'item.date.picker' },
        ]
    },
];
