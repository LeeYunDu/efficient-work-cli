<template>
  <div>
    <FormOptionPanel
      :component-option="componentOption"
      @update="onViewUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { MenuMode } from '@/typings/data'
import { cloneDeep, get } from 'lodash-es'
import { ComponentOption } from 'static/lib/group-content/index'
import { inject ,ComputedRef,computed, reactive,watch, PropType } from 'vue'
import { FormComponentOptions, TooltipMsg } from './types/model'
// import viewTooltip from './common/tooltip.vue'
// import FormOptionPanel from './components/form.option.panel.vue'

let props = defineProps({
  componentOption: {
    type: Object as PropType<ComponentOption>,
    default: () => ({})
  },
})

const emits = defineEmits(['update','viewUpdate'])
let fieldIdGroup: ComputedRef<{ [x: string]: MenuMode }> = (inject('fieldIdGroup') as ComputedRef<{ [x: string]: MenuMode }>)

let state = reactive({
  checkedFields:[]
} as any)

watch(()=>fieldIdGroup.value,val=>{
  let { viewFieldGroup } = val
  state.checkedFields = Object.values(viewFieldGroup)
},{ immediate:true,deep:true })
const selectGroup = computed(()=>{
  let { menuFieldGroup ,viewFieldGroup,historyFields } = fieldIdGroup.value
  const unuseFields:MenuMode[] = []
  const useFields:MenuMode[] = []
  const deleteFields:MenuMode[] = []
  Object.keys(historyFields).forEach((id:string)=>{
    let field:MenuMode = (historyFields as any)[id]
    if(!(id in menuFieldGroup)){
      deleteFields.push(field)
    }else if (id in viewFieldGroup){
      useFields.push(field)
    }else{
      unuseFields.push(field)
    }
  })

  return [
    { label:'正在使用', options:useFields  },
    { label:'菜单配置中有,但视图未使用', options:unuseFields  },
    { label:'历史字段', options:deleteFields  },

  ]
})

/**
 * 字段对比分析
 * 统计未使用的字段、统计已使用的字段名称是否发生更新（更新的判断标准为key、name）
 */
const fieldContrastTooltips = computed<TooltipMsg[]>(()=>{
  let { menuFieldGroup ,viewFieldGroup } = fieldIdGroup.value
  const unuseFields:MenuMode[] = []
  const updateFields:MenuMode[] = []
  const updateInfos:TooltipMsg[] = []
  Object.keys(menuFieldGroup).forEach((id:string)=>{
    let field:MenuMode = (menuFieldGroup as any)[id]
    if(id in viewFieldGroup){
      let { name,key } = field
      let viewField:MenuMode = (viewFieldGroup as any)[id]
      //  需要对比关注的字段信息
      let status: { [x: string]: boolean } = {
        name: name === viewField.name,
        key: key === viewField.key
      }
      let noChange = true
      for (const statuskey in status) {
        if (Object.prototype.hasOwnProperty.call(status, statuskey)) {
          const element = status[statuskey]
          if (!element) {
            noChange = false
            updateInfos.push({
              field:viewField,
              nKey:statuskey,
              msg:`view中${viewField.name}的${statuskey}与Menu表中的不一致`
            })
          }
        }
      }
      if (!noChange) {
        updateFields.push(viewField)
      }
    } else {
      unuseFields.push(field)
    }
  })

  return updateInfos
})

function onCheckChange (items:MenuMode[]){
  let deepComponentOption = cloneDeep(props.componentOption)
  let options:FormComponentOptions = deepComponentOption.options as  FormComponentOptions
  options.component.labels = items
  emits('update',deepComponentOption)
}

function onViewUpdate (options:any){
  emits('viewUpdate',options)
}


</script>


<style lang="scss" scoped>
.select-box{
  width: 100%;
  margin: 10px 0;
  // height: 300px;
  .select-trigger{
    // height: 100%;
  }

  ::v-deep(.select-trigger){
    // height: 100%;
    .el-select__tags{
      // height: 100%;
    }
  }
}
</style>
