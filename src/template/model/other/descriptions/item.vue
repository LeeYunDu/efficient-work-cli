<template>
  <div
    class="descriptions-item"
  >
    <div class="descriptions-label">{{ field.label }}</div>
    <div class="descriptions-value">
      <template v-if="field.fieldType=='file'">
        暂无文件
      </template>
      <template v-else-if="field.type=='text'">
        <span v-html="getValue()"></span>
      </template>
      <template v-else-if="field.slot">
        <slot></slot>
      </template>
      <template v-else>
        {{ getValue() }}
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, inject, PropType } from 'vue'
import { getDictValue,isArray,isFunction,parseTime } from '@/utils'
import { get } from 'lodash-es'

let props = defineProps({
  data:{
    type:Object,
    default:()=>({})
  },
  field:{
    type:Object as PropType<any>,
    default:()=>{}
  },
  labelWidth:{
    type:Number,
    default:0
  }

})

let parentProps:any = inject('props')

let cLabelWidth = computed(()=>{
  return props.labelWidth + 'px'
})

let cColumn = computed(()=>{
  let width = (100 / parentProps.column) * (Number(props.field.span)||1)
  width = width>100?100:width
  return width + '%'
})

const fileType = [
  { label:'集体决策意见',key:'jtjcFile' },
  { label:'其他文件',key:'otherFile' },
  { label:'合法性审查意见',key:'hfxFile' },
  { label:'公平竞争审查意见',key:'gpjzFile' },
  { label:'协议关键文本',key:'xygjFile' },
]

function getValue () {
  let uValue: any = '-'
  try {
    const { data, field } = props
    switch (true) {
      case field.format && isFunction(field.format):
        uValue = field.format(data, field)
        break
      case !!field.valueFormat:
        uValue = getDictValue(field.valueFormat, get(data, field.key, '-'))
        break
      case !!field.parseTime:
        uValue = get(data, field.key, '')?parseTime(new Date(get(data, field.key, '')), field.parseTime):'-'
        break
      case isArray(field.key):
        uValue = field.key.map((item: string) => get(data, item, '-')).join(field.split || ' - ')
        break
      default:
        uValue = get(data, field.key, '-') + (field.unit || '')
        break
    }
    if(field.unit){
    // uValue = uValue + field.unit
    }
  } catch (error) {

  }



  return uValue
}

</script>
<style lang="scss" scoped>
$descriptions-padding:10px 20px;
.descriptions-item{
  display: flex;
  min-width: v-bind(cColumn);

  &:last-child{
    flex: 1;
  }
  // width: #{100 / $column};
  .descriptions-label{
    width:v-bind(cLabelWidth);
    padding: $descriptions-padding;
    box-sizing: border-box;
    color:rgba(159, 210, 250, 1);
    font-size: 16px;
  }

  .descriptions-value{
    flex: 1;
    padding:$descriptions-padding;
    display: flex;
    align-items: center;
  }
}
</style>
