<template>
  <RollList :data="data" height="100px" :scroll="true">
    <div>数据1</div>
    <div>数据2</div>
    <div>数据3</div>
    <div>数据4</div>
    <div>数据5</div>
  </RollList>
</template>
<script lang="ts" setup>
import { ref} from 'vue'
import RollList from './rollList.vue'
let  data = ref([
  {x1:'杭州市',y1:'1'},
  {x1:'温州市',y1:'2'},
  {x1:'金华市',y1:'3'},
  {x1:'昆明市',y1:'4'},
  {x1:'绍兴市',y1:'5'},
])
</script>