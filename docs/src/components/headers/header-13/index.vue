<template>
  <div class="layout-header-view-10">
    <div class="layout-header-title-container">
      <!-- 背景图元素配置 -->
      <div class="bg-container">
        <div class="left-container">
          <div class="vector-1">
            <svg
              class="svg-bg"
              viewBox="0 0 645 34.5"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
            >
              <defs>
                <linearGradient id="top-gradient-left">
                  <stop offset="0" stop-color="rgba(41,152,255,0.1)" />
                  <stop offset="100%" stop-color="#0894E2" />
                </linearGradient>
              </defs>
              <image
                id="star"
                x="0"
                y="8"
                xlink:href="static/images/headers/header_13/vector-2.png"
                width="43"
                height="33"
              >
                <animateMotion
                  dur="6s"
                  begin="0s"
                  repeatCount="indefinite"
                  path="M0,0,350 0 360 -22 630 -22 "
                />
              </image>

              <path
                id="test"
                d=" M0 33.5  L385,33.5 L398,12 L637,12 L645 22"
                stroke="url(#top-gradient-left)"
                stroke-width="2px"
                fill="transparent"
                class="path"
              />
              <path
                d=" M0 33.5  L385,33.5 L398,12 L637,12 L645 22"
                stroke="#90CEFF"
                stroke-width="4px"
                fill="transparent"
                class="move-vector"
              />
            </svg>
            <div class="vector-group">
              <div v-for="(item,index) in 3" :key="index" class="vector-2">
                <img src="static/images/headers/header_13/vector-1.png" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="rectangle"></div>
        <div class="left-container overturn">
          <div class="vector-1">
            <svg
              class="svg-bg"
              viewBox="0 0 645 34.5"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
            >
              <defs>
                <linearGradient id="top-gradient-left">
                  <stop offset="0" stop-color="rgba(41,152,255,0.1)" />
                  <stop offset="100%" stop-color="#0894E2" />
                </linearGradient>
              </defs>
              <image
                id="star"
                x="0"
                y="8"
                xlink:href="static/images/headers/header_13/vector-2.png"
                width="43"
                height="33"
              >
                <animateMotion
                  dur="6s"
                  begin="0s"
                  repeatCount="indefinite"
                  path="M0,0,350 0 360 -22 630 -22 "
                />
              </image>

              <path
                id="test"
                d=" M0 33.5  L385,33.5 L398,12 L637,12 L645 22"
                stroke="url(#top-gradient-left)"
                stroke-width="2px"
                fill="transparent"
                class="path"
              />
              <path
                d=" M0 33.5  L385,33.5 L398,12 L637,12 L645 22"
                stroke="#90CEFF"
                stroke-width="4px"
                fill="transparent"
                class="move-vector"
              />
            </svg>
            <div class="vector-group">
              <div v-for="(item,index) in 3" :key="index" class="vector-2">
                <img src="static/images/headers/header_13/vector-1.png" alt="">
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
import { onMounted, onUnmounted, ref, computed } from 'vue'
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

// 生成随机数
let nums = ref([])
function renderNumber () {
  nums.value = []
  while (nums.value.length < 14) {
    let number = Number((Math.random() * 19).toFixed(0))
    if (!nums.value.includes(number)) nums.value.push(number)
  }
}

let timer = null
onMounted(() => {
  renderNumber()

  if (props.animation) {
    timer = setInterval(() => {
      renderNumber()
    }, 1000)
  }

})
onUnmounted(() => {
  clearInterval(timer)
})

</script>

<style lang="scss" scoped>
@mixin animationOption {
  animation-play-state: v-bind(animationPlay);
  // animation-duration: v-bind(animationDuration);
  // animation-timing-function: v-bind(animationTiming);
}

@keyframes opacity {
  0% {
    opacity:0.33;
  }

  66% {
    opacity: 0.66;
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

      .rectangle {
        width: 600px;
        height: 80px;
        background-image: url('static/images/headers/header_13/bg.png');
        background-size: 100%;
        background-repeat: no-repeat;
        position: absolute;
        z-index: 11;
      }

      .left-container {
        flex: 1;
        height: 100%;
        position: relative;
        display: flex;
        z-index: 10;
        .chunk-move{
            position: absolute;
            top: -10px;
          }

        .vector-1 {
          width: 644.5px;
          height: 80px;
          position: relative;
          top: 21px;
          .vector-group {
            position: absolute;
            display: flex;
            top: 18px;
            right: 23px;

            .vector-2 {
              animation: opacity 2s linear infinite;
              @include animationOption();
              @for $i from 1 through 3 {
                &:nth-child(#{$i}) {
                  opacity: #{0.33 * $i};
                  animation-delay: #{0.33 * $i}s;
                }
              }
            }
          }



          .move-vector {
            stroke-dasharray: 10, 654.5;
            stroke-dashoffset: 0;
            animation: move 4s infinite linear;

            @include animationOption()
          }
        }



      }

      .left-container {}
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
        top: 12px;
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
        background-image: linear-gradient(180deg, #FFFFFF 40%, #2B8CFF 100%);
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
        // text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
        text-shadow: 0px 4px 4px rgba(1, 44, 78, 0.71);
      }
    }
  }
}


@keyframes opacity {
  0% {
    background: #1274F3;
  }

  25% {
    opacity: 1;
  }

  100% {
    opacity: 0;
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
