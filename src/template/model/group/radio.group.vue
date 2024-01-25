<template>
  <div class="radio-box">
    <el-radio-group v-bind="$attrs" @change="onChange">
      <template v-for="(item,index) in useOptions" :key="index">
        <el-radio :label="get(item,radioProps.value)">
          <template v-if="components.includes('icon')">
            <el-icon size="16"> <Document /> </el-icon>
            <!-- <img :src="metaFilePath(item.icon)" alt=""> -->
          </template>
          <span class="label">{{ get(item,radioProps.label) }}</span>
          <div v-if="components.includes('value')" class="value-box">
            <div class="value">（{{ get(data,radioProps.dataKey,0) }}）</div>
          </div>
        </el-radio>
      </template>
    </el-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { computed , defineProps  } from 'vue'
import { useStore } from 'vuex'
import { isArray , isString , get } from 'lodash-es'
import {  ElRadio, ElRadioGroup,ElIcon } from 'element-plus'  
import { Document } from '@element-plus/icons-vue'
let props = defineProps({
  data:{
    type:Object,
    default:()=>({})
  },
  options:{
    type:Array,
    default:()=>[]
  },
  radioProps:{
    type:Object,
    default:()=>({
      label:'label',
      value:'value',
      dataKey:'count'
    })
  },
  components:{
    type:Array,
    default:()=>['value','icon']
  }
})


let store = useStore()
const useOptions = computed(()=>{
  if(isArray(props.options)){
    return props.options
  }else if(isString(props.options)){
    return store.getters.dictDataOnly(props.options)
  }else{
    return []
  }
})

function metaFilePath():any{

}

let emits = defineEmits(['query'])

function onChange (item:any){
  emits('query',item)
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
    flex-wrap: initial;
    .el-radio{
      flex: 1;
      display: flex;
      margin-right: 0;
      &~.el-radio{
        margin-left: 10px;
      }
      &.is-checked{
        .el-icon{
          width: 16px;
        }
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
    .el-icon{
      width: 16px;
      margin-right: 6px;
    }
    .el-radio__inner{
      display: none;
    }
    .el-radio__original{
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
