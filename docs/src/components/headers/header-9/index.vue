<template>
  <div class="layout-header-view-9">
    <div class="layout-hader-title-container">
      <!-- 背景图元素配置 -->
      <div class="bg-container">
        <div class="left-container">
          <div class="rectangle-1">
            <div class="vector-group-1">
              <div v-for="(item, index) in 3" :key="item" class="vector-item"></div>
            </div>
            <div class="vector-group-2">
              <div v-for="(item, index) in 5" :key="item" class="vector-item"></div>
            </div>
            <div class="vector-group-3">
              <div v-for="(item, index) in 2" :key="item" class="vector-item"></div>
            </div>
          </div>
          <div class="rectangle-2"></div>
        </div>
        <div class="rectangle">
          <div class="vector-1"></div>
          <div class="vector-2"></div>
          <div class="vector-3"></div>
          <div class="vector-4"></div>
        </div>
        <div class="left-container overturn">
          <div class="rectangle-1">
            <div class="vector-group-1">
              <div v-for="(item, index) in 3" :key="item" class="vector-item"></div>
            </div>
            <div class="vector-group-2">
              <div v-for="(item, index) in 5" :key="item" class="vector-item"></div>
            </div>
            <div class="vector-group-3">
              <div v-for="(item, index) in 2" :key="item" class="vector-item"></div>
            </div>
          </div>
          <div class="rectangle-2"></div>
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
              v-if="false"
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
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ref } from 'vue'

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

$header-height: 80px;

