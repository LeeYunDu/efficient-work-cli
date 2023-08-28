<template>
  <section class="page-view">
    <section class="content">
      <section class="page-top">
        <div class="table-query-from">
          <ui-form
            v-bind="tableQueryFormOptions"
            ref="queryFormRef"
            :model="curParams"
            @change="onChange"
          />
        </div>
      </section>
      <section class="page-center">
        <div class="table-box">
          <ui-table
            v-bind="tableOptions"
            ref="uiTableRef"
            @change="onChange"
            :props="{
              border:true
            }"
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
      </section>
    </section>
  </section>

  <addModel 
    v-model="state.addModalShow" 
    v-model:row="state.row" 
    @reload="asyncData" 
  />

  <detailModel  v-model="state.detailModalShow"  />
</template>
<script lang="ts" setup>
import { ref, reactive, watch, shallowRef } from 'vue'
import { get } from 'lodash-es'
import { UiTable ,UiForm } from 'static/lib/entry'
import { ElMessage } from 'element-plus'
import { tableColumn , tableQueryFormOptions } from './json'

const props = defineProps({
  group: { type: Object, default: () => ({}) },
  data: { type: Object, default: () => ({}) },
  queryParams: { type: Object, default: () => ({}) }
})

let queryFormRef = shallowRef<null|InstanceType<typeof UiForm>>(null)
let uiTableRef = shallowRef<null|InstanceType<typeof UiTable>>(null)
let state = reactive({
  row:{},
  addModalShow: false,
  detailModalShow: false,
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
  row._modalType = key
  state.row = row
  const actionMap:any = {
    'add':()=>{
      state.addModalShow=true
    },
    'detail': () => {
      state.detailModalShow=true
    },
    'edit': () => {
      state.addModalShow=true
    },
    'down': () => ({}),
    'delete': () => {},
  }
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
const sortChange=async (item:any)=>{
  curParams.value.sort=item && item.order?item.prop+(item.order==='ascending'?'+':'-'):undefined
  onChangeCurrent(1)
}
watch(
  () => {
    return props.queryParams
  },
  () => {
    onChangeCurrent(1)
  },
  { deep: true,immediate:true }
)

</script>

<style lang="scss" scoped>
.page-view{
  :deep {
    table {
      tbody {
        tr {
          &.hover-row {
            background: #e3eaf3 !important;
            td {
              background: transparent !important;
            }
          }
        }
      }
    }
  }


  .content{
    display: flex;
    flex-direction: column;

    .page-center {
      padding: 10px 0 20px;
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      .table-box{
        flex: 1;
        overflow: hidden;
      }
    }

    .page-top{
      border-bottom: 1px solid #ECECEC;
      padding: 0 24px;
      padding-top: 24px;
    }
  }



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
}

</style>
