<template>
  <svg class="svg-box" :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <template v-for="(item,index) in colors" :key="index">
          <stop :offset="`${index * 100 / colors.length}%`" :style="{
            'stop-color':item,
            'stop-opacity':1
          }" />
        </template>
      </linearGradient>
    </defs>
    <path id="path" d="M 70,70 m 0,-65 a 65,65 0 1 0 0,130 a 65,65 0 1 0 0,-130" stroke-linecap="round" fill="none"
          stroke-dasharray="408 408" :stroke-dashoffset="((408 - 408 * Number(percent)) / 100) * -1)" 
          stroke="url(#grad1)"
          :stroke-width="strokeWidth" />
  </svg>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus'

let props = defineProps({
  size:{
    type:Number,
    default: () => {
      return 140
    }
  },
  percent:{
    type:Number,
    default: () => {
      return 0
    }
  },
  strokeWidth:{
    type:Number,
    default: () => {
      return 5
    }
  },
  colors:{
    type:Array,
    default: () => {
      return ['#0E6CF8', '#FF7E06']
    }
  }

})

let state = reactive({
  data: [],
  show: false
})

const curParams: any = ref({
  pageNum: 1,
  pageSize: 10
})

const asyncData = async () => {
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
  state.data = data.list
}

asyncData()
</script>

<style lang="scss" scoped>
.svg-box {
  #path{
    transition: stroke-dasharray 0.6s ease 0s, stroke 0.6s ease 0s, opacity 0.6s ease 0s;
  }
}

</style>
