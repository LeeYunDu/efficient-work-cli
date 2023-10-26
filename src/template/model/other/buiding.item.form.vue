
<template>
  <div>
    <ModuleTitle title="楼栋信息">
      <ActionButtons :fields="actionBtns" />
    </ModuleTitle>
    <div class="buiding-list">
      <template v-for="(item, index) in state.data" :key="index">
        <div
          class="buiding-item"
          :class="{active:state.activeIndex == index}"
          @click="onClick(item,index)"
        >
          {{ item.title }}
        </div>
      </template>
    </div>
    <div v-if="state.active" class="form-panel">
      <div class="delete-panel" @click="onDelete">
        <div class="font">
          <span>删除</span>
        </div>
        <img class="icon-delete" src="@static/images/space-manage/form-delete.png" alt="">
      </div>
      <UiForm
        v-bind="addFormOptions"
        ref="formRef"
        :labels="BuidingformFields"
        :model="state.active"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, shallowRef, watch } from 'vue'
import { get } from 'lodash-es'
import { UiForm } from '@static/lib/entry'
import { FieldItem, FormMode, ItemMode } from '@/typings/items'
import { BuidingformFields } from '../json'
import ModuleTitle from '@/views/common/module.title.vue'
import ActionButtons from '@/views/common/action.button.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  row: { type: Object, default: () => ({}) },
  modalType: {
    type: String,
    default: 'add'
  }
})

const emits = defineEmits(['update:modelValue', 'update:row', 'success','verify'])

const state = reactive({

  data: [],
  params: {

  },
  activeIndex:0,
  active:null
})


watch(()=>props.modelValue,val=>{
  console.log(val,'val')

  if(val){
    state.data = val
    if(state.data.length>0 && state.active == null){
      state.active = state.data[0]
    }
  }
},{ immediate :true,deep:true })


watch(()=>state.data,val=>{
  let result = true
  if(val.length > 0){
    let requiredFields = BuidingformFields.filter(item=>{
      let required = get(item,'props.required',false)
      return required
    })
    let item = state.data[state.data.length - 1]
    for (let index = 0; index < requiredFields.length; index++) {
      const element = requiredFields[index]
      let data =  get(item,element.key)
      if(!data){
        result = false
        break
      }
    }
  }else{
    result = false
  }
  emits('verify',result)
  emits('update:modelValue',val)
},{ deep:true,immediate:true })

const row = computed(() => props.row || {})
let actionBtns = ref<FieldItem[]>([
  {
    label: '新增楼栋', key: 'add', icon: 'icon-add.png', click: () => {
      state.data.push({
        title:'楼栋' + Number(state.data.length + 1)
      })
      state.active = get(state.data,state.data.length-1,null)
      state.activeIndex = state.data.length - 1
    }
  }
])

const addFormOptions = {
  props: {
    inline: true,
    labelWidth: 'auto',
    labelPosition: 'top',
    rules: []
  },
  options: {
    gridItem: { span: 24 }
  }
}
let formRef = shallowRef<null | InstanceType<typeof UiForm>>()



function onDelete (){
  state.data.splice(state.activeIndex,1)
  state.activeIndex = 0
  state.active = get(state.data,'0',null)
}

function onClick (item,index){
  state.activeIndex = index
  state.active = item
}



</script>

<style lang="scss" scoped>
:deep .el-dialog__body {
  // height: 500px;
  // min-height: 500px;
  // max-height: 600px;
  display: flex;
  flex-direction: column;
}


.buiding-list {
  display: flex;
  margin-bottom: 20px;

  .buiding-item {
    width: 102px;
    cursor: pointer;
    height: 44px;
    background: #F2F5F8;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    font-size: 16px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #686B73;
    line-height: 44px;
    text-align: center;
    margin-right: 12px;

    &.active {
      color: #FFFFFF;
      background: #0366F1;

    }
  }
}

.form-panel {
  background: #FFFFFF;
  box-shadow: 0px 0px 10px 0px #E0E6EE;
  border-radius: 10px 10px 10px 10px;
  padding: 30px 40px;
  opacity: 1;
  position: relative;


  .delete-panel{
    position: absolute;
    right: 0;
    top: 0;
    .font{
    }
    span {
      cursor: pointer;
      text-align: right;
      color: white;
      position: absolute;
      right: 12px;
      top: 12px;
      transform: rotate(45deg);;
    }
  }

  .icon-delete {
    width: 118px;
    height: 81px;



  }
}
</style>
