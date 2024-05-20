<template>
  <!-- 选择器 -->
  <template v-if="componentType==='select'">
    <el-form-item label="占位符内容:">
      <el-input v-model="fieldsOption.placeholder" placeholder="请输入占位符内容" />
    </el-form-item>
    <el-form-item label="是否多选:">
      <el-switch v-model="fieldsOption['multiple']" active-text="是" inactive-text="否" />
    </el-form-item>
    <el-form-item label="是否可搜索:">
      <el-switch v-model="fieldsOption['filterable']" active-text="是" inactive-text="否" />
    </el-form-item>
    <el-form-item label="字典Key配置:">
      <div class="option-data-box">
        <el-form-item label="label-key值:">
          <el-input v-model="fieldsOption.dynamicConfig.label" placeholder="请输入需要转化的Key值" />
        </el-form-item>
        <el-form-item label="value-key值:">
          <el-input v-model="fieldsOption.dynamicConfig.value" placeholder="请输入需要转化的Key值" />
        </el-form-item>
        <el-form-item label="children-key值:">
          <el-input v-model="fieldsOption.dynamicConfig.children" placeholder="请输入需要转化的Key值" />
        </el-form-item>
      </div>
    </el-form-item>
    <el-form-item label="选项数据:">
      <div class="option-data-box">
        <el-radio-group v-model="fieldsOption.optionType">
          <el-radio label="static">静态数据</el-radio>
          <el-radio label="dynamic">远端获取</el-radio>
        </el-radio-group>
        <template v-if="fieldsOption.optionType==='static'">
          <div>
            <el-button type="primary" @click="addOptionItem">新增选项</el-button>
          </div>
          <div class="option-list">
            <div class="option-item">
              <div class="label">名称</div>
              <div class="value">数值</div>
            <!-- <div class="sort">排序</div> -->
            </div>
            <div v-for="(item,index) in settingOptions" :key="index" class="option-item">
              <div class="delete" @click="onDelete(index)">删除</div>
              <div class="label"><el-input v-model="item[fieldsOption.dynamicConfig.label]" placeholder="请输入选项名称" /></div>
              <div class="value"><el-input v-model="item[fieldsOption.dynamicConfig.value]" placeholder="请输入选项数值" /></div>
            <!-- <div class="sort"><el-input v-model="item.sort" /></div> -->
            </div>
          </div>
        </template>
        <template v-else>
          <el-form-item label="数据源">
            <el-select v-model="fieldsOption.dynamicConfig.sourceType" placeholder="请输入数据来源方式">
              <el-option label="内部约定接口" value="chooseType" />
              <el-option label="node项目维护" value="node" />
            </el-select>
          </el-form-item>
          <el-form-item label="字典类型">
            <el-input v-model="fieldsOption.dynamicConfig.id" placeholder="请输入字典类型" />
          </el-form-item>
        </template>
      </div>
    </el-form-item>
  </template>
  <!-- 多选框 或者 单选框 -->
  <template v-if="componentType==='checkbox-group'||componentType==='radio-group'">
    <el-form-item label="边框:">
      <el-switch
        v-model="fieldsOption.childrenProps.border"
        active-text="是"
        inactive-text="否"
        :inactive-value="false"
        :active-value="true"
      />
    </el-form-item>
    <el-form-item label="尺寸:">
      <el-radio-group v-model="fieldsOption.childrenProps.size">
        <el-radio-button label="">正常</el-radio-button>
        <el-radio-button label="large">大</el-radio-button>
        <el-radio-button label="small">小</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="字典Key配置:">
      <div class="option-data-box">
        <el-form-item label="label-key值:">
          <el-input v-model="fieldsOption.dynamicConfig.label" placeholder="请输入需要转化的Key值" />
        </el-form-item>
        <el-form-item label="value-key值:">
          <el-input v-model="fieldsOption.dynamicConfig.value" placeholder="请输入需要转化的Key值" />
        </el-form-item>
      </div>
    </el-form-item>
    <el-form-item label="选项数据:">
      <div class="option-data-box">
        <el-radio-group v-model="fieldsOption.optionType">
          <el-radio label="static">静态数据</el-radio>
          <el-radio label="dynamic">远端获取</el-radio>
        </el-radio-group>
        <template v-if="fieldsOption.optionType==='static'">
          <div>
            <el-button type="primary" @click="addOptionItem">新增选项</el-button>
          </div>
          <div class="option-list">
            <div class="option-item">
              <div class="label">名称</div>
              <div class="value">数值</div>
            <!-- <div class="sort">排序</div> -->
            </div>
            <div v-for="(item,index) in settingOptions" :key="index" class="option-item">
              <div class="delete" @click="onDelete(index)">删除</div>
              <div class="label"><el-input v-model="item[fieldsOption.dynamicConfig.label]" placeholder="请输入选项名称" /></div>
              <div class="value"><el-input v-model="item[fieldsOption.dynamicConfig.value]" placeholder="请输入选项数值" /></div>
            <!-- <div class="sort"><el-input v-model="item.sort" /></div> -->
            </div>
          </div>
        </template>
        <template v-else>
          <el-form-item label="数据源">
            <el-select v-model="fieldsOption.dynamicConfig.sourceType" placeholder="请输入数据来源方式">
              <el-option label="内部约定接口" value="chooseType" />
              <el-option label="node项目维护" value="node" />
            </el-select>
          </el-form-item>
          <el-form-item label="字典类型">
            <el-input v-model="fieldsOption.dynamicConfig.id" placeholder="请输入字典类型" />
          </el-form-item>
        </template>
      </div>
    </el-form-item>
  </template>
  <!-- 开关 -->
  <template v-if="componentType==='switch'">
    <el-form-item label="自定义:">
      <div class="switch-group">
        <span>打开时</span>
        <el-input v-model="fieldsOption['active-text']" placeholder="请输入打开时的名称" />
        <el-input v-model="fieldsOption['active-value']" placeholder="请输入打开时的数值" />
      </div>
      <div class="switch-group">
        <span>关闭时</span>
        <el-input v-model="fieldsOption['inactive-text']" placeholder="请输入关闭时的名称" />
        <el-input v-model="fieldsOption['inactive-value']" placeholder="请输入关闭时的数值" />
      </div>
    </el-form-item>
  </template>
  <!-- 级联选择器 -->
  <template v-if="componentType==='cascader'">
    <el-form-item label="占位符内容:">
      <el-input v-model="fieldsOption.placeholder" placeholder="请输入占位符内容" />
    </el-form-item>
    <el-form-item label="是否多选:">
      <el-switch v-model="fieldsOption.props.multiple" active-text="是" inactive-text="否" />
    </el-form-item>
    <el-form-item label="是否可搜索:">
      <el-switch v-model="fieldsOption['filterable']" active-text="是" inactive-text="否" />
    </el-form-item>
    <el-form-item label="显示完整路径:">
      <el-switch v-model="fieldsOption['show-all-levels']" active-text="是" inactive-text="否" />
    </el-form-item>
    <el-form-item label="选择任意一级选项:">
      <el-switch v-model="fieldsOption.props.checkStrictly " active-text="是" inactive-text="否" />
    </el-form-item>
    <el-form-item label="字典Key配置:">
      <div class="option-data-box">
        <el-form-item label="label-key值:">
          <el-input v-model="fieldsOption.dynamicConfig.label" placeholder="请输入需要转化的Key值" />
        </el-form-item>
        <el-form-item label="value-key值:">
          <el-input v-model="fieldsOption.dynamicConfig.value" placeholder="请输入需要转化的Key值" />
        </el-form-item>
        <el-form-item label="children-key值:">
          <el-input v-model="fieldsOption.dynamicConfig.children" placeholder="请输入需要转化的Key值" />
        </el-form-item>
      </div>
    </el-form-item>
    <el-form-item label="选项数据:">
      <div class="option-data-box">
        <el-radio-group v-model="fieldsOption.optionType">
          <el-radio label="static">静态数据</el-radio>
          <el-radio label="dynamic">远端获取</el-radio>
        </el-radio-group>
        <template v-if="fieldsOption.optionType==='static'">
          <div>
            <el-button type="primary" @click="addCascaderOptionItem({},'root')">添加父级选择器</el-button>
          </div>
          <div class="tree-panel">
            <el-tree
              :data="settingOptions"
              node-key="id"
              default-expand-all
              :expand-on-click-node="false"
              :render-content="renderContent"
            />
          </div>
        </template>
        <template v-else>
          <el-form-item label="数据源">
            <el-select v-model="fieldsOption.dynamicConfig.sourceType" placeholder="请输入数据来源方式">
              <el-option label="内部约定接口" value="chooseType" />
              <el-option label="node项目维护" value="node" />
            </el-select>
          </el-form-item>
          <el-form-item label="字典类型">
            <el-input v-model="fieldsOption.dynamicConfig.id" placeholder="请输入字典类型" />
          </el-form-item>
        </template>
      </div>
    </el-form-item>
  </template>
  <el-dialog v-model="state.show" title="添加级联选择器选项">
    <el-form label-width="80px">
      <el-form-item :label="fieldsOption.dynamicConfig.label">
        <el-input v-model="state.nodeForm.label" placeholder="请输入选项名称" />
      </el-form-item>
      <el-form-item :label="fieldsOption.dynamicConfig.value">
        <el-input v-model="state.nodeForm.value" :type="state.inputType" placeholder="请输入选项值">
          <template #append>
            <el-select v-model="state.inputType" placeholder="Select" style="width: 115px" @change="state.nodeForm.value=''">
              <el-option label="String" value="string" />
              <el-option label="Number" value="number" />
            </el-select>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <div class="footer flex f-jce">
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="saveCascaderOptionItem">确认</el-button>
    </div>
  </el-dialog>
