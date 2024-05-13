<template>
  <div class="layout-header-view-11">
    <div class="layout-hader-title-container">
      <!-- 背景图元素配置 -->
      <div class="bg-container">
        <div class="left-container">
          <div class="vector-group">
            <div class="vector-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                fill="none"
                version="1.1"
                viewBox="0 0 751 80"
              >
                <g style="mix-blend-mode:passthrough">
                  <defs>
                    <linearGradient id="left-linearGradient">
                      <stop offset="14%" stop-color="#0395FF " />
                      <stop offset="97%" stop-color="rgba(3,149,255,0.00)" />
                    </linearGradient>

                    <radialGradient
                      id="radialGradient"
                      cx="50%"
                      cy="50%"
                      r="50%"
                      fx="50%"
                      fy="50%"
                      fr="0%"
                    >
                      <stop offset="0%" style="stop-color:#90F8FF ; " />
                      <stop offset="100%" style="stop-color:rgba(108,211,255,0.00); " />
                    </radialGradient>
                  </defs>

                  <path
                    id="line-path"
                    d=" M0,6 L343,58 L330,35 L557,61 L595,35 L714,42 "
                    fill="transparent"
                    stroke="url(#left-linearGradient)"
                    stroke-width="1"
                  />
                  <!-- points="0,4 342.45,58" -->
                  <!-- 0,6 343,58 330,35 557,61 595,35 714,42 -->
                  <path
                    d=" M0,6 L343,58 L330,35 L557,61 L595,35 L714,42 "
                    class="g-rect-fill"
                    stroke="url(#radialGradient)"
                    stroke-width="3"
                  />
                </g>
              </svg>
            </div>
            <div class="vector-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                fill="none"
                version="1.1"
                viewBox="0 0 751 80"
              >
                <g style="mix-blend-mode:passthrough">
                  <defs>
                    <linearGradient id="linearGradient-2">
                      <stop offset="17%" stop-color="rgba(3,149,255,0.00) " />
                      <stop offset="97%" stop-color="#0395FF" />
                    </linearGradient>
                  </defs>

                  <path
                    d=" M0,1 L343,51.5 L330,29 L557,53 L595,30 L715.5,38.5 L740.5,65.75 L749.5,63.25"
                    fill="transparent"
                    stroke="url(#linearGradient-2)"
                    stroke-width="2"
                  />
                </g>
              </svg>
            </div>
            <div class="vector-3">
              <img class="svg-img" src="static/images/headers/header_11/vector-1.png" alt />
              <div v-for="(item, index) in 2" :key="index" class="rectangle-item"></div>
            </div>
            <div class="group-1"></div>
          </div>
        </div>
        <div class="rectangle"></div>
        <div class="left-container overturn">
          <div class="vector-group">
            <div class="vector-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                fill="none"
                version="1.1"
                viewBox="0 0 751 80"
              >
                <g style="mix-blend-mode:passthrough">
                  <defs>
                    <linearGradient id="left-linearGradient">
                      <stop offset="14%" stop-color="#0395FF " />
                      <stop offset="97%" stop-color="rgba(3,149,255,0.00)" />
                    </linearGradient>

                    <radialGradient
                      id="radialGradient"
                      cx="50%"
                      cy="50%"
                      r="50%"
                      fx="50%"
                      fy="50%"
                      fr="0%"
                    >
                      <stop offset="0%" style="stop-color:#90F8FF ; " />
                      <stop offset="100%" style="stop-color:rgba(108,211,255,0.00); " />
                    </radialGradient>
                  </defs>

                  <path
                    id="line-path"
                    d=" M0,6 L343,58 L330,35 L557,61 L595,35 L714,42 "
                    fill="transparent"
                    stroke="url(#left-linearGradient)"
                    stroke-width="1"
                  />
                  <!-- points="0,4 342.45,58" -->
                  <!-- 0,6 343,58 330,35 557,61 595,35 714,42 -->
                  <path
                    d=" M0,6 L343,58 L330,35 L557,61 L595,35 L714,42 "
                    class="g-rect-fill"
                    stroke="url(#radialGradient)"
                    stroke-width="3"
                  />
                </g>
              </svg>
            </div>
            <div class="vector-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                fill="none"
                version="1.1"
                viewBox="0 0 751 80"
              >
                <g style="mix-blend-mode:passthrough">
                  <defs>
                    <linearGradient id="linearGradient-2">
                      <stop offset="17%" stop-color="rgba(3,149,255,0.00) " />
                      <stop offset="97%" stop-color="#0395FF" />
                    </linearGradient>
                  </defs>

                  <path
                    d=" M0,1 L343,51.5 L330,29 L557,53 L595,30 L715.5,38.5 L740.5,65.75 L749.5,63.25"
                    fill="transparent"
                    stroke="url(#linearGradient-2)"
                    stroke-width="2"
                  />
                </g>
              </svg>
            </div>
            <div class="vector-3">
              <img class="svg-img" src="static/images/headers/header_11/vector-1.png" alt />
              <div v-for="(item, index) in 2" :key="index" class="rectangle-item"></div>
            </div>
            <div class="group-1"></div>
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

