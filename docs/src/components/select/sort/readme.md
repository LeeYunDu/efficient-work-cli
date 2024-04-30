

<script setup>

</script>
# Sort

排序单组件,依赖了element-plus组件的上下箭头样式,可自行修改。

常用于移动端和PC端列表排序。

## 示例

:::preview 

demo-preview=./demo.vue

:::

## 源码

``` vue
<template>
  <div class="item-component sort-box">
    <template v-for="(item, index) in sortItem" :key="index">
      <div class="sort" @click="changeSort(item.key)">
        <span class="sort-text">{{ item.label }}</span>
        <template v-if="item.key !== 'default'">
          <span class="sort-icon">
            <i class="el-icon-caret-top" :class="{active: sortParms[item.key] === '+'}"></i>
            <i class="el-icon-caret-dowm" :class="{active: sortParms[item.key] === '-'}"></i>
          </span>
        </template>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { PropType, ref } from 'vue'
defineProps({
  sortItem: { type: Array as PropType<any[]>, default: () => ([]) }
})

const emits = defineEmits(['handleSearch'])
const sortParms: any = ref({})

function changeSort (key: string) {
  if (key === 'default') {
    sortParms.value = {}
  } else {
    sortParms.value[key] = !sortParms.value[key] ? '-' : (sortParms.value[key] === '-' ? '+' : '')
  }

  emits('handleSearch', {
    sort:sortParms.value[key]&&`${key}${sortParms.value[key]}`
  })
}

</script>

<style lang="scss" scoped>
.sort-box {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: rgba(106, 121, 137, 1);

  background: #FFFFFF;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  .sort {
    position: relative;
    justify-content: center;
    flex: 1;
    display: flex;
    align-items: center;
    margin-right: 20px;
    cursor: pointer;

    &~.sort{
      &::after{
        content: '';
        height: 7px;
        width: 1px;
        opacity: 1;
        background: #B0B7C3;
        left: 0%;
        position: absolute;
      }
    }

    .sort-icon {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 5px;

      i {
        height: 8px;
        line-height: 8px;
        color: #999;
        font-size: 14px;
        opacity: .2;

        &.active {
          opacity: 1;
        }

        &~i{
          margin-top: 4px;
        }
      }

      .el-icon-caret-top{
        width: 0;
        height: 0;
        border: 4px solid;
        border-color:  transparent transparent rgba(3, 102, 241, 1) transparent;
      }
      .el-icon-caret-dowm{
        width: 0;
        height: 0;
        border: 4px solid;
        border-color: rgba(3, 102, 241, 1) transparent transparent transparent;
      }
    }
  }
}


</style>


```

## Attributes

| 属性名      | 说明        |  类型         |  默认值       | 
| :---        | :---   |   :---  |:----: |
| sortItem   | 选项集合| SortItem []      | []   |

## SortItem Props

| 属性名      | 说明        |  类型         |  默认值       | 
| :---        | :---   |   :---  |:----: |
| label   | 名称       | string   |	- |
| key   | key值       | string   |	- |

## Eventss

| 事件名称      | 说明        |  类型         |  默认值       | 
| :---        | :---   |   :---  |:----: |
| handleSearch   | 	当sort值变化时触发的事件       | Function   |	- |

## TabSelect 源代码
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