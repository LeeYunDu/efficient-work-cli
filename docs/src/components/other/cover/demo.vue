<template>
  <Cover :data="images"></Cover>
</template>
<script lang="ts" setup>
import { ref} from 'vue'
import Cover from './cover.vue'
let images = ref(['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'])
</script>