
<template>
  <div v-if="list.length>0" class="fotter-box">
    <div class="file-list">
      <div
        v-for="(item,index) in list"
        :key="index"
        class="file-item flex f-aic"
      >
        <span>附件：</span>
        <img src="static/images/common/icon-pdf.png">
        <span class="name">
          {{ item.name }}
        </span>
        <div style="margin-left:auto">
          <span class="download" @click="onDownload(item)">下载</span>
          <span class="download" @click="onPreviewFile(item)">预览</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import download from '@/utils/download'
let props = defineProps({
  list:{
    type:Array,
    default:()=>[]
  },
  showTitle:{
    type:Boolean,
    default:true
  }
})
let state = reactive({
  data:[],
  show:false
})

async function asyncData (){
  state.data = []
}

function onDownload (item){
  download(item.url.indexOf('http')>-1? item.url:window.location.origin + item.url,item.name)
}
function onPreviewFile (item){
  window.open(item.url.indexOf('http')>-1? item.url:window.location.origin + item.url)
}


asyncData()
</script>

<style lang="scss" scoped>


.fotter-box {
  width: 100%;
  .s-title {
    font-size: 14px;
    font-family: DingTalk-JinBuTi, DingTalk;
    color: rgba(0,0,0,0.9);
  }
  .file-list {
    margin-top: 16px;
    background: #f3f8fd;
    border-radius: 4px;
    border: 1px  #a6c8f3;
    padding: 16px;
    img{
      margin-right: 10px;
    }

    .file-item{
      cursor: pointer;
      font-size: 16px;
font-family: Source Han Sans CN-Regular, Source Han Sans CN;
font-weight: 400;
color: #686B73;
      img{
        width: 24px;
        height: 24px;
      }
      .name{
        font-size: 16px;
font-family: Source Han Sans CN-Regular, Source Han Sans CN;
font-weight: 400;
color: #0366F1;
      }

      &~.file-item{
        margin-top: 8px;
      }
    }
  }
}

.download{
  margin-left: auto;
  cursor: pointer;
  color: #1971e2;

  &~.download{
    margin-left: 10px;
  }
}
</style>
