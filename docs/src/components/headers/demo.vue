<template>
  <section class="screen">
    <template v-for="item in 15" :key="item.description">
      <div class="screen-item">
        <Component :is="`Header${item}`" :animation="false" :title-name="`标题-${item}`" />
      </div>
    </template>
  </section>
</template>

<script setup>
// -------- inject --------
// -------- ref --------
// -------- computed --------
// -------- fn --------
// -------- watch --------
// -------- init --------
// -------- provide --------
// -------- expose --------
</script>

<style lang="scss" scoped>
.screen {
  position: relative;
  .screen-item {
    width: 100%;
    height: 80px;
    margin-bottom: 30px;
  }
}
</style>
