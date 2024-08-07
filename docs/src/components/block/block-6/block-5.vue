<template>
  <div class="info-panel-component">
    <div class="block-name">{{ title }}</div>
    <div class="info-list">
      <template v-for="(item, index) in fields" :key="index">
        <div class="info-item" v-bind="item.props">
          <div class="label">{{ item.label }}</div>
          <div class="value">数值</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

let props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  fields: {
    type: Array,
    default: () => {
      ;[]
    }
  },
  title: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.info-panel-component {
  padding: 20px 16px;
  flex: 1;
  background: linear-gradient(180deg, #f1f9ff 0%, #ffffff 100%);
  border-radius: 4px;
  border: 1px solid #eeeeee;
  .block-name {
    font-weight: normal;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.9);
    line-height: 14px;
    position: relative;
    margin-bottom: 24px;
    z-index: 1;
    font-family: DingTalk, DingTalkJinBuTi;
    font-weight: normal;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.9);
    line-height: 14px;
    &::after {
      content: '';
      width: 48px;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 6px;
      z-index: -1;
      background: linear-gradient(#1b5dfe 0%, rgba(168, 253, 255, 0.15) 100%);
    }
  }

  .info-list {
    display: flex;
    flex-wrap: wrap;
    .info-item {
      flex: 0 0 50%;
      display: flex;
      height: 20px;
      align-items: center;
      margin-bottom: 14px;
    }
    .label {
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 14px;
      color: #676767;
    }
    .value {
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 14px;
      color: #191919;
    }
  }
  & ~ .info-panel-component {
    // margin-left: 24px;
  }
}
</style>
