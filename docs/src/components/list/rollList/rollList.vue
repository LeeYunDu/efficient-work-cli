<template>
  <div class="roll-list-component" :style="{height:useHeight}">
    <div class="no-data" v-if="useData.length == 0">
      <slot name="empty"></slot>
    </div>
    <div ref="wrap">
      <div
        ref="realBox"
        :style="pop"
        @mouseenter="onEnter"
        @mouseleave="onLeave"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <div
          ref="slotList"
          :style="float"
        >
          <slot></slot>
        </div>
        <div v-if="scroll" :style="float" v-html="state.copyHtml"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isNaN, isNumber } from 'lodash-es';
import { computed, shallowRef,ref,watch, reactive, nextTick, onMounted,onUnmounted } from 'vue'

let props = defineProps({
  data:{
    type:Array,
    default:()=>[]
  },
  scroll:{
    type:Boolean,
    default:true
  },
  height:{
    type:Number || String,
    default:'100%'
  },
  options:{
    type:Object,
    default:()=>({
      step: 0.2, // 数值越大速度滚动越快
      limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
      hoverStop: true, // 是否开启鼠标悬停stop
      direction: 1, // 0向下 1向上 2向左 3向右
      openWatch: true, // 开启数据实时监控刷新dom
      singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
      singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
      waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
    })
  }
})

const wrap = shallowRef<HTMLDivElement>()
const slotList = shallowRef<HTMLDivElement>()
const realBox = shallowRef<HTMLDListElement>()

const useHeight = computed(()=>{
  if(isNaN(Number(props.height))){
    return props.height
  }else if (isNumber(props.height)){
    return props.height+'px'
  }else{
    return props.height
  }
})
let useData = computed(()=>props.data||[])
let propsOptions = computed(()=>{
  return Object.assign({},defaultOption,props.options)
})

let defaultOption = reactive({
  step: 1, // 步长
  limitMoveNum: 5, // 启动无缝滚动最小数据数
  hoverStop: true, // 是否启用鼠标hover控制
  direction: 1, // 0 往下 1 往上 2向左 3向右
  openTouch: true, // 开启移动端touch
  singleHeight: 0, // 单条数据高度有值hoverStop关闭
  singleWidth: 0, // 单条数据宽度有值hoverStop关闭
  waitTime: 1000, // 单步停止等待时间
  switchOffset: 30,
  autoPlay: true,
  navigation: false,
  switchSingleStep: 134,
  switchDelay: 400,
  switchDisabledClass: 'disabled',
  isSingleRemUnit: false // singleWidth/singleHeight 是否开启rem度量
})

let state = ref({
  xPos: 0,
  yPos: 0,
  delay: 0,
  copyHtml: '' as any,
  height: 0,
  ease:'ease-in',
  reqFrame:null as any,
  isHover:false,
  width: 0, // 外容器宽度
  realBoxWidth: 0 as any, // 内容实际宽度
  realBoxHeight:0  as any,// 内容实际高度

  singleWaitTime:null as any,
  refresh:true
})

const emits = defineEmits(['ScrollEnd'])

// 是否自动播放
let  autoPlay = computed(()=>{
  return propsOptions.value.autoPlay
})

// 滚动方向 水平/垂直

let isHorizontal = computed(()=>{
  return propsOptions.value.direction > 1
})

const float:any = computed(()=>{
  return isHorizontal.value ? { float:'left', overflow:'hidden' }:{ overflow:'hidden' }
})

const pop = computed(()=>{

  if(isHorizontal.value){
    return {
      transform: `translate(${state.value.xPos}px,${state.value.yPos}px)`,
      transition: `all ${state.value.ease} ${state.value.delay}ms`,
      overflow: 'hidden',
      width:state.value.realBoxWidth
    }
  }else{
    return {
      transform: `translate(${state.value.xPos}px,${state.value.yPos}px)`,
      transition: `all ${state.value.ease} ${state.value.delay}ms`,
      overflow: 'hidden',
    }
  }

})

// 是否可以滚动判断
const scrollSwitch = computed(()=>{
  return true && props.scroll
})


const baseFontSize = computed(()=>{
  return propsOptions.value.isSingleRemUnit?parseInt(window.getComputedStyle(document.documentElement,null).fontSize):1
})

const realSingleStopWidth = computed(()=>{
  return propsOptions.value.singleWidth * baseFontSize.value
})

const realSingleStopHeight = computed(()=>{
  return propsOptions.value.singleHeight * baseFontSize.value
})

const hoverStopSwich= computed(()=>{
  return propsOptions.value.hoverStop&& autoPlay.value && scrollSwitch.value
})
// 步长
const step = computed(()=>{
  let singleStep
  let step = propsOptions.value.step
  if(isHorizontal.value){
    singleStep = realSingleStopWidth.value
  }else{
    singleStep = realSingleStopHeight.value
  }

  if(singleStep > 0 && singleStep % step >0){
    console.error('如果设置了单步滚动,step需是单步大小的约数,否则无法保证单步滚动结束的位置是否准确。~~~~~')
  }

  return step
})



