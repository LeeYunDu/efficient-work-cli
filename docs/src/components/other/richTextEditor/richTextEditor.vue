<template>
  <section class="editor-input">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <Editor
      v-model="valueHtml"
      style="height: 500px; overflow-y: hidden;"
      :default-config="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </section>
</template>

<script setup>

import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { ApiProxy } from '@/config/index.ts'
import { computed,inject,ref,shallowRef,onBeforeUnmount  } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  modelValue: { type: String, default: '' }
})

const emits = defineEmits(['update:modelValue'])

const store = useStore()

// -------- inject --------
const message = inject('message')
// -------- ref --------

// -------- computed --------
const sessionId = computed(() => store.getters.loginInfo?.token)

const toolbarConfig = computed(() => ({
  excludeKeys: ['insertVideo','uploadVideo','editVideoSize','group-video']
}))

const editorConfig = computed(() => ({
  placeholder: '请输入内容...',
  MENU_CONF:{
    // 配置默认字号
    // 配置上传图片
    uploadImage:{
      // 请求路径
      server: `${ApiProxy.java.main}/pc/upload/file`,
      // 后端接收的文件名称
      fieldName: 'fileArray',
      maxFileSize: 10 * 1024 * 1024, // 10M
      // 上传的图片类型
      allowedFileTypes: ['image/*'],
      // 小于该值就插入 base64 格式（而不上传），默认为 0
      base64LimitSize: 0,
      // 自定义插入返回格式【后端返回的格式】
      customInsert (res, insertFn) {
        const { domain,resultList } = res.data
        resultList.length && resultList.forEach(file => {
          insertFn(file.fileUrl,file.originalFilename,'#')
        })
      },
      // 携带的数据
      meta: {
        Authorization: sessionId.value
      },
      // 将 meta 拼接到 url 参数中，默认 false
      metaWithUrl: true,
      // 单个文件上传成功之后
      onSuccess (file, res) {
        message.success(`${file.name} 上传成功`)
      },
      // 单个文件上传失败
      onFailed (file, res) {
        message.error(`${file.name} 上传失败`)
      },
      // 上传错误，或者触发 timeout 超时
      onError (file, err, res) {
        message.error(`${file.name} 上传出错`)
      },
    }
  },
  autoFocus: false
}))

// -------- fn --------

const mode = ref('default')

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

const valueHtml = computed({
  get () {
    return props.modelValue
  },
  set (val) {
    emits('update:modelValue', val)
  }
})

const handleCreated = editor => {
  editorRef.value = editor
  console.log(editor)
}

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
// -------- watch --------

// -------- provide --------

// -------- expose --------
</script>

<style lang="scss" scoped>
.editor-input {
  border: 1px solid #ccc;
  z-index: 3;
}
</style>
