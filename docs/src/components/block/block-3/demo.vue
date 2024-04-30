<template>
  <Block :data="data" :fields="fields" > </Block>
</template>
<script lang="ts" setup>
import { ref} from 'vue'
import Block from './block-3.vue'
let  data = ref([
  {x1:'应用名称1',content:'一行文字简要概述'},
  {x1:'应用名称2',content:'一行文字简要概述'},
  {x1:'应用名称3',content:'一行文字简要概述'},
])
</script>