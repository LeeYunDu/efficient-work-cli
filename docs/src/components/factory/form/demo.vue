<template>
  <el-button @click="state.showDesignPanel = true">设计模式</el-button>
  <designPanel 
    v-model="state.showDesignPanel"
    v-bind="$attrs" 
    @update="onUpdate" 
    :menu="menus"
    :componentOption="componentOption" />
</template>


<script lang="ts" setup>
import { reactive, ref } from 'vue'
import designPanel from './design.panel.vue'


let state = reactive({
  showDesignPanel: false
})


let menus = ref({
  fields: []
})
let componentOption = ref<any>({
  id: 64,
  name: "ui-form",
  options: {
    "component": {
      "labels": [
        // {
        //     "sid": 1548,
        //     "id": 1548,
        //     "name": "文本",
        //     "key": "y37",
        //     "menuType": 5,
        //     "menuModule": "",
        //     "hidden": 1,
        //     "parentId": "",
        //     "orderNum": 1,
        //     "path": "#",
        //     "link": "#",
        //     "component": "#",
        //     "componentConfigId": "",
        //     "pageLoadType": 1,
        //     "pageType": 1,
        //     "componentType": 6,
        //     "icon": "",
        //     "projectId": "",
        //     "options": "{\"hiddenSide\":0,\"hiddenHeader\":0,\"fieldConf\":{\"open\":1,\"transform\":[{}],\"props\":[{\"type\":\"props\",\"option\":{\"type\":\"text\",\"disabled\":false,\"show\":false,\"isDetail\":false,\"clearable\":false,\"rule\":[],\"componentType\":\"input-text\",\"fieldName\":\"文本\",\"key\":\"y37\",\"sort\":1,\"formItem\":{\"class\":\"form-item-y37\"},\"gridItem\":{\"span\":12},\"extra\":{}}}]},\"btnConf\":{\"open\":0}}",
        //     "picture": "",
        //     "remark": "",
        //     "creater": "",
        //     "delete": 0,
        //     "source": "page-view",
        //     "label": "文本",
        //     "type": "text"
        // },
        // {
        //     "sid": 8381,
        //     "id": 8381,
        //     "name": "单行输入框",
        //     "key": "y77",
        //     "menuType": 5,
        //     "menuModule": "",
        //     "hidden": 1,
        //     "parentId": "",
        //     "orderNum": 99,
        //     "path": "#",
        //     "link": "#",
        //     "component": "#",
        //     "componentConfigId": "",
        //     "pageLoadType": 1,
        //     "pageType": 1,
        //     "componentType": 7,
        //     "icon": "",
        //     "projectId": "",
        //     "options": "{\"hiddenSide\":0,\"hiddenHeader\":0,\"fieldConf\":{\"open\":1,\"transform\":[{}],\"props\":[{\"type\":\"props\",\"option\":{\"disabled\":false,\"show\":false,\"isDetail\":false,\"clearable\":false,\"rule\":[],\"componentType\":\"input\",\"fieldName\":\"单行输入框\",\"key\":\"y77\",\"sort\":1,\"formItem\":{\"class\":\"form-item-y77\"},\"gridItem\":{\"span\":12},\"extra\":{},\"type\":\"\"}}]},\"btnConf\":{\"open\":0}}",
        //     "picture": "",
        //     "remark": "",
        //     "creater": "",
        //     "delete": 0,
        //     "source": "page-view",
        //     "label": "单行输入框",
        //     "type": "input"
        // },
        // {
        //     "sid": 9369,
        //     "id": 9369,
        //     "name": "表单操作按钮组",
        //     "key": "y28",
        //     "menuType": 5,
        //     "menuModule": "",
        //     "hidden": 1,
        //     "parentId": "",
        //     "orderNum": 99,
        //     "path": "#",
        //     "link": "#",
        //     "component": "#",
        //     "componentConfigId": "",
        //     "pageLoadType": 1,
        //     "pageType": 1,
        //     "componentType": 99,
        //     "icon": "",
        //     "projectId": "",
        //     "options": "{\"hiddenSide\":0,\"hiddenHeader\":0,\"fieldConf\":{\"open\":1,\"transform\":[{}],\"props\":[{\"type\":\"props\",\"option\":{\"type\":\"operate\"}}]},\"btnConf\":{\"open\":0}}",
        //     "picture": "",
        //     "remark": "",
        //     "creater": "",
        //     "delete": 0,
        //     "source": "page-view",
        //     "label": "表单操作按钮组",
        //     "type": "slot"
        // }
      ],
      "props": {
        // "label-width": "200px",
        // "labelPosition": "top",
        // "size": "large"
      },
      "options": {},
      "extra": {}
    },
    "custom": {
      "historyFields": {}
    }
  }
})


function onUpdate(componentOption){
  componentOption.value = componentOption
  
}
</script>

<style lang="scss" scoped>
::v-deep(.form-title) {
  font-size: 18px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #282F2C;
  position: relative;
  margin-bottom: 10px;
  padding-left: 10px;

  &::after {
    content: '';
    width: 4px;
    height: 12px;
    background: #0366F1;
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
    position: absolute;
    left: 0px;
    top: 50%;
    margin-top: -5px;
  }
}
</style>
