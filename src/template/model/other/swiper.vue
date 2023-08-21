<template>
  <div class="feature-server-container">
    <div class="swiper-container">
      <img
        v-if="state.activeIndex>0"
        class="icon-button icon-prev"
        src="static/images/home/icon-left.png"
        alt=""
        @click="onButtonClick('prev')"
      >
      <img
        v-if="state.activeIndex < state.data.length - 4"
        class="icon-button icon-next"
        src="static/images/home/icon-right.png"
        alt=""
        @click="onButtonClick('next')"
      >
      <Swiper
        slides-per-view="4"
        :space-between="24"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide
          v-for="(item, index) in state.data"
          :key="index"
          :class="{
            activeSlide:state.activeIndex===index
          }"
        >
          <div class="info-block">
            <el-image width="100%" height="170px" :src="`static/images/home/${item.icon}`" />
            <div class="title">{{ item.title }}</div>
          </div>
        </swiper-slide>
      </Swiper>
      <div class="custom-indicator-box">
        <div
          v-for="(item,index) in state.data"
          :key="index"
          class="custom-indicator"
          :class="{active:state.activeIndex===index}"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Swiper, SwiperSlide,useSwiper  } from 'swiper/vue'
import 'swiper/css'

let props = defineProps({
  data:{
    type:Array,
    default:()=>[]
  },
  group: {
    type: Object,
    default: () => ({})
  },
  fields:{
    type:Array,default:()=>{[]}
  }

})

let state = reactive({
  data: [
    { title:'全域覆盖 全面动员 全员参与 全民收益！西湖区召开迎 亚运三大提升行动推进会' ,icon:'mock1.png' },
    { title:'藏不住了！西湖的TA美 成省级样板' ,icon:'mock2.png' },
    { title:'藏不住了！西湖的TA美 成省级样板' ,icon:'mock2.png' },
    { title:'假期就来这里玩！值得！' ,icon:'mock3.png' },
    { title:'假期就来这里玩！值得！' ,icon:'mock3.png' },
    { title:'假期就来这里玩！值得！' ,icon:'mock3.png' },
    { title:'假期就来这里玩！值得！' ,icon:'mock3.png' },
  ],
  show: false,
  activeIndex: 0
})



let swiperRef = ref()
function onSwiper (swiper) {
  swiperRef.value = swiper
}

function onSlideChange (swiper) {
  state.activeIndex = swiper.activeIndex
}

function onButtonClick (type){
  if(type=='prev'){
    swiperRef.value.slidePrev()
  }else{
    swiperRef.value.slideNext()
  }

}

</script>

<style lang="scss" scoped>
.feature-server-container{
  width: $page-main-center-width;
  margin:0 auto;
  margin-top: 50px;
  position: relative;
  .swiper-container{
    height: 280px;
    position: relative;
    .icon-button{
      position: absolute;

      z-index: 999;
      width: 40px;
      height: 40px;
      top: 40%;
      transform: translateY(-50%);
      cursor: pointer;

      &.icon-prev{
        left: -50px;
      }
      &.icon-next{
        right: -50px;
      }
    }
    .swiper{
      height: 100%;
    }
    .info-block{
      display: flex;
      flex-direction: column;
    }
  }

}


.custom-indicator-box{
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  .custom-indicator{
    width: 6px;
    height: 4px;
    background: #C1C8D2;
    border-radius: 10px 10px 10px 10px;
    opacity: 1;
    transition: width .3s linear;
    &.active{
      width: 24px;
      height: 4px;
      background: #0366F1;
      border-radius: 10px 10px 10px 10px;
      opacity: 1;
    }
    &~.custom-indicator{
      margin-left: 5px;
    }
  }
}


.info-block{
  width: 282px;
  cursor: pointer;
  .el-image{
    width: 100%;
    height: 170px;
  }
  .title{
    height: 67px;
    text-align: center;
    font-size: 18px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #363A44;
    padding: 0 20px;
    display: flex;
    align-items: center;
    box-shadow: 0px 0px 8px 0px rgba(40,96,174,0.15);
  }

}
</style>

