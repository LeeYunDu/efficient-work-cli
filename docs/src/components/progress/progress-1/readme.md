<script setup>
import { ref} from 'vue'
import Progress from './progress-1.vue'
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
# Progress
## 使用说明
数据统计进度占比列表 - 常用于移动端、驾驶舱项目

左侧名称,右侧数值、数值占比、数值单位

## 示例
<Progress :data="data" :fields="fields" unit="个" > </Progress>
``` vue
<template>
  <Progress :data="data" :fields="fields" unit="个" rate="true" > </Progress>
</template>
<script lang="ts" setup>
import { ref} from 'vue'
import Progress from './progress-1.vue'
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
```
## Attributes

| 属性名      | 说明        |  类型         |  默认值       | 
| :---        | :---   |   :---  |:----: |
| data   | 数据集合        | array      |—  |
| fields   | 字段      | FieldItem[]      | —  |
| unit   | 单位      | string      | —  |

## Progress 源代码

::: details 查看源代码
``` vue
<template>
  <section class="items">
    <template v-for="(item, index) in loopItems" :key="index">
      <section class="item">
        <div class="icon-box" v-if="iconMap">
          <img :src="`static/images/common/${getIcon(item)}.png`" alt>
        </div>
        <div class="progress-box">
          <section class="top">
            <section class="label">
              <span>{{ getName(item) }}</span>
            </section>
            <section class="value">
              <span>
                {{ getValue(item) }}
                <small class="unit">
                  {{ isLoopData?unit:item.unit??'' }}
                </small>
              </span>
            </section>
            <section v-if="rate" class="rate-box">
              /  {{ getProportion(item) }}%
            </section>
          </section>
          <section class="bottom">
            <div class="progress-bar-box">
              <div
                class="bar"
                :style="{ width: (getValue(item) / valueSum) * 100 + '%' }"
              ></div>
            </div>
          </section>
        </div>
      </section>
    </template>
  </section>
</template>

<script lang="ts" setup>
import { get } from 'lodash-es'
import { computed,PropType } from 'vue'
import { FieldItem } from '@/typings/items'
const props = defineProps({
  data: {
    type: Object||Array,
    default: () => []
  },
  fields:{
    type: Array as PropType<FieldItem[]>,
  },
  // 图标名称映射
  iconMap:{
    type:Object as PropType<{[x:string]:any}>
  },
  unit:{
    type:String,
    default:''
  },
  rate:{
    type:Boolean,
    default:true
  }
})

const propsData = computed(() => props.data||[])
const propsFields = computed(()=> props.fields||[
  { label:'名称',key:'name',unit:'',icon:'' },
  { label:'数值',key:'value',unit:'',icon:'' },
])

const isLoopData = computed(()=>Array.isArray(propsData.value))

const loopItems = computed<any>(()=>{
  // 待开发 sort 排序
  return Array.isArray(propsData.value)?propsData.value:propsFields.value
})

function getName (item){
  if(isLoopData.value){
    return  get(item,get(props.fields,'0.key',''),0) 
  }else{
    return get(propsData,item.key)
  }
}

function getIcon (item:any){
  if(isLoopData.value){
    return props.iconMap[getName(item)]||''
  }else{
    return item.icon
  }
}

function getValue (item:any){
  if(isLoopData.value){
    return get(item,get(props.fields,'1.key',''),0) 
  }else{
    return get(propsData.value,item.key,'0')
  }
}

const  valueSum = computed(()=>{
  let sum = 0
  try {
    if(isLoopData.value){
      propsData.value.map(val=>{
        sum += Number(get(val,get(propsFields.value,'1.key',''),0))
      })
    }else{
      for (const key in propsData.value) {
        if (Object.prototype.hasOwnProperty.call(propsData.value, key)) {
          const val = propsData.value[key]
          sum += Number(get(val,get(propsFields.value,'1.key',''),0))
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
  return sum
})

// 占比
function getProportion (item:any){
  return ((getValue(item) / valueSum.value) * 100).toFixed(2)
}


</script>


<style lang="scss" scoped>
.items {
  .item {
    display: flex;
    align-items: center;
    .icon-box {
      margin-right: 8px;
      width: 38px;
      height: 38px;
    }
    .progress-bar-box {
      height: 6px;
      background: #eceff3;
      border-radius: 10px 10px 10px 10px;
      opacity: 1;
      .bar {
        height: 6px;
        background: linear-gradient(90deg, #005fee 0%, #28a0ff 100%);
        border-radius: 10px 10px 10px 10px;
        opacity: 1;
        width: 0;
      }
    }
    .progress-box {
      flex: 1;
    }
    .top {
      display: flex;
      align-items: center;
      padding: 4px 0;
      .value{
        margin-left: auto;
      }
      .rate-box{
        margin-left: 6px;
      }
    }
    & ~ .item {
      margin-top: 10px;
    }
    .unit {
      font-size: 12px;
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