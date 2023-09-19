<template>
  <div class="title-box">
    <span class="header-title" >标题</span>
    <span class="header-shadow" >标题</span>
  </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue';

</script>
<style lang="scss" scoped>
.title-box {
  position: relative;
  z-index: 2;
  .header-title,
  .header-shadow {
    font-size: 34px;
    font-weight: 600;
    position: relative;
    font-family: DOUYU-常规体, DOUYU;

  }

  .header-title {
    display: inline-block;
    background: linear-gradient(180deg, #FFFFFF 0%, #88C6FF 100%);;
    color: transparent;
    font-weight: bold;
    -webkit-background-clip: text;
  }
  .header-shadow {
    display: inline-block;
    position: absolute;
    text-align: center;
    color: transparent;
    left: 0;
    z-index: -1;
    text-shadow: 0px 6px 14px #3177FF;
  }
}
</style>