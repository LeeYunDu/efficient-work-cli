<template>
  <section class="view-component query-form">
    <section class="query-main">
      <ui-form
        :model="params"
        :labels="fields"
        :props="formProps"
        :options="formOptions"
        @change="onSearch"
      >
        <template #btns>
          <section class="operate">
            <UiGroupBtn :data="btns" @click="onClickBtns" />
          </section>
        </template>
      </ui-form>
    </section>
  </section>
</template>
<script lang="ts" setup>
import { GroupItem } from '@static/lib/group-content'
import { PropType, defineProps, defineEmits, ref } from 'vue'
import PubSub from 'pubsub-js'
import { scencePage } from '@/global/pubsub'
import { ModuleHookMode, useModule } from '@static/lib/hooks'
import { BtnItem } from '@static/lib/typings/items'

defineProps({
  group: { type: Object as PropType<GroupItem>, default: () => ({}) }
})

const emits = defineEmits(['change'])

// hooks
const { fields, btns }: ModuleHookMode = useModule()

// state
const params = ref<any>({
  keyword: ''
})
const formProps = {
  labelWidth: '120px'
}
const formOptions = {
  gridItem: {
    span: 24
  }
}

// fns
function onClear () {
  params.value = {}
}

function onClickBtns (item: BtnItem) {
  const { key } = item
  switch (true) {
    case key === 'search':
      break
    case key === 'clear':
      break
    default: break
  }
}

function onSearch () {
  PubSub.publish('table-query', { params: params.value })
}
</script>
<style scoped lang="scss">
</style>
