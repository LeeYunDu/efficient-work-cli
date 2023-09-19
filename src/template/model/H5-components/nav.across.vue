
<template>
  <div class="nav-list">
    <div
      v-for="(item,index) in fields"
      :key="index"
      class="nav-item"
      :class="{active:item.key===active}"
      @click="onclick(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ItemMode } from 'typings/items'
import { useRouter } from 'vue-router'


const fields = ref<ItemMode[]>([
  { label:'政策头条',key:'y1',unit:'条' },
  { label:'项目申报',key:'y2',unit:'个' },
  { label:'企业诉求',key:'y3',unit:'亿元' },
  { label:'我的应用',key:'y4',unit:'条' },
  { label:'发布广场',key:'y5',unit:'条' },
])

let active = ref('y1')


const router = useRouter()
const emits = defineEmits(['navClick'])
function onclick (item){
  active.value = item.key
  emits('navClick',item.label)
}
</script>

<style lang="scss" scoped>


.nav-list{
  padding: 0 12px;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  background: white;
  margin-top: 12px;

  .nav-item{
    font-size: 15px;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 600;
    color: #363A44;
    white-space: nowrap;
    padding: 8px 0 ;

    &.active{
      color: #0366F1;
      position: relative;
      &::after{
        content: '';
        width: 40px;
        height: 3px;
        background: #0366F1;
        border-radius: 0px 0px 0px 0px;
        opacity: 1;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0px;
        position: absolute;
      }
    }

    &~.nav-item{
      margin-left: 24px;
    }
  }

}
</style>
