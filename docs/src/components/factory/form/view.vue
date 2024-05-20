<template>
  <el-button @click="state.showDesignPanel = true">设计模式</el-button>
  <designPanel v-model="state.showDesignPanel" v-bind="$attrs" />
</template>


<script lang="ts" setup>
import { reactive } from 'vue'
import designPanel from './design.panel.vue'


let state = reactive({
  showDesignPanel: false
})
</script>

<style lang="scss" scoped>
::v-deep(.form-title) {
  font-size: 18px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #282F2C;
  position: relative;
  margin-bottom: 10px;
  padding-left: 10px;

  &::after {
    content: '';
    width: 4px;
    height: 12px;
    background: #0366F1;
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
    position: absolute;
    left: 0px;
    top: 50%;
    margin-top: -5px;
  }
}
</style>
