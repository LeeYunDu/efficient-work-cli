<template>
  <div class="layout-header-view-7">
    <div class="layout-hader-title-container">
      <!-- 背景图元素配置 -->
      <div class="bg-container">
        <div class="left-container">
          <div class="top-rectangle-group">
            <div class="rectangle-box">
              <div v-for="(item, index) in 4" :key="index" class="rectangle-item"></div>
            </div>
            <div class="svg-box-2">
              <svg viewBox="0 0 235 12" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                  <linearGradient id="top-gradient-left">
                    <stop offset="0" stop-color="rgba(41,152,255,0.1)" />
                    <stop offset="100%" stop-color="#0894E2" />
                  </linearGradient>
                </defs>
                <path
                  d=" M0 12 L12 0 L235 0"
                  stroke="url(#top-gradient-left)"
                  stroke-width="2px"
                  fill="transparent"
                  class="path"
                />
                <path
                  d=" M0 12 L12 0 L235 0"
                  stroke="#F6BC70"
                  stroke-width="2px"
                  fill="transparent"
                  class="top-line"
                />
              </svg>
            </div>
          </div>
          <div class="rectangle-group">
            <div class="svg-box">
              <svg viewBox="0 0 350 50" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <path
                  d=" M0 0 Q25,25 50,25 L300 25 Q325,25 350,50 "
                  stroke="#156DBE"
                  stroke-width="2px"
                  fill="transparent"
                  class="path"
                />
                <path
                  d=" M0 0 Q25,25 50,25 L300 25 Q325,25 350,50 "
                  stroke="#F6BC70"
                  stroke-width="2px"
                  fill="transparent"
                  class="line-left"
                />
              </svg>
            </div>
            <div class="rectangle-list">
              <div v-for="(item, index) in 8" :key="index" class="rectangle-item">
                <div
                  class="animation-rectangle"
                  :style="{
                    opacity: `${0.125 * (index + 1)}`,
                    'animation-delay': `${0.125 * (8 - (index))}s`
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div class="rectangle-bottom">
          <svg
            viewBox="0 0 1892 67"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            class="bottom-line"
          >
            <defs>
              <linearGradient id="master_svg0_0_39">
                <stop offset="0" stop-color="rgba(41,152,255,0.1)" />
                <stop offset="50%" stop-color="#0894E2" />
                <stop offset="100" stop-color="rgba(41,152,255,0.1)" />
              </linearGradient>
            </defs>
            <path
              d="
              M1892 7 Q1866,31 1846,31 L1466,31 Q1446,31 1436,38 L1392 60 Q1385,65 1356,65
              L536 65 Q509 65 502 60 L465,38 Q455,31 435,31 L46,31 Q26,31 0,7
              "
              stroke="url(#master_svg0_0_39)"
              stroke-width="2px"
              fill="transparent"
              class="path"
            />
            <!-- rgba(13, 135, 247, 1) -->
            <path
              d="M1892 7 Q1866,31 1846,31 L1466,31 Q1446,31 1436,38 L1392 60 Q1385,65 1356,65 L946 65"
              stroke="rgba(13, 135, 247, 1)"
              stroke-width="2px"
              fill="transparent"
              class="bottom-path-1"
            />
            <path
              d="M946 65 L536 65 Q509 65 502 60 L465,38 Q455,31 435,31 L46,31 Q26,31 0,7"
              stroke="rgba(13, 135, 247, 1)"
              stroke-width="2px"
              fill="transparent"
              class="bottom-path-2"
            />
          </svg>
        </div>
        <div class="rectangle">
          <div class="vector-2"></div>
        </div>
        <div class="left-container overturn">
          <div class="top-rectangle-group">
            <div class="rectangle-box">
              <div v-for="(item, index) in 4" :key="index" class="rectangle-item"></div>
            </div>
            <div class="svg-box-2">
              <svg viewBox="0 0 235 12" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                  <linearGradient id="top-gradient-left">
                    <stop offset="0" stop-color="rgba(41,152,255,0.1)" />
                    <stop offset="100%" stop-color="#0894E2" />
                  </linearGradient>
                </defs>
                <path
                  d=" M0 12 L12 0 L235 0"
                  stroke="url(#top-gradient-left)"
                  stroke-width="2px"
                  fill="transparent"
                  class="path"
                />
                <path
                  d=" M0 12 L12 0 L235 0"
                  stroke="#F6BC70"
                  stroke-width="2px"
                  fill="transparent"
                  class="top-line"
                />
              </svg>
            </div>
          </div>
          <div class="rectangle-group">
            <div class="svg-box">
              <svg viewBox="0 0 350 50" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <path
                  d=" M0 0 Q25,25 50,25 L300 25 Q325,25 350,50 "
                  stroke="#156DBE"
                  stroke-width="2px"
                  fill="transparent"
                  class="path"
                />
                <path
                  d=" M0 0 Q25,25 50,25 L300 25 Q325,25 350,50 "
                  stroke="#F6BC70"
                  stroke-width="2px"
                  fill="transparent"
                  class="line-left"
                />
              </svg>
            </div>
            <div class="rectangle-list">
              <div v-for="(item, index) in 8" :key="index" class="rectangle-item">
                <div class="animation-rectangle"></div>
              </div>
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
          <slot name="center"></slot>
        </div>
        <div class="header-right">
          <slot name="right"></slot>
        </div>
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

