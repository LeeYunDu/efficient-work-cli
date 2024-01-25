

<script setup>
import { ref} from 'vue'
import TabGroup from '../../src/template/model/group/tab.group.vue'
let active = ref(1)
let countData = ref({})
const useOptions = ref([
  {label:'选项1',value:1},
  {label:'选项2',value:2},
  {label:'选项3',value:3},
  {label:'选项4',value:4},
])
function onRadioChange(){

}
</script>
# TabGroup
基于element-plus el-tabs 封装
## 使用说明
常用于列表上方的类型统计组件。当值发生变化时请求数据。

功能介绍

1. 双向绑定
2. el-tabs 样式调整

## 示例

当前选中： {{active}}

<TabGroup
  v-model="active"
  :options="useOptions"
  :data="countData"
  @query="onRadioChange"
/>



``` vue
<template>
  <TabGroup
    v-model="active"
    :options="useOptions"
    :data="countData"
    @query="onRadioChange"
  />
</template>
<script lang="ts" setup>
import { ref} from 'vue'
import TabGroup from './radio.group.vue'
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
```
## Attributes

| 属性名      | 说明        |  类型         |  默认值       | 
| :---        | :---   |   :---  |:----: |
| data   | 统计值数据的集合        | object      |—  |
| options   | 选项集合,支持数组或字典        | array/string      | []  /  1.list  |
| tabProps   | 查看下方  <span style="color:blue;">tabProps</span>  配置        | object      | —  |
| components   | 组件展示类型   | Array[icon/value]      | ['value','icon']  |

## tabProps

| 属性名      | 说明        |  类型         |  默认值       | 
| :---        | :---   |   :---  |:----: |
| label   | 名称取值       | string   |	'label' |
| value   | 双向绑定值的key值       | string   |	'value' |
| dataKey   | 数据统计值的key值       | string   |	'count' |

## TabGroup 源代码
::: details 查看源代码

``` vue
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


``` 


:::

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>