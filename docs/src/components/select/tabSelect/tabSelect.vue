<template>
  <div class="tabs-component">
    <el-tabs v-bind="$attrs"  class="demo-tabs">
      <template v-for="(item,index) in useOptions" :key="index">
        <el-tab-pane :label="get(item,tabProps.label)" :name="get(item,tabProps.value)" v-bind="get(item,'props',{})" >
          <template #label>
            <template v-if="components.includes('icon')">
              <el-icon size="16"> <Document /> </el-icon>
              <!-- <img :src="metaFilePath(item.icon)" alt=""> -->
            </template>
            <span class="tab-label">{{ get(item,tabProps.label) }}</span>
            <span class="tab-value" v-if="components.includes('value')">（{{ get(data,tabProps.dataKey,0) }}）</span>
          </template>
          </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { computed , defineProps  } from 'vue'
import { useStore } from 'vuex'
import { isArray , isString , get } from 'lodash-es'
import { Document } from '@element-plus/icons-vue'
import {  ElTabs, ElTabPane , ElIcon} from 'element-plus'  
import 'element-plus/theme-chalk/index.css'
let props = defineProps({
  data:{
    type:Object,
    default:()=>({})
  },
  options:{
    type:Array,
    default:()=>[]
  },
  tabProps:{
    type:Object,
    default:()=>({
      label:'label',
      value:'value',
      dataKey:'count',
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

</script>

<style lang="scss" scoped>
.tabs-component{
  ::v-deep(.el-tabs){
    height: 100%;
    .el-tabs__header{
      margin-bottom: 0px!important;
      height: 100%;
      .el-tabs__nav-wrap{
        height: 100%;
      }
    }
    .el-tabs__item{
      min-width: 120px;
      height: 52px;
      font-size: 16px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #363A44;
      
      .el-icon{
        width: 16px;
        margin-right: 6px;
      }

      &.is-active{
        font-size: 16px;
        font-family: Source Han Sans CN-Bold, Source Han Sans CN;
        font-weight: bold;
        color: #0366F1;
      }
    }
  }
}

</style>
