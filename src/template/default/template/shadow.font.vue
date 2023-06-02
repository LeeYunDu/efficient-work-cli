<template>
  <div class="title-box">
    <span class="header-title" :text="state.title">{{ state.title }}</span>
    <span class="header-shadow" :text="state.title">{{ state.title }}</span>
  </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue';
let state = ref({
  title: '标题'
})

</script>
<style lang="scss" scoped>
.title-box {
  position: relative;
  z-index: 2;
  .header-title,
  .header-shadow {
    font-size: 16px;
    font-weight: 600;
    position: relative;
  }

  .header-title {
    display: inline-block;
    background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
    color: transparent;
    font-size: 16px;
    font-family: D-DIN-DIN-Bold, D-DIN-DIN;
    font-weight: bold;
    -webkit-background-clip: text;
    text-shadow: 0px 2px 4px rgba(60, 114, 250, 0.37);
  }
  .header-shadow {
    display: inline-block;
    position: absolute;
    text-align: center;
    right: 0;
    color: transparent;
    z-index: -1;
    text-shadow: 0px 2px 4px rgba(60, 114, 250, 0.37);
  }
}
</style>