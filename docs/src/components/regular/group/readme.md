

<script setup>
</script>
# Regular
## 使用说明
正则表达式集合
## Regular 源代码

``` js 
// 验证手机号
export function checkMobile (rule: any, value: any, cb: any) {
  if ('field' in rule && 'fullField' in rule) {
    value = value || rule.field
  }
  const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  if (!value) return cb(new Error('请输入手机号'))
  if (reg.test(value)) return cb()
  cb(new Error('请输入正确的手机号'))
}

// 验证固定电话
export function checkFixedMobile (rule: any, value: any, cb: any) {
  if ('field' in rule && 'fullField' in rule) {
    value = value || rule.field
  }
  const reg = /^(\d{3,4}-)?\d{7,8}$/
  if (!value) return cb(new Error('请输入正确的固定电话'))
  if (reg.test(value)) return cb()
  cb(new Error('请输入正确的固定电话'))
}

// 验证 联系方式，满足固定电话和手机号格式
export function checkLinkWay (rule: any, value: any, cb: any) {
  if ('field' in rule && 'fullField' in rule) {
    value = value || rule.field
  }
  const regPhone = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  const regFiexdPhone = /^(\d{3,4}-)?\d{7,8}$/

  if (!value) return cb(new Error('请输入正确的联系方式'))

  if (regPhone.test(value) || regFiexdPhone.test(value)) return cb()
  cb(new Error('请输入正确的联系方式'))
}



// 校验数字
export function checkNumber (rule: any, value: any, cb: any) {
  if (value === undefined) {
    value = ''
  }
  const reg = /^[0-9]\d*(\.\d+)?$/
  if (!value) return cb()
  if (reg.test(value)) return cb()
  cb(new Error('请输入数字'))
}
// 校验数字2
export function checkNumber2 (rule: any, value: any, cb: any) {
  if (value === undefined) {
    value = value || rule.field || ''
  }
  const reg = /^[0-9]\d*(\.\d+)?$/
  if (!value) return cb()
  if (reg.test(value)) return cb()
  cb(new Error('请输入数字'))
}



// 验证身份证
export function checkIdCard (rule: any, value: any, cb: any) {
  const reg = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/
  if (!value) return cb(new Error('请输入身份证号'))
  if (reg.test(value)) return cb()
  cb(new Error('请输入正确的身份证号'))
}
// 验证url
export function checkUrl (rule: any, value: any, cb: any) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  if (!value) return cb(new Error('请输入链接'))
  if (reg.test(value)) return cb()
  cb(new Error('请输入正确的URL链接'))
}
// 弱密码校验
export function checkPassword (rule: any, value: any, cb: any) {
  const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  if (!value) return cb(new Error('请输入密码长度至少为8位的包含大小写字母、数字和特殊字符（如：@、$、!、%、*、?、&）的密码'))
  if (reg.test(value)) return cb()
  cb(new Error('请输入密码长度至少为8位的包含大小写字母、数字和特殊字符（如：@、$、!、%、*、?、&）的密码'))
}


```

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>