<template>
  <div class="image-box">
    <viewer :images="imgList">
      <img
        v-for="src in imgList"
        :key="src"
        class="img"
        :src="src"
      >
    </viewer>

    <!-- <div v-for="(item,index) in imgList" :key="index">
      <el-button type="primary" style="margin: 20px 0;" @click="downLoadImg(item,index)">保存到手机</el-button>
      <el-image
        :src="item"
        :preview-src-list=" imgList"
        @click="show()"
      >
        <template #error>
        </template>
      </el-image>
    </div> -->
  </div>
</template>


<script lang="ts" setup>
import { downloadFile } from '@/utils/download'
import { useRoute } from 'vue-router'
import { api as viewerApi } from 'v-viewer'
import { ref } from 'vue'
const route = useRoute()

let index=ref(0)
let showCenter = ref(false)
function onImgeClick (item){
  index.value = item
  showCenter.value = true
}

function downLoadImg (url,index){
  downloadFile(url,index)
}

function show (){
  viewerApi({
    images:imgList.value
  })
}
let imgId = computed(()=>{
  let id = 0
  switch(route.query.typeName){
    case '全部园区':
      id=0
      break
    case '昆明国家高新技术产业开发区':
      id=2
      break
    case '昆明经济技术开发区':
      id=2
      break
    case '嵩明杨林经济技术开发区':
      id=3
      break
    case '云南安宁产业园区':
      id=7
      break
    case '云南五华产业园区':
      id=10
      break
    case '云南省数字经济开发区':
      id=5
      break
    case '云南宜良产业园区':
      id=12
      break
    case '云南七甸产业园区':
      id=6
      break
    case '云南东川产业园区':
      id=14
      break
    case '昆明空港经济区':
      id=4
      break
    case '云南寻甸产业园区':
      id=15
      break
    case '云南富民产业园区':
      id=11
      break
    case '云南禄劝产业园区':
      id=16
      break
    case '云南晋宁产业园区':
      id=9
      break
    case '云南海口产业园区':
      id=8
      break
    case '云南石林产业园区':
      id=13
      break
  }
  return id
})


let imgList = computed(()=>{
  let count = 1
  switch(route.query.typeName){
    case '全部园区':
      count = 1
      break
    case '昆明国家高新技术产业开发区':
      count = 2
      break
    case '昆明经济技术开发区':
      count = 2
      break
    case '嵩明杨林经济技术开发区':
      count = 3
      break
    case '云南安宁产业园区':
      count = 4
      break
    case '云南五华产业园区':
      count = 2

      break
    case '云南省数字经济开发区':
      count = 2

      break
    case '云南宜良产业园区':
      count = 3

      break
    case '云南七甸产业园区':
      count = 3
      break
    case '云南东川产业园区':
      count = 12
      break
    case '昆明空港经济区':
      count = 14
      break
    case '云南寻甸产业园区':
      count = 2
      break
    case '云南富民产业园区':
      count = 2
      break
    case '云南禄劝产业园区':
      count = 2
      break
    case '云南晋宁产业园区':
      count = 2
      break
    case '云南海口产业园区':
      count = 2
      break
    case '云南石林产业园区':
      count = 3
      break
  }
  let arr = new Array(count).fill('')
  return arr.map((e,index)=>{
    e = `@static/images/imagePreview/park${imgId.value}_${index+1}.${imgId.value===0?'jpg':'png'}`
    // e = '@static/images/imagePreview/park0_1.png'
    return  e
  })
})

</script>


<style lang="scss" scoped>
.img-box{
  overflow: scroll;
  overflow-y: scroll;
  padding: 40px;

  img{
    width: auto;
    height: auto;
  }
}

.img{
  width: 100%;
  height: auto;
}
</style>
