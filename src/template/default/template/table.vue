<template>
  <div>
    <ui-table
      v-bind="tableOptions"
      @change="onChange"
      @onSort="sortChange"
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
import { reactive, ref } from 'vue';
import { tableColumn  } from './json'
import { ElMessage } from 'element-plus'
import { get } from 'lodash-es'
import { UiTable  } from 'static/lib/entry'


const props = defineProps({
  group: { type: Object, default: () => ({}) },
  data: { type: Object, default: () => ({}) },
  queryParams: { type: Object, default: () => ({}) }
})

let tableOptions = reactive({
  props:{
    border: false,
    height: undefined,
    select: false,
    rowKey: 'id',
    stripe: false,
    currentRowkey: 'id'
  },
  options:{
    pagination:{
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
  columns:tableColumn,
})


let state = reactive({
  data:[],
  show:false,
  row:{}
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
  const actionMap:any = {
    'detail': () => ({}),
    'edit': () => ({}),
    'down': () => ({}),
    'delete': () => ({}),
  }
  state.row = row
  actionMap[key] && actionMap[key](row)
}

const curParams:any = ref({
  pageNum: 1,
  pageSize: 10
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
  const params: any = Object.assign({}, props.queryParams || {}, curParams.value || {})
  // const { success, errMsg, data }: any = await apiName(params)
  const  { success, errMsg, data }: any = { success:true,errMsg:'',data:{
    list:new Array(10).fill({
      name:'mock'
    }),total:10
  } }
  if (!success) return ElMessage.error(errMsg)
  tableOptions.data= get(data || {}, 'list', [])
  tableOptions.options.pagination.total = get(data || {}, 'total', 0)
}

asyncData()
</script>

<style lang="scss" scoped>
   .action-btn{
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #125DD5;
    margin-left:12px ;
    cursor: pointer;
    position: relative;

    &~.action-btn{
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
</style>
