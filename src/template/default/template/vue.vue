<template>
  <div>this is default vue file</div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

let state = reactive({
  data:[],
  show:false
})

async function asyncData(){
  state.data = []
}

asyncData()
</script>

<style lang="scss" scoped>
 
</style>
