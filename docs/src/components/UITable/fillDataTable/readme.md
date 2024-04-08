<script setup>
import { ref} from 'vue'
// import table from './table.vue'
</script>

# 对比表格
## 使用说明
ui-table 组件的填报表格的实践。

该文档不支持加载ui-table组件,具体表现请查看云南招商投促项目的项目填报模块。
## 固定数量的对比项示例
实现思路

1. 确认好表头列

示例图片
``` vue
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { UiTable } from 'static/lib/entry'

let state = reactive({
  data:[],
  show:false
})

const tableProps = ref({
  border: true,
  height: '100%',
  select: false,
  rowKey: 'id',
  stripe: false,
  currentRowkey: 'id',
  fit:true,
  tooltipEffect:'light',
  showOverflowTooltip:true
})

const pageOptions:any = ref({
  total:0,
  mapper:{
    currentPage:'pageNum',
  },
  props:{
    pageSize:10,
    pageNum:1
  }
})

const asyncData = async () => {
  const params: any = Object.assign({},  curParams.value || {},{
    id:row.value.id
  })
  const { success, errMsg, data }: any = await apiName(params)
  if (!success) return ElMessage.error(errMsg)
  state.cloneData = cloneDeep(data)
  let arr = new Array(2).fill(1)
  let useColumn = [
    { label:'比对项',key:'key',type:''   },
    { label:'推介项目',type:'slot',key:'tjxm',slotName:`tjxm` },
    { label:'签约项目',type:'slot',key:'qyxm',slotName:`qyxm` },
  ]
  let result = []
  let tableColumn = comparisonDetailColumn()
  tableColumn.forEach(item=>{
    let obj = {  key:item.label,   keyValue:item.key  }
    if(get(item,'props.keyMap')){
      set(obj,'tjxmKey',get(item,'props.keyMap.tjxm'))
      set(obj,'qyxmKey',get(item,'props.keyMap.qyxm'))
    }else{
      set(obj,'tjxmKey',get(item,'key'))
      set(obj,'qyxmKey',get(item,'key'))
    }
    set(obj,'props',get(item,'props'))

    result.push(obj)
  })
  let tjData = cloneDeep(tableColumn).map(item=>{
    item.key = get(item,'props.keyMap.tjxm',item.key)
    return item
  })
  let qyData = cloneDeep(tableColumn).map(item=>{
    item.key = get(item,'props.keyMap.qyxm',item.key)
    return item
  })
  let useData = [].concat(
    transformTableData(tjData,[data.recommendResult]),
    transformTableData(qyData,[data.signResult])
  )
  useData.forEach((item,index)=>{
    result.map(o=>{
      set(o,`${index==0?'tjxm':'qyxm'}`,get(item,o.keyValue,''))
      set(o,`${index==0?'tjxm':'qyxm'}extInfo`,item)
    })
  })

  state.data = result
  state.columns = useColumn

}


</script>

<style lang="scss" scoped>
 
</style>

```