<template>
  <el-upload
    :auto-upload="true"
    :action="state.action"
    :headers="state.headers"
    :limit="limit"
    name="fileArray"
    :show-file-list="showFileList"
    :on-success="onUploadSuccess"
    :before-upload="onBeforeUpload"
    :on-remove="onRemoveFile"
    :on-preview="onPreviewFile"
    :on-exceed="onExceed"
    :list-type="listType"
    :file-list="state.fileList"
    class="custom-upload"
  >
    <template v-if="!_.hasIn($slots,'default')" #default>
      <div v-if="state.fileList.length<limit" class="custom-box">
        <div class="info">
          <!-- <Icon icon="Plus" /> -->
          <img class="icon" src="static/images/common/icon-upimg.png" alt="">
          <span>{{ buttonFont }}</span>
        </div>
        <span class="tip">
          {{ tip }}
        </span>
      </div>
    </template>
    <template v-for="(content,key) in $slots" #[key]>
      <slot :name="key"></slot>
    </template>
  </el-upload>
  <div v-if="customShowFileList" class="file-list">
    <template v-for="(file,index) in state.fileList" :key="index">
      <div class="file-item">
        <div class="file-name">
          <span>{{ file.name }}</span>
        </div>

        <span v-if="isImage(file.name)" class="file-del" @click="onPreviewFile(file)">预览</span>
        <span class="file-del" @click="onRemoveFile(file)">删除</span>
      </div>
    </template>
  </div>
  <el-dialog v-model="state.dialogVisible">
    <img
      style="width: 100%"
      w-full
      :src="state.dialogImageUrl"
      alt="Preview Image"
    >
  </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch, computed, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import { ApiProxy } from '@/config/index.ts'
import { useStore } from 'vuex'
import _ from 'lodash-es'
// -------- mock --------

const props = defineProps({
  accept: { type: Array || String, default: '*' },
  size: { type: Number, default: 100 }, // size 单位kb
  limit: { type: Number, default: 3 },
  modelValue: { type: String, default: '' },
  listType: { type: String, default: 'picture' },
  customShowFileList: { type: Boolean, default: false },
  showFileList: { type: Boolean, default: false },
  buttonFont:{ type:String,default:'选择文件' },
  tip:{ type:String,default:'' },
})

const emits = defineEmits(['update:modelValue'])

const store = useStore()

// -------- hook --------

// -------- ref --------

// -------- computed --------
const sessionId = computed(() => store.getters.loginInfo?.sessionId)
// -------- fn --------
const state = reactive({
  action: `${ApiProxy.java.main}/pc/upload/file`,
  headers: {
    Authorization: sessionId
  },
  dialogVisible: false,
  dialogImageUrl: '',
  fileList: []
})

function onUploadSuccess (res) {
  const { domain,resultList } = res.data
  resultList.length && resultList.forEach(file => {
    state.fileList.push({
      name: file.originalFilename,
      url: file.fileUrl,
      size: file.fileSize
    })
  })
  ElMessage.success(`上传成功!`)
}

function getFileType (str) {
  return str.substring(str.lastIndexOf('.') + 1)
}

function onBeforeUpload (UploadRawFile) {
  const { name, size } = UploadRawFile
  let fileType = getFileType(name)
  if (props.accept !== '*' && !props.accept.includes(fileType)) {
    ElMessage.warning(`只能上传${ props.accept.join(',') }格式的文件!`)
    return false
  }
  let fileSize = size / 1024
  if (fileSize > props.size) {
    ElMessage.warning(`改文件大小超出${(props.size / 1024).toFixed(2)}M!`)
    return false
  }
  return true
}

function onExceed (files,uploadFiles) {
  ElMessage.warning(`最多上传${props.limit}个文件!`)
}

function onRemoveFile (file) {
  state.fileList = state.fileList.filter(_file => _file.url !== file.url)
}
function onPreviewFile (UploadFile) {
  let { VITE_FILE_PATH } = import.meta.env
  // window.open(window.location.origin + UploadFile.url)
  state.dialogImageUrl = VITE_FILE_PATH +  UploadFile.url
  state.dialogVisible = true
}

function isImage (fileName){
  let name = fileName.toLowerCase()
  return name.indexOf('.png')>-1||name.indexOf('.jpg')>-1||name.indexOf('.jpeg')>-1
}

// -------- watch --------
watch(() => state.fileList,() => {
  emits('update:modelValue', JSON.stringify(state.fileList))
},{ deep: true })

watch(() => props.modelValue,() => {
  if (!props.modelValue) return state.fileList = []
  state.fileList = JSON.parse(props.modelValue)
},{immediate:true})
// -------- init --------

</script>

<style lang="scss" scoped>

.file-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 16px;

  .file-item {
    width: 100%;
    display: flex;
    align-items: center;
    height: 44px;
    background: rgba(34,118,255,0.06);
    border-radius: 3px;
    padding: 0 20px;
    cursor: pointer;

    & ~ .file-item {
      margin-top: 16px;
    }

    .file-name {
      flex: 1;
      display: flex;
      align-items: center;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #2276FF;
    }

    .file-del {
      flex-shrink: 0;
      font-size: 14px;
      color: #3DA0FD;
      &~.file-del{
        margin-left: 10px;
      }
    }
  }
}

.info{
  width: 120px;
  height: 120px;
  background: #FFFFFF;
  border-radius: 4px;
  border: 1px solid #E6E6E6;
  display: flex;
  flex-direction: column;
  img{
    margin-bottom: 10px;
    width: 58px;
    height: 58px;
  }
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #9B9B9B;
}

.tip{
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #9B9B9B;
  margin-left: 10px;
}

.custom-box{
}
</style>
