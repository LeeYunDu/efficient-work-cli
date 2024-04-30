<template>
  <RadioSelect
    v-model="active"
    :options="useOptions"
    :data="countData"
    @query="onRadioChange"
  />
</template>
<script lang="ts" setup>
import { ref} from 'vue'
import RadioSelect from './radioSelect.vue'
let active = ref(1)
let countData = ref({})
const useOptions = ref([
  {label:'选项1',value:1},
  {label:'选项2',value:2},
  {label:'选项3',value:3},
  {label:'选项4',value:4},
])
function onRadioChange(){
  // 请求数据
}
</script>