<template>
  <div class="layout-header-view-2">
    <div class="layout-hader-title-container">
      <!-- 背景图元素配置 -->
      <div class="bg-container">
        <div class="rectangle">
          <div class="vector-1">
            <svg viewBox="0 0 1920 74" xmlns="http://www.w3.org/2000/svg" version="1.1">
              <defs>
                <linearGradient id="bottom-line">
                  <stop offset="0" stop-color="rgba(41,152,255,0)" />
                  <stop offset="50%" stop-color="rgba(41,152,255,0.5)" />
                  <stop offset="100" stop-color="rgba(41,152,255,0)" />
                </linearGradient>
                <linearGradient id="move-line-right">
                  <stop offset="0" stop-color="rgba(41,152,255,1)" />
                  <stop offset="100" stop-color="rgba(41,152,255,0.2)" />
                </linearGradient>
                <linearGradient id="move-line-left">
                  <stop offset="0" stop-color="rgba(41,152,255,0.2)" />
                  <stop offset="100" stop-color="rgba(41,152,255,1)" />
                </linearGradient>
              </defs>
              <!-- C100 30 250 600 400 300 -->
              <!-- L577.46,12.23 Q602,15.1 619.51,23.52 -->
              <path
                d="
                M30 12 L577.46,12 C577.46,12 602,10.1 619.51,20 L679,55 C679,55 708,70 740,72
                L960,72
                L1198,72 C1198,72 1229,70 1258,55 L1315,20 C1315,20 1336,10 1358,12 L1890 12
                "
                stroke="url(#bottom-line)"
                stroke-width="2px"
                fill="transparent"
              />

              <!-- left-path -->
              <path
                d="
                M960,72
                L1198,72 C1198,72 1229,70 1258,55 L1315,20 C1315,20 1336,10 1358,12 L1890 12
                "
                stroke="url(#move-line-right)"
                stroke-width="2px"
                fill="transparent"
                class="move-line right-line"
              />
              <!-- right-path -->
              <path
                d="
                M30 12 L577.46,12 C577.46,12 602,10.1 619.51,20 L679,55 C679,55 708,70 740,72
                L960,72
                "
                stroke="url(#move-line-left)"
                stroke-width="2px"
                fill="transparent"
                class="move-line left-line"
              />
            </svg>
          </div>
          <div class="vector-2"></div>
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
  duration: { type: Number, default: 2000 },
  animation: { type: Boolean, default: true }
});

const animationPlay = computed(() => {
  return props.animation ? 'running' : 'paused';
});

const animationDuration = computed(() => {
  return props.duration / 1000 + 's';
});

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
  animation-duration: v-bind(animationDuration);
  animation-play-state: v-bind(animationPlay);
}

$header-height: 80px;

.layout-header-view-2 {
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
        width: 100%;
        height: $header-height;

        background-image: url('static/images/headers/header_2/title-bg.png');
        background-size: 100%;
        background-position: 0 -10px;

        .vector-1 {
          width: 100%;
          height: 74px;
          position: absolute;

          .move-line {
            fill: none;
            stroke-width: 2;
            stroke-linejoin: round;
            stroke-linecap: round;
            stroke-dasharray: 940, 940;

            &.right-line {
              animation: move-right 3s infinite;

              @include animationOption();
            }

            &.left-line {
              animation: move-left 3s infinite;

              @include animationOption();
            }
          }
        }

        .vector-2 {
          position: absolute;
          width: 100px;
          height: 70px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.05) 0%,
            rgba(255, 255, 255, 0.2) 70%
          );
          left: 50%;
          margin-left: -220px;
          transform: skew(-10deg);
          animation: vector-move 3s infinite;

          @include animationOption();
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
        background-image: linear-gradient(180deg, #ffffff 100%, #ffffff 100%);
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
        text-shadow: 0px 2px 4px rgba(255, 255, 255, 0.2);
      }
    }
  }
}

@keyframes move-left {
  0% {
    stroke-dashoffset: -940;
  }

  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes move-right {
  0% {
    stroke-dashoffset: 940;
  }

  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes vector-move {
  0% {
    transform: skew(-10deg);
  }

  80% {
    opacity: 0.2;
  }

  100% {
    transform: skew(-10deg) translateX(350px);
    opacity: 0;
  }
}
</style>
