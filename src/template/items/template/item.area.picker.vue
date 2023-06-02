<template>
  <div>
    <span @click="state.showPopup=true">{{ selectInput }}</span>
    <Teleport to="body">
      <van-popup
        v-model:show="state.showPopup"
        round
        position="bottom"
      >
        <PickerGroup
          v-model:active-tab="state.activeTab"
          title="选择区县/园区"
          :tabs="['选择区县', '选择园区']"
          @confirm="onConfirm"
          @cancel="onCancel"
        >
          <van-picker
            v-model="state.areaName"
            title="选择区县"
            :columns="areaOptions"
            @change="state.parkName=[]"
          />
          <van-picker
            v-model="state.parkName"
            title="选择园区"
            :columns="parkOptions"
            @change="state.areaName=[]"
          />
        </PickerGroup>
      </van-popup>
    </Teleport>
  </div>
</template>


<script lang="ts" setup>
import { computed,reactive } from 'vue'
import { useStore } from 'vuex'
import { PickerGroup  } from 'vant'

const store = useStore()

let state = reactive({
  parkName:[],
  areaName:[],
  activeTab:0,
  showPopup:false
})


const emits = defineEmits(['confirm'])


let areaOptions = computed(()=>{
  let arr = store.getters.dictDataOnly('4.list').map(e=>{
    return {
      text:e.name,
      value:e.name
    }
  })
  arr.unshift({ text:'全部县区',value:'' })
  return arr
})

let parkOptions = computed(()=>{
  let arr = store.getters.dictDataOnly('5.list').map(e=>{
    return {
      text:e.name,
      value:e.name
    }
  })
  arr.unshift({ text:'全部园区',value:'' })
  return arr
})

const selectInput = computed(()=>{
  let content = store.getters.queryParams.parkName||store.getters.queryParams.areaName||'请选择区县/园区'
  return content
})

function onConfirm (){
  state.showPopup = false
  store.dispatch('setGlobalData',{ key:'areaName',value:state.activeTab==0?state.areaName.join(''):'' })
  store.dispatch('setGlobalData',{ key:'parkName',value:state.activeTab==1?state.parkName.join(''):'' })
  store.dispatch('setGlobalData',{ key:'refresh',value:new Date().getTime() })
  emits('confirm',state.activeTab)
}

function onCancel (){
  state.showPopup = false
  state.areaName=[]
  state.parkName=[]
  store.dispatch('setGlobalData',{ key:'areaName',value:'' })
  store.dispatch('setGlobalData',{ key:'parkName',value:'' })
}

</script>