</template>


<script setup lang="ts">

import { MenuMode } from '../../../../typings/model'
import {  throttle } from 'lodash-es'
import {  PropType, reactive, ref, watch,h } from 'vue'
import { ElTree } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { getOptionForField } from '../../../../utils'
let props = defineProps({
  fields:{
    type:Object as PropType<MenuMode>,
    default:()=>({})
  },
  componentType:{
    type:String,
    default:'input'
  }
})

let state = reactive({
  show:false,
  nodeForm:{
    label:'',
    value:''
  },
  path:'',
  activeNode:{},
  inputType:'string',

})

let fieldsOption:any = reactive({
  placeholder:'',
  multiple:false,// 多选
  filterable:false,// 搜索
  options:[],// 下拉子选项
  optionType:'static',
  keyConfig:{
    labelKey:'name',
    valueKey:'id',
    childrenKey:'children',
  },
  props:{
    multiple:false,
    checkStrictly:false
  },
  dynamicConfig:{
    sourceType:'chooseType',
    dataType:'',
    id:'',
    label: 'name',
    value:'id',
    children:'children'
  },

  // 选项的配置
  childrenProps:{
    border:false,
    size:''
  }
})

const settingOptions = ref<any[]>([

])

let emits = defineEmits(['update','updateOption'])
const stopEmit = ref(false)

