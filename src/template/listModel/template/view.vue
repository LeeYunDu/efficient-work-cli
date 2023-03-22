
<template>
  <section class="view-component">
    <div class="table-list">
      <SimpleTable
        v-model:pageNun="table.params.pageNum"
        v-bind="table"
        :loading="state.loading"
        :data="tableData"
        @pageChange="() => asyncData()"
      >
        <template #tableHeader>
          <div class="table-header-box">
            <div class="query-box">
              <SimpleInput
                v-model="table.params.peojectName"
                clearable
                :style="{ width: `${240 / 192}rem` }"
                placeholder="名称搜索"
              />
              <SimpleInput
                v-model="table.params.month"
                :inline="true"
                :style="{ width: `${270 / 192}rem` }"
                clearable
                slot-key="month"
              >
                <template #month>
                  <el-date-picker
                    v-model="table.params.month"
                    size="large"
                    type="month"
                    placeholder="请选择月份"
                  />
                </template>
              </SimpleInput>
              <SimpleInput :style="{ width: `${200 / 192}rem` }" slot-key="button">
                <template #button>
                  <el-button-group>
                    <el-button type="primary" @click="asyncData">查询</el-button>
                    <el-button @click="onReset">重置</el-button>
                  </el-button-group>
                </template>
              </SimpleInput>
            </div>
            <el-button
              type="primary"
              @click="onAction('add',{})"
            >
              新增
            </el-button>
          </div>
        </template>

        <template #slotName="{ $column, $row }">
          插槽内容
        </template>
        <template #action="{ $column, $row }">
          <template v-for="btn in $column.btns" :key="btn.key">
            <span
              v-if="showBtns(btn.key, $row)"
              class="action-btn"
              type="text"
              @click="onAction(btn.key, $row)"
            >{{ btn.label }}</span>
          </template>
        </template>
      </SimpleTable>
    </div>
    <addDialog
      v-model="state.addModalShow"
      v-model:row="state.row"
      v-model:model="state.model"
      :form-fields="formFields"
      :config-props="formModalConfigProps"
      @reload="asyncData"
    />
    <detailDialog v-model="state.detailModalShow" />
  </section>
</template>

<script setup>
import SimpleTable from '@/views/components/SimpleTable/view.vue'
import SimpleInput from '@/views/components/Simple.input.vue'
import { tableColumns,formFields } from './json'
// import { apiName } from '@/api'
import { ElMessageBox } from 'element-plus'


const tableData = computed(() => table.data || [
  {
    field1:'字段1',
    field2:'字段2',
    field3:'字段3',
    field4:'字段4',
    field5:'字段5',
  }
])



const table = reactive({
  columns: tableColumns,
  total: 0,
  data: [],
  params: {
    pageNum: 1,
    pageSize: 10,
  }
})


const state = reactive({
  addModalShow: false,
  detailModalShow: false,
  loading: false,
  row: {},
  model:'add'
})

const formModalConfigProps = ref({
  modal: {
    title: '表单弹窗',
    width: '40%',
    center: true
  },
  form: {
    labelPosition: 'right',
    labelWidth: 110
  },
  // global export api name
  apis: {
    add: 'addApiName',
    edit: 'editApiName',
    detail: 'detailApiName',
  }
})

function showBtns (key, row) {
  const active = {
    'detail': true,
    'edit': true,
    'delete': true,
  }
  return active[key]
}

function onReset () {
  table.params = {
    pageNum: 1,
    pageSize: 10
  }
}

const onAction = (key, row) => {
  state.model = key
  const actionMap = {
    'add': () => state.addModalShow = true,
    'edit': () => state.addModalShow = true,
    'detail': () => state.detailModalShow = true,
    'delete': () => onDelete(row),
  }

  state.row = row
  actionMap[key] && actionMap[key](row)
}

function onDelete (row) {
  ElMessageBox.confirm(
    '是否删除该条记录?',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    })
}

async function asyncData () {
  table.data = [
    {
      y1:'张三',
      y2:547,
      y3:1676257671832
    }
  ]
  // state.loading = true
  // let { data, success } = await apiName(table.params)
  // state.loading = false
  // if (success) {
  //   table.total = data.total
  //   table.data = data.list
  // }
}
asyncData()

</script>

<style lang="scss" scoped>
.view-component {
  padding-top: initial !important;
  display: flex;
  flex-direction: column;
  flex: 1;
  background: white;
  height: 100%;
  padding: 20px;

  .table-list {
    flex: 1;
  }
}

.table-header-box {
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .query-box {
    display: flex;
    align-items: center;

    .simple-input {
      & ~ .simple-input {
        margin-left: 16px;
      }
    }
  }
}
</style>
