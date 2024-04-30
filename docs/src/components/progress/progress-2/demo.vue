<template>
  <Progress :data="data" > </Progress>
</template>
<script lang="ts" setup>
import { ref} from 'vue'
import Progress from './progress.vue'
let  data = ref([  { y1:'10000',y2:55 }])

</script>