.layout-header-view-11 {
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
        width: 100%;
        height: 80px;
        background-image: url('static/images/headers/header_11/bg.png');
        background-size: 100%;
        background-repeat: no-repeat;
        position: absolute;
        z-index: 11;
      }

      .left-container {
        height: 100%;
        position: relative;
        display: flex;
        z-index: 10;
        width: 100%;
        height: 100%;
        margin-right: auto;

        .vector-group {
          width: 751px;
          position: relative;
          margin-right: auto;
          left: -10px;
        }

        .vector-1,
        .vector-2 {
          width: 751px;
          height: 80px;
          position: absolute;

          .g-rect-fill {
            stroke-dasharray: 350, 380;
            stroke-dashoffset: 0;
            stroke-linejoin: round;
            stroke-linecap: round;
          }
        }

        .group-1 {
          position: absolute;
          width: 594px;
          height: 41px;
          background-size: 100%;
          top: 10.75px;
          left: 0;
        }

        .vector-3 {
          width: 159px;
          height: 9px;
          position: absolute;
          top: 4px;
          right: 4px;
          display: flex;

          .rectangle-item {
            width: 13.5px;
            height: 9px;
            animation: opacity 2s ease-out infinite;
            @include animationOption();
          }

          .svg-img {
            animation: opacity 2s ease-out infinite;
            animation-delay: 0s;

            @include animationOption();
          }
        }
      }

      .left-container {
        .vector-1,
        .vector-2 {
          .g-rect-fill {
            animation: move-line 6s infinite ease-in-out;
            @include animationOption();
            animation-duration: 6s;
          }
        }

        .group-1 {
          background-image: url('static/images/headers/header_11/group-1.png');
          left: 123.75px;
        }

        .vector-3 {
          right: 4px;

          .rectangle-item {
            background: linear-gradient(
              207deg,
              #4da9ff 0%,
              rgba(64, 163, 255, 0.2) 100%
            );
            transform: skew(-45deg);
            margin-left: 4px;

            @for $i from 1 through 2 {
              &:nth-child(#{$i}) {
                animation-delay: (#{0.66 * $i}s);
              }
            }
          }

          .svg-img {
            animation: opacity 2s ease-out infinite;
            animation-delay: 0s;
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
        top: -4px;
      }

      .header-title,
      .header-shadow {
        font-size: 54px;
        letter-spacing: 0px;
        position: relative;
        font-weight: normal;
        line-height: 76px;
        letter-spacing: 7.56px;
      }

      .header-title {
        display: inline-block;
        background: linear-gradient(180deg, #ffffff 20%, #2b8cff 100%);
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
        text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
      }
    }
  }
}

@keyframes opacity {
  0% {
    opacity: 1;
  }

  33% {
    opacity: 0.2;
  }

  100% {
    opacity: 1;
  }
}

@keyframes move-line {
  0% {
    stroke-dashoffset: 50;
  }

  100% {
    stroke-dashoffset: -690;
  }
}

.overturn {
  transform: rotateY(180deg);
}
</style>
