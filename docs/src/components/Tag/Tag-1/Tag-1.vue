
<template>
  <div :class="[type,'tag']">{{ label }}</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

let props = defineProps({
  label:{
    type:String,
    default:''
  },
  type:{
    type:String,
    default:''
  },

})


</script>

<style lang="scss" scoped>

.tag{
  display: inline-block;
  padding: 6px 12px;
  background: rgba(132,147,172,0.1);
  border-radius: 4px;
  opacity: 1;
  color: #8493AC;
  font-size: 12px;
  text-align: center;

  &~.tag{
    margin-left: 5px;
  }

  &.blue{
    color: rgba(46, 124, 253, 1);
    background: rgba(46, 124, 253, 0.10);
  }
}

</style>
