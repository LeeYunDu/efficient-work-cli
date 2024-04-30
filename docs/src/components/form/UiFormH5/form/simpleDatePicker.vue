<template>
  <div class="date-range-picker-component">
    <van-field
      v-model="model[field.key]"
      :label="field.label"
      is-link
      readonly
      :name="field.key"
      :rules="useRules"
      v-bind="field.props"
      :placeholder="`请选择${field.label}`"
      @click="state.showPopup = true"
    >
      <template #input>
        <div v-if="showPlaceholder" class="placeholder van-field__control" @click="state.showPopup = true">
          {{ `请选择${field.label}` }}
        </div>
        <div v-else class="pickerList" @click="state.showPopup = true">
          {{ state.text }}
        </div>
      </template>
    </van-field>
    <Teleport to="body">
      <van-popup
        v-model:show="state.showPopup"
        round
        position="bottom"
      >
        <van-date-picker
          v-model="currentDate"
          :title="field.label"
          v-bind="field.props"
          @confirm="onConfirm"
          @cancel="onCancel"
          @change="onChange"
        />
      </van-popup>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { get, set } from 'lodash-es'
import dayjs from 'dayjs'
import { onMounted } from 'vue'

const emits = defineEmits(['choose','datePickerChange','update:modelValue'])

let props = defineProps({
  params:{
    type:Object,
    default:()=>{}
  },
  field:{
    type:Object,
    default:()=>{}
  }
})

let model = computed({
  get:()=>props.params,
  set:val => emits('update:modelValue',val)
})

let state = reactive({
  showPopup:false,
  show:false,
  text:'',
})
let toDay = new Date()
const currentDate = ref([toDay.getFullYear(),toDay.getMonth() + 1 ,toDay.getDate()])
let showPlaceholder = computed(()=>{
  return  !currentValue.value || state.text == ''
})
let currentValue = computed(()=>{
  return get(model.value,props.field.key,'')
})

const useRules = computed(()=>{
  return get(props.field,'props.required',false)?[{ required: true, message: `请填写${props.field.label}` }].concat(get(props.field,'props.rules',[])):get(props.field,'props.rules',[])
})

function onConfirm (item){
  let { selectedValues } = item
  state.showPopup = false
  state.text = selectedValues.join('-')
  let valueFormat = get(props.field,'props.valueFormat','')
  let value = state.text
  if(valueFormat){
    if(String(valueFormat).toLocaleLowerCase() == 'x'){
      value = new Date(state.text).getTime()
    }else{
      value = dayjs(new Date(state.text)).format(valueFormat)
    }
  }
  set(model.value,props.field.key,value)
  emits('choose',item.selectedOptions)
  emits('datePickerChange',{
    options:item.selectedOptions,
    params:value,
    filed:props.field
  })
}

const onCancel = () => {
  state.showPopup = false
  state.text = ''
  emits('choose',[])
}

function onChange (){

}

onMounted(()=>{
  let currentValue = get(model.value,props.field.key,'')
  state.text = dayjs(new Date(currentValue)).format('YYYY-MM-DD')
})
</script>

<style lang="scss" scoped>

.placeholder-info{
  display: flex;
  width: 100%;
  justify-content: center;
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
  }
  img{
    width: 20px;
  }
}

.date-range-picker-component{
  width: 100%;
}

.icon-down{
  width: 8px;
}
.placeholder {
  color: #86909c;
  opacity: .5;
  font-size: 12px;
}
</style>
