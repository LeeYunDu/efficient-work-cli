<script setup>
import { ref} from 'vue'
import Cover from './cover.vue'
let images = ref('[{"name":"测试图片.jpeg","url":"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"}]')
</script>

# Cover 封面
## 使用说明
用于带有显示图片的列表Item渲染。比如楼宇空间列表渲染时可能就需要显示宣传视频/区位图等静态资源。
PC端跟移动端都适用。v-viewer 很好的支持了移动端图片预览

1. video类型和image类型的区分
2. 图片支持预览模式

## 注意事项

1. 图片预览需要安装依赖 [v-viewer](https://github.com/mirari/v-viewer/tree/v3)
``` npm 
npm install v-viewer viewerjs
```
2. 示例项目为https地址，引入项目后需要调整下静态资源的加载地址，比如添加服务器前缀。
3. 暂无图片的开发


## 示例

<Cover :data="images"></Cover>
<Cover ></Cover>

``` vue
<template>
  <Cover :data="images"></Cover>
</template>
<script lang="ts" setup>
import { ref} from 'vue'
import Cover from './cover.vue'
let images = ref('[{"name":"测试图片.jpeg","url":"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"}]')
</script>
```
## Attributes

| 属性名      | 说明        |  类型         |  默认值       | 
| :---        | :---   |   :---  |:----: |
| data   | 数据集合        | string / array      |—  |
| itemClass   | 自定义类名        | string       |—  |
| itemStyle   | 自定义样式       | string       |—  |

## Cover 源代码

::: details 查看源代码
``` vue
<template>
  <div
    class="cover-component"
    :style=" itemStyle"
    :class="[itemClass]"
  >
    <template v-if="useCover.url">
      <video
        v-if="useCover.type=='video'"
        autoplay
        class="cover-video"
        :controls="true"
        muted
        :src="useCover.url"
      ></video>
      <template v-else-if="useCover.type=='image'">
        <Viewer :images="[useCover.url]">
          <template v-for="(item,index) in [useCover.url]" :key="index">
            <img
              class="cover-image"
              :src="item"
            >
          </template>
        </Viewer>
      </template>
    </template>
    <template v-else>
     <div class="cover-no-image">暂无图片</div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { get, isArray, isString } from 'lodash-es'
import 'viewerjs/dist/viewer.css'
import { component as Viewer } from "v-viewer"

let props = defineProps({
  data:{
    type:Array||String,
    default:()=>[]
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
    url:''
  }
  // const { VITE_FILE_PATH }  = import.meta.env
  if(isArray(props.data)){
    let filterFileList = []
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
    }else{
      let fileFirstItem = get(files,'0',{})
      result.type = 'image'
      result.url = VITE_FILE_PATH  + fileFirstItem.url
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
      result.url = fileFirstItem.url
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
.cover-video{
  display: block;
  height: 150px;
  width: 150px;
  border-radius: 4px;
  object-fit: cover;
  background-color: #eeeeee68;
}
.cover-image{
  display: block;
  height: 150px;
  width: 150px;
  border-radius: 4px;
  object-fit: cover;
  background-color: #eeeeee68;
}
.cover-no-image{
  display: block;
  height: 150px;
  line-height: 150px;
  width: 150px;
  text-align: center;
  border-radius: 4px;
  object-fit: cover;
  background-color: #eeeeee68;
}

</style>

```

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>