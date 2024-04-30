<template>
  <van-field
    :label="field.label"
    v-bind="field.props"
    :name="field.key"
    :rules="useRules"
  >
    <template #input>
      <van-radio-group
        v-model="active"
        v-bind="field.props"
        @change="onChange"
      >
        <template v-for="(option,index) in useOptions" :key="index">
          <van-radio
            v-bind="option"
            :name="get(option,mapper.value,'')"
          >
            {{ get(option,mapper.text,'') }}
          </van-radio>
        </template>
      </van-radio-group>
    </template>
  </van-field>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { get, set } from 'lodash-es'

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

const useRules = computed(()=>{
  return get(props.field,'props.required',false)?[{ required: true, message: `请填写${props.field.label}` }].concat(get(props.field,'props.rules',[])):get(props.field,'props.rules',[])
})
let mapper = computed(()=>{
  return get(props.field,'props.columns-field-names',{ text: 'name', value: 'id' })
})

let active = ref('')

let useOptions = computed(()=>{
  return get(props.field,'options',[])
})

function onChange (value){
  set(model.value,props.field.key,value)
  emits('choose',value)
}

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
