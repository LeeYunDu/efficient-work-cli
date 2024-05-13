<template>
  <div class="layout-header-view-1">
    <div class="layout-hader-title-container">
      <!-- 背景图元素配置 -->
      <div class="bg-container">
        <div class="left-container">
          <div class="vector-1"></div>
          <div class="rectangle-box">
            <div v-for="(item) in 4" :key="item" class="rectangle-item"></div>
          </div>
          <div class="vector-2"></div>
        </div>
        <div class="rectangle"></div>
        <div class="left-container overturn">
          <div class="vector-1"></div>
          <div class="rectangle-box">
            <div v-for="(item) in 4" :key="item" class="rectangle-item"></div>
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

.layout-header-view-1 {
  position: relative;
  display: flex;
  height: $header-height;

  .layout-hader-title-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    text-align: center;

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

      .rectangle {
        width: 754px;
        height: 60px;
        background-image: url('static/images/headers/header_1/rectangle.png');
        background-size: 100%;
      }

      .rectangle-box {
        margin-bottom: 8.5px;
        display: flex;

        .rectangle-item {
          animation: opacity 2s infinite linear;

          @include animationOption;
        }
      }

      .vector-1 {
        width: 302px;
        height: 19px;
        background-size: 100%;
      }

      .vector-2 {
        width: 483px;
        height: 11px;
        background-size: 100%;
        position: relative;

        &::after {
          content: '';
          background-image: url('static/images/headers/header_1/ellipse.png');
          position: absolute;
          width: 6px;
          height: 6px;
          left: 0;
          top: -2px;
          background-size: 100%;
        }

        &::before {
          content: '';
          background-image: url('static/images/headers/header_1/ellipse.png');
          position: absolute;
          width: 6px;
          height: 6px;
          right: 0;
          top: -2px;
          background-size: 100%;
        }
      }

      .left-container {
        .vector-1 {
          background-image: url('static/images/headers/header_1/left-vector-1.png');
          margin-left: auto;
        }

        .vector-2 {
          background-image: url('static/images/headers/header_1/left-vector-2.png');

          &::before {
            display: none;
          }
        }

        .rectangle-box {
          margin-right: 20px;
          justify-content: flex-end;

          .rectangle-item {
            width: 20px;
            height: 11px;
            background-image: url('static/images/headers/header_1/left-rectangle.png');
            background-size: 100%;

            @for $i from 1 through 4 {
              &:nth-child(#{$i}) {
                opacity: (#{$i * 0.25});
                animation-delay: (#{0.25 * (4 - $i)}s);
              }
            }
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
        display: inline-block;
        background-image: linear-gradient(180deg, #ffffff 100%, #b0f8eb 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
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

.overturn {
  transform: rotateY(180deg);
}
</style>
