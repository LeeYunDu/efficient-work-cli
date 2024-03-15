

<script setup>
</script>
# Regular
## 使用说明
浙里办上架 - 数据脱敏
## 脱敏集合


``` ts
// 联系方式的脱敏 - 包含了固定电话和手机号码
function desensitizeLinkWay (phoneNumber) {
  try {
    // 判断是否为合法的手机号码或电话号码
    if (!/^1[0-9]{10}$|^(\d{3,4}-)?\d{7,8}$/.test(phoneNumber)) {
      console.error('Invalid phone number')
      return phoneNumber
    }
    // 进行脱敏处理
    if (/^1[0-9]{10}$/.test(phoneNumber)) {
      // 手机号码
      return phoneNumber.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
    } else {
      // 固定电话号码
      return phoneNumber.replace(/^(\d{3,4}-)?\d{4}(\d{4})$/, '$1****$2')
    }
  } catch (error) {
    console.log(error)
  }
}
// 手机号脱敏,规则：显示前 3 位+****+后 4 位。如：137****9050
export function desensitizePhone (number) {
  if (number) {
    return number.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
  } else {
    return number
  }
}

// 姓名脱敏，规则：隐藏姓名中的第一个字，如为英文等其他语种，也是隐藏第一个字母。如：*大友、*安、*ahn（单位名称无需做脱敏处理）
export function desensitizeName (name) {
  if (name) {
    if (name.length <= 1) {
      return name
    } else {
      return '*' + name.substring(1)
    }
  }
}

// 其他数据脱敏，规则：显示前 1/3 和后 1/3 段字节，其他用*号代替。
function desensitizeCreditCode (creditCode) {
  if (creditCode.length <= 6) {
    return creditCode[0] + '*'.repeat(creditCode.length - 2) + creditCode.slice(-1)
  } else {
    return creditCode.slice(0, (creditCode.length / 3)) + '*'.repeat(creditCode.length - (creditCode.length / 3)) + creditCode.slice(-(creditCode.length / 3))
  }
}

```


## maskPhoneNumber 组件源码

点击Icon，切换是否显示电话号码

``` vue
<template>
  <span class="">
    {{ show?value:maskPhoneNumber(value) }}
    <img
      class="icon"
      src="static/images/common/icon-view.png"
      alt=""
      @click="show = !show "
    >
  </span>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
defineProps({
  value: {
    type: String,
    default: ''
  }
})
let show = ref(false)
function maskPhoneNumber (phoneNumber) {
  try {
    // 判断是否为合法的手机号码或电话号码
    if (!/^1[0-9]{10}$|^(\d{3,4}-)?\d{7,8}$/.test(phoneNumber)) {
      console.error('Invalid phone number')
      return phoneNumber
    }
    // 进行脱敏处理
    if (/^1[0-9]{10}$/.test(phoneNumber)) {
      // 手机号码
      return phoneNumber.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
    } else {
      // 固定电话号码
      return phoneNumber.replace(/^(\d{3,4}-)?\d{4}(\d{4})$/, '$1****$2')
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="scss" scoped>
.icon{
  width: 16px;
  height: 16px;
  margin-left: 10px;
  cursor: pointer;
  position: relative;
  top: 4px;
}
</style>


```

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>