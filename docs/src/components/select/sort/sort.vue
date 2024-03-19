<template>
  <div class="item-component sort-box">
    <template v-for="(item, index) in sortItem" :key="index">
      <div class="sort" @click="changeSort(item.key)">
        <span class="sort-text">{{ item.label }}</span>
        <template v-if="item.key !== 'default'">
          <span class="sort-icon">
            <i class="el-icon-caret-top" :class="{active: sortParms[item.key] === '+'}"></i>
            <i class="el-icon-caret-dowm" :class="{active: sortParms[item.key] === '-'}"></i>
          </span>
        </template>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { PropType, ref } from 'vue'
defineProps({
  sortItem: { type: Array as PropType<any[]>, default: () => ([]) }
})

const emits = defineEmits(['handleSearch'])
const sortParms: any = ref({})

function changeSort (key: string) {
  if (key === 'default') {
    sortParms.value = {}
  } else {
    sortParms.value[key] = !sortParms.value[key] ? '-' : (sortParms.value[key] === '-' ? '+' : '')
  }

  emits('handleSearch', {
    sort:sortParms.value[key]&&`${key}${sortParms.value[key]}`
  })
}

</script>

<style lang="scss" scoped>
.sort-box {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: rgba(106, 121, 137, 1);

  background: #FFFFFF;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  .sort {
    position: relative;
    justify-content: center;
    flex: 1;
    display: flex;
    align-items: center;
    margin-right: 20px;
    cursor: pointer;

    &~.sort{
      &::after{
        content: '';
        height: 7px;
        width: 1px;
        opacity: 1;
        background: #B0B7C3;
        left: 0%;
        position: absolute;
      }
    }

    .sort-icon {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 5px;

      i {
        height: 8px;
        line-height: 8px;
        color: #999;
        font-size: 14px;
        opacity: .2;

        &.active {
          opacity: 1;
        }

        &~i{
          margin-top: 4px;
        }
      }

      .el-icon-caret-top{
        width: 0;
        height: 0;
        border: 4px solid;
        border-color:  transparent transparent rgba(3, 102, 241, 1) transparent;
      }
      .el-icon-caret-dowm{
        width: 0;
        height: 0;
        border: 4px solid;
        border-color: rgba(3, 102, 241, 1) transparent transparent transparent;
      }
    }
  }
}


</style>
