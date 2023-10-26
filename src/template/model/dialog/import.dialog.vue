<template>
  <SimpleModal
    v-model="state.show"
    title="僵尸企业导入"
    :footer-show="false"
    confirm-text="提交"
    width="40%"
    class="dialog-center"
    body-padding="20"
    @closed="onClose"
  >
    <el-form
      ref="formRef"
      :model="state.params"
      style="width:100%"
      label-position="left"
    >
      <el-row>
        <FormItemCol
          :span="24"
          label="模板下载:"
          slot-key="tip"
        >
          <template #tip>
            <el-button type="primary" @click="onDownload">立即下载</el-button>
          </template>
        </FormItemCol>
        <FormItemCol
          :span="24"
          label="导入提示:"
          slot-key="tip"
        >
          <template #tip>
            <span>请确保数据严格按照导入模板填报，否则将视为异常数据！</span>
          </template>
        </FormItemCol>
        <FormItemCol
          v-model="state.params.file"
          :span="24"
          label="导入数据:"
          prop="file"
          :form-item-props="{ style: { alignItems: 'start' } }"
          slot-key="upload"
        >
          <template #upload="scopeProps">
            <UploadInput
              v-bind="scopeProps"
              :accept="['xls','xlsx']"
              :size="10240*10"
              :limit="1"
              :multiple="false"
              :show-file-list="false"
              :custom-show-file-list="true"
              :drag="true"
              api-path="/pc/ads/undisabled/company/importExcel"
              req-name="file"
              :success="onUploadSuccess"
            >
              <Icon icon="uploadFilled" />
              <div class="el-upload__text">点击或将文件拖拽到这里上传</div>
            </UploadInput>
          </template>
        </FormItemCol>
      </el-row>
    </el-form>
  </SimpleModal>
</template>


<script setup lang="ts">
import SimpleModal from '@/views/components/Simple.modal.vue'
import FormItemCol from '@/views/components/FormItem.col.vue'
import UploadInput from '@/views/components/Upload.input.vue'
import Icon from '@/views/components/Icon.vue'
import downLoadFile from '@/utils/download'
import {computed,ref,reactive} from 'vue'
const props = defineProps({
  modelValue: { type: Boolean, default: false }
})

const emits = defineEmits(['update:modelValue'])
// -------- inject --------

// -------- ref --------
const formRef = ref(null)
// -------- computed --------


function onDownload (){
  downLoadFile('/opt/digov/data/file/2023/06/模板文件_1686303224876.xlsx','模板文件.xlsx')
}
// -------- fn --------
let state = reactive({
  show: computed({
    get: () => props.modelValue,
    set: val =>  emits('update:modelValue', val)
  }),
  params:{
    month:'',
    file: ''
  },
  showImportDataDialog: false,
  excelData: {}
})

function onUploadSuccess (res,file,cb) {
  state.excelData = res.data
  cb([{ name: file.name }])
  onClose()
}

function onClose () {
  formRef.value?.resetFields()
  state.show = false
}
// -------- watch --------

// -------- provide --------

// -------- expose --------

</script>


<style lang='scss' scoped>
:deep .el-form-item {
  .el-form-item__content {
    .custom-upload {
      width: 100%;
    }
    .el-input__wrapper {
        width: 100%;
    }
  }
}
</style>
