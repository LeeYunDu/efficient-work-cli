<template>
  <div class="view-component ui-table-container">
    <ui-table
      v-bind="tableOptions"
      @sort="sortChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { useModule,useSingleAsync} from 'static/lib/hooks'
import { computed, inject, reactive, ref } from 'vue'
import { engineInjectionKey, gcInjectionKey } from 'static/lib/group-content'
let props = defineProps({
  data: {
    type: Array,
    default: () => ([])
  },
  group: {
    type: Object,
    default: () => {
      return {}
    }
  },
  params: {
    type: Object,
    default: () => ({})
  }
})


const { fields } = useModule()
const useData = computed<any>(() => [
  { x1:'1~2亿',y1:'6',y2:'2' },
  { x1:'2~5亿',y1:'5',y2:'2' },
  { x1:'5~10亿',y1:'4',y2:'2' },
  { x1:'大于亿',y1:'3',y2:'2' },
  { x1:'其他',y1:'9',y2:'2' },
])


let tableOptions = reactive({
  props: {
    border: false,
    height: undefined,
    select: false,
    rowKey: 'id',
    stripe: false,
    currentRowkey: 'id',
  },
  options: {
    pagination: false
  },
  data: useData.value,
  columns: fields,
})

const sortChange = async (item: any) => {
  currentParams.value.orderType = item && item.order ? item.prop + (item.order === 'ascending' ? '_ASC' : '_DESC') : undefined
  asyncData()
}
let currentParams = ref({
  orderType:''
})

const { group: provideGroup }: any = inject(engineInjectionKey) || {}
const { pubsubKeys }: any = inject(gcInjectionKey) || {}
async function asyncData (){
  let params = Object.assign({},props.params,currentParams.value)
  
  await useSingleAsync(provideGroup, {
    params,
    SINGLE_ASYNC: pubsubKeys.SINGLE_ASYNC
  })
}

</script>

<style lang="scss" scoped>
.view-component{
  height: 100%;
  overflow: hidden;
}

.ui-table-container{
  .ui-table{
    .el-table{
      background-color: transparent!important;
      border: none;
      height: 100%;
      th.el-table__cell{
        font-size: 14px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #A5D5FB;
        background: rgba(0,133,238,0.18);
        border: none;
        padding: 7px 0;
        .cell{
          white-space: nowrap;
        }
      }
      tr{
        background-color: transparent;
        border: none;
        background-repeat: no-repeat;
        background-size: 100%;
        td{
          border: none!important;
          font-size: 14px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #FFFFFF;
        }

        &:hover{
          td{
            background: transparent !important;
          }
        }
      }

      .el-table__inner-wrapper{
        &::before{
          display: none;
        }

        
      }
    }
  }
}
</style>
