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
exports.getDictValue = exports.transformTableData = exports.downloadFileByUrl = exports.convertTemplate = exports.getStat = exports.getAllFilesInFolder = exports.getFoldersInDirectory = exports.doMkdir = exports.mkdir = exports.getAllFilesInDirectory = exports.createFile = exports.writeFile = exports.getSourcePath = exports.checkExists = void 0;
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
 * 根据路径地址返回该路径下的所有文件
 * @param dirPath
 * @returns
 */
function getAllFilesInDirectory(dirPath) {
    // 读取指定路径下的所有文件和文件夹
    const files = fs_1.default.readdirSync(dirPath);
    let fields = [];
    // 遍历所有文件和文件夹
    files.forEach(file => {
        // 获取文件或文件夹的完整路径
        const filePath = path_1.default.join(dirPath, file);
        // 判断是否为文件
        fields.push({
            type: fs_1.default.statSync(filePath).isFile() ? 'file' : 'folder',
            filePath,
            file
        });
    });
    return fields;
}
exports.getAllFilesInDirectory = getAllFilesInDirectory;
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
 * 根据路径读取该路径下的文件夹
 * @param path
 * @returns
 */
function getFoldersInDirectory(path) {
    try {
        const files = fs_1.default.readdirSync(path);
        const folders = files.filter(file => {
            return fs_1.default.statSync(`${path}/${file}`).isDirectory();
        });
        return folders;
    }
    catch (error) {
        console.error('Error reading directory:', error);
        return [];
    }
}
exports.getFoldersInDirectory = getFoldersInDirectory;
/**
 * 获取文件夹下的所有文件
 * @param dirPath
 * @returns
 */
function getAllFilesInFolder(dirPath) {
    // 读取指定路径下的所有文件和文件夹
    const files = fs_1.default.readdirSync(dirPath);
    let allFiles = [];
    // 遍历所有文件和文件夹
    files.forEach(file => {
        // 获取文件或文件夹的完整路径
        const filePath = path_1.default.join(dirPath, file);
        // 判断是否为文件
        if (fs_1.default.statSync(filePath).isFile()) {
            allFiles.push({
                filePath,
                file,
            });
        }
        // 如果是文件夹，则递归调用函数获取文件夹下的所有文件
        else {
            const subDirFiles = getAllFilesInFolder(filePath);
            allFiles = allFiles.concat(subDirFiles);
        }
    });
    return allFiles;
}
exports.getAllFilesInFolder = getAllFilesInFolder;
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
function getValue(props) {
    let uValue = '-';
    try {
        const { data, field } = props;
        switch (true) {
            case field.format && isFunction(field.format):
                uValue = field.format(data, field);
                break;
            case !!field.valueFormat:
                uValue = getDictValue(field.valueFormat, get(data, field.key, '-'));
                break;
            case !!field.parseTime:
                uValue = get(data, field.key, '') ? parseTime(new Date(get(data, field.key, '')), field.parseTime) : '-';
                break;
            case isArray(field.key):
                uValue = field.key.map((item) => get(data, item, '-')).join(field.split || ' - ');
                break;
            default:
                uValue = get(data, field.key, '-') + (field.unit || '');
                break;
        }
        if (field.unit) {
            // uValue = uValue + field.unit
        }
    }
    catch (error) {
    }
    return uValue;
}
function transformTableData(fields, data) {
    const needTransField = fields.filter((field) => {
        return field;
    });
    needTransField.forEach((field) => {
        const { transform, key, unit } = field;
        let tKey = '';
        try {
            tKey = key.split('_')[0];
        }
        catch (error) {
            console.log(error);
        }
        // 目前就判断下是否为时间、字典
        let type = '';
        try {
            if (typeof transform === 'function') {
                type = 'function';
            }
            if (transform.indexOf('x') > -1 || (transform.indexOf('{') > -1 && transform.indexOf('}') > -1)) {
                type = 'time';
            }
            if (transform.indexOf('.') > -1) {
                type = 'dict';
            }
        }
        catch (error) {
        }
        data.map((e) => {
            var _a;
            switch (type) {
                case 'time':
                    e[key] = parseTime(new Date(e[tKey]), transform) + (unit || '');
                    break;
                case 'dict':
                    e[key] = getDictValue(transform, e[tKey]) + (unit || '');
                    break;
                case 'function':
                    e[key] = transform(e[key]);
                default:
                    e[key] = (_a = e[key]) !== null && _a !== void 0 ? _a : '-' + (unit || '');
                    break;
            }
            if (unit) {
                e[key] = e[key];
            }
            return e;
        });
    });
    return data;
}
exports.transformTableData = transformTableData;
// 字典值转换
function getDictValue(target, value, valueKey) {
    var _a, _b;
    value = +value;
    if (!value && !String(value))
        return value;
    return ((_b = (_a = store.getters.dictDataOnly(target)) === null || _a === void 0 ? void 0 : _a.find((dict) => +dict[valueKey || 'id'] === value)) === null || _b === void 0 ? void 0 : _b.name) || value;
}
exports.getDictValue = getDictValue;
function scrollToElement(containerId, title) {
    const container = document.getElementById(containerId);
    const element = document.getElementById(title);
    if (container && element) {
        container.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
        });
    }
    else {
        console.log('没有找到容器或匹配的元素');
    }
}
