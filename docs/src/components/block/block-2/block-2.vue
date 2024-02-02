<template>
    <div class="block-group">
      <template v-for="(item, index) in useFields" :key="index">
        <div class="block" @click="onChange(item)">
          <div class="left">
            <div class="title">{{ item.label }}</div>
            <div v-if="item.key" class="value-box ">
              <span class="value">{{ get(data,item.key,'0') }}</span>
              <span class="unit">{{ item.unit }}</span>
            </div>
          </div>
          <div class="right">
            <template v-for="(children, childrenIndex) in item.children" :key="childrenIndex">
              <div class="children-item">
                <span class="label">{{ children.label }}</span>
                <div class="value-box ">
                  <span class="value" :class="[children.class??'']">{{ get(data,children.key,'0') }}</span>
                  <span class="unit">{{ children.unit }}</span>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
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
.block-group {
  flex: 1;
  display: flex;
  flex-direction: column;

  .block {
    flex: 1;
    max-width: 290px;
    background: rgba(93, 121, 160, 0.06);
    border-radius: 10px 10px 10px 10px;
    opacity: 1;
    display: flex;
    align-items: center;
    padding: 16px 16px 16px 32px;

    & ~ .block {
      margin-top: 10px;
    }

    .left {
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .title {
        height: 24px;
        font-size: 16px;
        font-family: Source Han Sans CN, Source Han Sans CN;
        font-weight: 400;
        color: #2D486E;
        line-height: 19px;
        margin-bottom: 10px;
      }

      .value-box {
        .value {
          height: 24px;
          font-size: 22px;
          font-family: D-DIN Exp-DINExp, D-DIN Exp-DINExp;
          font-weight: bold;
          color: #272C32;
          line-height: 26px;
        }

        .unit {
          font-size: 16px;
          font-family: Source Han Sans CN, Source Han Sans CN;
          font-weight: 400;
          color: #405066;
          margin-left: 6px;
        }
      }
    }

    .right {
      flex: 1;
      position: relative;
      margin-left: 33px;
      padding-left: 20px;
      position: relative;

      &::after {
        content: '';
        width: 1px;
        height: 30px;
        opacity: 1;
        border-left: 1px dashed #9BA3BA;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -15px;
      }

      .children-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .label {
          font-size: 14px;
          font-family: Source Han Sans CN, Source Han Sans CN;
          font-weight: 400;
          color: #686B73;
        }

        .value-box {
          display: flex;
          align-items: center;
          .value {
            font-size: 18px;
            font-family: D-DIN Exp, D-DIN Exp;
            font-weight: 400;
            color: #272C32;
            line-height: 21px;

            &.yellow {
              color: #F8C434;
            }

            &.red{
              color: #EC2F2F;
            }
          }

          .unit {
            font-size: 14px;
            font-family: Source Han Sans CN, Source Han Sans CN;
            font-weight: 400;
            color: #405066;
            margin-left: 6px;
          }

        }
      }



    }
  }
}
</style>