function onOptionChange (){
  if(stopEmit.value)return
  fieldsOption.options = settingOptions.value
  emits('updateOption',fieldsOption)
}

function addCascaderOptionItem (data:any,path='root'){
  state.path = path
  state.activeNode = data
  state.show= true
  // let item = {
  //   [fieldsOption.dynamicConfig.label]:'',
  //   [fieldsOption.dynamicConfig.value]:'',
  //   [fieldsOption.dynamicConfig.children]:[]
  // }
  // settingOptions.value.push(item)
}
function onClose (){
  state.show = false
  state.nodeForm.label = ''
  state.nodeForm.value = ''
}
function saveCascaderOptionItem (){
  let item = {
    [fieldsOption.dynamicConfig.label]:state.nodeForm.label,
    [fieldsOption.dynamicConfig.value]:state.nodeForm.value,
    [fieldsOption.dynamicConfig.children]:[]
  }
  // 父级与子级 添加node
  if(state.path==='root'){
    settingOptions.value.push(item)
  }else{
    state.activeNode[fieldsOption.dynamicConfig.children] = state.activeNode[fieldsOption.dynamicConfig.children]||[]
    state.activeNode[fieldsOption.dynamicConfig.children].push(item)
  }

  onClose()

}

function remove (node:Node,data:any){
  let index = node.parent.data.findIndex(childrenItem=>{
    return childrenItem.$treeNodeId === node.id
  })
  node.parent.data.splice(index,1)
}

