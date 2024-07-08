<template>
  <div class="view-component">
    <h3>加载字段示例</h3>
    <template v-for="(item,index) in mockData" :key="index">
      <el-button type="primary"  @click="onAction(item)">{{ item.label }}</el-button>
    </template>
    <h3>使用工具</h3>
    <template v-for="(item,index) in actionItems" :key="index">
      <el-button type="primary"  @click="onAction(item)">{{ item.label }}</el-button>
    </template>
    <JSONEdit :code="code" ref="jsonRef"></JSONEdit>
    <template v-for="(item,index) in actionItems" :key="index">
      <el-button type="primary"  @click="onAction(item)">{{ item.label }}</el-button>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus'
import JSONEdit from './JSONEdit/index.vue'
import { mockFields,tableFields,formFields } from './mock'


let state = reactive({
  data:[],
  show:false
})



let mockData = [
  {label:'信息字段',key:'info'},
  {label:'表格字段',key:'table'},
  {label:'表单字段',key:'form'},
]


const actionItems = [
  { label:'清空',key:'clear' },
  { label:'转化',key:'transform' },
]

let code = ref<any>(formFields)
let jsonRef = ref()

function onAction (item){
  let { key } = item
  switch (key) {
    case 'info':
      code.value = mockFields
      
      break
    case 'table':
      code.value = tableFields
      break
    case 'form':
      code.value = formFields
      break
    case 'transform':
      
      let { stringifyCode ,handleResult} = jsonRef.value.getData()
      code.value  = handleResult
      break
    case 'clear':
      code.value = []
      break
    default:
      break
  }

  setTimeout(()=>{
    jsonRef.value.init()
  })
}

let code3 = ref([
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
