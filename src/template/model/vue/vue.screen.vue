
<template>
  <div class="view-component">
    这的大屏类型的单组件Vue文件
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, reactive, ref } from 'vue'
import { useModule,useSingleAsync } from 'static/lib/hooks'
import { engineInjectionKey, gcInjectionKey } from 'static/lib/group-content'
let props = defineProps({
  data:{
    type:Array,
    default:()=>[]
  },
  group: {
    type: Object,
    default: () => ({})
  },
  params: {
    type: Object,
    default: () => ({})
  },
})

const { fields,transformData } = useModule()
const { group: provideGroup }: any = inject(engineInjectionKey) || {}
const { pubsubKeys }: any = inject(gcInjectionKey) || {}

const asyncData = async () => {
  let params = Object.assign({},props.params)
  await useSingleAsync(provideGroup, {
    params,
    SINGLE_ASYNC: pubsubKeys.SINGLE_ASYNC
  })
}

</script>

<style lang="scss" scoped>

</style>
