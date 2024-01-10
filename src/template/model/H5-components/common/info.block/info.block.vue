
<template>
  <div class="info-block">
    <div v-if="title" class="title">
      {{ title }}
      <span class="tip">{{ tip }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>

let props = defineProps({
  title: {
    type: String,
    default: ''
  },
  tip: {
    type: String,
    default: ''
  }
})

</script>

<style lang="scss" scoped>
.info-block {
  padding: 10px 14px;
  background: #FFFFFF;
  border-radius: 5px 5px 5px 5px;
  overflow: hidden;
  &~.info-block {
    margin-top: 12px;
  }
}

.title {
  color: rgba(11, 22, 40, 1);
  font-size: 15px;
  font-weight: 600;
  position: relative;
  padding-left: 8px;
  margin-bottom: 10px;

  .tip{
    font-size: 10px;
    color: rgba(163, 170, 183, 1);
    margin-left: 5px;
  }

  &::after {
    content: '';
    width: 4px;
    height: 12px;
    background: #2E7CFD;
    border-radius: 3px 3px 3px 3px;
    opacity: 1;
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -6px;
  }
}
</style>
