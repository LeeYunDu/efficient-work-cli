"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ast = void 0;
const gogocode_1 = __importDefault(require("gogocode"));
const logger = require('./logger');
const index_1 = require("./index");
class Ast {
    constructor(filePath, option, templateString = false) {
        /**
         * 抽象语法树类型枚举
         * FunctionDeclaration (函数)、VariableDeclaration(变量)
         * ImportDeclaration(ts import 引入对象)、CallExpression(表达式)
         * ExpressionStatement(表达式语句)
         */
        this.ast = null;
        // vue文件专属抽象语法树
        this.htmlAst = null;
        this.jsAst = null;
        this.filePath = '';
        this.fileType = ''; // 枚举: html、vue、javascript(自己定义的)
        this.enumTypeNode = {
            FunctionDeclaration: [],
            VariableDeclaration: [],
            ImportDeclaration: [],
            ExportNamedDeclaration: []
        };
        /**
         * templateString true 表示 filePath传入的是代码片段（字符串）,false表示的代码文件路径地址
         * 两者差别会改变语法树解析方式
         */
        if (templateString) {
            this.ast = (0, gogocode_1.default)(filePath, option);
        }
        else {
            if (!this.checkExistsFile(filePath))
                return;
            this.filePath = filePath;
            this.ast = gogocode_1.default.loadFile(filePath, option);
            this.fileType = this.ast.parseOptions && this.ast.parseOptions.language || 'javascript';
        }
        this.init();
    }
    init() {
        try {
            switch (this.fileType) {
                case 'javascript':
                    // 根据抽象语法树类型枚举过滤node
                    this.ast.attr('program.body').forEach((node, index) => {
                        if (index === 0) {
                            // console.log(node.declaration.declarations[0].id.name, 'node.type');
                        }
                        if (node.type in this.enumTypeNode) {
                            this.enumTypeNode[node.type].push(node);
                        }
                    });
                    break;
                case 'vue':
                    this.ast.find('<script setup></script>').each((item) => {
                        this.jsAst = item;
                    });
                    this.ast.find('<template></template>').each((item) => {
                        this.htmlAst = item;
                    });
                    break;
                case 'html':
                    break;
            }
        }
        catch (error) {
            logger.exit(new Error(`解析抽象语法树失败,请检查需插入的文件是否有语法错误!`));
        }
    }
    /**
     * 检查文件是否存在
     * 文件地址包含node_modules默认为szzt-cli 源码文件
     */
    checkExistsFile(filePath) {
        if (!(0, index_1.checkExists)(filePath, filePath.indexOf('node_modules') > -1 ? false : true)) {
            logger.exit(new Error(`需注入代码的文件${filePath}缺失!`));
            return false;
        }
        else {
            return true;
        }
    }
    /**
     * 写入文件
     */
    writeFile(filePath = this.filePath) {
        let res = gogocode_1.default.writeFile(this.ast.generate(), filePath);
        // logger.success(`${filePath},文件写入成功`)
    }
    generateNode(value) {
        let type = Object.prototype.toString.call(value);
        let init;
        let params = (0, gogocode_1.default)(`let variable = ${['[object Object]', '[object Array]'].includes(type) ? JSON.stringify(value) : typeof value === 'string' ? `${value}` : value}`).find('variable').each((item, index) => {
            init = item[0].nodePath.parentPath.value.init;
        });
        return init;
    }
    /**
     * 修改对象其中一个字段
     * @param {*} obj
     * @param {*} key
     * @param {*} value
     */
    editObjectField(objectName, key, value, ast = this.ast) {
        let node = this.getVariableNode(objectName, ast);
        let nodeType = this.getNodeType(node);
        let fieldNode;
        if (node) {
            if (nodeType === 'CallExpression') {
                // 此处针对vue中ref定义Object变量进行添加字段,ref本质上是一个函数
                fieldNode = node.attr('declarations')[0].init.arguments[0].properties.filter((node) => {
                    return node.key.name === key;
                })[0];
            }
            else {
                fieldNode = node.attr('declarations')[0].init.properties.filter((node) => {
                    return node.key.name === key;
                })[0];
            }
        }
        if (fieldNode) {
            fieldNode.value = this.generateNode(value);
        }
    }
    /**
     * 给对象添加字段
     * @param {ast} ast 抽象语法树
     * @param {String} objectName 被添加对象
     * @param {Object} injectObject 添加的对象
     */
    addFieldToObject(objectName, injectObject, ast = this.ast) {
        // JSON序列化后生成抽象语法树,再获取到对象的properties
        let injectObjectAst = (0, gogocode_1.default)(JSON.stringify(injectObject));
        let injectProperties = injectObjectAst.attr('properties') || [];
        let node = this.getVariableNode(objectName, ast);
        if (node) {
            // 此处针对vue中ref定义Object变量进行添加字段,ref本质上是一个函数
            let nodeType = this.getNodeType(node);
            if (nodeType === 'CallExpression') {
                node.attr('declarations')[0].init.arguments[0].properties = node.attr('declarations')[0].init.arguments[0].properties.concat(injectProperties);
            }
            else {
                node.attr('declarations')[0].init.properties = node.attr('declarations')[0].init.properties.concat(injectProperties);
            }
        }
    }
    /**
     * 修改变量的值
     *
     * 当赋值值为string时,添加反单引号,`'value'`,当值为其他的变量名时,'value'
     *
     * bug:当赋予的值的类型对象,且存在key的值的类型为Function时,那么该key会被过滤
     * @param {string} variable 变量名称
     * @param {*} value
     */
    editVariableNode(variable, value, ast = this.ast) {
        let node = this.getVariableNode(variable, ast);
        let nodeType = this.getNodeType(node);
        if (node) {
            if (nodeType === 'CallExpression') {
                node.attr('declarations')[0].init.arguments = [this.generateNode(value)];
            }
            else {
                node.attr('declarations')[0].init = this.generateNode(value);
            }
        }
    }
    /**
     * 获取当前抽象节点树下的变量node
     * @param {*} ast
     * @param {string||number} variable
     * @returns {} 返回值 node:'变量节点',value:'变量值',name:'变量名称'
     */
    getVariableNode(variable, ast = this.ast) {
        try {
            /**
             * 遍历node节点,找到抽象语法树中的声明变量
             * 过滤出变量名称与参数传入一致的节点
             * 修改节点的properties
             */
            // program.body 源文件作用域下的写法  ,body.body是函数当前作用域下的写法
            let body = ast.attr('program.body') || ast.attr('body.body');
            let varNode = body.filter((e) => {
                return e.type === 'VariableDeclaration';
            });
            let nodeArray = varNode.filter((e) => {
                return e.declarations[0].id.name === variable;
            });
            if (nodeArray.length > 0) {
                return ast.find(nodeArray[0]);
            }
            else {
                logger.exit(new Error(`未找到节点${variable}!`));
                return null;
            }
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    /**
     * 根据函数名获取函数内部node(节点)
     *
     * @param {*} ast
     * @param {*} fnName
     * @returns
     */
    getFunctoinNode(fnName, ast = this.ast) {
        try {
            let temp = '';
            let node = null;
            ast.find(`function ${fnName}() {}`).each((item, index) => {
                node = item;
            });
            return node;
        }
        catch (error) {
            return null;
        }
    }
    /**
     * 弃用
     * 根据函数名获取函数抽象语法树
     * @param {*} ast
     * @param {*} fnName
     * @returns
     */
    getFunctoinAst(fnName, ast = this.ast) {
        try {
            return (0, gogocode_1.default)(ast.find(`function ${fnName}() {}`));
        }
        catch (error) {
            return null;
        }
    }
    getCallFunction(fnName, ast = this.ast) {
        try {
            let node = null;
            ast.find(`${fnName}()`).each((item, index) => {
                node = item;
            });
            return node;
        }
        catch (error) {
            return null;
        }
    }
    /**
     * 同作用域下插入代码片段
     * @param {*} code
     * @param {*} ast
     */
    appendCode(code, ast = this.ast) {
        ast.after(code);
    }
    // 插入import
    insertImport(code, ast = this.ast) {
        // import 末尾插入
        if (this.enumTypeNode.ImportDeclaration.length > 0) {
            let lastImport = this.enumTypeNode.ImportDeclaration[this.enumTypeNode.ImportDeclaration.length - 1];
            ast.find(lastImport).each((e) => {
                e.after('\n' + code);
            });
        }
        else {
            // 文件开头插入
            ast.before(code);
        }
    }
    /**
     * 删除声明函数
     * @param {*} fnName
     * @param {*} ast
     */
    removeFunction(fnName, ast = this.ast) {
        ast.find(`function ${fnName}() {}`).remove();
    }
    /**
     * 删除声明变量
     * @param {*} variableName
     * @param {*} ast
     */
    removeVariable(variableName, ast = this.ast) {
        ast.find(`let ${variableName} = $_$1`).remove();
        ast.find(`var ${variableName} = $_$1`).remove();
        ast.find(`const ${variableName} = $_$1`).remove();
    }
    /**
     * 删除节点,返回根节点
     * @param node
     */
    removeNode(node, ast = this.ast) {
        ast.find(node).remove();
    }
    /**
     * 获取节点类型
     * @param node
     * @returns
     */
    getNodeType(node) {
        if (node) {
            return node.attr('declarations')[0].init.type;
        }
    }
    /**
     * 根据export的变量名称找到对应的node
     * @param variableName
     * @returns
     * @description 目前实例只支持常量
     */
    getExportNode(variableName) {
        let resultNode;
        this.enumTypeNode['ExportNamedDeclaration'].forEach((node) => {
            try {
                if (node.declaration.declarations[0].id.name === variableName) {
                    resultNode = node;
                }
            }
            catch (error) {
            }
        });
        if (resultNode) {
            return resultNode;
        }
        else {
            logger.error('没有找到export对象');
        }
    }
}
exports.Ast = Ast;
