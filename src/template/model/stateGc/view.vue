<template>
  <section class="view-container">
    <section class="content">
      <PageTitle class="h100 mb20" title="一类事配置" />
      <group-content ref="refGc" :options="stateGc.options" :params="stateGc.params">
        <template v-for="(item, index) in components" :key="index" #[String(item.slot)]="{ group, data }">
          <component :is="item.component" :group="group" :data="data" />
        </template>
      </group-content>
    </section>
  </section>
</template>
<script lang="ts" setup>
import { ComponentItem } from '@/typings/global'
import { useGc } from '@static/lib/hooks'
// import Search from './components/view/search.vue'
// import Table from './components/view/table.vue'
// import PageTitle from '@/components/Items/page.title.vue'

// hooks
const stateGc: any = useGc()

// state
const components: ComponentItem[] = [
  // { name: '搜索', slot: 1, component: Search, description: '搜索' },
  // { name: '表格', slot: 2, component: Table, description: '表格' }
]

stateGc.options.base.layout = {
  controlItem: true,
  controlIgnore: []
}
</script>
<style lang="scss" scoped>
.content {
  :deep() {
    .grid-item-1 {
      // background: linear-gradient(180deg, rgba(255,255,255,0.78) 0%, #FFFFFF 100%) !important;
    }
  }
}
</style>
