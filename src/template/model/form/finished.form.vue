<template>
    <div class="form-container">
      <div class="form-view">
        <UiForm
          v-bind="addFormOptions"
          ref="formRef"
          :model="state.params"
        >
          <template #source="{scopeProps}">
            <el-radio-group v-model="state.params.origin">
              <el-radio label="0">
                在建
              </el-radio>
              <el-radio label="1">
                已建
                <el-input
                  v-if="state.params.origin==1"
                  v-model="state.params.externalName "
                  placeholder="请输入系统名称"
                />
              </el-radio>
            </el-radio-group>
          </template>
          <template #content="scopeProps">
            <div class="edit-box">
              <EditorInput
                v-model="state.params.content"
                v-bind="scopeProps.item"
              />
            </div>
          </template>
          <template #upload="scopeProps">
            <UploadInput
              v-model="state.params.fileUrl"
              :show-file-list="false"
              :custom-show-file-list="true"
              file-list-type="file"
              button-font="上传"
              v-bind="scopeProps.item.props"
            />
          </template>

          <template #map>
            <el-input v-model="state.params.y1" placeholder="请输入坐标经纬度,例如：102.999,24.999" />
            <AreaMap @locationChange="onLocationChange" />
          </template>
          <template #btns>
          </template>
        </UiForm>
      </div>
      <div class="flex f-jcc">
        <formButton :btns="btns" />
      </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
// import ModuleTitle from '@/views/common/module.title.vue'
import { addFormOptions } from './json'
// import UploadInput from '@/views/common/Upload.input.vue'
// import formButton from '@/views/common/form.button.vue'
import { useRoute, useRouter } from 'vue-router'
// import EditorInput from '@/views/common/Editor.input.vue'
// import AreaMap from './components/area-map.vue'
// import UiForm from '@/components/UI/form/src/form.vue'

let state = reactive({
  data:[],
  show:false,
  params:{
  } as any
})


let btns = [
  { label:'取消',type:'close',click:onClose },
  { label:'发布',type:'submit',click:onSubmit },
]


let router = useRouter()
let route = useRoute()
let formRef = ref()


function onClose (){
  router.go(-1)
}

async function onSubmit (){
  await formRef.value.validateField()
  let api = route.query.id?NoticeUpdate:NoticeAdd
  const params: any = Object.assign({},state.params)
  const { success, errMsg, data }: any = await api(params)
  if (!success) return ElMessage.error(errMsg)
  onClose()
}

function onLocationChange (params) {
  let { lnglat } = params
  state.params.lon = lnglat[0]
  state.params.lat = lnglat[1]
}

async function getDetail (){
  let id = route.query.id
  const { success, errMsg, data }: any = await NoticeGetDetail({ id })
  if (!success) return ElMessage.error(errMsg)
  state.params = data
}
route.query.id&&getDetail()
</script>

<style lang="scss" scoped>
.form-container{
  // padding: 32px  30px;
  // background: #FFFFFF;
  // border-radius: 4px 4px 4px 4px;
  .form-view{
    width: 100%;
  }
}


</style>
