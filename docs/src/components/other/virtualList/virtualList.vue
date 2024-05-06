<template>
  <div class="virtual-list-container" ref="containerRef">
    <div class="virtual-list" ref="listRef" :style="scrollStyle"  >
      <template v-for="(item,index) in renderList"  :key="item.virtualIndex">
        <div class="virtual-item" :id="String(item.virtualIndex)">
          <slot name="virtualItem" :item="item">
            {{item}}
          </slot>
        </div>
      </template>

    </div>
  </div>
</template>

<script lang="ts" setup generic="T extends {virtualIndex:number}">
import { throttle } from 'lodash-es';
import { computed, nextTick, onMounted, onUnmounted, reactive, ref,watch } from 'vue';
interface IEstimatedListProps<T>{
  estimatedHeight:number
  dataSource:T[]
}

interface IPosInfo {
  index:number // 当前对应的元素索引
  top:number // 元素顶部相对于List的位置
  bottom:number // 元素底部相对于List的位置
  height:number // 自身高度
  dHeight:number // 自身对比高度差,判断是否需要更新
}
const emit = defineEmits(['getMoreData'])
const props = defineProps<IEstimatedListProps<T>>()
let containerRef = ref<HTMLDivElement>()
const listRef = ref<HTMLDivElement>()
const state = reactive({
  viewHeight:0, // 容器高度
  listHeight:0,// 列表高度,实际上等于最后一个渲染项的bottom属性
  startIndex:0, // 起始索引
  maxCount:0, // 最大渲染数量
  preLen:0 // 缓存上一次计算长度
})


let positions = ref<IPosInfo[]>([])
// 末尾索引
const endIndex = computed(()=>Math.min(props.dataSource.length,state.startIndex + state.maxCount))

const offsetDis = computed(()=>{
  if(state.startIndex > 0){
    return positions.value[state.startIndex - 1].bottom
  }else{
    return 0
  }
})

const scrollStyle = computed(()=>{
  
  return {
    height:`${state.listHeight - offsetDis.value}px`,
    transform:`translate(0px, ${offsetDis.value}px)`
  }
})

let useData = ref<T[]>([])
// 渲染的数据列表
const renderList = computed(()=>{
  return useData.value.slice(state.startIndex,endIndex.value)
})


function init (){
  state.viewHeight = containerRef.value?.offsetHeight || 0
  // 为什么要向上取整又加一呢？是为了视图缓冲区吗？
  state.maxCount = Math.ceil(state.viewHeight / props.estimatedHeight) + 1
  containerRef.value && containerRef.value.addEventListener('scroll',handleScroll)
}

function setDataVirtualIndex(){
  let data = props.dataSource.map((e:T,index:number)=>{
    return {
      ...e,
      virtualIndex:index
    }
  })
  useData.value = data

}

watch(()=>props.dataSource.length,()=>{
  setDataVirtualIndex()
  initPosition()
  nextTick(()=>{
    setPosition()
  })
})

watch(()=>state.startIndex,()=>{
  setPosition()
})

function initPosition(){
  let pos:IPosInfo[] = []
  for (let index = 0; index < useData.value.length; index++) {
    const element = useData.value[index];
    pos.push({
      index:element.virtualIndex,
      height: props.estimatedHeight,
      top:element.virtualIndex * props.estimatedHeight,
      bottom: (element.virtualIndex + 1 ) * props.estimatedHeight ,
      dHeight:0
    })
  }
  positions.value = pos
}

function binarySearch(list:IPosInfo[],value:number){
  
  let left = 0
  let right = list.length - 1
  let templateIndex = -1
  while (left < right) {
    const midIndex = Math.floor((left + right) / 2)
    const midValue = list[midIndex].bottom
    if(midValue === value) return midIndex + 1
    else if (midValue < value) left = midIndex + 1 
    else if(midValue > value) {
      if(templateIndex === -1 || templateIndex > midIndex) templateIndex = midIndex
      right = midIndex
    }
  }

  

  return templateIndex;
}

const handleScroll = throttle(()=>{
  const { scrollTop,scrollHeight,clientHeight} = containerRef.value
  state.startIndex = binarySearch(positions.value,scrollTop)
  const bottom = scrollHeight - clientHeight - scrollTop;
  if (bottom <= 20) {
    emit("getMoreData");
  }
},100)

 function setPosition(){
  const nodes = listRef.value?.children 

  if(!nodes || !nodes.length) return
  [...nodes].forEach((node)=>{
    let rect = node.getBoundingClientRect()
    let item:IPosInfo = positions.value[+node.id] as IPosInfo
    const dHeight = item.height - rect.height
    if(dHeight){
      item.height = rect.height
      item.bottom = item?.bottom - dHeight
      item.dHeight = dHeight
    }
  })
  let startId = +nodes[0].id
  const len = positions.value.length
  let startHeight = positions.value[startId].dHeight
  
  positions.value[startId].dHeight = 0
  for (let index = startId + 1 ; index < len; index++) {
    const item = positions.value[index]
    item.top = positions.value[index - 1].bottom
    item.bottom = item.bottom - startHeight
    if(item.dHeight !== 0){
      startHeight += item.dHeight
      item.dHeight = 0
    }
  }
  state.listHeight = positions.value[len-1].bottom
 }

 function destory(){
  containerRef.value && containerRef.value.removeEventListener('scroll', handleScroll)
 }

onMounted(()=>{
  setDataVirtualIndex()
  initPosition()
  init()

  nextTick(()=>{
    setPosition()
  })
})

onUnmounted(()=>{
  destory()
})
</script>

<style lang="scss" scoped>
 .virtual-list-container{
  width: 100%;
  height: 100%;
  overflow: auto;
  .virtual-list{
    width: 100%;
    box-sizing: border-box;
    .virtual-item{
      // height: 150px;
    }
  }
 }
</style>