.layout-header-view-9 {
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
      z-index: 1;

      .rectangle {
        width: 538px;
        height: 75px;
        background-image: url('static/images/headers/header_9/title-bg.svg');
        background-size: 100%;
        background-repeat: no-repeat;
        position: absolute;
        z-index: 11;

        .vector-1,
        .vector-2 {
          width: 95px;
          height: 13px;
          background-size: 100%;
          background-repeat: no-repeat;
          position: absolute;
          bottom: -5px;
        }

        .vector-1 {
          left: 40px;
          background-image: url('static/images/headers/header_9/vector-1.svg');
        }

        .vector-2 {
          right: 40px;
          background-image: url('static/images/headers/header_9/vector-2.svg');
        }

        .vector-3 {
          width: 200px;
          height: 5px;
          background: #1d4798;
          position: absolute;
          bottom: -5px;
          left: 50%;
          margin-left: -100px;
        }

        .vector-4 {
          position: absolute;
          width: 316px;
          height: 40.6px;
          background-size: 100%;
          background-repeat: no-repeat;
          background-image: url('static/images/headers/header_9/bg-2.png');
          background-position: 0;
          bottom: 0px;
          left: 50%;
          margin-left: -158px;
          transform: translateY(18px) translateX(0px);
          animation: move-point 4s linear infinite;

          @include animationOption();
        }
      }

      .left-container {
        flex: 1;
        height: 100%;
        position: relative;
        display: flex;
        z-index: 10;

        .rectangle-1 {
          width: 713px;
          height: 24px;
          background-size: 100%;
          background-repeat: no-repeat;
          position: relative;
          top: 9px;
          z-index: 2;
          display: flex;
          align-items: center;

          .vector-group-1 {
            display: flex;
            align-items: center;
            height: 100%;

            .vector-item {
              width: 12px;
              height: 12px;
              background: #2655bf;
              box-sizing: border-box;
              border: 1px solid #0096db;
              border-radius: 50%;
              animation: light 2s linear infinite;

              @for $i from 1 through 3 {
                &:nth-child(#{$i}) {
                  animation-delay: (#{0.25 * $i}s);
                }
              }

              @include animationOption();
            }
          }

          .vector-group-2 {
            display: flex;

            .vector-item {
              width: 8px;
              height: 9px;
              margin: 0 2.5px;

              @for $i from 1 through 5 {
                &:nth-child(#{$i}) {
                  animation-delay: (#{1 * ($i - 1)}s);
                }
              }
            }
          }

          .vector-group-3 {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 18px;

            .vector-item {
              width: 22px;
              height: 15px;
              background-size: 100%;
              background-repeat: no-repeat;

              @for $i from 1 through 2 {
                &:nth-child(#{$i}) {
                  animation-delay: (#{1 * ($i - 1)}s);
                }
              }
            }
          }
        }

        .rectangle-2 {
          position: absolute;
          width: 213.5px;
          height: 24px;
          background-size: 100%;
          background-repeat: no-repeat;
          z-index: 3;
        }
      }

      .left-container {
        .rectangle-1 {
          background-image: url('static/images/headers/header_9/rectangle-1.svg');

          .vector-group-1 {
            margin-left: 4px;

            .vector-item,
            ~ .vector-item {
              margin-left: 4px;
            }
          }

          .vector-group-2 {
            margin-right: 132px;
            margin-left: auto;
            flex: 1;
            display: flex;
            justify-content: flex-end;

            .vector-item {
              margin: 0 2.5px;
              transform: translateX(-300px);
              opacity: 0;
              animation: roll 5s ease-out infinite;

              @include animationOption();
            }

            .vector-item:nth-child(1) {
              background: rgba(23, 46, 114, 0.65);
            }

            .vector-item:nth-child(2) {
              background: rgba(15, 55, 127, 0.75);
            }

            .vector-item:nth-child(3) {
              background: #0e3e93;
            }

            .vector-item:nth-child(4) {
              width: 22px;
              background: linear-gradient(180deg, #0d7ac1 0%, #055dbf 100%);
            }

            .vector-item:nth-child(5) {
              width: 22px;
              background: linear-gradient(90deg, #3766f4 2%, #7413dc 100%);
            }
          }

          .vector-group-3 {
            position: absolute;
            right: 0;

            .vector-item {
              background-image: url('static/images/headers/header_9/rectangle-6.svg');
            }
          }
        }

        .rectangle-2 {
          background-image: url('static/images/headers/header_9/rectangle-3.svg');
          right: 234px;
          transform: translateX(35%);
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
        position: relative;
        top: -4px;
        font-size: 54px;
        font-weight: normal;
        line-height: 76px;
        letter-spacing: 7.56px;
      }

      .header-title {
        display: inline-block;
        background-image: linear-gradient(180deg, #ffffff 25%, #2b8cff 100%);
        -webkit-background-clip: text;
        color: transparent;
      }
    }
  }
}

@keyframes opacity {
  0% {
    opacity: 0.65;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.65;
  }
}

@keyframes light {
  0% {
    opacity: 1;
  }

  75% {
    opacity: 0.25;
  }

  100% {
    opacity: 1;
  }
}

@keyframes roll {
  0% {
    transform: translateX(-300px) rotate(0deg);
    box-shadow: 0 0 14px white;
    background: white;
    opacity: 1;
  }

  20% {
    transform: translateX(0px) rotate(360deg);
    opacity: 1;
  }

  80% {
    transform: translateX(0px) rotate(360deg);
    opacity: 1;
  }

  100% {
    transform: translateX(0px) rotate(360deg);
    opacity: 0;
  }
}

@keyframes roll-2 {
  0% {
    transform: translateX(300px) rotate(0deg);
    box-shadow: 0 0 14px white;
    background: white;
    opacity: 1;
  }

  20% {
    transform: translateX(0px) rotate(360deg);
    opacity: 1;
  }

  80% {
    transform: translateX(0px) rotate(360deg);
    opacity: 1;
  }

  100% {
    transform: translateX(0px) rotate(360deg);
    opacity: 0;
  }
}

@keyframes move-point {
  0% {
    transform: translateY(18px) translateX(0px);
  }

  25% {
    transform: translateY(18px) translateX(30px);
  }

  50% {
    transform: translateY(18px) translateX(0px);
  }

  75% {
    transform: translateY(18px) translateX(-30px);
  }

  100% {
    transform: translateY(18px) translateX(0px);
  }
}

.overturn {
  transform: rotateY(180deg);
}
</style>
