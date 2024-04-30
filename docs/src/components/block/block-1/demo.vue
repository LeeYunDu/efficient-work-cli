<template>
  <Block :data="data" :fields="fields" > </Block>
</template>
<script lang="ts" setup>
import { ref} from 'vue'
import Block from './block-1.vue'
let  data = ref({y1:'1',y2:'2',y3:'3'})
let fields = ref([
  {label:'字段1',key:'y1',unit:'个'},
  {label:'字段2',key:'y2',unit:'个'},
  {label:'字段3',key:'y3',unit:'个'},
])
</script>