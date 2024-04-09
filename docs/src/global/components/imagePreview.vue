<template>
  <div class="">
    <viewer :images="data" class="flex">
      <template v-for="(item,index) in data" :key="index">
        <img
          class="cover-image"
          :src="item"
        >
      </template>
    </viewer>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
let props = defineProps({
  data:{
    type:Array,
    default:()=>[]
  },
})
</script>

<style lang="scss" scoped>
 
</style>
