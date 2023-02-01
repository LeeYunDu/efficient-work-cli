<template>
  <SimpleModal
    v-model="state.show"
    :title="state.title"
    :footer-show="false"
    width="40%"
    body-padding="20"
    class="dialog-center"
    @closed="onClosed"
  >
    1
  </SimpleModal>
</template>

<script setup>
import SimpleModal from '@/views/components/Simple.modal.vue'
import _ from 'lodash-es'
import { detailFields } from '../json'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  row: { type: Object, default: () => ({}) }
})


const emits = defineEmits(['update:modelValue','update:row'])
// -------- inject --------

// -------- ref --------

// -------- computed --------
const row = computed(() => props.row || {})
// -------- fn --------
const state = reactive({
  show: computed({
    get: () => {
      props.modelValue && asyncData()
      return props.modelValue
    },
    set: val =>  emits('update:modelValue', val)
  }),
  title: '详情弹窗',
  resData: {}
})

function onClosed () {
  emits('update:row', {})
}

async function asyncData(){
  let res = await apiName({id:row.value.id})
  if (!res.success) throw new Error(res.errMsg)
  state.resData = res.data||{}
}

// -------- watch --------

// -------- provide --------

// -------- expose --------
</script>


