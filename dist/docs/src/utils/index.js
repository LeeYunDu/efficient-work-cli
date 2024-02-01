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
exports.scrollReset = exports.goParentLogin = exports.resizeWindow = exports.metaFilePath = exports.getLngLat = exports.getImage = exports.exportExcelByJson = exports.transformValue = exports.transformTableData = exports.getDictValue = exports.parseTime = exports.getValue = void 0;
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
            case (0, lodash_es_1.isArray)(field.key):
                uValue = field.key.map((item) => {
                    if (field.parseTime && (0, lodash_es_1.get)(data, item, '')) {
                        return parseTime(new Date((0, lodash_es_1.get)(data, item, '')), field.parseTime);
                    }
                    else {
                        return (0, lodash_es_1.get)(data, item, '-');
                    }
                }).join(field.split || '-');
                break;
            case !!field.parseTime:
                uValue = (0, lodash_es_1.get)(data, field.key, '') ? parseTime(new Date((0, lodash_es_1.get)(data, field.key, '')), field.parseTime) : '-';
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
exports.getValue = getValue;
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
        let type = '';
        switch (true) {
            case (0, lodash_es_1.isFunction)(transform):
                type = 'function';
                break;
            case (transform.indexOf('x') > -1 || (transform.indexOf('{') > -1 && transform.indexOf('}') > -1)):
                type = 'time';
                break;
            case ((transform.indexOf('.list') > -1) || transform.indexOf('.tree') > -1):
                type = 'dict';
                break;
        }
        data.map((e) => {
            switch (type) {
                case 'time':
                    e[key] = parseTime(new Date((0, lodash_es_1.get)(e, key, '')), transform) + (unit || '');
                    break;
                case 'dict':
                    if (key.indexOf('Name') > -1 && key.indexOf('chooseType') > -1) {
                        const valueKey = key.slice(0, key.indexOf('Name'));
                        e[key] = getDictValue(transform, (0, lodash_es_1.get)(e, valueKey, '')) + (unit || '');
                    }
                    else {
                        e[key] = getDictValue(transform, (0, lodash_es_1.get)(e, key, '')) + (unit || '');
                    }
                    break;
                case 'function':
                    e[key] = transform((0, lodash_es_1.get)(e, key, ''), e);
                default:
                    e[key] = (0, lodash_es_1.get)(e, key, '') + (unit || '');
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
// 输入地址获取地图上的经纬度
function getLngLat(address) {
    return new Promise((resolve, reject) => {
        if (address.indexOf('|' !== -1)) {
            address = address.split('|')[0];
        }
        AMap.plugin('AMap.Geocoder', function () {
            const geocoder = new AMap.Geocoder({
                apiKey: '4de45b8fff6ae93a940c6e813092045f',
                city: '杭州' // 城市设为杭州，默认：“全国”
            });
            geocoder.getLocation(address, (status, result) => {
                if (status === 'complete' && result.geocodes.length) {
                    const lnglat = result.geocodes[0].location;
                    resolve(lnglat);
                }
            });
        });
    });
}
exports.getLngLat = getLngLat;
/**
 * 图片获取
 * @param name
 * @param isNode // 是否前端node文件库的形式加载
 * @returns
 */
function metaFilePath(path, isNode = false, aFid) {
    // let { VITE_ENV, VITE_SERVER_PREFIX } = import.meta.env
    // return `${VITE_ENV == 'irs' ? VITE_SERVER_PREFIX : ''}/node-szzt/file/download/${name}`
    const fid = aFid || config.project.meta.folders[0];
    /**
     * 几百KB或者几M的图片就放到node上去处理
     */
    if (isNode) {
        // return `/node-szzt/file/download/projectId/${path}`
        return `${ApiProxy.node.main}/file/download/${fid}/${name}`;
    }
    else {
        return new URL('@static/images/', import.meta.url) + '/' + path;
    }
    /**
     *
     *   SCSS 动态引入图片写法
     *   src: url(#{$node-path}/file/download/2147/SourceHanSansSC.otf)
     *   动态写法还需要在vite.config 下关于scss的配置，添加 $node-path 变量
     *   preprocessorOptions.scss下添加以下代码
     *   $node-path: '${process.env.VITE_BUILD_ENV == 'isr' ? 'https://lqt.linan.gov.cn:18570/node-szzt' : '/node-szzt'}';
     *
     *
     *   SCSS 静态引入前端文件库资源写法
     *   src: url('/node-szzt/file/download/2147/D-DIN.otf'),
     */
}
exports.metaFilePath = metaFilePath;
// iframe 父级
function addMessageListner() {
    window.addEventListener('message', (t) => {
        var _a;
        if (t.data && typeof t.data !== 'object') {
            let e = {};
            try {
                e = JSON.parse(t.data);
            }
            catch (t) {
                return;
            }
            switch (String(e.func)) {
                case 'location':
                    resizeIframe('calc(100vh - 100px)');
                    window.scrollTo(0, 0);
                    sessionStorage.setItem('iframePath', delSsoSessionId(String(e.params.path)));
                    break;
                case 'login':
                    loginVisible.value = true;
                    break;
                case 'resize':
                    resizeIframe((_a = e.params) === null || _a === void 0 ? void 0 : _a.height);
                    break;
                default:
                    break;
            }
        }
    });
}
function resizeIframe(height) {
    return __awaiter(this, void 0, void 0, function* () {
        const docIframe = document.getElementById('activity-iframe');
        if (!docIframe)
            return;
        docIframe.style.height = typeof height === 'number' ? `${height}px` : height;
    });
}
// 嵌套的iframe
function resizeWindow(height) {
    const options = JSON.stringify({
        func: 'resize',
        params: { height: height + 80 }
    });
    window.parent.postMessage(options, '*');
    if (1 > 2) {
        // 这块代码迁移到 layout/main 下
        function initMainHeightObserver() {
            const targetNode = document.getElementById('layout-main');
            const observer = new MutationObserver((mutation) => {
                setTimeout(() => {
                    const dom = last(mutation);
                    resizeWindow(targetNode === null || targetNode === void 0 ? void 0 : targetNode.scrollHeight);
                }, 500);
            });
            var config = {
                characterData: true,
                attributes: true,
                childList: true,
                subtree: true
            };
            observer.observe(targetNode, config);
        }
        onMounted(() => {
            initMainHeightObserver();
        });
    }
}
exports.resizeWindow = resizeWindow;
function goParentLogin() {
    const options = JSON.stringify({
        func: 'login',
        params: { userType: 2 }
    });
    window.parent.postMessage(options, '*');
}
exports.goParentLogin = goParentLogin;
function scrollReset(fullPath) {
    const options = JSON.stringify({
        func: 'location',
        params: { path: fullPath }
    });
    window.parent.postMessage(options, '*');
}
exports.scrollReset = scrollReset;
