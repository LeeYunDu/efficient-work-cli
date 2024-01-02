
<template>
  <template v-if="title">
    <template v-if="state.show">
      <Teleport :to="`#${title}`">
        <div class="query-item" @click="state.showPopup=true">
          <span>{{ state.text }} {{ tip }}
          </span>
          <img src="@static/images/common/icon-down2.png" alt="">
        </div>
      </Teleport>
    </template>
  </template>
  <template v-else>
    <div class="query-item" @click="state.showPopup=true">
      <span>{{ get(state,'text','')||fields.label }}
      </span>
      <img src="@static/images/common/icon-down2.png" alt="">
    </div>
  </template>
  <Teleport to="body">
    <van-popup
      v-model:show="state.showPopup"
      round
      position="bottom"
    >
      <van-picker
        v-model="state.type"
        :columns="options"
        visible-option-num="3"
        v-bind="fields.props"
        @confirm="onConfirm"
        @cancel="state.showPopup=false"
      />
    </van-popup>
  </Teleport>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { get } from 'lodash-es'
import { isArray } from '@/utils'
let props = defineProps({
  options:{
    type:Array,
    default:()=>[]
  },
  title:{
    type:String,
    default:''
  },
  tip:{
    type:String,
    default:''
  },
  fields:{
    type:Object,
    default:()=>{}
  }
})

let state = reactive({
  data:[],
  showPopup:false,
  type:[],
  show:false,
  text:null,
})


const QueryFormFields: FormMode[] = [
  {
    label: '企业街道', key: 'street', type: 'select', options: get(dictData, 'dict_dept.list', []),
  },
  {
    label: '预警类型', key: 'alertType', type: 'select', options: get(dictData, 'dict_alert_type.list', []),
    props: {
      clearable: true,
      props: {
        'columns-field-names': {
          text: 'text',
          children: 'children',
        }
      },
      style: {
        width: '100%'
      }
    }
  },
  {
    label: '预警时间', key: 'warnTime', type: 'sort'
  },
]


const customFieldName = {
  text: 'text',
  children: 'children',
}

onMounted(()=>{
  state.show = true
})

const emits = defineEmits(['choose'])

function onConfirm (item){
  // 级联选择器
  if(isArray(item)){
    state.showPopup = false
    state.text = get(item[item.length-1],'text','')
    emits('choose',[get(item,'0.value',''),get(item,'1.value','')])
  }else{
    let { text,value } = item
    state.showPopup = false
    state.text = text
    emits('choose',value)
  }
}

</script>

<style lang="scss" scoped>


.query-item{
  display: flex;
  align-items: center;
  border-radius: 2px 2px 2px 2px;
  opacity: 1;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  span{
    border-left: none!important;
    font-size: 12px!important;
    margin-right: 6px;
    white-space: nowrap;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    max-width:60px ;
  }
  img{
    width: 10px;
    height: 10px;
  }
}
</style>
