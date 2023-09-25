<template>
  <div class="button-group">
    <template v-for="(item,index) in fields" :key="index">
      <div class="button-item" :class="[item.key]" @click="onClick(item)">
        <img
          v-if="item.icon"
          class="icon"
          :src="`static/images/common/${item.icon}`"
          alt=""
        >
        <span>
          {{ item.label }}
        </span>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { FieldItem } from '@/typings/items'

let props = defineProps({
  fields:{
    type:Array as PropType<FieldItem[]>,
    default:()=>{[]}
  }

})


let emits = defineEmits(['btnClick'])

function onClick (item){
  if(item.click){
    item.click()
  }else{
    emits('btnClick',item.key)
  }
}

</script>

<style lang="scss" scoped>
.button-group{
  display: flex;
  .button-item{
    display: flex;
    padding:  0 16px;
    height: 40px;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;


    &.search,&.form-audit,&.add,&.add-linkman{
      background: #0366F1;
      span{
        color: #FFFFFF;
      }
    }
    &.batch-delete,&.form-save{
      border: 1px solid #0366F1;
      background: transparent;
      span{
        color: rgba(3, 102, 241, 1);
      }
    }
    &.form-close{
      border: 1px solid #C9D4E4;
      background: white;
      span{
        color: rgba(104, 107, 115, 1);
      }
    }
    &.form-audit,&.form-save,&.form-close{
      width: 170px;
      height: 44px;
    }
    .icon{
      width: 16px;
      height: 16px;
      margin-right: 10px;
    }
    span{
      font-size: 16px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
    }
    &~.button-item{
      margin-left: 12px;
    }
  }
}
</style>
