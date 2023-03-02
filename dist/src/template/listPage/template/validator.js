"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUrl = exports.checkIdCard = exports.checkMobile = void 0;
// 验证手机号
function checkMobile(rule, value, cb) {
    const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
    if (!value)
        return cb(new Error('请输入手机号'));
    if (reg.test(value))
        return cb();
    cb(new Error('请输入正确的手机号'));
}
exports.checkMobile = checkMobile;
// 验证身份证
function checkIdCard(rule, value, cb) {
    const reg = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/;
    if (!value)
        return cb(new Error('请输入身份证号'));
    if (reg.test(value))
        return cb();
    cb(new Error('请输入正确的身份证号'));
}
exports.checkIdCard = checkIdCard;
// 验证url
function checkUrl(rule, value, cb) {
    const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    if (!value)
        return cb(new Error('请输入链接'));
    if (reg.test(value))
        return cb();
    cb(new Error('请输入正确的URL链接'));
}
exports.checkUrl = checkUrl;
