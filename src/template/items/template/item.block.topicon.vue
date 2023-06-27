<template>
  <section class="items">
    <template v-for="(item, index) in propsFields" :key="item.key">
      <div class="item">
        <div class="main">
          <div>
            <img :src="`static/images/common/${item.icon}.png`" alt="">
          </div>
          <span class="label">{{ item.label }}</span>
          <div class="value-box">
            <span class="value">{{
              item.unit == '家'
                ? Number(get(propsData, item.key)).toFixed(0)
                : get(propsData, item.key)
            }}</span>
            <i class="unit">{{ item.unit }}</i>
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

const propsData = computed(() => props.data||[])

const propsFields = computed(()=> props.fields||[
  { label:'字段1',key:'',unit:'',icon:'' },
  { label:'字段2',key:'',unit:'家',icon:'' },
])


</script>

<style lang="scss" scoped>
.items {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  overflow: auto;
  margin-left: -5px;
  margin-right: -5px;
  background: RGBA(244, 246, 251, 1);

  .item {
    width: 50%;
    padding: 5px;

    .main {
      background: white;
      padding: 11px 12px;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      .label {
        color: rgba(112, 129, 155, 1);
      }
      .value-box {
        .value {
          font-size: 20px;
          font-family: D-DIN-DIN-Bold, D-DIN-DIN;
          font-weight: bold;
          color: #0f3554;
        }
        .unit {
          font-size: 12px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          margin-left: 4px;
        }
      }
    }
  }
}
</style>
