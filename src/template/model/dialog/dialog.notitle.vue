
<template>
  <SimpleModal
    v-model="state.show"
    :title="state.title"
    :footer-show="false"
    width="988px"
    body-padding="0"
    class="no-title-dialog"
    @closed="onClosed"
  >
    <div class="dialog-container">
      <div class="header">
      </div>
      <div class="body">
      </div>
    </div>
  </SimpleModal>
</template>

<script lang="ts" setup>
import SimpleModal from '@/views/common/Simple.modal.vue'
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  row: { type: Object, default: () => ({}) }
})

const emits = defineEmits(['update:modelValue', 'update:row'])

const row = computed(() => props.row || {})

let router = useRouter()


const state = reactive({
  show: computed({
    get: () => {
      return props.modelValue
    },
    set: val => emits('update:modelValue', val)
  }),
  title: '',
  data: {}
})


function onClosed () {
  state.show = false
  emits('update:row', {})
}

</script>

<style lang="scss" scoped>
:deep .el-dialog__body {
  // height: 500px;
  // min-height: 500px;
  // max-height: 600px;
  display: flex;
  flex-direction: column;
  padding: 0px !important;
}

:deep .el-dialog__header {
  display: none !important;
}


.no-title-dialog {
  .dialog-container {
    .body{

    }
    .header{

    }
  }
}
</style>
