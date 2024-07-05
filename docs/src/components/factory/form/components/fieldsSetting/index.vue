<template>
  <div class="setting-page">
    <el-button-group>
      <el-popover placement="right" :visible="showImport" :width="400" trigger="click">
        <template #reference>
          <el-button type="primary" @click="showImport = true">导入模块配置</el-button>
        </template>
        <el-form label-width="100">
          <template v-for="(item,index) in importModuleFields" :key="index">
            <el-form-item :label="item.label" required="true"> 
               <el-input v-model="importForm[item.key]" />   
              </el-form-item>
          </template>
        </el-form>
        <div class="flex f-jcfe" style="text-align: right;">
          <el-button type="text" @click="onImportModule()">确定</el-button>
          <el-button type="text" @click="showImport = false">取消</el-button>
        </div>
      </el-popover>
      
      <el-button type="primary" @click="showFieldsJSON('export')">配置面板</el-button>
      <el-button type="primary" @click="updateOrderNum">一键刷新排序</el-button>
      <el-button type="primary" @click="deleteAllFields">一键清空</el-button>
    </el-button-group>
    <div class="collapse-list">
      <div
        v-for="(fields,index) in state.viewFields"
        :key="fields.id"
        class="collapse-item"
      >
        <div class="header">
          <div class="order">{{ fields.orderNum }}</div>
          <div class="name">{{ fields.name }}</div>
          <div class="key">
            <el-tag>{{ fields.key }}</el-tag>
          </div>
          <div class="button-group">
            <el-popover placement="right" :visible="fields._show" :width="400" trigger="click">
              <template #reference>
                <div class="button-item" @click="fields._show = true">快速编辑</div>
              </template>
              <el-form label-width="100">
                <template v-for="(item,index) in quickEditFields" :key="index">
                  <el-form-item :label="item.label">  <el-input v-model="fields[item.key]" />   </el-form-item>
                </template>
              </el-form>
              <div class="flex f-jcfe" style="text-align: right;">
                <el-button type="text" @click="fields._show = false;onFieldsUpdate(fields)">确定</el-button>
                <el-button type="text" @click="fields._show = false">取消</el-button>
              </div>
            </el-popover>
            <div class="button-item" @click="onBtnClick('copy',fields,index)">复制</div>
            <div class="button-item" @click="onBtnClick('json',fields,index)">JSON编辑</div>
            <div v-if="state.showPanel&&state.activeField.id==fields.id" class="button-item" @click="onBtnClick('close',fields,index)"> 收起</div>
            <div v-else class="button-item" @click="onBtnClick('detail',fields,index)"> 编辑</div>
            <div class="button-item" @click="onBtnClick('delete',fields,index)">删除</div>
          </div>
        </div>

        <div v-if="state.showPanel&&state.activeField.id==fields.id" class="main">
          <fieldOptionPanel :fields="state.activeField" @update="onFieldsUpdate" />
        </div>
      </div>
    </div>
    <!-- 单字段 -->
    <JSONEdit v-model="state.showJSON" :component-options="state.activeField" @save="onFieldsUpdate" />
    <!-- 字段集合 -->
    <JSONPanel 
      v-model="state.showJSONPanel" 
      :model-type="state.modelType" 
      :fields="state.viewFields" 
      @save="onFieldsPanelUpdate" 
    />
  </div>
</template>

<script lang="ts" setup>
import { PropType, reactive ,ref,watch } from 'vue'
import fieldOptionPanel from './components/fields.option.panel.vue'
import JSONEdit from '../../common/JSONEdit/index.vue'
import JSONPanel from '../../common/JSONEdit/JSON.panel.vue'
import { cloneDeep } from 'lodash-es'
import { ElMessage, ElMessageBox } from 'element-plus'
import { FormComponentOptions,ComponentOption,MenuMode } from '../../typings/model'

import { Ast } from '../../utils/ast'
import { quickEditFields ,importModuleFields} from './config/index'


let props = defineProps({
  viewFields:{
    type:Array as PropType<MenuMode[]>,
    default:()=>[]
  },
  componentOption: {
    type: Object as PropType<ComponentOption>,
    default: () => ({})
  },
  menuFields:{
    type:Array as PropType<MenuMode[]>,
    default:()=>[]
  }

})


const emits = defineEmits(['update'])

watch(()=>props.viewFields,val=>{
  state.viewFields =cloneDeep(val)
})

let state = reactive({
  showPanel:false,
  showJSON:false,
  showJSONPanel:false,
  modelType:'',
  activeName:'',
  viewFields:cloneDeep(props.viewFields) as MenuMode[],
  activeField:{} as MenuMode
})

function onBtnClick (type:string,fields:MenuMode,index:number){
  state.activeField = fields
  switch(type){
    case 'quick':
      break
    case 'json':
      state.showJSON = true
      break
    case 'close':
      state.showPanel = false
      break
    case 'detail':
      state.showPanel=!state.showPanel
      break
    case 'copy':
      ElMessageBox.confirm(
        '复制该字段并向下插入',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          let id = (Math.random()*100).toFixed(0)
          let newField:any = cloneDeep(state.activeField)
          Object.assign(newField,{
            'sid':id,
            'id':id,
            'key':id,
            orderNum:newField.orderNum + 1
          })
          onAddFields(newField,index)
        })

      break
    case 'delete':
      ElMessageBox.confirm(
        '从设计面板中剔除该字段,可从历史字段中找回。',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          deleteFields(index)
        })

      break
  }
}

