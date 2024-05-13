<template>
  <div class="layout-header-view-10">
    <div class="layout-header-title-container">
      <!-- 背景图元素配置 -->
      <div class="bg-container">
        <div class="left-container">
          <div class="vector-group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              fill="none"
              version="1.1"
              width="105"
              height="33"
              viewBox="0 0 105 33"
              class="svg-group"
            >
              <g style="mix-blend-mode:passthrough">
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M13.062725,15.38894017578125L3.673825,6.00000017578125L-0.00010399999999999299,9.67393017578125L5.743975,15.41801017578125L0,21.16203017578125L3.673935,24.83593017578125L13.062925,15.44697017578125L13.033825,15.41790017578125L13.062725,15.38894017578125Z"
                  fill-rule="evenodd"
                  fill="#00BEEE"
                  class="svg-item"
                />
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M45.470087500000005,16.11273017578125L32.3574175,3.00000017578125L27.2263675,8.131050175781251L35.2486175,16.15333017578125L27.2265625,24.17533017578125L32.3576175,29.30643017578125L45.4702875,16.193730175781248L45.4296875,16.15313017578125L45.470087500000005,16.11273017578125Z"
                  fill-rule="evenodd"
                  fill="#00BEEE"
                  class="svg-item"
                />
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M82.2566078125,16.263430175781252L65.9931678125,1.7578125000028422e-7L59.6292038125,6.36396017578125L69.5792778125,16.314030175781248L59.6298828125,26.26343017578125L65.9938378125,32.62743017578125L82.2573078125,16.36393017578125L82.2067078125,16.31333017578125L82.2566078125,16.263430175781252Z"
                  fill-rule="evenodd"
                  fill="#00BEEE"
                  class="svg-item"
                />
                <rect
                  xmlns="http://www.w3.org/2000/svg"
                  x="96.828125"
                  y="13.82843017578125"
                  width="8"
                  height="4"
                  rx="2"
                  fill="#FFEBD4"
                  fill-opacity="1"
                />
              </g>
            </svg>
          </div>
        </div>
        <div class="rectangle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            fill="none"
            version="1.1"
            class="svg-box"
            viewBox="0 0 1920 70"
          >
            <defs>
              <radialGradient
                id="radialGradient"
                cx="50%"
                cy="50%"
                r="50%"
                fx="50%"
                fy="50%"
              >
                <stop offset="0%" stop-color="#2DC0FF" stop-opacity="1" />
                <stop offset="100%" stop-color="#2DC0FF" stop-opacity="0" />
              </radialGradient>

              <linearGradient
                id="color1"
                x1="0.9921876788139343"
                y1="0.28061923384666443"
                x2="0.016145871952176094"
                y2="0.28060758113861084"
              >
                <stop offset="0%" stop-color="#2DC0FF" stop-opacity="0" />
                <stop offset="51.04166865348816%" stop-color="#2DC0FF" stop-opacity="0.2" />
                <stop offset="100%" stop-color="#2DC0FF" stop-opacity="0" />
              </linearGradient>

              <linearGradient
                id="color2"
                x1="0.9921876788139343"
                y1="0.28061923384666443"
                x2="0.016145871952176094"
                y2="0.28060758113861084"
              >
                <stop offset="0%" stop-color="#2DC0FF" stop-opacity="1" />
                <stop offset="51.04166865348816%" stop-color="#2DC0FF" stop-opacity="0" />
                <stop offset="100%" stop-color="#2DC0FF" stop-opacity="1" />
              </linearGradient>


            </defs>

            <g style="mix-blend-mode:passthrough">

              <!-- 路径全部 -->
              <path
                d="
                M0,1.5L313,1.5,
                M376,28C359.553,11.1603,336.887,1.5,313,1.5,
                M386.96,39.71C386.96,39.71,376,28,376,28
                M443.95,64C422.439,64,401.858,55.228,386.96,39.71

                M1475.47,64C1475.47,64,443.95,64,443.95,64

                M1475.47,64C1498.97,64,1521.42,60.2753,1537.49,43.135
                C1537.49,43.135,1548.3,31.6008,1548.3,31.6008
                M1548.3,31.6008C1563.61,15.2671,1585,6,1607.39,6
                C1607.39,6,1920,6,1920,6
                "
                stroke="url(#color1)"
                fill="url(#color1)"
                stroke-width="6"
                fill-opacity="1"
              />

              <path
                id="right-path"
                d="
                M960,64L1475.47,64
                M1475.47,64C1498.97,64,1521.42,60.2753,1537.49,43.135
                C1537.49,43.135,1548.3,31.6008,1548.3,31.6008
                M1548.3,31.6008C1563.61,15.2671,1585,6,1607.39,6
                C1607.39,6,1920,6,1920,6
                "
                stroke-width="6"
                fill-opacity="1"
              />

              <mask id="mask-right">
                <circle
                  cx="0"
                  cy="0"
                  r="250"
                  fill="url(#radialGradient)"
                >
                  <animateMotion dur="2s" rotate="auto" repeatCount="indefinite">
                    <mpath xlink:href="#right-path" />
                  </animateMotion>
                </circle>
              </mask>

              <use
                stroke-width="5"
                xlink:href="#right-path"
                mask="url(#mask-right)"
                stroke="#2DC0FF"
              />
              <!-- 左侧路径 -->
              <path
                id="left-path"
                d="
                M960,64C960,64,443.95,64,443.95,64
                M443.95,64C422.439,64,401.858,55.228,386.96,39.71
                M386.96,39.71C386.96,39.71,376,28,376,28
                M376,28C359.553,11.1603,336.887,1.5,313,1.5,
                M313,1.5,0,1.5,
                "
                stroke-width="6"
                fill-opacity="1"
              />
              <mask id="mask-left">
                <circle
                  cx="0"
                  cy="0"
                  r="250"
                  fill="url(#radialGradient)"
                >
                  <animateMotion dur="2s" rotate="auto" repeatCount="indefinite">
                    <mpath xlink:href="#left-path" />
                  </animateMotion>
                </circle>
              </mask>
              <use
                stroke-width="5"
                xlink:href="#left-path"
                mask="url(#mask-left)"
                stroke="#2DC0FF"
              />

            </g>
          </svg>
        </div>
        <div class="left-container overturn">
          <div class="vector-group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              fill="none"
              version="1.1"
              width="105"
              height="33"
              viewBox="0 0 105 33"
              class="svg-group"
            >
              <g style="mix-blend-mode:passthrough">
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M13.062725,15.38894017578125L3.673825,6.00000017578125L-0.00010399999999999299,9.67393017578125L5.743975,15.41801017578125L0,21.16203017578125L3.673935,24.83593017578125L13.062925,15.44697017578125L13.033825,15.41790017578125L13.062725,15.38894017578125Z"
                  fill-rule="evenodd"
                  fill="#00BEEE"
                  class="svg-item"
                />
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M45.470087500000005,16.11273017578125L32.3574175,3.00000017578125L27.2263675,8.131050175781251L35.2486175,16.15333017578125L27.2265625,24.17533017578125L32.3576175,29.30643017578125L45.4702875,16.193730175781248L45.4296875,16.15313017578125L45.470087500000005,16.11273017578125Z"
                  fill-rule="evenodd"
                  fill="#00BEEE"
                  class="svg-item"
                />
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M82.2566078125,16.263430175781252L65.9931678125,1.7578125000028422e-7L59.6292038125,6.36396017578125L69.5792778125,16.314030175781248L59.6298828125,26.26343017578125L65.9938378125,32.62743017578125L82.2573078125,16.36393017578125L82.2067078125,16.31333017578125L82.2566078125,16.263430175781252Z"
                  fill-rule="evenodd"
                  fill="#00BEEE"
                  class="svg-item"
                />
                <rect
                  xmlns="http://www.w3.org/2000/svg"
                  x="96.828125"
                  y="13.82843017578125"
                  width="8"
                  height="4"
                  rx="2"
                  fill="#FFEBD4"
                  fill-opacity="1"
                />
              </g>
            </svg>
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
    opacity:0;
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
      // background-image: url('static/images/headers/header_16/vector-1.png');
      background-position: bottom ;
      background-repeat: no-repeat;
      background-size: 100%;

      .rectangle {
        width: 100%;
        height: 80px;
        background-size: 100% auto;
        background-repeat: no-repeat;
        position: absolute;
        z-index: 11;
        .svg-box{
          width: 100%;
          height: 70px;
          position: absolute;
          bottom: 0;
          .path {
            //fill:url('#color1');
            // fill:'#2DC0FF'

            // animation: changeColor 1s linear infinite ;
          }
        }
      }

      .left-container {
        flex: 1;
        height: 75px;
        position: relative;
        margin-right: auto;
        background-size: 100%;
        background-repeat: no-repeat;

        .vector-group{
          position: absolute;
          left: 492px;
          top: 22px;
          .svg-group{
            .svg-item{
              animation: opacity 1s linear infinite ;
              @include animationOption();
              @for $i from 0  through 2 {
                &:nth-child(#{$i}){
                  fill-opacity:#{0.33 * $i};
                  animation-delay: #{0.33 * $i}s;
                }
              }
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
        top: 7px;
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
        background-image: linear-gradient(180deg, #FFFFFF 41%, #81E8FF 80%);
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
        text-shadow: 0px 0px 17px  #14C7EE;
      }
    }
  }
}


@keyframes changeColor {
  0%{
    // fill:url('#color1')
    fill:'#2DC0FF'
  }

  100%{
    // fill:url('#color2')
    fill:'#1DC0FF'
  }
}

@keyframes opacity {
  0% {
    fill-opacity: 1;
  }
  33% {
    fill-opacity: 0.33;
  }


  100% {
    fill-opacity: 0.33;
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
