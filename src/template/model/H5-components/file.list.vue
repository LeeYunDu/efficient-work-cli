
<template>
  <div v-if="data.length > 0" class="fotter-box">
    <div class="file-list">
      <template v-for="(item, index) in data" :key="index">
        <div class="file-item">
          <div>
            <img src="@static/images/resource/icon-pdf.png" alt="">
          </div>
          <div class="name-box">
            <div class="name-1">{{ item?.name || '-' }}</div>
          </div>
          <div class="actions">
            <img
              v-if="isImage(item)"
              src="@static/images/resource/icon-read.png"
              alt=""
              @click="onPreviewImage(item)"
            >
            <img
              v-if="isPdf(item)"
              src="@static/images/resource/icon-read.png"
              alt=""
              @click="onPreviewPdf(item)"
            >
            <img src="@static/images/resource/icon-download.png" alt="" @click="onDownload(item)">
          </div>
        </div>
      </template>
    </div>
  </div>
  <van-popup v-model:show="state.showCenter" round :style="{ width:'95%' }">
    <div class="img-box">
      <div>
        <img :src="state.activeUrl" alt="">
      </div>
    </div>
  </van-popup>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import download from '@/utils/download'
let props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
})


let state = reactive({
  showCenter: false,
  activeUrl:''
})
function onDownload (item) {
  download(item.url.indexOf('http') > -1 ? item.url : window.location.origin + item.url, item.name)
}
function onPreviewImage (item) {
  state.activeUrl = item.url.indexOf('http') > -1 ? item.url : window.location.origin + item.url
  state.showCenter = true
  // window.open(item.url.indexOf('http') > -1 ? item.url : window.location.origin + item.url)
}

function onPreviewPdf (item) {
  state.activeUrl = ''
  window.open(item.url.indexOf('http') > -1 ? item.url : window.location.origin + item.url)
}


function isImage (file) {
  let name = file.name.toLowerCase()
  return name.indexOf('.png') > -1 || name.indexOf('.jpg') > -1 || name.indexOf('.jpeg') > -1
}


function isPdf (file) {
  let { name } = file
  return name.toLowerCase().indexOf('.pdf') > -1
}
</script>

<style lang="scss" scoped>
.fotter-box {
  width: 100%;
}

.download {
  margin-left: auto;
  cursor: pointer;
  color: #1971e2;

  & ~ .download {
    margin-left: 10px;
  }
}


.file-list {
  .file-item {
    padding: 0 6px;
    background: rgba(0, 122, 255, 0.05);
    display: flex;
    align-items: center;

    & ~ .file-item {
      margin-top: 10px;
    }

    .name-box {
      margin-left: 10px;

      .name-1 {
        font-size: 12px;
        color: #222A36;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }

      .name-2 {
        font-size: 10px;
        color: #8E9AA8;
      }
    }

    .actions {
      width: 50px;
      min-width: 50px;
      margin-left: auto;

      img {
        margin-left: 10px;
      }
    }
  }
}

.img-box{
  overflow: scroll;
  overflow-y: scroll;
  padding: 12px;
  img{
    width: 100%;
  }


}
</style>
