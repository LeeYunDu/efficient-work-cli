<template>
  <div class="layout-header-view-10">
    <div class="layout-header-title-container">
      <!-- 背景图元素配置 -->
      <div class="bg-container">
        <div class="left-container">
          <img class="vector-3" src="static/images/headers/header_12/vector-3.png" alt="">
        </div>
        <div class="rectangle">
          <div class="top-rectangle-group">
            <div v-for="item in 21" :key="item" class="rectangle-item"></div>
          </div>
          <div class="left-arrows">
            <img
              v-for="item in 1"
              :key="item"
              class="icon"
              src="static/images/headers/header_12/vector-1.png"
              alt=""
            >
          </div>
          <div class="right-arrows">
            <img
              v-for="item in 1"
              :key="item"
              class="icon"
              src="static/images/headers/header_12/vector-2.png"
              alt=""
            >
          </div>
        </div>
        <div class="left-container overturn">
          <img class="vector-3" src="static/images/headers/header_12/vector-3.png" alt="">
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
        width: 591px;
        height: 80px;
        background-image: url('static/images/headers/header_12/bg.png');
        background-size: 100%;
        background-repeat: no-repeat;
        position: absolute;
        z-index: 11;

        .move-point-group {
          display: flex;
          position: absolute;
          left: 240px;
          top: 22px;


          .move-point {
            width: 6px;
            height: 2px;
            margin-right: 2px;
            background: #127FFF;
          }

          .move-point:nth-child(2n) {
            background: #ffffff;
          }
        }

        .left-arrows,
        .right-arrows {
          display: flex;
        }

        .left-arrows {
          top: 50%;
          left: 80px;
          position: absolute;
          animation: top-move-left 2s ease-in-out infinite;

          @include animationOption();
        }

        .right-arrows {
          position: absolute;
          top: 50%;
          right: 80px;
          animation: top-move-right 2s ease-in-out infinite;

          @include animationOption();

          .icon:nth-child(2) {
            opacity: 0.24;
          }
        }

        .top-rectangle-group {
          display: flex;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 354px;
          justify-content: space-between;
          margin-top: 2px;

          .rectangle-item {
            width: 14px;
            height: 5.5px;

            transform: skew(-45deg);
            animation: opacity 4s linear infinite;

            @include animationOption();

            @for $i from 1 through 21 {
              &:nth-child(#{$i}) {
                opacity: #{0.0476 * $i};
                animation-delay: #{0.19 * $i}s;
              }
            }
          }

        }
      }

      .left-container {
        flex: 1;
        height: 100%;
        position: relative;
        display: flex;
        z-index: 10;

        .vector-3 {
          width: 634px;
          height: 51px;
          position: relative;
          top: 15px;
        }



      }

      .left-container {
        .vector-1 {
          left: 0;
          background-image: url('static/images/headers/header_10/vector-1.png');
        }

        .point-group {
          left: 390px;
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
        top: -8px;
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

@keyframes move-right {
  0% {
    left: 240px;
  }

  50% {
    left: 350px;
  }

  100% {
    left: 240px;
  }
}

@keyframes top-move-left {
  0% {
    transform: translateX(0px);
  }

  100% {
    transform: translateX(30px);
  }
}

@keyframes top-move-right {
  0% {
    transform: translateX(0px);
  }

  100% {
    transform: translateX(-30px);
  }
}

.overturn {
  transform: rotateY(180deg);
}
</style>
