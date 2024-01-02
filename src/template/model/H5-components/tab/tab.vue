<template>
  <div class="">
    <van-tabs v-bind="$attrs" swipe-threshold="4" @change="onChange">
      <van-tab
        v-for="(item, index) in options"
        :key="index"
        :name="item.id"
      >
        <template #title>
          {{ item.name }}({{ item.name =='全部'?get(useData,'all',0): get(useData,item.id,0) }})
        </template>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts" setup>
import { isArray,get } from 'lodash-es'
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'

let props = defineProps({
  moduleValue:{
    type:Number
  },
  data:{
    type:Object,
    default:()=>({})
  },
  fields:{
    type:Array,default:()=>{[]}
  },
  option:{
    type:String,
    default:''
  },
  hasAll:{
    type:Boolean,
    default:false
  },
  options:{
    type:Array,
    default:()=>[]
  },
  countData:{
    type:Array,
    default:()=>[]
  }

})
let store = useStore()
const statusGroup = computed(()=>{
  if(props.options.length>0)return props.options
  let  arr = store.getters.dictDataOnly(props.option)
  if(arr.length>0&&props.hasAll){
    arr.unshift({ name:'全部',label:'全部',value:'',id:'' })
  }
  return arr
})

let useData = computed(()=>{
  return props.data
  if(isArray(props.data)){
    let map:any = {}
    let count = 0
    props.data.map(e=>{
      count += Number(e.count)
      map[e.auditStatus] = e.count
    })
    map.all = count
    return map
  }else{
    return {}
  }
})

let emits = defineEmits(['query'])

function onChange (){
  emits('query')
}

</script>


<style lang="scss" scoped>
::v-deep {
  .van-tabs__nav {
    background: white;
    padding-bottom: 0px;
    margin-bottom: 12px;

  }
  .van-tab__text{
    width: 100%;
    font-size: 14px;
    font-family: Source Han Sans CN, Source Han Sans CN;
    font-weight: 400;
    color: #686B73;
    text-align: center;
    display: inline-block;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
  }
  .van-tab {
    position: relative;
    padding: 0;
    border-bottom: 1px solid #fff;
  }
  .van-tab--active {
    background: linear-gradient(180deg, #ffffff00 0%, rgba(255,255,255,0.38) 100%);
    border-bottom: none;
  }
  .van-tabs__nav--complete{
    padding-left: 0;
    padding-right: 0;
  }
  .van-tabs__line {
    background-color: #0366F1;
    // width: 186px;
    width: 40px;
    bottom: 0px;
    border-radius: 0px;

  }
  .van-tabs--line .van-tabs__wrap {
    height: auto;
  }
}
</style>
