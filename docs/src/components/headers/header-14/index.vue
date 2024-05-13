<template>
  <div class="layout-header-view-10">
    <div class="layout-header-title-container">
      <!-- 背景图元素配置 -->
      <div class="bg-container">
        <div class="left-container">
          <div class="vector-group">
            <div v-for="item in 14" :key="itme" class="vector-item"></div>
          </div>
        </div>
        <div class="rectangle"></div>
        <div class="left-container overturn">
          <div class="vector-group">
            <div v-for="item in 14" :key="itme" class="vector-item"></div>
          </div>
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

      .rectangle {
        width: 933px;
        height: 80px;
        background-image: url('static/images/headers/header_14/bg.png');
        background-size: 100% auto;
        background-repeat: no-repeat;
        position: absolute;
        z-index: 11;
      }

      .left-container {
        width: 713px;
        height: 75px;
        position: relative;
        margin-right: auto;
        background-image: url('static/images/headers/header_14/vector-1.png');
        background-size: 100%;
        background-repeat: no-repeat;


        .vector-group{
          display: flex;
          position: absolute;
          left: 353px;
          top: 35px;
          .vector-item{
            background: #D9D9D9;
            width:8px;
            height: 12px;
            transform: skew(-45deg);
            animation: opacity 4s linear infinite;

            @include animationOption();
            @for $i from 1 through 14 {
              &:nth-child(#{$i}) {
                opacity: #{0.071 * $i};
                animation-delay: #{0.19 * $i}s;
              }
            }

            &~.vector-item{
              margin-left: 4px;
            }
          }
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
        top: 12px;
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
        background-image: linear-gradient(180deg, #FFFFFF 26%, #81E8FF 79%);
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
        text-shadow: 0px 0px 8px  rgba(1, 160, 194, 0.71);
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
</style>
