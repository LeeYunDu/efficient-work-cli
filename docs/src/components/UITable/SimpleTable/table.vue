
<template>
  <div class="table-box list-page-view">
    <ui-table
      v-bind="tableOptions"
      @change="onChange"
      @sort="sortChange"
    >
      <template #action="{row,config}">
        <template v-for="btn in actionButtons" :key="btn.key">
          <span
            v-if="showBtns(btn.key, row)"
            class="action-btn"
            type="text"
            @click="onAction(btn.key, row)"
          >{{ btn.label }}</span>
        </template>
      </template>
    </ui-table>
  </div>
</template>

<script lang="ts" setup>
import { reactive,ref,inject,computed, provide } from 'vue'
import { ElMessage } from 'element-plus'
import { get } from 'lodash-es'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  row: { type: Object, default: () => ({}) },
  fields: {
    type: Array,
    default: () => {
      ;[]
    }
  },
})

const emits = defineEmits(['update:modelValue','update:row'])

const row = computed(() => props.row || {})

const state = reactive({
  show: false,
  data:{},
  row:{},
  dialogShow:false
})

let tableOptions = reactive({
  props:{
    border: false,
    height: '100%',
    select: false,
    rowKey: 'id',
    stripe: false,
    currentRowkey: 'id'
  },
  options:{
    autoScroll:false,
    pagination:false,
    pagination2:{
      total:0,
      mapper:{
        currentPage:'pageNum',
      },
      props:{
        pageSize:10,
        pageNum:1
      }
    },
  },
  data:[],
  columns:props.fields,
})

const actionButtons = ref([
  { label:'详情',key:'detail' },
  { label:'编辑',key:'edit' },
  { label:'下架',key:'down' },
  { label:'删除',key:'delete' },
])

function showBtns (key:string, row:any):boolean {
  const active:any = {
    'detail': true,
    'edit': true,
    'delete': true,
    'down': true,
  }
  return active[key]
}

const onAction = (key:string, row:any) => {
  state.row = row
  const actionMap:any = {
    'detail': () => ({}),
    'edit': () => ({}),
    'down': () => ({}),
    'delete': () => ({}),
  }
  actionMap[key] && actionMap[key](row)
}



function onClosed () {
  emits('update:row', {})
}

const curParams:any = ref({
  pageNum: 1,
  pageSize: 10
})

// 加这段是为了修复列表分页页数为1时，组件未变化。
provide('szzt-components-core-engine',{
  dataRef:null,
  paramsRef: curParams,
  // group:{
  //   _base:{
  //     SINGLE_ASYNC:'tableFilter'
  //   }
  // }
})

function onChange (opts:any){
  let { params } = opts
  Object.assign(curParams.value,params)
  asyncData()
}

const onChangeCurrent = (value: number) => {
  asyncData()
}

const sortChange=async (item:any)=>{
  curParams.value.sort=item && item.order?item.prop+(item.order==='ascending'?'+':'-'):undefined
  onChangeCurrent(1)
}

const asyncData = async () => {
  const params: any = Object.assign({},  curParams.value || {})
  // const { success, errMsg, data }: any = await apiName(params)
  const  { success, errMsg, data }: any = { success:true,errMsg:'',data:{
    list:new Array(10).fill({
      name:'mock'
    }),total:10
  } }
  if (!success) return ElMessage.error(errMsg)
  tableOptions.data= get(data || {}, 'list', [])
}
</script>

<style lang="scss" scoped>


</style>
