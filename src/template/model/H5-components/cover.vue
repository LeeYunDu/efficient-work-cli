<template>
  <div
    class="cover-component"
    :style=" itemStyle"
    :class="[itemClass]"
  >
    <template v-if="useCover.url">
      <video
        v-if="useCover.type=='video'"
        :id="useCover.name"
        class="cover-video"
        :controls="true"
        muted
        :src="useCover.url"
      ></video>
      <template v-else-if="useCover.type=='image'">
        <viewer :images="[useCover.url]" class="flex">
          <template v-for="(item,index) in [useCover.url]" :key="index">
            <img
              class="cover-image"
              :src="item"
            >
          </template>
        </viewer>
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { get, isArray, isString } from 'lodash-es'


/**
 * 预览图结合
 * https://github.com/mirari/v-viewer/tree/v3
 */

let props = defineProps({
  data:{
    type:Array||String,
    default:()=>[]
  },
  dataKey:{
    type:String,
    default:''
  },
  itemClass:{
    type:String,
    default:''
  },

  itemStyle:{
    type:Object,
    default:()=>{}
  }

})

const videoType = ['.mp4', '.mkv','.avi']
const imageType = ['.jpg', '.png', '.jpeg']

let useCover = computed(()=>{
  let result = {
    type:'',
    url:'',
    name:''
  }
  const { VITE_FILE_PATH }  = import.meta.env
  if(isArray(props.data)){
    let filterFileList = props.data.filter(fileGroup=>{
      return props.dataKey.includes(fileGroup.chooseType23Id)
    })
    if(filterFileList.length==0)return result
    let files = []
    for (let index = 0; index < filterFileList.length; index++) {
      const element = filterFileList[index]
      let parseArray = JSON.parse(get(element,'fileUrl','[]'))
      if(parseArray.length==0){
        continue
      }else{
        files = files.concat(parseArray)
      }
    }

    if(files.length == 0 ){
      return result
    }

    let videoFile =  files.find(item=>{
      let type = getFileType(item.name)
      return videoType.includes(type)
    })
    if(videoFile){
      result.type = 'video'
      result.url = VITE_FILE_PATH  + videoFile.url
      result.name = videoFile.name
    }else{
      let fileFirstItem = get(files,'0',{})
      result.type = 'image'
      result.url = VITE_FILE_PATH  + fileFirstItem.url
      result.name = fileFirstItem.name
    }
    return result
  }else if (isString(props.data) && props.data){
    try {
      let parseArray = JSON.parse(get(props,'data','[]'))
      if(parseArray.length==0)return result
      let fileFirstItem = get(parseArray,'0',{})
      let { name,url } = fileFirstItem
      let type = getFileType(name)
      if(videoType.includes(type)){
        result.type = 'video'
      }else if(imageType.includes(type)){
        result.type = 'image'
      }
      result.url = VITE_FILE_PATH  + fileFirstItem.url
      result.name = name
      return result
    } catch (error) {
      throw new Error(error)
    }

  }else{
    return result
  }
})


function getFileType (str:string) {
  return str.substring(str.lastIndexOf('.'))
}


</script>

<style lang="scss" scoped>
.list-cover{

  display: flex;


  .cover-video,.cover-image{
    width: 104px;
    height: 74px;
    margin-right: 10px;
  }
}

.detail-cover{
  display: flex;
  left: 0;
  right: 0;
  top: 0;

  .cover-image,.cover-video {
    width: 100%;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
  }


}


</style>
