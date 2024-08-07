<template>
  <div class="title-1">标题1</div>
  <div class="title-2">标题1</div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
  .title-1 {
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


  .title-2 {
      font-family: DingTalkSans,DingTalkJinBuTi;
      font-weight: normal;
      font-size: 18px;
      color: #191919;
      position: relative;
      height: 36px;
      background: #EBF8FF;
      line-height: 36px;
      width: 100%;
      padding-left: 22px;
      margin-bottom: 20px;
      &::after {
        content: '';
        opacity: 1;
        background: rgba(255, 255, 255, 0.72);
        position: absolute;
        left: 12px;
        top: 50%;
        margin-top: -5px;
        width: 4px;
        height: 14px;
        background: linear-gradient(#1b5dfe 0%, rgba(168, 253, 255, 0.15) 100%);
      }
    }

</style>
