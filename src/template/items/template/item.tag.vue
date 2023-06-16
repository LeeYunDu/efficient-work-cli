
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
.tag-box{
  display: flex;
}

.tag{
  display: inline-block;
  width: 64px;
  height: 19px;
  background: rgba(132,147,172,0.1);
  border-radius: 1px 1px 1px 1px;
  opacity: 1;
  color: #8493AC;
  font-size: 12px;
  text-align: center;
  line-height: 19px;

  &~.tag{
    margin-left: 5px;
  }

  &.blue{
    color: rgba(46, 124, 253, 1);
    background: rgba(46, 124, 253, 0.10);
  }
}

</style>
