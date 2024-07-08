<template>
  <div class="view-component">
    <el-button>测试</el-button>
    <JSONEdit :code="code"></JSONEdit>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus'
// import JSONEdit from './JSONEdit/index.vue'
let props = defineProps({
  data:{
    type:Array,
    default:()=>[]
  },
  group: {
    type: Object,
    default: () => ({})
  },
  fields:{
    type:Array,default:()=>{[]}
  }
})

let state = reactive({
  data:[],
  show:false
})


let code = ref([
    12,'ae',()=>{
      console.log(123)
    },
    function test3(){
      console.log(4)
    },
    [
      function test4(){

      },
      5
    ],
    {
      a:()=>{
        console.log(5);
        
      },
      b:function (){

      }
    },
    test
  ])
let code2 = ref({
  name:123,
  testFn:function (){
    console.log(5)
  },
  jiantouFn :(params)=>{

  },
  obj:{
    age:1,
    name:'123',
    test:()=>{
      console.log(5)
    },
    test2:{
      name:123,
      aa:function(){
        console.log(5);
        
      },
      bb:test
    }
  },
  array:[
    12,'ae',()=>{
      console.log(123)
    },
    function test3(){
      console.log(4)
    },
    [
      function test4(){

      },
      123
    ],
    {
      a:()=>{
        console.log(5);
        
      },
      b:function (){

      }
    },
    test
  ]
})

function test(){
  console.log(5);
  
}
const curParams:any = ref({
  pageNum: 1,
  pageSize: 10
})

const asyncData = async () => {
  const params: any = Object.assign({},  curParams.value || {})
  // const {status, success, msg, data } = await apiName(params)
  const  {status, success, msg, data } = {status:200, success:true,msg:'',data:{
    list:new Array(10).fill({
      name:'mock'
    }),total:10
  } }
  if (!(status===200)) return ElMessage.error(msg)
  state.data= data.list
}

asyncData()
</script>

<style lang="scss" scoped>
 
</style>