let showImport = ref(false)
let importForm = ref({
  projectId:'345',
  menuId:'48311'
})
async function onImportModule(){
  if(importForm.value.projectId == ''){
    ElMessage.warning('请输入项目id')
    return
  }
  if(importForm.value.menuId == ''){
    ElMessage.warning('请输入模块id')
    return
  }
  const nodeApi = 'http://172.16.208.12:16050/node-szzt'
  const result = await fetch(`${nodeApi}/menu/query`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({"allMenus":true,"page":1,"pageSize":3000,projectId: importForm.value.projectId})
  })

  const { data } = await result.json()
  let list = data.list
  let menus = list.filter(item=>{
    return item.parentId == importForm.value.menuId
  })
  
  let cloneComponentOption:ComponentOption = props.componentOption
  cloneComponentOption.options.component.labels = menus
  emits('update',cloneComponentOption)
  
}

function showFieldsJSON (actionType:string){
  state.modelType = actionType
  state.showJSONPanel = true
  return
  // 创建一个Blob对象，用于生成JSON文件
  // const blob = new Blob([TsFileAst.ast.generate()], { type: 'application/json' })
  const blob = new Blob([TsFileAst.ast.generate()], { type: 'text/typescript' })

  // 创建一个链接，用于下载JSON文件
  const url = URL.createObjectURL(blob)

  // 创建一个<a>标签，用于触发下载操作
  const link = document.createElement('a')
  link.href = url
  link.download = 'myObject.ts'

  // 触发点击事件，开始下载JSON文件
  link.click()
}
/**
 * 针对单个字段的更新
 * @param updateField
 */
function onFieldsUpdate (updateField:MenuMode){
  let cloneComponentOption:ComponentOption = props.componentOption
  let labels = cloneComponentOption.options.component.labels
  let index = labels.findIndex((item:MenuMode)=>{
    return item.id==updateField.id
  })
  cloneComponentOption.options.component.labels[index] = updateField
  emits('update',cloneComponentOption)
}

function onFieldsPanelUpdate (updateFields:MenuMode[]){
  let cloneComponentOption:ComponentOption = props.componentOption
  cloneComponentOption.options.component.labels = updateFields
  emits('update',cloneComponentOption)
}

/**
 * 新增字段
 * @param fields
 */
function onAddFields (fields:MenuMode,index:number){
  let deepComponentOption = cloneDeep(props.componentOption)
  let options:FormComponentOptions = deepComponentOption.options as FormComponentOptions
  let labels = options.component.labels
  labels.splice(index+1,0,fields)
  emits('update',deepComponentOption)
}

// 一键更新字段排序，步长为4
function updateOrderNum (){
  let deepComponentOption = props.componentOption
  let options:FormComponentOptions = deepComponentOption.options as FormComponentOptions
  let labels = options.component.labels
  labels.map((fields,index)=>{
    fields.orderNum = index * 4 + 1
  })
  emits('update',deepComponentOption)
}

// 删除字段，可从历史字段中找回
function deleteFields (index:number){
  let deepComponentOption = props.componentOption
  let options:FormComponentOptions = deepComponentOption.options as FormComponentOptions
  let labels = options.component.labels
  labels.splice(index,1)
  emits('update',deepComponentOption)
}

// 一键清空
function deleteAllFields (){
  ElMessageBox.confirm(
    '从设计面板中剔除全部字段,可从历史字段中找回。',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      let deepComponentOption = props.componentOption
      let options:FormComponentOptions = deepComponentOption.options as FormComponentOptions
      options.component.labels = []
      emits('update',deepComponentOption)
    })
}
</script>


<style lang="scss" scoped>
.setting-page{
  height: 100%;
  .detail-panel{
    padding: 10px ;
    margin-top: 10px;
    border: 1px solid #eee;
    overflow: scroll;
  }
}
.collapse-list{
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  max-height: 700px;
  overflow-y: scroll;
  .collapse-item{
    padding: 10px ;
    border: 1px solid #eee;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 10px;
    .main{
      border-top: 1px solid #eee;
      padding-top: 10px;
      margin-top: 10px;
    }
    .header{
      width: 100%;
      display: flex;
      align-items: center;
      .name{
        color: #333;
        margin: 0 8px;
      }
      .key{
        color: #999;
      }
      .order{
        border-radius: 50%;
        color: white;
        background: #5194ff;
        width: 24px;
        height: 24px;
        text-align: center;
        font-size: 12px;
        line-height: 24px;
      }
      .button-group{
        margin-left: auto;
        display: flex;
        .input-item{
          margin-bottom: 10px;
        }

        .button-item{
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #125DD5;
          margin-left:12px ;
          cursor: pointer;
          position: relative;



          &~.button-item{
            &::before{
              content: '';
              position: absolute;
              left: -6px;
              width: 1px;
              height: 50%;
              top: 50%;
              transform: translateY(-50%);
              background: #125DD5;
            }
          }
        }
      }
    }
  }
}
</style>
