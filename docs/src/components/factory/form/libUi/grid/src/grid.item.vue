<template>
  <section class="grid-item" :style="style" @click="onGridClick">
    <slot></slot>
  </section>
</template>
<script lang="ts">
import { CSSProperties, defineComponent, PropType, inject, computed } from 'vue'
import { gridInjectionKey } from './grid.vue'
import usePubsub from '@/views/visual/hooks/use-pubsub'
interface GridItemVNodeProps {
  span: number
  offset: number
  privateOffset?: number
  privateSpan?: number
  privateColStart?: number
  privateShow?: boolean
}

export interface GridItemMode {
  span: number | string
  offset: number | string
  xGap: number | string
  yGap: number | string
}

export const defaultSpan = 1

export const gridItemProps = {
  span: {
    type: [Number, String] as PropType<string | number>,
    default: defaultSpan
  },
  offset: {
    type: [Number, String] as PropType<string | number>,
    default: 0
  },
  style: [Object, String] as PropType<CSSProperties | string>,
  // private props
  privateOffset: Number,
  privateSpan: Number,
  privateColStart: Number,
  privateShow: {
    type: Boolean,
    default: true
  }
} as const

export default defineComponent({
  name: 'UiGridItem',

  components: {},

  props: gridItemProps,

  setup (props: any) {
    const {
      itemStyleRef,
      xGapRef
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(gridInjectionKey)!

    function deriveStyle () {
      const {
        span,
        offset,
        privateShow = true,
        privateColStart = undefined,
      } = props as GridItemVNodeProps
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { value: xGap } = xGapRef
      const mergedXGap = `${xGap}px`
      return {
        display: !privateShow ? 'none' : '',
        gridColumn: `${
          privateColStart ?? `span ${span}`
        }`,
        marginLeft: offset
          ? `calc((100% - (${span} - 1) * ${mergedXGap}) / ${span} * ${offset} + ${mergedXGap} * ${offset})`
          : ''
      } as CSSProperties
    }

    const itemStyle = computed<CSSProperties>(() => {
      return Object.assign({}, itemStyleRef.value, props.style) as CSSProperties
    })
    let style = computed(()=>{
      return  [itemStyle.value, deriveStyle()]
    })

    function onGridClick (){
      console.log(1)

    }
    return {
      style,
      onGridClick
    }
  }
})
</script>


<style lang="scss" scoped>
.grid-item{
  &:hover{
    border: 1px dashed #409eff;
    cursor: pointer;
  }
}
</style>
