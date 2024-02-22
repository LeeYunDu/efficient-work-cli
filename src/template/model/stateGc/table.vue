<template>
  <section class="page-view">
    <div class="content">
      <div class="page-center">
        <section class="table-box">
          <ui-table
            v-bind="tableOptions"
            :columns="fields"
            :props="tableProps"
            @change="onChange"
          >
            <template #action="{ row, config }">
              <template v-for="btn in tBtns" :key="btn.key">
                <span
                  v-if="showBtns(btn.key, row)"
                  class="action-btn"
                  type="text"
                  @click="onAction(btn.key, row)"
                >{{
                  btn.label }}</span>
              </template>
            </template>
          </ui-table>
        </section>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { GroupItem } from '@static/lib/group-content'
import { useModule, useSingleAsync, useSubscribe } from '@static/lib/hooks'
import { ref, defineProps, PropType, watch, reactive,provide} from 'vue'
import { BtnItem } from '@static/lib/typings/items'
import { useRouter } from 'vue-router'
import { cloneDeep, get } from 'lodash-es'
import { computed } from 'vue'
import { ResponseMode } from '@/typings/params'
import { ElMessage, ElMessageBox } from 'element-plus'

const props = defineProps({
// data: { type: Object as PropType<ScencePageRo>, default: () => ({}) },
  group: { type: Object as PropType<GroupItem>, default: () => ({}) }
})

// hooks
const router = useRouter()
const { fields, btns, transformData } = useModule({ dataPath: 'list' })
const { btns: tBtns } = useModule({ id: 116009 })

const curParams = ref<any>({
  pageNum: 1,
  pageSize: 10
})

provide('szzt-components-core-engine',{
  dataRef:null,
  paramsRef: curParams,
  // group:{
  //   _base:{
  //     SINGLE_ASYNC:'tableFilter'
  //   }
  // }
})

const useTabOptions = computed(() => {
  return [
    { name:'待处理',key:'y1',id:'y1' },
    { name:'处理中',key:'y2',id:'y2' },
    { name:'已处理',key:'y3',id:'y3' },
  ]
})

let tableOptions = reactive({
  props: {
    border: false,
    height: undefined,
    select: false,
    rowKey: 'id',
    stripe: false,
    currentRowkey: 'id'
  },
  options: {
    pagination: {
      total: 0,
      mapper: {
        currentPage: 'pageNum',
      },
      props: {
        pageSize: 10,
        pageNum: 1
      }
    },
  },
  data: []
})

let state = reactive({
  show: false,
  countData:{}
})

// fns
async function asyncData (paramsData?: any) {
  try {
    const params: any = Object.assign({}, curParams.value || {})
    // const {status, success, msg, data } = await apiName(params)
    const { status, success, msg, data } = {
      status: 200, success: true, msg: '', data: {
        list: new Array(10).fill({
          name: 'mock'
        }), total: 10
      }
    }
    if (!(status === 200)) return ElMessage.error(msg)
    tableOptions.data = get(data || {}, 'list', [])
    // tableOptions.data= transformTableData(columns,get(data || {}, 'list', []))
    tableOptions.options.pagination.total = get(data || {}, 'total', 0)
  } catch (error) {
    console.log(error)
  }
}

function showBtns (key: string, row: any): boolean {
  const active: any = {
    'detail': true,
    'edit': true,
    'delete': true,
    'down': true,
  }
  return active[key]
}

const onAction = (key: string, row: any) => {
  const actionMap: any = {
    'detail': () => ({}),
    'edit': () => ({}),
    'down': () => ({}),
    'delete': () => ({}),
  }
  state.row = row
  actionMap[key] && actionMap[key](row)
}

function onChange (opts: any) {
  let { params } = opts
  Object.assign(curParams.value, params)
  asyncData()
}
// subscribe
useSubscribe('table-query').subscribe((opts: any) => {
  const { params: uParams } = opts || {}
  Object.assign(curParams.value, uParams)
  asyncData()
})
</script>

<style lang="scss" scoped>

</style>
