<template>
  <div class="layout-header-view-3">
    <div class="layout-hader-title-container">
      <!-- 背景图元素配置 -->
      <div class="bg-container">
        <div class="left-container">
          <div class="vector-3"></div>
          <div class="vector-4"></div>
          <div class="vector-group">
            <div v-for="(item, index) in 3" :key="index" class="vector-item"></div>
          </div>
        </div>
        <div class="rectangle">
          <div class="circle circle-left-1"></div>
          <div class="circle circle-left-2"></div>
          <div class="circle circle-right-1"></div>
          <div class="circle circle-right-2"></div>
          <div class="small-rectangle small-rectangle-1"></div>
          <div class="small-rectangle small-rectangle-2"></div>
        </div>
        <div class="left-container overturn">
          <div class="vector-3"></div>
          <div class="vector-4"></div>
          <div class="vector-group">
            <div v-for="(item, index) in 3" :key="index" class="vector-item"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="header-menu-container">
      <div class="header-left">
        <slot name="left"></slot>
      </div>
      <div class="header-center">
        <div class="title-box" @click="onTitleClick">
          <span
            class="header-title"
            v-bind="config"
            :style="style"
            :text="titleName"
          >{{ titleName }}</span>
          <span
            class="header-shadow"
            v-bind="config"
            :style="style"
            :text="titleName"
          >{{ titleName }}</span>
        </div>
      </div>
      <div class="header-right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { ref } from 'vue';

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
});

const animationPlay = computed(() => {
  return props.animation ? 'running' : 'paused';
});

// const animationDuration = computed(() => {
//   return props.duration / 1000 + 's'
// })

// const animationTiming = computed(() => {
//   return props.easing
// })

const config = ref({});

const style = ref({
  fontFamily: `${props.fontFamily},serif`
});

let emits = defineEmits(['click']);

function onTitleClick() {
  emits('click');
}
</script>

<style lang="scss" scoped>
@mixin animationOption {
  animation-play-state: v-bind(animationPlay);
  // animation-duration: v-bind(animationDuration);
  // animation-timing-function: v-bind(animationTiming);
}

$header-height: 80px;

.layout-header-view-3 {
  position: relative;
  display: flex;
  height: $header-height;

  .layout-hader-title-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;

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
        position: relative;
        width: 598px;
        height: 70px;
        background-image: url('static/images/headers/header_3/rectangle.png');
        background-size: 100%;

        .small-rectangle {
          position: absolute;
          width: 17px;
          height: 4px;
          border-radius: 2px;
          background: #ffffff;
          box-shadow: 1px 0px 4px 2px rgba(78, 137, 255, 0.57);
        }

        .small-rectangle-1 {
          left: 45px;
          top: 68px;
          animation: move-1 10s infinite linear;

          @include animationOption();
        }

        .small-rectangle-2 {
          left: 530px;
          top: 68px;
          animation: move-2 10s infinite linear;

          @include animationOption();
        }

        .circle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #ffffff;
          border-radius: 50%;
          box-shadow: 1px 0px 4px 2px rgba(78, 137, 255, 0.57);
          animation: opacity 2s infinite linear;

          @include animationOption();
        }

        .circle-left-1 {
          left: 37px;
          top: 23px;
        }

        .circle-left-2 {
          left: 42px;
          top: 32px;
        }

        .circle-right-1 {
          right: 37px;
          top: 23px;
        }

        .circle-right-2 {
          right: 42px;
          top: 32px;
        }
      }

      .left-container {
        flex: 1;
        height: 100%;
        position: relative;

        .vector-3 {
          position: absolute;
          right: 68px !important;
          top: 25px;
          width: 30px;
          height: 26px;
          background-image: url('static/images/headers/header_3/left-triangle.png');
          background-size: 100%;
          animation: opacity 1s infinite;

          @include animationOption();
        }

        .vector-group {
          position: absolute;
          width: 670.31px;
          height: 65.58px;
          top: 3.5px;

          .vector-item {
            position: absolute;
            background-size: 100%;
            animation: opacity-line 2s infinite linear;

            @for $i from 1 through 3 {
              &:nth-child(#{$i}) {
                animation-delay: (#{$i * 0.66}s);
              }
            }

            @include animationOption();
          }

          .vector-item:nth-child(1) {
            background-image: url('static/images/headers/header_3/vector-5.png');
            width: 671px;
            height: 52px;
            top: 14px;
          }

          .vector-item:nth-child(2) {
            background-image: url('static/images/headers/header_3/vector-6.png');
            width: 665px;
            height: 51px;
            top: 7.5px;
          }

          .vector-item:nth-child(3) {
            background-image: url('static/images/headers/header_3/vector-7.png');
            width: 661px;
            height: 52px;
          }
        }

        .vector-4 {
          width: 532px;
          height: 38px;
          background-image: url('static/images/headers/header_3/vector-4.png');
          background-size: 100%;
          position: absolute;
        }
      }

      .left-container {
        .vector-3 {
          position: absolute;
          top: 25px;
          width: 30px;
          height: 26px;
          background-image: url('static/images/headers/header_3/left-triangle.png');
          background-size: 100%;
        }

        .vector-group {
          position: absolute;
          width: 670.31px;
          height: 65.58px;
          top: 3.5px;

          .vector-item {
            position: absolute;
            background-size: 100%;
            animation: opacity-line 2s infinite linear;

            @include animationOption();
          }

          .vector-item:nth-child(1) {
            background-image: url('static/images/headers/header_3/vector-5.png');
            width: 671px;
            height: 52px;
            top: 14px;
          }

          .vector-item:nth-child(2) {
            background-image: url('static/images/headers/header_3/vector-6.png');
            width: 665px;
            height: 51px;
            top: 7.5px;
          }

          .vector-item:nth-child(3) {
            background-image: url('static/images/headers/header_3/vector-7.png');
            width: 661px;
            height: 52px;
          }
        }

        .vector-4 {
          width: 532px;
          height: 38px;
          background-image: url('static/images/headers/header_3/vector-4.png');
          background-size: 100%;
          position: absolute;
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
      }

      .header-title,
      .header-shadow {
        font-size: 54px;
        letter-spacing: 0px;
      }

      .header-title {
        display: inline-block;
        background-image: linear-gradient(180deg, #ffffff 100%, #c2ccde 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-family: YouSheBiaoTiHei, serif;
        position: relative;
        font-weight: normal;
      }

      .header-shadow {
        display: inline-block;
        position: absolute;
        text-align: center;
        z-index: -1;
        right: 0;
        text-shadow: 0 5px 0px #0c2e6d;
      }
    }
  }
}

@keyframes opacity {
  0% {
    opacity: 0.25;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.25;
  }
}

@keyframes opacity-line {
  0% {
    opacity: 1;
  }

  33% {
    opacity: 0.33;
  }

  100% {
    opacity: 0.33;
  }
}

@keyframes move-1 {
  0% {
    left: 45px;
  }

  50% {
    left: 530px;
  }
}

@keyframes move-2 {
  0% {
    left: 530px;
  }

  50% {
    left: 45px;
  }
}

.overturn {
  transform: rotateY(180deg);
}
</style>
