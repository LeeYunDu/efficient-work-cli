<template>
  <div class="radio-box">
    <el-radio-group v-bind="$attrs" @change="onChange">
      <template v-for="(item,index) in statusGroup" :key="index">
        <el-radio :label="item.id">
          <template v-if="item.icon">
            <img class="nomal" :src="`static/images/common/${item.icon}.png`" alt="">
            <img class="active" :src="`static/images/common/${item.icon}-active.png`" alt="">
          </template>
          {{ item.name }}
        </el-radio>
      </template>
    </el-radio-group>
  </div>
</template>

<script lang="ts" setup>
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
  }

})

let state = reactive({
  data:[],
  show:false,
  params:{

  },
  active:''
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


let emits = defineEmits(['query'])

function onChange (){
  emits('query')
}

</script>

<style lang="scss" scoped>
 .radio-box{
  width: 100%;
  display: flex;
  margin-bottom: 4px;
  ::v-deep(.el-radio-group){
    width: 100%;
    display: flex;
    justify-content: space-between;
    overflow-x: scroll;
    flex-wrap: initial;
    .el-radio{
      flex: 1;
      min-width: 33.33%;
      margin-right: 0;
      &~.el-radio{
        margin-left: 10px;
      }
      &.is-checked{
        .el-radio__label{
          position: relative;
          background-color: rgba(3, 102, 241, 1);
          line-height: 27px;
          color: white;
          padding-left: 0px;
          padding-right: 0px;
          font-weight: 600;
          border-radius: 4px 4px 4px 4px;
          .nomal{
            display: none;
          }
          .active{
            display: inline;
          }
        }
      }
    }
    .el-radio__inner{
      display: none;
    }
    .el-radio__label{
      flex: 1;
      margin: 0;
      padding: 0 16px;
      border-radius: 19px;
      // background: rgba(247, 247, 247, 1);
      background: rgba(255, 255, 255, 1);
      border-radius: 4px 4px 4px 4px;
      font-size: 13px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      height: 28px;
      line-height: 28px;
      text-align: center;
      cursor: pointer;
      color: rgba(117, 133, 157, 1);
      display: flex;
      align-items: center;
      justify-content: center;

      .active{
        display: none;
      }
      img{
        margin-right: 4px;
      }
    }
  }
}
</style>
