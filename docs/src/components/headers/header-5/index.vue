<template>
  <div class="layout-header-view-5">
    <div class="layout-hader-title-container">
      <!-- 背景图元素配置 -->
      <div class="bg-container">
        <div class="left-container">
          <div class="vector-1"></div>
          <div class="circle-1"></div>
          <div class="rectangle-1"></div>
          <div class="points-1">
            <div v-for="(item, index) in 4" :key="item" class="point"></div>
          </div>
          <div class="vector-2">
            <div class="points-2">
              <div v-for="(item, index) in 8" :key="item" class="point"></div>
            </div>
            <div class="rectangle-2"></div>
            <div class="rectangle-3"></div>
            <div class="rectangle-4"></div>
            <div class="rectangle-5"></div>
          </div>
        </div>
        <div class="rectangle-bottom"></div>
        <div class="rectangle"></div>
        <div class="left-container overturn">
          <div class="vector-1"></div>
          <div class="circle-1"></div>
          <div class="rectangle-1"></div>
          <div class="points-1">
            <div v-for="(item, index) in 4" :key="item" class="point"></div>
          </div>
          <div class="vector-2">
            <div class="points-2">
              <div v-for="(item, index) in 8" :key="item" class="point"></div>
            </div>
            <div class="rectangle-2"></div>
            <div class="rectangle-3"></div>
            <div class="rectangle-4"></div>
            <div class="rectangle-5"></div>
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

.layout-header-view-5 {
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
        width: 509px;
        height: $header-height;

        background: linear-gradient(
          270deg,
          rgba(47, 255, 203, 0) 1%,
          rgba(47, 255, 203, 0) 1%,
          rgba(47, 255, 203, 0.27) 51%,
          rgba(47, 255, 203, 0) 100%,
          rgba(47, 255, 203, 0) 100%
        );

        &::after {
          content: '';
          width: 509px;
          height: 40px;
          background-image: url('static/images/headers/header_5/rectangle-1.png');
          background-position: bottom;
          position: absolute;
          top: 50%;
          margin-top: -15px;
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

        .vector-1 {
          position: absolute;
          top: 0;
          width: 37px;
          height: 41px;
          background-size: 100%;
        }

        .circle-1 {
          width: 10px;
          height: 10px;
          box-sizing: border-box;
          border: 2px solid #2fffcb;
          position: absolute;
          bottom: 5px;
          border-radius: 50%;
        }

        .rectangle-1 {
          bottom: 9.5px;
          position: absolute;
          width: 139px;
          height: 1px;
          background: rgba(48, 250, 191, 0.4);
        }

        .points-1 {
          position: absolute;
          bottom: 7px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          width: 36px;

          .point {
            width: 6px;
            height: 4px;
            background: #2effcb;

            @for $i from 1 through 4 {
              &:nth-child(#{$i}) {
                animation-delay: (#{0.5 * (5 - $i)}s);
              }
            }
          }
        }

        .vector-2 {
          position: absolute;
          width: 514.5px;
          height: 33px;
          bottom: 9.5px;
          background-size: 100%;

          .points-2 {
            width: 77px;
            display: flex;
            justify-content: space-between;
            position: absolute;
            top: 15.5px;

            .point {
              width: 7px;
              height: 3px;
              background: #2effcb;
              animation: opacity 2s infinite linear;

              @for $i from 1 through 8 {
                &:nth-child(#{$i}) {
                  opacity: (#{0.125 * $i});
                  animation-delay: (#{0.125 * (9 - $i)}s);
                }
              }

              @include animationOption();
            }
          }

          .rectangle-2 {
            position: absolute;
            top: 8.5px;
            width: 232px;
            height: 11px;
            background: linear-gradient(
              180deg,
              rgba(111, 255, 219, 0) 0%,
              rgba(111, 255, 219, 0) 0%,
              rgba(111, 255, 219, 0.18) 100%,
              rgba(111, 255, 219, 0.18) 100%
            );
          }

          .rectangle-3 {
            position: absolute;
            top: 0px;
            width: 2px;
            height: 12px;
            background: #2fffcb;
          }

          .rectangle-4 {
            position: absolute;
            top: 0px;
            width: 2px;
            height: 12px;
            background: #2fffcb;
          }

          .rectangle-5 {
            position: absolute;
            top: 0px;
            width: 16px;
            height: 2px;
            background: #2fffcb;
          }
        }
      }

      .left-container {
        background: linear-gradient(
          90deg,
          #08222f 0%,
          #08222f 0%,
          rgba(11, 44, 60, 0.4) 17%,
          rgba(13, 50, 69, 0) 50%,
          rgba(13, 50, 69, 0) 50%
        );

        .vector-1 {
          left: 0;
          background-image: url('static/images/headers/header_5/vector-1.png');
        }

        .circle-1 {
          left: 0px;
        }

        .rectangle-1 {
          left: 9.5px;
        }

        .points-1 {
          left: 150px;
        }

        .vector-2 {
          left: 189.5px;
          background-image: url('static/images/headers/header_5/vector-2.png');

          .points-2 {
            left: 175px;

            .point {
              transform: skewX(-45deg);
            }
          }

          .rectangle-2 {
            left: 260px;
            transform: skewX(-45deg);
          }

          .rectangle-3 {
            right: 0px;
            transform: skewX(-46deg);
          }

          .rectangle-4 {
            left: 126px;
            transform: skewX(-46deg);
            animation: move-1 3s ease-out infinite;

            @include animationOption();
          }

          .rectangle-5 {
            position: absolute;
            left: 498px;
            top: 0px;
            width: 16px;
            height: 2px;
            background: #2fffcb;
            animation: move-2 18s ease-out infinite;

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
        display: inline-block;
        background-image: linear-gradient(180deg, #ffffff 100%, #248069 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-family: YouSheBiaoTiHei, serif;
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

@keyframes bounce {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-20px);
  }

  100% {
    transform: translateY(0px);
  }
}

@keyframes move-1 {
  0% {
    left: 126px;
    top: 0px;
  }

  50% {
    left: 106px;
    top: 21px;
  }

  100% {
    left: 126px;
    top: 0px;
  }
}

@keyframes move-2 {
  0% {
    left: 133px;
  }

  50% {
    left: 498px;
  }

  100% {
    left: 133px;
  }
}

@keyframes move-3 {
  0% {
    right: 126px;
    top: 0px;
  }

  50% {
    right: 106px;
    top: 21px;
  }

  100% {
    right: 126px;
    top: 0px;
  }
}

@keyframes move-4 {
  0% {
    right: 133px;
  }

  50% {
    right: 498px;
  }

  100% {
    right: 133px;
  }
}

.overturn {
  transform: rotateY(180deg);
}
</style>
