<template>
  <Progress :data="data" :fields="fields" unit="个" rate="true" > </Progress>
</template>
<script lang="ts" setup>
import { ref} from 'vue'
import Progress from './progress.vue'
let  data = ref([
  {x1:'数据01',y1:'1',y2:'2'},
  {x1:'数据02',y1:'1',y2:'2'},
  {x1:'数据03',y1:'1',y2:'2'},
])
let fields = ref([
  { label:'名称',key:'x1',unit:'',icon:'' },
  { label:'数值',key:'y1',unit:'',icon:'' },
  { label:'比率',key:'y2',unit:'',icon:'' },
])

</script>