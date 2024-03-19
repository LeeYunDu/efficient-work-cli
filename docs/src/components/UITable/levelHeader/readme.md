<script setup>
import { ref} from 'vue'
import img01 from './dome.png'
import imagePreview from '@/global/components/imagePreview.vue'

// import table from './table.vue'
</script>

# 多级表头
## 使用说明
ui-table 组件的多级表头的实践。

该文档不支持加载ui-table组件,具体表现请查看云南招商投促项目的报表中心模块。
## 示例

<imagePreview :data="[img01]"></imagePreview>
``` vue 
<template>
  <ui-table
    ref="uiTableRef"
    :props="tableProps"
    :options="pageOptions"
    :data="state.data"
    :columns="useColumns"
  >
    <template #column="{current,useData,row,column}">
      <!-- {{  "key", "current", "useData", "store", "_self", "column", "row", "$index", "cellIndex", "expanded" }} -->
      <el-table-column
        v-for="(item,index) in current.children"
        :key="item.key"
        :prop="item.key"
        v-bind="item.props"
        :label="item.label"
        :min-width="item.label.length * 25 + 10"
      >
        <template v-if="item.children">
          <el-table-column
            v-for="(cI) in item.children"
            :key="cI.key"
            :prop="cI.key"
            v-bind="cI.props"
            :label="cI.label"
            :min-width="cI.label.length * 25 + 10"
          />
        </template>
      </el-table-column>
    </template>
  </ui-table>
</template>

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

let useColumns = [
  { label: '项目代码', key: 'colA', props: { width: 'auto', minWidth: '160px', sortable: true } },
  { label: '项目名称', key: 'colB', props: { width: 'auto', minWidth: '120px' } },
  { label: '投资项目在线审批监管平台统一代码', key: 'colC', props: { width: 'auto', minWidth: '320px' } },
  { label: '合作企业名称', key: 'colD', props: { width: 'auto', minWidth: '150px' } },
  { label: '是否央企', key: 'colE', props: { width: 'auto', minWidth: '100px' } },
  { label: '是否上市', key: 'colF', props: { width: 'auto', minWidth: '100px' } },
  { label: '是否固定资产投资类项目', key: 'colG', props: { width: 'auto', minWidth: '220px' } },
  {
    label: '是否入住国家级开发区', key: 'test', type: 'slot', slotName: 'column', props: { width: 'auto', showOverflowTooltip: true }, children: [
      { label: '是/否', key: 'colH', props: { minWidth: '100px' } },
      { label: '园区代码', key: 'colI', props: { minWidth: '120px' } },
    ],
  },
  {
    label: '是否入住省级开发区', key: 'test', type: 'slot', slotName: 'column', props: { width: 'auto', }, children: [
      { label: '是/否', key: 'colJ', props: { minWidth: '100px' } },
      { label: '园区代码', key: 'colK', props: { minWidth: '120px' } },
    ],
  },
  {
    label: '合作方基本情况', key: 'test', type: 'slot', slotName: 'column', props: { width: 'auto', }, children: [
      { label: '企业名称', key: 'colL', props: { minWidth: '150px' } },
      { label: '项目企业所在地', key: 'colM', props: { minWidth: '240px' } },
    ],
  },
  { label: '项目所在地', key: 'colN', props: { width: 'auto', minWidth: '140px' } },
  { label: '签约时间', key: 'colO', props: { width: 'auto', minWidth: '140px' } },
  { label: '行业类别', key: 'colP', props: { width: 'auto', minWidth: '140px' } },
  { label: '产业类别', key: 'colQ', props: { width: 'auto', minWidth: '140px' } },
  { label: '开工时间', key: 'colR', props: { width: 'auto', minWidth: '140px' } },
  { label: '项目投产时间', key: 'colS', props: { width: 'auto', minWidth: '160px' } },
  { label: '合作方式', key: 'colT', props: { width: 'auto', minWidth: '140px' } },
  {
    label: '项目协议总投资额（万元）资金来源', key: 'test', type: 'slot', slotName: 'column', props: { width: 'auto', }, children: [
      { label: '合计', key: 'colU', props: { minWidth: '120px' } },
      { label: '其中：我方', key: 'colV', props: { minWidth: '140px' } },
      {
        label: '合作方', key: 'name', type: 'slot', props: { width: 'auto' }, children: [
          { label: '小计', key: 'colW', props: { minWidth: '120px' } },
          { label: '省外', key: 'colX', props: { minWidth: '120px' } },
          { label: '其他州市', key: 'colY', props: { minWidth: '120px' } },
          { label: '本州市', key: 'colZ', props: { minWidth: '120px' } },
        ]
      },
    ],
  },
  {
    label: '自开始建设至本月末累计到位资金（万元）资金来源', key: 'test', type: 'slot', slotName: 'column', props: { width: 'auto', }, children: [
      { label: '合计', key: 'colAA', props: { minWidth: '120px' } },
      { label: '其中：我方', key: 'colAB', props: { minWidth: '140px' } },
      {
        label: '合作方', key: 'name', type: 'slot', props: { width: 'auto' }, children: [
          { label: '小计', key: 'colAC', props: { minWidth: '120px' } },
          { label: '省外', key: 'colAD', props: { minWidth: '120px' } },
          { label: '其他州市', key: 'colAE', props: { minWidth: '120px' } },
          { label: '本州市', key: 'colAF', props: { minWidth: '120px' } },
        ]
      },
    ],
  },
  {
    label: '自年初至本月末累计到位资金（万元）资金来源', key: 'test', type: 'slot', slotName: 'column', props: { width: 'auto', }, children: [
      { label: '合计', key: 'colAG', props: { minWidth: '120px' } },
      { label: '其中：我方', key: 'colAH', props: { minWidth: '140px' } },
      {
        label: '合作方', key: 'name', type: 'slot', props: { width: 'auto' }, children: [
          { label: '小计', key: 'colAI', props: { minWidth: '120px' } },
          { label: '省外', key: 'colAJ', props: { minWidth: '120px' } },
          { label: '其他州市', key: 'colAK', props: { minWidth: '120px' } },
          { label: '本州市', key: 'colAL', props: { minWidth: '120px' } },
        ]
      },
    ],
  },
]


</script>

<style lang="scss" scoped>
 
</style>

```