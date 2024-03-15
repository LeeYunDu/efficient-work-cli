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
