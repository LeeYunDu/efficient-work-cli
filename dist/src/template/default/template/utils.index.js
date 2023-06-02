"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformValue = exports.transformTableData = exports.getDictValue = exports.exportExcelByJson = void 0;
// xlsx 下载
const exportExcelByJson = function (data, fileName) {
    if (!isArray(data))
        return;
    const excelBook = XLSX.utils.book_new();
    const excelSheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(excelBook, excelSheet, 'sheet1');
    XLSX.writeFile(excelBook, fileName);
};
exports.exportExcelByJson = exportExcelByJson;
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
        const { transform, key } = field;
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
            switch (type) {
                case 'time':
                    e[key] = parseTime(e[tKey], transform);
                    console.log(e[key], 'e[key]');
                    break;
                case 'dict':
                    e[key] = getDictValue(transform, e[tKey]);
                    break;
                default:
                    break;
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
