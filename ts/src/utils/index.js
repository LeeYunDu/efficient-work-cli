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
exports.downloadFileByUrl = exports.convertTemplate = exports.getStat = exports.doMkdir = exports.mkdir = exports.createFile = exports.writeFile = exports.getSourcePath = exports.checkExists = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const request_1 = __importDefault(require("request"));
const child_process_1 = require("child_process");
/**
 * 判断项目文件是否存在
 * @param {*} name
 * @param {*} hasJoin
 */
function checkExists(name, hasJoin = true) {
    return fs_1.default.existsSync(hasJoin ? path_1.default.join(process.cwd(), `${name}`) : `${name}`);
}
exports.checkExists = checkExists;
/**
 * 获取源码位置
 */
const isWin = /^win/.test(process.platform);
function getSourcePath(path = '') {
    if (path) {
        path = path.substring(0, 1) === '/' ? path : `/${path}`;
    }
    return new Promise((rs, rj) => {
        (0, child_process_1.exec)('npm config get prefix', (err, data) => {
            const _data = data.replace(/\\/g, '/');
            const EF_WORK_CLI_PATH = `${_data.substring(0, _data.length - 1) + (!isWin ? '/lib' : '')}/node_modules/ef-work-cli`;
            rs(`${EF_WORK_CLI_PATH}${path}`);
        });
    });
}
exports.getSourcePath = getSourcePath;
/**
 * 写入文件
 * @param opts
 * @returns
 */
function writeFile(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!opts)
            return;
        return new Promise((resolve, reject) => {
            const { filePath, data, encoding } = opts;
            const encodingType = encoding || 'utf-8';
            const uPath = path_1.default.resolve(filePath);
            fs_1.default.writeFile(uPath, data, encodingType, err => {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            });
        });
    });
}
exports.writeFile = writeFile;
/**
 * 创建文件
 * @param option
 * @returns
 */
function createFile(option) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!option)
            return;
        let { filePath } = option;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            // 文件路径目录不存在的话则需要创建
            let lastIndex = filePath.lastIndexOf('/');
            let dirPath = filePath.slice(0, lastIndex);
            yield mkdir(dirPath);
            try {
                const writeStream = fs_1.default.createWriteStream(path_1.default.resolve(filePath));
                writeStream.end();
                resolve(true);
            }
            catch (error) {
                throw new Error(error);
            }
        }));
    });
}
exports.createFile = createFile;
/**
 * 根据路径创建文件目录
 * @param dir
 * @returns
 */
function mkdir(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        let isExists = yield getStat(dir);
        // 如果该路径存在且不是文件，返回 true
        if (isExists && isExists.isDirectory()) {
            return true;
        }
        else if (isExists) {
            return false;
        }
        // 如果该路径不存在
        const tempDir = path_1.default.parse(dir).dir; //拿到上级路径
        // 递归判断，如果上级路径也不存在，则继续循环执行，直到存在
        let status = yield mkdir(tempDir);
        let mkdirStatus;
        if (status) {
            mkdirStatus = yield doMkdir(dir);
        }
        return mkdirStatus;
    });
}
exports.mkdir = mkdir;
/**
 * 创建文件夹
 * @param dir
 * @returns
 */
function doMkdir(dir) {
    return new Promise((resolve, reject) => {
        // recursive属性：表示是否创建父目录，默认为false
        fs_1.default.mkdir(dir, { recursive: true }, err => {
            if (err) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    });
}
exports.doMkdir = doMkdir;
/**
 * 读取路径信息
 * @param path
 * @returns
 */
function getStat(path) {
    return new Promise((resolve, reject) => {
        fs_1.default.stat(path, (err, stats) => {
            if (err) {
                resolve(false);
            }
            else {
                resolve(stats);
            }
        });
    });
}
exports.getStat = getStat;
/**
 * 对象转模板
 * @param data
 * @returns
 */
function convertTemplate(data) {
    let temp = ``;
    let type = Object.prototype.toString.call(data);
    if (type === '[object Array]') {
        temp += `[${data.length > 1 ? '\n' : ''}`;
        data.forEach((item, index) => {
            item = convertTemplate(item);
            temp += `${item}${data.length - index > 1 ? ',' : ''}${data.length > 1 ? '\n' : ''}`;
        });
        temp += `]`;
    }
    else if (type === '[object Object]') {
        temp += `{${'\n'}`;
        Object.keys(data).forEach((key, index) => {
            data[key] = convertTemplate(data[key]);
            temp += `${key}:${data[key]}${Object.keys(data).length - index > 1 ? ',' : ''}${'\n'}`;
        });
        temp += `}`;
    }
    else if (type === `[object Undefined]`) {
        temp += 'undefined';
    }
    else if (type === `[object Function]`) {
        temp += data;
    }
    else {
        temp += JSON.stringify(data);
    }
    return temp;
}
exports.convertTemplate = convertTemplate;
/**
 * 将网络文件下载到指定位置
 * @param url
 * @param fileName
 * @param dir
 */
function downloadFileByUrl(url, fileName, dir) {
    let stream = fs_1.default.createWriteStream(path_1.default.join(dir, fileName));
    (0, request_1.default)(url).pipe(stream).on("close", function (err) {
        console.log("文件" + fileName + "下载完毕");
    });
}
exports.downloadFileByUrl = downloadFileByUrl;
