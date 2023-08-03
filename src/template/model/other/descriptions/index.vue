<template>
  <div
    class="descriptions-container"
    :class="{border:border}"
  >
    <template v-for="(field,index) in fields" :key="index">
      <descriptionsItem
        :data="data"
        :field="field"
        v-bind="$attrs"
        :label-width="labelWidth"
      >
        <template v-if="field.slot">
          <slot :name="field.key"></slot>
        </template>
      </descriptionsItem>
    </template>
  </div>
</template>


<script lang="ts" setup>

import { computed, PropType, provide } from 'vue'
import descriptionsItem from './item.vue'

let props = defineProps({
  border:{
    type:Boolean,
    default:false
  },
  column:{
    type:Number,
    default:3
  },
  direction:{
    type:String,
    default:'column'
  },
  data:{
    type:Object,
    default:()=>({})
  },
  fields:{
    type:Array as PropType<any[]>,
    default:()=>{[]}
  },
  minLabelWidth:{
    type:Number,
    default:100
  }
})

provide('props',props)

let cDirection = computed(()=>props.direction||'column')


/**
 * 保持列表中label宽度的最大值
 */

let labelWidth = computed(()=>{
  let max = Math.max(...props.fields.map(e=>{
    if(e.width){
      return Number(e.width)
    }else{
      return 0
    }
  }))
  return max>props.minLabelWidth?max:props.minLabelWidth
})

</script>


<style lang="scss" scoped>

$column:v-bind(column);

.descriptions-container{
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  // flex-direction: v-bind(cDirection);

  &.border{
    // border:1px solid #ebeef5;
    ::v-deep(.descriptions-label){
      // background: #f5f7fa;
      background: rgba(138,199,246,0.17);
      border: 1px solid #4F7490;
      // border-top: 1px solid #4F7490;
      // border-left: 1px solid #4F7490;
    }

    ::v-deep(.descriptions-value){
      border: 1px solid #4F7490;
      margin-left: -1px;
      color: white;
      // border-top: 1px solid #4F7490;
      // border-left: 1px solid #4F7490;
      // border-right: 1px solid #4F7490;
    }

    .descriptions-item{

      &:nth-child(n){
        .descriptions-label{
          border-left: none;
        }
        .descriptions-value{
          margin-left: -2px;

        }
      }
      &~.descriptions-item{
        // margin-left: -2px;
      }
    }
  }
}

</style>
