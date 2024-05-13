<template>
  <div class="layout-header-view-10">
    <div class="layout-header-title-container">
      <!-- 背景图元素配置 -->
      <div class="bg-container">
        <div class="left-container">
          <div class="vector-group">
            <img class="vector-1" src="static/images/headers/header_15/vector-1.png" alt="">
          </div>
          <div class="vector-group-2">
            <div v-for="item in 3" :key="item" class="vector-item"></div>
          </div>
          <div class="vector-2"></div>
          <div class="vector-group-2 vector-group-3">
            <div v-for="item in 3" :key="item" class="vector-item"></div>
          </div>
        </div>
        <div class="rectangle"></div>
        <div class="left-container overturn">
          <div class="vector-group">
            <img class="vector-1" src="static/images/headers/header_15/vector-1.png" alt="">
          </div>
          <div class="vector-group-2">
            <div v-for="item in 3" :key="item" class="vector-item"></div>
          </div>
          <div class="vector-2"></div>
          <div class="vector-group-2 vector-group-3">
            <div v-for="item in 3" :key="item" class="vector-item"></div>
          </div>
        </div>
        <div class="vector-bottom-group">
          <rollList
            :options="{
              direction:3,
              linear:'linear',
              step:3
            }"
            class="roll-box"
          >
            <div class="move-box">
              <div
                v-for="item in 5"
                :key="item"
                class="move-item"
              >
                <img
                  class="vector-item"
                  src="static/images/headers/header_15/vector-2.png"
                  alt=""
                >
              </div>
            </div>
          </rollList>
        </div>
      </div>
      <div class="header-menu-container">
        <div class="header-left">
          <slot name="left"></slot>
        </div>
        <div class="header-center">
          <div class="title-box" @click="onTitleClick">
            <span class="header-title" v-bind="config" :style="style">
              {{ titleName }}
            </span>
            <span class="header-shadow" v-bind="config" :style="style">
              {{ titleName }}
            </span>
          </div>
        </div>
        <div class="header-right">
          <slot name="right"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {  ref, computed } from 'vue'
import rollList from './components/index.vue'

const props = defineProps({
  titleName: {
    type: String,
    default: '大标题文本内容'
  },
  fontFamily: {
    type: String,
    default: 'YouSheBiaoTiHei'
  },
  // duration: { type: Number, default: 2000 },
  // easing: { type: String, default: 'linear' },
  animation: { type: Boolean, default: true }
})

const animationPlay = computed(() => {
  return props.animation ? 'running' : 'paused'
})

// const animationDuration = computed(() => {
//   return props.duration / 1000 + 's'
// })

// const animationTiming = computed(() => {
//   return props.easing
// })

const config = ref({})

const style = ref({
  fontFamily: `${props.fontFamily},serif`
})


let emits = defineEmits(['click'])
function onTitleClick () {
  emits('click')
}



</script>

<style lang="scss" scoped>
@mixin animationOption {
  animation-play-state: v-bind(animationPlay);
  // animation-duration: v-bind(animationDuration);
  // animation-timing-function: v-bind(animationTiming);
}

@keyframes opacity {
  0% {
    opacity:0.33;
  }

  66% {
    opacity: 0.66;
  }

  100% {
    opacity: 1;
  }
}


$header-height: 80px;

.layout-header-view-10 {
  position: relative;
  display: flex;
  height: $header-height;

  .layout-header-title-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    .bg-container {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      display: flex;
      justify-content: center;
      z-index: 1;

      .vector-bottom-group{
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        bottom: -9px;
        display: flex;
        overflow: hidden;
        .roll-box{
          width:100%;
        }

        .move-box{
          display: flex;
          height: 10px;
          width: 100%;
          height: 22px;
          .move-item{
            width: 377px;
            height: 22px;
          }
          .vector-item{
            width: 277px;
            object-fit: cover;
          }
        }


      }

      .rectangle {
        width: 783px;
        height: 80px;
        background-image: url('static/images/headers/header_15/bg.png');
        background-size: 100% auto;
        background-position: top;
        background-repeat: no-repeat;
        position: absolute;
        z-index: 11;
      }

      .left-container {
        height: 75px;
        position: relative;
        width: 584px;
        margin-right: auto;
        // background-image: url('static/images/headers/header_14/vector-1.png');
        // background-size: 100%;
        // background-repeat: no-repeat;


        .vector-group{
          display: flex;
          position: absolute;
          left: -25px;
          top: 51px;
          width: 585px;

        }
        .vector-group-2{
          top: 51px;
          left: 325px;
          position: absolute;
          display: flex;
          .vector-item{
            background: rgba($color: #FF8251, $alpha: 0.16);
            width:20px;
            height: 3px;
            transform: skew(45deg);
            animation: translanteColor 3s linear infinite;

            @include animationOption();
            @for $i from 1 through 3 {
              &:nth-child(#{$i}) {
                animation-delay: #{1 * $i}s;
              }
            }

            &~.vector-item{
              margin-left: 4px;
            }
          }
        }
        .vector-2{
          position: absolute;
          top: 50.5px;
          right: 27.5px;
          box-sizing: content-box;
          width: 25.5px; height: 0;
          border: 2.5px solid transparent;
          border-top: 0 solid;
          border-bottom: 5px solid #1E3968;
          // animation: translanteColor2 s linear infinite;

            @include animationOption();
        }
        .vector-group-3{
          left: 585px;
          top: 67px;
        }


        &.overturn{
          margin-right: 0;
          margin-left: auto;
        }
      }

    }
  }

  .header-menu-container {
    position: absolute;
    left: 0;
    right: 0;
    height: 100%;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .header-left,
    .header-right {
      flex: 1;
      height: 100%;
    }

    .header-center {
      margin: 0 auto;
      display: flex;
      align-items: center;

      .title-box {
        position: relative;
        z-index: 2;
        top: 7px;
      }

      .header-title,
      .header-shadow {
        font-size: 50px;
        letter-spacing: 0;
        position: relative;
        font-weight: normal;
        line-height: 59px;
        letter-spacing: 7.56px;
        top: -12px;
      }

      .header-title {
        display: inline-block;
        background-image: linear-gradient(180deg, #FFFFFF 41%, #81C7FF 80%);
        -webkit-background-clip: text;
        color: transparent;
      }

      .header-shadow {
        display: inline-block;
        position: absolute;
        text-align: center;
        right: 0;
        color: transparent;
        z-index: -1;
        text-shadow: 0px 4px 4px  rgba(1, 44, 78, 0.71);
      }
    }
  }
}


@keyframes opacity {
  0% {
    // background: #1274F3;
  }

  25% {
    opacity: 0.8;
  }

  100% {
    opacity: 0;
  }
}

@keyframes move {
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: -664.5;
  }
}





.overturn {
  transform: rotateY(180deg);
}

@keyframes translanteColor{
  0%{
    background: rgba($color: #FF8251, $alpha: 0.16);
  }

  33%{
    background: rgba($color: #FF8251, $alpha: 1);
  }
  100%{
    background: rgba($color: #FF8251, $alpha:1);
  }
}

@keyframes translanteColor2{
  0%{
    border-bottom: 5px solid #1E3968;
  }

  33%{
    border-bottom: 5px solid #FF8251;
  }
  100%{
    border-bottom: 5px solid #FF8251;
  }
}
</style>
