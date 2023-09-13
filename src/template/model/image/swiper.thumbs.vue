<template>
  <div class="feature-server-container">
    <div class="swiper-container">
      <Swiper
        slides-per-view="1"

        :thumbs="{ swiper: thumbsSwiper }"
        :space-between="24"
        :modules="modules"
        :navigation="true"
        class="swiper-mian"
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
            <el-image :src="item.src" />
          </div>
        </swiper-slide>
      </Swiper>

      <swiper
        :space-between="10"
        :slides-per-view="4"
        :free-mode="true"
        :watch-slides-progress="true"
        :modules="modules"
        class="swiper-thumbs"
        @swiper="setThumbsSwiper"
      >
        <swiper-slide
          v-for="(item, index) in state.data"
          :key="index"
        >
          <div class="info-block">
            <el-image :src="item.src" />
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Swiper, SwiperSlide,useSwiper  } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { Navigation,FreeMode,Thumbs } from 'swiper/modules'
let props = defineProps({
  data:{
    type:Array,
    default:()=>[]
  },

})

const thumbsSwiper = ref(null)

const setThumbsSwiper = swiper => {
  thumbsSwiper.value = swiper
}
let modules = [FreeMode, Navigation, Thumbs]
let state = reactive({
  data: [
    { title:'全域覆盖 全面动员 全员参与 全民收益！西湖区召开迎 亚运三大提升行动推进会' ,icon:'mock1.png' },
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
  position: relative;
  width: 600px;
  .swiper-container{
    height: 500px;
    position: relative;
    .swiper-mian{
      height: 65%;
    }
    .swiper-thumbs{
      height: 35%;
      padding-top: 10px;
      box-sizing: border-box;
    }

  }

}





.info-block{
  cursor: pointer;
  height: calc(100%);
  .el-image{
    width: 100%;
    height: 100%;
  }

}


</style>

