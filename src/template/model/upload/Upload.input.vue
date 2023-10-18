<template>
  <el-upload
    :auto-upload="true"
    :action="state.action"
    :headers="state.headers"
    :limit="limit"
    :accept="accept"
    name="fileArray"
    :show-file-list="showFileList"
    :on-success="onUploadSuccess"
    :before-upload="onBeforeUpload"
    :on-remove="onRemoveFile"
    :on-preview="onPreviewFile"
    :on-exceed="onExceed"
    :list-type="listType"
    :file-list="state.fileList"
    class="upload-input"
  >
    <template v-if="!_.hasIn($slots, 'default')" #default>
    </template>

    <template #trigger>
      <template v-if="listType=='picture-card'">
        <div class="img-upload-button">
          <img class="icon" src="@static/images/common/icon-upimg.png" alt="">
        </div>
      </template>
      <div v-else class="upload-button">
        <img class="icon" src="@static/images/common/icon-add.png" alt="">
        {{ buttonFont }}
      </div>
    </template>
    <template #tip>
    </template>

    <template v-for="(content, key) in $slots" #[key]>
      <slot :name="key"></slot>
    </template>
  </el-upload>
  <template v-if="state.fileList.length>0">
    <template v-if="listType=='picture-card'">
      <div class="upload-imgs">
        <template v-for="(file,index) in state.fileList" :key="index">
          <div class="img-item">
            <img class="img-file" :src="getImage(file.url)" alt="">

            <div class="action-menu">
              <div class="action-item" @click="onPreviewFile(file)">预览</div>
              <div class="action-item" @click="onRemoveFile(file)">删除</div>
            </div>
          </div>
        </template>
      </div>
    </template>
    <template v-else>
      <div class="file-list">
        <template v-for="(file, index) in state.fileList" :key="index">
          <div class="file-item">
            <img class="icon" src="@static/images/common/icon-pdf.png">
            <span class="name">{{ file.name }}</span>
            <div style="margin-left:auto" class="flex">
              <template v-if="isImage(file.name)">
                <div class="action-btn" @click="onPreviewFile(file)">
                  预览
                </div>
              </template>
              <div class="action-btn" @click="onRemoveFile(file)">
                删除
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </template>
  <span class="tip">  {{ tip }}   </span>

  <el-dialog v-model="state.dialogVisible">
    <img
      style="width: 100%"
      w-full
      :src="state.dialogImageUrl"
      alt="Preview Image"
    >
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, watch, computed, reactive } from 'vue'
import { ElMessage } from 'element-plus'
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
  buttonFont: { type: String, default: '上传附件' },
  tip: { type: String, default: '' },
})

const emits = defineEmits(['update:modelValue'])

const store = useStore()

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
  const { domain, resultList } = res.data
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
  return str.substring(str.lastIndexOf('.'))
}

function onBeforeUpload (UploadRawFile) {
  const { name, size } = UploadRawFile
  let fileType = getFileType(name)
  console.log(fileType,'fileType')
  if (props.accept !== '*' && !props.accept.includes(fileType)) {
    ElMessage.warning(`只能上传${props.accept.join(',')}格式的文件!`)
    return false
  }
  let fileSize = size / 1024
  if (fileSize > props.size) {
    ElMessage.warning(`改文件大小超出${(props.size / 1024).toFixed(2)}M!`)
    return false
  }
  return true
}

function onExceed (files, uploadFiles) {
  ElMessage.warning(`最多上传${props.limit}个文件!`)
}

function onRemoveFile (file) {
  state.fileList = state.fileList.filter(_file => _file.url !== file.url)
}
function onPreviewFile (UploadFile) {
  let { VITE_FILE_PATH } = import.meta.env
  state.dialogImageUrl = getImage(UploadFile.url)
  state.dialogVisible = true
}

function getImage (url){
  let { VITE_FILE_PATH } = import.meta.env
  return VITE_FILE_PATH + url
}

function isImage (fileName) {
  let name = fileName.toLowerCase()
  return name.indexOf('.png') > -1 || name.indexOf('.jpg') > -1 || name.indexOf('.jpeg') > -1
}

// -------- watch --------
watch(() => state.fileList, () => {
  emits('update:modelValue', JSON.stringify(state.fileList))
}, { deep: true })

watch(() => props.modelValue, () => {
  if (!props.modelValue) return state.fileList = []
  state.fileList = JSON.parse(props.modelValue)
})
// -------- init --------

</script>

<style lang="scss" scoped>
.file-list {
  width: 100%;
  margin-top: 16px;
  background: rgba(101, 112, 128, 0.06);
  border-radius: 4px;
  border: 1px #a6c8f3;
  padding: 16px;
  .file-item {
    cursor: pointer;
    font-size: 16px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    display: flex;
    align-items: center;
    color: #686b73;

    .icon {
      width: 44px;
      height: 44px;
      margin-right: 10px;
    }

    .action-btn{
      font-size: 14px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #0366F1;

        position: relative;
        &~.action-btn{
          margin-left: 12px;
          padding-left: 12px;
          &::after{
            content: '';
            width: 1px;
            height: 8px;
            opacity: 1;
            background: #BFBFD1;
            position: absolute;
            left: 0;
            top: 50%;
            margin-top: -4px;
          }
        }
    }

    .name {
      height: 22px;
      font-size: 16px;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 600;
      color: #363A44;
      line-height: 19px;
    }

    &~.file-item {
      margin-top: 8px;
    }
  }
}

.upload-imgs{
  display: flex;
  .img-item{
    width: 126px;
    height: 126px;
    border-radius: 4px;
    margin-left: 10px;
    position: relative;
    &:hover{
      .action-menu{
        display: flex;
      }
    }
    .action-menu {
      background: rgba($color: #000000, $alpha: .3);
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #FFFFFF;
      display: none;

      .action-item{
        cursor: pointer;

          position: relative;
          &~.action-item{
            margin-left: 12px;
            padding-left: 12px;
            &::after{
              content: '';
              width: 1px;
              height: 10px;
              opacity: 1;
              background: rgba(255,255,255,0.72);
              position: absolute;
              left: 0;
              top: 50%;
              margin-top: -5px;
            }
          }
      }
    }
    .img-file{
      width: 100%;
      height: 100%;
    }
  }
}
.img-upload-button {
  width: 126px;
  height: 126px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    height: 100%;
  }

  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-family: PingFangSC-Regular,
  PingFang SC;
  font-weight: 400;
  color: #9B9B9B;
}

.tip {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #9B9B9B;
  margin-left: 10px;
  width: 100%;
}

.custom-box{
  width: auto;
  display: inline-block;
  padding-bottom: 30px;
}


.upload-button{
  width: 132px;
  height: 44px;
  background: #0366F1;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #FFFFFF;
  justify-content: center;
  .icon{
    margin-right: 12px;
    width: 16px;
    height: 16px;
  }
}

.upload-input{
  ::v-deep(.el-upload){
    &.el-upload--picture-card{
      border: 0px!important;
      background: transparent;
      width: auto;
      height: auto;
    }
  }
}
</style>
