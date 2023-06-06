<template><div>
    <span @click="state.showPopup=true">{{ selectInput }}</span>
  
    <Teleport to="body">
      <van-popup
        v-model:show="state.showPopup"
        round
        position="bottom"
      >
        <PickerGroup
          v-model:active-tab="state.activeTab"
          title="选择时间"
          :tabs="['选择年份', '选择月份']"
          @confirm="onConfirm"
          @cancel="onCancel"
        >
          <DatePicker
            v-model="currentParams.year"
            :columns-type="['year']"
            :min-date="state.minDate"
          />
          <DatePicker
            v-model="currentParams.month"
            :columns-type="['month']"
            :min-date="state.minDate"
          />
        </PickerGroup>
      </van-popup>
    </Teleport>

    <div class="name test2" id="1" :data="[]" :fields="test">2</div>
    <div>2</div>
    <div>2</div>
    <div>2</div>
    <div>2</div>
    <div>2</div>
  </div>
</template>


<script lang="ts" setup>
import { computed,reactive } from 'vue'
import { useStore } from 'vuex'
import { PickerGroup,DatePicker  } from 'vant'

const store = useStore()

let state = reactive({
  activeTab:0,
  showPopup:false,
  minDate:new Date(2020, 0, 1),

})

let month = store.getters.queryParams.month

let currentParams = ref({
  year:[month.slice(0,4)],
  month:[month.slice(4)]
})

const selectInput = computed(()=>{
  let content = store.getters.queryParams.month||'请选择时间'
  return content
})

function onConfirm (){
  state.showPopup = false
  store.dispatch('setGlobalData',{ key:'year',value:currentParams.value.year.join('') })
  store.dispatch('setGlobalData',{ key:'month',value:currentParams.value.year.join('') +  currentParams.value.month.join('') })
  store.dispatch('setGlobalData',{ key:'refresh',value:new Date().getTime() })
}

function onCancel (){
  state.showPopup = false
}

</script>



<style lang="scss" scoped>
.test{
  color: red;
  font-size: 14px;
}
</style>