<template>
  <section class="items">
    <template v-for="(item, index) in useFields" :key="item.key">
      <div class="item">
        <div class="main">
          <div class="info-box">
            <span class="label">{{ item.label }}</span>
            <div class="value-box">
              <span class="value">{{ item.info }}</span>
            </div>
          </div>
          <img class="icon" src="./dome-01.png" alt="">
        </div>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { get } from 'lodash-es'
import { computed,ref,PropType } from 'vue'
// import { FieldItem } from '@/typings/items'
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  fields:{
    type: Array as PropType<any[]>,
    default:()=>[]
  }
})

const useData = computed(() => props.data||[])
const useFields = computed(()=> props.fields||[])
</script>

<style lang="scss" scoped>
.items {
  display: flex;
  flex-direction: column;
  align-items: center;
  .item {
    width: 100%;
    &~.item{
      margin-top: 12px;
    }
    flex: 1;
    .main {
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 88px;
      background: #FFFFFF;
      border-radius: 10px 10px 10px 10px;
      padding: 0 24px;
      .icon{
        width: 50px;
        height: 50px;
        margin-right: 6px;
      }
      .label {
        font-family: Source Han Sans CN, Source Han Sans CN;
        font-weight: bold;
        font-size: 14px;
        color: #363A44;
        text-align: left;
        font-style: normal;
        text-transform: none;
        height: 21px;
        margin-bottom: 6px;
      }
      .info-box{
        display: flex;
        flex-direction: column;
        padding-top: 3px;
      }
      .value-box {
        display: flex;
        align-items: center;
        .value {
          font-family: Source Han Sans CN, Source Han Sans CN;
          font-weight: 400;
          font-size: 12px;
          color: #888888;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }

      }
    }
  }
}
</style>
