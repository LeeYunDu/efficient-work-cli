<template>
  <section class="visit_service_view">
    <section class="content">
      <section class="page_top"></section>
      <section class="page_center">
        <ui-table
          :columns="columns"
          :data="tableData"
          :props="state.props"
          :options="{pagination:false}"
          @onSort="sortChange"
        >
          <template #unit="{row,config}">
            <span>{{row[config.key] || row[config.key]===0?row[config.key]: ''}}</span>
            <span v-if="row[config.key] || row[config.key]===0">{{ config.unit }}</span>
          </template>
        </ui-table>
      </section>

    </section>
  </section>
</template>
<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import { get } from 'lodash-es'
import { UiTable } from 'static/lib/entry'
import { ElMessage,ElLoading } from 'element-plus'
const props = defineProps({
  group: { type: Object, default: () => ({}) },
  data: { type: Object, default: () => ({}) },
  queryParams: { type: Object, default: () => ({}) }
})



const curParams:any = ref({})
const columns = ref([
 {
    label: '序号',
    key: 'index',
    props: {
      minWidth: '100px'
    }
  },
  {
    label: '单位22类型',
    key: 'deptType',
    props: {
      minWidth: '100px'
    }
  },
  {
    label: '部门名称',
    key: 'deptName',
    props: {
      minWidth: '120px'
    }
  },
  {
    label: '办理件数',
    key: 'appealCount',
    props: {
      minWidth: '100px',
      sortable: 'custom'
    }
  },
  {
    label: '办结件数',
    key: 'hadFinished',
    props: {
      minWidth: '100px',
      sortable: 'custom'
    }
  },
  {
    label: '办结率',
    key: 'hadFinishedRate',
    type:'slot',
    slotName:'unit',
    unit:'%',
    props: {
      minWidth: '100px',
      sortable: 'custom'
    }
  },
  {
    label: '办理件数率',
    key: 'hadFinishedNumRate',
    type:'slot',
    slotName:'unit',
    unit:'%',
    props: {
      minWidth: '100px',
      sortable: 'custom'
    }
  },
  {
    label: '办理满意度',
    key: 'satisfactionRate',
    type:'slot',
    slotName:'unit',
    unit:'%',
    props: {
      minWidth: '100px',
      sortable: 'custom'
    }
  },
  {
    label: '得分',
    key: 'score',
    props: {
      minWidth: '100px',
      sortable: 'custom'
    }
  }
])
const pageParams=ref({
  pageNum: 1,
  pageSize: 20
})
const tableData = ref([])
const total = ref(0)
const state = reactive({
  props: {
    border: false,
    height: undefined,
    select: false,
    rowKey: 'id',
    stripe: false,
    currentRowkey: 'id'
  },
  pageOptions: {
    pageSizes: [10, 20,30,40, 50,60,70,80,90, 100, 200],
    background: true,
    layout: 'total,sizes, prev, pager, next, jumper'
  }
})

const onChangeCurrent = (value: number) => {
  pageParams.value.pageNum = value
  asyncData()
}
const onChangeSize = (value: number) => {
  pageParams.value.pageSize = value
  onChangeCurrent(1)
}

const asyncData = async () => {
  const params: any = Object.assign({},pageParams.value || {}, props.queryParams || {}, curParams.value || {})

  // const { success, errMsg, data }: any = await apiName(params)
  const  { success, errMsg, data }: any = {success:true,errMsg:'',data:{list:[],total:0}}
  if (!success) return ElMessage.error(errMsg)
  tableData.value= get(data || {}, 'list', [])
  total.value = get(data || {}, 'total', 0)
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
.visit_service_view {
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
  .page_center {
    padding: 10px 0 20px;
  }
  .isClick {
    cursor: pointer;
    color: #409eff;
  }
  .timeRemain_box {
    width: 100%;
    text-align: center;
    line-height: 20px;
    span {
      display: inline-block;
      vertical-align: middle;
    }
    .icon_time_remain {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #2ea561;
      margin-right: 8px;
    }
    &.warning {
      .icon_time_remain {
        background: #f59a24;
      }
    }
    &.over {
      .icon_time_remain {
        background: #d9071b;
      }
    }
  }
}
</style>
