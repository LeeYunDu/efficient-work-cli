<template>
  <div class="layout-header-view-6">
    <div class="layout-hader-title-container">
      <!-- 背景图元素配置 -->
      <div class="bg-container">
        <div class="left-container">
          <div class="rectangle-1"></div>
          <div class="rectangle-2"></div>
          <div class="rectangle-3"></div>
          <div class="rectangle-group">
            <div v-for="(item, index) in 6 " :key="item" class="rectangle-item"></div>
          </div>
        </div>
        <div class="rectangle-bottom"></div>
        <div class="rectangle"></div>
        <div class="left-container overturn">
          <div class="rectangle-1"></div>
          <div class="rectangle-2"></div>
          <div class="rectangle-3"></div>
          <div class="rectangle-group">
            <div v-for="(item, index) in 6 " :key="item" class="rectangle-item"></div>
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

.layout-header-view-6 {
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
      align-items: center;
      z-index: 1;

      .rectangle {
        position: relative;
        width: 640px;
        height: 80px;
        margin: 0 -67px;

        &::after {
          content: '';
          width: 640px;
          height: 52px;
          bottom: 0;
          background-image: url('static/images/headers/header_6/rectangle-1.png');
          background-size: 100%;
          position: absolute;
        }

        &::before {
          content: '';
          width: 509px;
          position: absolute;
          height: 1px;
          bottom: 0.5px;
          background: linear-gradient(
            270deg,
            rgba(47, 255, 203, 0) 10%,
            rgba(47, 255, 203, 0) 10%,
            #2fffcb 49%,
            rgba(47, 255, 203, 0) 90%,
            rgba(47, 255, 203, 0) 90%
          );
        }
      }

      .left-container {
        flex: 1;
        height: 100%;
        position: relative;
        display: flex;
        padding-top: 26px;
        flex-direction: column;

        .rectangle-1 {
          position: absolute;
          height: 2px;
        }

        .rectangle-2 {
          position: absolute;
          bottom: 15px;
          height: 8px;
          transform: skew(45deg);
          background: linear-gradient(
            90deg,
            rgba(158, 222, 255, 0) 7%,
            rgba(158, 222, 255, 0) 7%,
            rgba(156, 219, 252, 0.63) 98%,
            rgba(156, 219, 252, 0.63) 98%
          );
        }

        .rectangle-3 {
          position: absolute;
          height: 2px;
          bottom: 6px;
          background: linear-gradient(
            270deg,
            #3d5e74 2%,
            #3d5e74 2%,
            rgba(73, 157, 212, 0) 99%,
            rgba(73, 157, 212, 0) 99%
          );
        }

        .rectangle-group {
          position: absolute;
          bottom: 3px;
          display: flex;

          .rectangle-item {
            width: 6px;
            height: 18px;
            background: #9edeff;
            margin-right: 6px;
            animation: opacity 3s infinite linear;

            @for $i from 1 through 6 {
              &:nth-child(#{$i}) {
                opacity: (#{$i * 0.166});
                animation-delay: (#{0.5 * (7 - $i)}s);
              }
            }

            @include animationOption();
          }
        }
      }

      .left-container {
        .rectangle-1 {
          left: 0;
          right: 67px;
          background: linear-gradient(
            270deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(89, 140, 174, 0.51) 48%,
            rgba(96, 160, 255, 0) 100%
          );
        }

        .rectangle-2 {
          left: 0;
          right: 130px;
          transform: skew(45deg);
          background: linear-gradient(
            90deg,
            rgba(158, 222, 255, 0) 7%,
            rgba(158, 222, 255, 0) 7%,
            rgba(156, 219, 252, 0.63) 98%,
            rgba(156, 219, 252, 0.63) 98%
          );
        }

        .rectangle-3 {
          left: 0;
          right: 125px;
          background: linear-gradient(
            270deg,
            #3d5e74 2%,
            #3d5e74 2%,
            rgba(73, 157, 212, 0) 99%,
            rgba(73, 157, 212, 0) 99%
          );
        }

        .rectangle-group {
          right: 40px;

          .rectangle-item {
            transform: skew(45deg);
            margin-right: 6px;
            animation: opacity 3s infinite linear;

            @include animationOption();
          }
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
        color: #ffffff;
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
        color: transparent;
        text-shadow: 0px 0px 12px rgba(44, 192, 255, 0.7);
      }
    }
  }
}

@keyframes opacity {
  0% {
    opacity: 0.166;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.166;
  }
}

.overturn {
  transform: rotateY(180deg);
}
</style>