watch(()=>props.data,(newVal,oldVal)=>{
  dataWarm()
  // 数据发生变化重置状态
  if(!arrayEqual(newVal,oldVal)){
    reset()
  }
})


function init (){
  nextTick(()=>{
    const { switchDelay } = propsOptions.value
    dataWarm()
    state.value.copyHtml = ''
    // 水平滚动下样式调整
    if(isHorizontal.value){
      state.value.height = wrap.value?.offsetHeight||0
      state.value.width = wrap.value?.offsetWidth||0
      let slotListWidth = slotList.value?.offsetWidth ||0
      // // 水平滚动设置warp width
      if(autoPlay.value){
        // 修正offsetWidth四舍五入
        slotListWidth = slotListWidth*2 + 1
      }
      state.value.realBoxWidth = slotListWidth + 'px'
    }

    if(autoPlay.value){
      state.value.ease = 'ease-in'
      state.value.delay = 0
    }else{
      state.value.ease = 'linear'
      state.value.delay = switchDelay
      return
    }

    // 是否可以滚动判断
    if(scrollSwitch.value){

      let timer
      if(timer) clearTimeout(timer)
      state.value.copyHtml = slotList.value?.innerHTML
      timer = setTimeout(()=>{
        state.value.realBoxHeight = realBox.value?.offsetHeight
        onMove()

      },0 )
    }else{
      onCancle()
      state.value.yPos = 0
      state.value.xPos = 0
    }
  })
}

function reset (){
  onCancle()
  init()
}



// 数据量过大预警
function dataWarm (){
  if(useData.value.length>100){
    console.warn(`数据达到了${useData.value.length}条有点多哦~,可能会造成部分老旧浏览器卡顿。`)
  }
}

function onCancle (){
  cancelAnimationFrame(state.value.reqFrame||'')
}

function onMove (){
  if(state.value.isHover) return
  // 清除之前的动画
  onCancle()
  state.value.reqFrame = requestAnimationFrame(()=>{

    const h = state.value.realBoxHeight / 2

    const w = typeof state.value.realBoxWidth==='string'? state.value.realBoxWidth.replace('px','') / 2:state.value.realBoxWidth

    const { direction,waitTime } = propsOptions.value

    switch (direction) {
      case 1: // 上
        if(Math.abs(state.value.yPos)>=h ){
          emits('ScrollEnd')
          state.value.yPos = 0
        }
        state.value.yPos -= step.value


        break
      case 0: // 下
        if(state.value.yPos >= 0){
          emits('ScrollEnd')
          state.value.yPos = h * -1
        }
        state.value.yPos += step.value

        break
      case 2: // 左
        if(Math.abs(state.value.xPos) >= w){
          emits('ScrollEnd')
          state.value.xPos = 0
        }
        state.value.xPos -= step.value
        break
      case 3: // 右
        if(state.value.xPos >0){
          emits('ScrollEnd')
          state.value.xPos = w * -1
        }
        state.value.xPos += step.value
        break
    }

    if(state.value.singleWaitTime)clearTimeout(state.value.singleWaitTime)

    if(realSingleStopHeight.value){

      if(Math.abs(state.value.yPos)% realSingleStopHeight.value < step.value) { // 符合条件暂停 waitTime
        state.value.singleWaitTime = setTimeout(()=>{
          onMove()
        },waitTime)
      } else {
        onMove()
      }
    }else if (realSingleStopWidth.value){
      if(Math.abs(state.value.xPos) % realSingleStopWidth.value < step.value){ // 符合条件暂停 waitTime
        state.value.singleWaitTime = setTimeout(()=>{
          onMove()
        },waitTime)
      }else{
        onMove()
      }
    }else{

      onMove()
    }
  })
}


function onEnter (){
  if(hoverStopSwich.value) stopMove()
}

function onLeave (){
  if(hoverStopSwich.value) startMove()

}

function onTouchStart (){

}

function onTouchMove (){

}

function onTouchEnd (){

}

function stopMove (){
  state.value.isHover = true
  // 防止频频hover进出单步滚动,导致定时器乱掉
  if(state.value.singleWaitTime)clearTimeout(state.value.singleWaitTime)
  onCancle()
}

function startMove (){
  state.value.isHover = false
  onMove()
}

onMounted(()=>{
  setTimeout(()=>{
    init()
  },500)
})

onUnmounted(()=>{
  onCancle()
  clearTimeout(state.value.singleWaitTime)
})


/**
 * JS判断两个数组是否相等
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {boolean} 返回true 或 false
 */
function arrayEqual (arr1, arr2) {
  if (arr1 === arr2) return true
  if (arr1.length != arr2.length) return false
  for (var i = 0; i < arr1.length; ++i) {
    if (arr1[i] !== arr2[i]) return false
  }
  return true
}



</script>

<style scoped>
.box{
  width: 200px;
  height: 200px;
  background: blue;
  display: flex;
}
.box1{
  width: 200px;
  /* flex: 0 0 200px; */
  /* flex: 0 0 200px; */
  height: 200px;
  background: red;
}
.box2{
  width: 10px;
  height: 200px;
  background: gray;
}
.box3{
  width: 10px;
  height: 200px;
  background: orange;
}

.roll-list-component{
  overflow: hidden;
}
</style>
