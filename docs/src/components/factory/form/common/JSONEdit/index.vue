<template>
  <el-dialog
    v-model="show"
    destroy-on-close
    :title="dialogTitle"
    width="80%"
  >
    <div class="button-box">
      <el-button-group>
        <el-button type="primary" @click="onTransformClick('simplification')">精简组件模式</el-button>
        <!-- <el-button type="warning" @click="onTransformClick('detail')">详细模式</el-button> -->
        <el-button type="success" @click="onSave">保存</el-button>
      </el-button-group>
      <div class="tip">{{ tip }}</div>
    </div>
    <div id="json-edit-container"></div>
  </el-dialog>
</template>
<script lang="ts" setup>
import { computed, onMounted,PropType,reactive,ref } from 'vue'
// import JSONEditor from 'jsoneditor'
// import 'jsoneditor/dist/jsoneditor.css'
import { cloneDeep, get } from 'lodash-es'
import { getOptionForField } from '../../utils/index'
import { MenuMode } from '../../typings/model'
import { SimplificationKey,SimplificationPropKeysBlackList } from './config'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  componentOptions:{
    type:Object as PropType<MenuMode>
  }
})


let state = reactive({
  model:'simplification'
})

const emits = defineEmits(['update:modelValue','save'])

const show = computed({
  get: () => {
    if(props.modelValue){
    }
    return props.modelValue
  },
  set: val => emits('update:modelValue',val)
})



let editorInstance = ref<any>(null)

const dialogTitle = computed(()=>{
  return `正在编辑字段：${get(props.componentOptions,'name','')}`
})


const tip = computed(()=>{
  if(state.model == 'simplification'){
    return `精简模式下只展示组件会使用到属性，比如${keys.join('、')}字段`
  }else{
    return '详情模式展示 类型 MenuMode 的全量字段'
  }
})

function init (){
  const container = document.getElementById('json-edit-container')
  const options = {
    mode:'text'
  }
  const editor = new JSONEditor(container, options)
  editorInstance.value = editor
  onTransformClick(state.model)
  // editorInstance.value.set(props.componentOptions)
}

function onTransformClick (type:string){
  state.model = type
  if(type=='detail'){
    onTransformDetail()
  }else{
    onTransformSimplification()
  }
}


let keys = SimplificationKey
// 精简模式
function onTransformSimplification (){
  // 只需展示这些字段

  let result:{
    [key:string]:any
  } = {}
  let currentField:MenuMode = (cloneDeep(props.componentOptions) as MenuMode)
  SimplificationKey.forEach(key=>{
    if(key == 'props'){
      result.props = getOptionForField(currentField,option=>{
        Object.keys(option).forEach(key=>{
          let value = option[key]
          if(value === ''){
            delete option[key]
          }
          if(SimplificationPropKeysBlackList.includes(key)){
            delete option[key]
          }

        })
      })
    }else{
      result[key] = get(currentField,key)
    }
  })
  editorInstance.value.set(result)
}
// 详细JSON模式
function onTransformDetail (){
  editorInstance.value.set(cloneDeep(props.componentOptions))
}

function onSave (){
  const jsonData = editorInstance.value.get()
  show.value = false
  emits('save',jsonData)
}

</script>

<style lang="scss"  scoped>

#json-edit-container{
  height: 500px;
}

.button-box{
  margin-bottom: 10px;
}

.tip{
  margin-top: 10px;
}
</style>
