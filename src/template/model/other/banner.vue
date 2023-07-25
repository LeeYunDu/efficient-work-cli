<template>
  <div class="banner-box">
    <div v-if="title" class="title-box">
      <img src="static/images/layout/icon-title.png" alt="">
      {{ title }}
    </div>
    <img
      v-if="pic"
      class="banner pic"
      :src="pic"
      alt=""
    >
    <img
      v-else
      class="banner"
      :src="$loadImg(imgUrl)"
      alt=""
    >
    <div class="slot-box">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>

const url = defineProps({
  imgUrl:{
    type:String,
    default:'static/images/home/banner.png'
  },
  pic:{
    type:String,
    default:''
  },
  title:{
    type:String,
    default:''
  }
})
</script>


<style lang="scss" scoped>
.banner{
  width: 100%;
  height: auto;
  z-index: -1;
  position: relative;

  &.pic{
    height: 170px;
  }
}

.slot-box{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.banner-box{
  position: relative;
  display: flex;

  .title-box{
    margin-right: 10px;
    font-size: 18px;
    font-weight: normal;
    line-height: 21px;
    background: linear-gradient(180deg, #FFFFFF 0%, #C6D6FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: absolute;
    display: flex;
    align-items: flex-end;
    padding: 17px 19px;
    font-weight: 600;
    font-family: douyu,serif;
    img{
      margin-right: 10px;
    }
  }
}
</style>
