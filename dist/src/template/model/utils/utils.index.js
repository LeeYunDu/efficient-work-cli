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
exports.getImage = exports.exportExcelByJson = exports.transformValue = exports.transformTableData = exports.getDictValue = exports.parseTime = void 0;
const lodash_es_1 = require("lodash-es");
function getValue(data, field) {
    let uValue = '-';
    try {
        switch (true) {
            case field.format && (0, lodash_es_1.isFunction)(field.format):
                uValue = field.format(data, field);
                break;
            case !!field.valueFormat:
                uValue = getDictValue(field.valueFormat, (0, lodash_es_1.get)(data, field.key, '-'));
                break;
            case !!field.parseTime:
                uValue = (0, lodash_es_1.get)(data, field.key, '') ? parseTime(new Date((0, lodash_es_1.get)(data, field.key, '')), field.parseTime) : '-';
                break;
            case (0, lodash_es_1.isArray)(field.key):
                uValue = field.key.map((item) => (0, lodash_es_1.get)(data, item, '-')).join(field.split || ' - ');
                break;
            default:
                uValue = (0, lodash_es_1.get)(data, field.key, '-') + (field.unit || '');
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
/**
 * 时间转换
 */
function parseTime(time, cFormat) {
    if (!time) {
        return '';
    }
    if (arguments.length === 0) {
        return null;
    }
    if ((time + '').length === 10) {
        time = +time * 1000;
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time === 'object') {
        date = time;
    }
    else {
        date = new Date(parseInt(String(time)));
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key];
        if (key === 'a')
            return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
        if (result.length > 0 && value < 10) {
            value = '0' + value;
        }
        return value || 0;
    });
    return timeStr;
}
exports.parseTime = parseTime;
// 字典值转换
function getDictValue(target, value, valueKey) {
    var _a, _b;
    value = +value;
    if (!value && !String(value))
        return value;
    return ((_b = (_a = store.getters.dictDataOnly(target)) === null || _a === void 0 ? void 0 : _a.find((dict) => +dict[valueKey || 'id'] === value)) === null || _b === void 0 ? void 0 : _b.name) || value;
}
exports.getDictValue = getDictValue;
// 表格数据转化
function transformTableData(fields, data) {
    const needTransField = fields.filter((field) => {
        return field.transform;
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
        if (transform.indexOf('x') > -1 || (transform.indexOf('{') > -1 && transform.indexOf('}') > -1)) {
            type = 'time';
        }
        if (transform.indexOf('.') > -1) {
            type = 'dict';
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
// 表单数据转化
function transformValue(field, data) {
    const { type, unit, key, option = {} } = field;
    let result = '';
    const value = data[key];
    switch (type) {
        case 'time':
            if ('format' in option) {
                result = parseTime(value, option.format);
            }
            break;
        case 'dict':
            if ('format' in option) {
                result = getDictValue(option.format, value);
            }
            break;
        default:
            if (unit) {
                result = value ? value + unit : 0;
            }
            else {
                result = value;
            }
            break;
    }
    return result;
}
exports.transformValue = transformValue;
/**
 * 导出excel功能
 * 1、请求接口拿到数据
 */
function onExport() {
    return __awaiter(this, void 0, void 0, function* () {
        let { data } = yield apiName(Object.assign({}, table.value.params, {}));
        (0, exports.exportExcelByJson)(data.excelData, '项目清单.xlsx');
    });
}
/**
 *  xlsx 下载
 *  "xlsx": "^0.18.5"
 * @param data
 * @param fileName
 * @returns
 */
const exportExcelByJson = function (data, fileName) {
    if (!(0, lodash_es_1.isArray)(data))
        return;
    const excelBook = XLSX.utils.book_new();
    const excelSheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(excelBook, excelSheet, 'sheet1');
    XLSX.writeFile(excelBook, fileName);
};
exports.exportExcelByJson = exportExcelByJson;
function exportExcelByStream(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let { url, name, params } = options;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.responseType = 'arraybuffer';
        //发送合适的请求头信息
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.onload = function () {
            // 请求结束后，在此处写处理代码
            if (xhr.status === 200) {
                var blob = new Blob([xhr.response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                var url = URL.createObjectURL(blob);
                var link = document.createElement('a');
                link.href = url;
                link.download = `${name}.xlsx`;
                link.click();
            }
        };
        xhr.send(JSON.stringify(params));
    });
}
function getImage(item, key = 'pic', single = true) {
    let pic = item[key];
    if (pic) {
        let { VITE_FILE_PATH } = import.meta.env;
        try {
            let f = JSON.parse(pic);
            if (single) {
                return VITE_FILE_PATH + f[0].url;
            }
            else {
                return f.map(e => {
                    e.url = VITE_FILE_PATH + e.url;
                    return e;
                });
            }
        }
        catch (error) {
            return '';
        }
    }
    else {
        return '';
    }
}
exports.getImage = getImage;
function exportPDFByStream() {
    let params = {};
    let url = apiUrl();
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.responseType = 'arraybuffer';
    //发送合适的请求头信息
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onload = function () {
        // 请求结束后，在此处写处理代码
        if (xhr.status === 200) {
            var blob = new Blob([xhr.response], { type: 'application/pdf' });
            var url2 = URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = url2;
            window.open(url2);
            link.download = '测试用例.pdf';
            link.click();
        }
    };
    xhr.send(JSON.stringify(params));
}
