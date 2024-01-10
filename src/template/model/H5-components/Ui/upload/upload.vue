<template>
  <div class="ImageUploader">
    <van-uploader
      v-model="modelList"
      v-bind="props"
      :after-read="afterRead"
      :max-size="props.maxSize*1024*1024"
      @oversize="onOversize"
      @delete="removeItem"
    >
      <div class="upload-button">
        <!-- <img src="@static/images/common/icon-upload.png" alt=""> -->
        <span>上传</span>
      </div>
    </van-uploader>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, SetupContext, ref } from 'vue'
import { fileUpload } from '@/api'
import { useVModel } from '@vueuse/core'
import { Toast } from 'vant'

const { VITE_DOMAIN } = import.meta.env
export default defineComponent({
  name: 'ImageUploader',
  props: {
    files: {
      type: String
    },
    props: {
      type: Object,
      default: () => ({})
    },
    compressRatio:{
      type:[Number,String],
      default:0.8
    },
    maxSize:{
      type:[Number,String],
      default: 2 * 1024
    },
    minSize:{
      type:[Number,String],
      default: 5
    }
  },
  setup (props: any, ctx: SetupContext) {
    const minQ = ref(0)
    const maxQ = ref(1)
    const compressRatio =computed(()=> props.compressRatio)
    const maxSize = computed(()=>props.maxSize)
    const minSize = computed(()=>props.minSize)
    const compressLoading = ref(false)
    const fileList: any = useVModel(props, 'files', ctx.emit)
    const modelList = computed(() => JSON.parse(fileList.value || '[]'))

    function beforeRead (file: any){
      if(compressRatio.value && compressRatio.value * 1 > 0 && compressRatio.value * 1 < 1){
        compressLoading.value = true
        compressPhoto(file,compressRatio.value,(newFile:any)=>{
          maxQ.value = 1
          minQ.value = 0
          // beforeRead({ file:newFile })
          afterRead({ file:newFile })
        })
        return false
      }
      return true
    }

    function compressPhoto (file:any, compressRatio:any, callback:any){
      let nextQ = compressRatio
      // const maxSize = 600
      // const minSize = 100
      fileToBase64(file,nextQ,async function (file:any, canvas:any, nextQ:any) {
        var base64Codes = await canvas.toDataURL(file.type, 1) // y压缩
        var compressFile = base64ToFile(base64Codes, file.name) // 转成file文件
        var compressFileSize = compressFile.size / 1024 // 压缩后文件大小 k
        if (maxSize.value && maxSize.value * 1 > 0 && compressFileSize > maxSize.value) {
          // 压缩后文件大于最大值
          maxQ.value = nextQ
          nextQ = (nextQ + minQ.value) / 2 // 质量降低
          compressPhoto(file, nextQ, callback)
        } else if (minSize.value && minSize.value * 1 > 0 && compressFileSize < minSize.value) {
          // 压缩以后文件小于最小值
          minQ.value = nextQ
          nextQ = (nextQ + maxQ.value) / 2 // 质量提高
          compressPhoto(file, nextQ, callback)
        } else {
          callback && callback(compressFile)
        }
      })
    }
    // file 转为 base64
    function fileToBase64 (file:any, nextQ:any, callback:any) {
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return
      const image:any = new Image()
      // 绑定 load 事件处理器，加载完成后执行
      image.onload = function () {
        const canvas = document.createElement('canvas')
        const ctx:any = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        canvas.width = image.width * nextQ
        canvas.height = image.height * nextQ
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
        callback(file, canvas, nextQ)
      }
      if (/^image/.test(file.type)) {
        // 创建一个reader
        var reader = new FileReader()
        // 将图片将转成 base64 格式
        reader.readAsDataURL(file)
        // 读取成功后的回调
        reader.onload = function () {
          // self.imgUrls.push(this.result);
          // 设置src属性，浏览器会自动加载。
          // 记住必须先绑定事件，才能设置src属性，否则会出同步问题。
          image.src = this.result
        }
      }
    }

    function base64ToFile (dataurl:any, filename:any) {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    }

    async function afterRead (file: any) {
      const formData = new FormData()
      formData.append('fileArray', file.file)
      const { data } = await fileUpload(formData)

      const newFile = data.resultList.map((item: any) => {
        return {
          name: file.originalFilename,
          url: file.fileUrl,
          size: file.fileSize
        }
      })

      fileList.value = JSON.stringify(modelList.value.concat(newFile))
    }

    function removeItem (file: any) {
      const array = JSON.parse(fileList.value)
      const index = array.findIndex((item: any) => item.name === file.name)
      array.splice(index, 1)
      fileList.value = JSON.stringify(array)
    }

    function onOversize () {
      Toast(`文件大小不能超过 ${(props.maxSize / 1024 / 1024).toFixed(2)}MB`)
    }

    return {
      fileList,
      beforeRead,
      afterRead,
      removeItem,
      onOversize,
      modelList
    }
  }
})
</script>

<style lang="scss" scoped>
.upload-button{
  background: rgba(46,124,253,0.12);
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  border: 1px dashed #2E7CFD;
  width:100%;
  height: 29px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(46, 124, 253, 1);
  img{
    margin-right: 4px;
  }
}


.ImageUploader{
  width: 100%;
  ::v-deep(.van-uploader){
    width: 100%;
    .van-uploader__wrapper{
      width: 100%;
      .van-uploader__input-wrapper{
        width: 100%;
      }
    }
  }
}
</style>
