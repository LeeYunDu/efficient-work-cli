
<template>
  <div class="title-box">
    <span>{{ title }}</span>
    <slot>
      <div v-if="path" class="more-button" @click="onRouter"></div>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

let props = defineProps({
  title: {
    type: String,
    default: ''
  },
  path: {
    type: String,
    default: ''
  }
})

let router = useRouter()


function onRouter (){
  router.push({
    path:props.path,
    query:{}
  })
}

</script>


<style lang="scss" scoped>
.title-box {
  position: relative;
  margin-bottom: 20px;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 18px;
    background: #2197F7;
    display: none;
  }

  span {
    font-size: 28px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #363A44;
  }
}
</style>