const renderContent = (
  h,
  {
    node,
    data,
    store,
  }: {
    node: Node
    data: Tree
    store: Node['store']
  }
) => {
  return h(
    'span',
    {
      class: 'custom-tree-node',
    },
    h('span', {
      class: 'node-label',
    }, data[fieldsOption.dynamicConfig.label]),
    h(
      'span',
      null,
      h(
        'a',
        {
          onClick: () => addCascaderOptionItem(data,'children'),
        },
        '添加 '
      ),
      h(
        'a',
        {
          style: 'margin-left: 8px',
          onClick: () => remove(node, data),
        },
        '删除'
      )
    )
  )
}


function initCommonOption (){
  fieldsOption = Object.assign(fieldsOption,getOptionForField(props.fields))
  settingOptions.value = fieldsOption.options
  if(stopEmit.value){
    setTimeout(()=>{
      stopEmit.value = false
    })
  }
}

watch(()=>props.componentType,val=>{
  // 这边设置 stopEmit是因为组件类型更新的时候会触发2次接口请求更新，优化一下,做一个更新标识器。
  updateOption()
})
initCommonOption()
watch(()=>fieldsOption,throttle(onOptionChange,2000),{ deep:true })

function updateOption (){
  stopEmit.value = true
  initCommonOption()
}
function addOptionItem (){
  let item = {
    [fieldsOption.dynamicConfig.label]:'',
    [fieldsOption.dynamicConfig.value]:''
  }
  settingOptions.value.push(item)
}
function onDelete (index:number){
  settingOptions.value.splice(index,1)
}

function handleNodeClick (node){

}
defineExpose({
  updateOption
})

</script>


<style lang="scss" scoped>

.option-data-box{
  display: flex;
  flex-direction: column;
  flex: 1;
  .option-list{
    margin-top: 10px;
    .option-item{
      display: flex;
      align-items: center;
      position: relative;
      .delete{
        position: absolute;
        left: -40px;
        font-size: 14px;
        color:rgba(3, 102, 241, 1) ;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
      }
      &~.option-item{
        margin-top: 10px;
      }
      .sort{
        width: 80px;
        box-shadow: 1px ;
        margin-left: 10px;
      }
      .label,.value{
        flex: 1;
      }
      .value{
        margin-left: 10px;
      }
    }
  }
}

.switch-group{
  display: flex;
  margin-bottom: 10px;
  span{
    white-space: nowrap;
    color:rgba(3, 102, 241, 1) ;
  }
  .el-input{
    margin-left: 10px;
  }
}

.custom-tree-node{

}

.tree-panel{
  width: 100%;
  ::v-deep(.custom-tree-node){
    display: flex;
    flex: 1;
    .node-label{
      margin-right: auto;
    }
    a{
      color: dodgerblue;
    }
  }
}
.footer{
  display: flex;
  justify-content: flex-end;
}
</style>

