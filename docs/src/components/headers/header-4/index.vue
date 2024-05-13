<template>
  <div class="layout-header-view-4">
    <div class="layout-hader-title-container">
      <!-- 背景图元素配置 -->
      <div class="bg-container">
        <div class="left-container">
          <div class="rectangle-1"></div>
          <div class="rectangle-2"></div>
          <div class="rectangle-3"></div>
        </div>
        <div class="rectangle-bottom"></div>
        <div class="rectangle"></div>
        <div class="left-container overturn">
          <div class="rectangle-1"></div>
          <div class="rectangle-2"></div>
          <div class="rectangle-3"></div>
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

.layout-header-view-4 {
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
      align-items: center;
      z-index: 1;

      .rectangle {
        position: relative;
        width: 514px;
        height: 78px;
        background: linear-gradient(
          270deg,
          rgba(107, 167, 238, 0) 0%,
          rgba(107, 167, 238, 0) 0%,
          rgba(31, 100, 211, 0.52) 44%,
          rgba(56, 124, 255, 0) 98%,
          rgba(56, 124, 255, 0) 98%
        );
        filter: blur(14px);
      }

      .rectangle-bottom {
        position: absolute;
        width: 100%;
        height: 66px;
        background: none;
        background-image: url('static/images/headers/header_4/rectangle-1.png');
        background-size: 100%;
        background-position: center bottom;
        background-repeat: no-repeat;
      }

      .left-container {
        flex: 1;
        height: 100%;
        position: relative;
        display: flex;
        margin-top: 17px;

        .rectangle-1 {
          width: 682px;
          height: 24px;
          background: linear-gradient(
            270deg,
            rgba(4, 119, 255, 0.67) 0%,
            rgba(138, 178, 240, 0) 100%
          );
        }

        .rectangle-2 {
          width: 4px;
          height: 24px;
          background: #275989;
          margin: 0 4px;
          animation: color-1 3s linear infinite;
          @include animationOption();
        }

        .rectangle-3 {
          width: 4px;
          height: 24px;
          background: #3386d7;
          animation: color-2 3s linear infinite;

          @include animationOption();
        }
      }

      .left-container {
        .rectangle-1,
        .rectangle-2,
        .rectangle-3 {
          transform: skewX(-45deg);
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
        color: white;
        position: relative;
        font-weight: normal;
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

@keyframes color-1 {
  0% {
    background: #275989;
    opacity: 0.25;
  }

  50% {
    background: #3386d7;
    opacity: 1;
  }

  100% {
    background: #275989;
    opacity: 0.25;
  }
}

@keyframes color-2 {
  0% {
    background: #3386d7;
    opacity: 1;
  }

  50% {
    background: #275989;
    opacity: 0.25;
  }

  100% {
    background: #3386d7;
    opacity: 1;
  }
}

.overturn {
  transform: rotateY(180deg);
}
</style>
