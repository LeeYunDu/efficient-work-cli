<template>
  <van-field
    v-model="state.text"
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
        <template v-if="isMultiple">
          <template v-for="(item,index) in currentValue" :key="index">
            <van-tag
              :show="true"
              style="margin-right: 4px;"
              closeable
              size="medium"
              type="primary"
              @close="onClose(index)"
            >
              {{ getValue(item) }}
            </van-tag>
          </template>
        </template>
        <template v-else>
          {{ state.text }}
        </template>
      </div>
    </template>
  </van-field>
  <Teleport to="body">
    <van-popup
      v-model:show="state.showPopup"
      round
      position="bottom"
    >
      <van-picker
        v-model="active"
        :title="field.label"
        :columns="useOptions"
        v-bind="field.props"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
      />
    </van-popup>
  </Teleport>
</template>

<script lang="ts" setup>
import { cloneDeep, get, set } from 'lodash-es'
import { onMounted } from 'vue'
import { computed } from 'vue'
import { reactive, ref } from 'vue'

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
let emits = defineEmits(['update:modelValue','choose','selectChange'])
let model = computed({
  get:()=>props.params,
  set:val => emits('update:modelValue',val)
})
let showPlaceholder = computed(()=>{
  return  currentValue.value == 0 || state.text == ''
})
let isMultiple = computed(()=>{
  return get(props.field,'props.multiple',false)
})
let useOptions = computed(()=>{
  return get(props.field,'options',[])
})
let currentValue = computed(()=>{
  return get(model.value,props.field.key,[])
})
let active = ref([])


let state = reactive({
  showPopup:false,
  show:false,
  text:'',

})
let mapper = computed(()=>{
  return get(props.field,'props.columns-field-names',{ text: 'name', value: 'id', children: 'children' })
})

const useRules = computed(()=>{
  return get(props.field,'props.required',false)?[{ required: true, message: `请填写${props.field.label}` }].concat(get(props.field,'props.rules',[])):get(props.field,'props.rules',[])
})


function getValue (item){
  let findItem = useOptions.value.find(option=>{
    return get(option,mapper.value.value) == item
  })
  return get(findItem,mapper.value.text)
}

function onConfirm (item){
  let { selectedValues } = item
  state.showPopup = false
  if(isMultiple.value){
    let arr = cloneDeep(currentValue.value)
    arr = [...new Set(arr.concat(selectedValues))]
    set(model.value,props.field.key,arr)
  }else{
    set(model.value,props.field.key,selectedValues.join(''))
  }

  state.text = currentValue.value.map(item=>getValue(item)).join(',')
  active.value = []
  emits('choose',item.selectedOptions)
  emits('selectChange',{
    options:item.selectedOptions,
    params:model.value,
    filed:props.field
  })
}

const onCancel = () => {
  state.showPopup = false
}

const onChange = item=>{

}
function onClose (index){
  let arr = cloneDeep(currentValue.value)
  arr.splice(index,1)

  set(model.value,props.field.key,arr)
}

onMounted(()=>{
  let currentValue = get(model.value,props.field.key,[])
  state.text = currentValue.map(item=>getValue(item)).join(',')
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
