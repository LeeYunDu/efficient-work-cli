<template>
  <section class="items">
    <template v-for="(item, index) in useFields" :key="item.key">
      <div class="item" @click="onChange(item)">
        <div class="main">
          <!-- <img class="icon" :src="`static/images/${item.icon}.png`" alt=""> -->
          <img class="icon" src="./dome-01.png" alt="">
          <div class="info-box">
            <span class="label">{{ item.label }}</span>
            <div class="value-box">
              <span class="value">{{ get(useData, item.key) }}</span>
              <span class="unit">{{ get(item,'unit','')}}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { get } from 'lodash-es'
import { computed,ref,PropType } from 'vue'
import { FieldItem } from '@/typings/items'
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  fields:{
    type: Array as PropType<FieldItem[]>,
    default:()=>[]
  }
})

let emits = defineEmits(['change'])
function onChange(item){
  emits('change',item)
}

const useData = computed(() => props.data||[])
const useFields = computed(()=> props.fields||[])
</script>

<style lang="scss" scoped>
.items {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  overflow: auto;
  margin-left: -5px;
  margin-right: -5px;

  .item {
    padding: 5px;
    flex: 1;
    .main {
      border-radius: 4px;
      display: flex;
      .icon{
        width: 70px;
        height: 70px;
        margin-right: 10px;
      }
      .label {
        color: rgba(55, 59, 69, 1);
        font-size: 18px;
      }
      .value-box {
        display: flex;
        align-items: center;
        margin-top: 8px;
        .value {
          font-size: 28px;
          font-family: D-DIN-DIN-Bold, D-DIN-DIN;
          font-weight: bold;
          color: #0f3554;
        }
        .unit {
          font-size: 14px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          margin-left: 4px;
        }
      }
    }
  }
}
</style>
