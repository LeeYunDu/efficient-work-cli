

<script setup>
import { ref} from 'vue'

function handleSearch (params){
  alert('sort值发生变化')
}
let sortItem = [
  { label:'发布时间',key:'publishTime' }
]

</script>
# Simple Select

Vant的表单picker组件


## 源码

``` vue
<template>
  <UiForm
    v-bind="addFormOptions"
    ref="formRef"
    :groups="useFields"
    :params="state.params"
    @setParams="setParams"
  >

    <!-- 为了兼容浙里办上架,选择器组件改为自己写,不使用ui-form中的组件 -->
    <template v-for="(item,index) in selectFields" :key="index" #[String(`${item.key}-input`)]="scopeProps">
      <template v-if="get(state.params,scopeProps.key,'')">
        <span @click="onSelect(scopeProps)">{{ getOptionValue(get(state.params,item.key,''),get(scopeProps,'options')) }}</span>
      </template>
      <div v-else class=" placeholder flex f-aic f-jcsb" @click="onSelect(scopeProps)">
        请选择{{ item.label }}
        <img src="@static/images/common/icon-more3.png" alt="">
      </div>
    </template>
  </UiForm>

 <van-popup v-model:show="state.visible" position="bottom">
  <van-picker
    v-model="state.popupValue"
    :columns="state.activeSelect.options"
    :columns-field-names="state.mapper"
    @confirm="onConfirm"
    @cancel="onClosePopup"
  />
</van-popup>
</template>

<script lang="ts" setup>
let state = reactive({
  popupValue:'',
  visible:false,
  activeSelect:{
    options:[]
  } as any,
  mapper:{ text: 'name', value: 'id', children: 'childList' },
})
function getOptionValue (value,options){
  let item = options.find(o=>{
    return o.id == value
  })
  return item.label
}
function onConfirm (value:any){
  set(state.params,get(state,'activeSelect.key'),value.id)
  state.activeSelect = {}
  state.popupValue = ''
  state.visible = false
}
function onClosePopup (){
  state.activeSelect = {}
  state.popupValue = ''
  state.visible = false
}
function onSelect (scopeProps){
  state.activeSelect = scopeProps
  state.visible = true
}

</script>

<style lang="scss" scoped>
.placeholder{
  width: 100%;
  color: rgb(150, 151, 153);
  opacity: .6;
}

::v-deep(.van-field__control){
  &::placeholder{
    font-size: 12px;
  }
}
</style>

```

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>