.layout-header-view-7 {
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
        height: $header-height;
        margin: 0 -67px;

        .vector-2 {
          position: absolute;
          width: 50px;
          height: 30px;
          background: linear-gradient(
            180deg,
            rgba(14, 136, 248, 0) 0%,
            rgba(14, 136, 248, 0.3) 101%
          );
          left: 0%;
          bottom: 10px;
          transform: skew(-30deg);
          animation: vector-move 3s infinite;

          @include animationOption();
        }
      }

      .rectangle-bottom {
        position: absolute;
        width: 100%;
        height: $header-height;
        background: none;
        background-image: url('static/images/headers/header_7/rectangle-1.png');
        background-size: 100%;
        background-position: center bottom;
        background-repeat: no-repeat;

        .bottom-line {
          position: absolute;
          left: 50%;
          bottom: 5px;
          transform: translateX(-50%);
          width: 1892.5px;
          z-index: 10;
          padding-top: 10px;
        }

        .bottom-path-1 {
          stroke-dasharray: 958;
          animation: center-line-1 4.5s ease-out infinite;

          @include animationOption();
        }

        .bottom-path-2 {
          stroke-dasharray: 958;
          animation: center-line-2 4.5s ease-out infinite;

          @include animationOption();
        }
      }

      .left-container {
        flex: 1;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        z-index: 2;

        .rectangle-group {
          height: 50px;
          position: absolute;
          bottom: 0;
          display: flex;
          align-items: flex-end;

          .svg-box {
            width: 350px;
            height: 50px;
            overflow-y: hidden;
          }

          .rectangle-list {
            height: 22px;
            display: flex;

            .rectangle-item {
              @for $i from 1 through 8 {
                &:nth-child(#{$i}) {
                  .animation-rectangle {
                    height: $i * 12.5%;
                    opacity: (#{$i * 0.125});
                    animation-delay: (#{0.125 * (9 - $i)}s);
                  }
                }
              }

              .animation-rectangle {
                width: 8px;
                background: linear-gradient(231deg, #003a3f 6%, #086ce2 94%);
                min-height: 30%;
              }
            }
          }
        }

        .top-rectangle-group {
          height: 12px;
          margin-top: 5px;
          display: flex;

          .rectangle-box {
            height: 100%;
            display: flex;

            .rectangle-item {
              height: 12px;
              width: 15px;
              margin-left: 10px;
              transform: skew(-45deg);
              animation: opacity 2s infinite ease-in-out;

              @for $i from 1 through 4 {
                &:nth-child(#{$i}) {
                  opacity: (#{0.25 * $i});
                  animation-delay: (#{0.25 * (5 - $i)}s);
                }
              }

              @include animationOption();
            }
          }

          .svg-box-2 {
            width: 235px;
            height: 12px;
            position: relative;
            top: -3px;

            .top-line {
              stroke-dasharray: 20, 235;
              stroke-dashoffset: -220;
            }
          }
        }
      }

      .left-container {
        .rectangle-group {
          .rectangle-list {
            margin-left: 10px;

            .rectangle-item {
              .animation-rectangle {
                transform: skew(45deg);
              }
            }

            .rectangle-item ~ .rectangle-item {
              margin-left: 6px;
            }
          }

          .line-left {
            stroke-dasharray: 50, 320;
            stroke-dashoffset: -315;
            animation: moveLeft 6s infinite;

            @include animationOption();
          }
        }

        .top-rectangle-group {
          margin-left: auto;
          transform: translateX(46%);

          .rectangle-box {
            .rectangle-item {
              margin-left: 10px;
              transform: skew(-45deg);
              background: #469bff;
            }

            .rectangle-item:nth-child(3) {
              width: 20px;
            }

            .rectangle-item:nth-child(4) {
              width: 65px;
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
    }

    .title-box {
      position: relative;
      z-index: 2;
    }

    .header-title,
    .header-shadow {
      font-size: 54px;
      letter-spacing: 0px;
      line-height: 76px;
      letter-spacing: 7.56px;
      font-weight: normal;
    }

    .header-title {
      color: #ffffff;
      font-family: YouSheBiaoTiHei, serif;
      position: relative;
    }

    .header-shadow {
      display: inline-block;
      position: absolute;
      text-align: center;
      z-index: -1;
      right: 0;
      color: transparent;
      text-shadow: 0px 4px 16px rgba(43, 174, 250, 0.48);
    }
  }
}

@keyframes opacity {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0.25;
  }
}

@keyframes vector-move {
  0% {
    transform: skew(-30deg);
  }

  80% {
    opacity: 0.2;
  }

  100% {
    transform: skew(-30deg) translateX(650px);
    opacity: 0;
  }
}

@keyframes moveLeft {
  0% {
    stroke-dashoffset: -315;
  }

  50% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dashoffset: -315;
  }
}

@keyframes moveRight {
  0% {
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dashoffset: -315;
  }

  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes topLineLeft {
  from {
    stroke-dashoffset: 18;
  }

  to {
    stroke-dashoffset: -235;
  }
}

@keyframes heightLeft {
  0% {
  }

  100% {
    height: 100%;
  }
}

@keyframes center-line-1 {
  from {
    stroke-dashoffset: -958;
  }

  to {
    stroke-dashoffset: 0;
  }
}

@keyframes center-line-2 {
  from {
    stroke-dashoffset: 958;
  }

  to {
    stroke-dashoffset: 0;
  }
}

.overturn {
  transform: rotateY(180deg);
}
</style>
