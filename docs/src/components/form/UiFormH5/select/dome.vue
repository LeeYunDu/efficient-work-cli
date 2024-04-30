<template>
  <div>
    model:{{ model }}
    <van-form>
      <SimpleSelect v-model:params="model" :field="field" @choose="setParams" />
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus'
import SimpleSelect from './soundCode.vue'


let model = ref({})
let field = ref({
  label: '项目阶段', key: 'chooseType37Id', type: 'select', options: [
    { name: '选项1', id: 1 },
    { name: '选项2', id: 2 },
    { name: '选项3', id: 3 },
    { name: '选项4', id: 4 },
  ],
  props: {
    required: true,
    clearable: true,
    placeholder: '',
    colon: true
  },
})


function setParams (option) {
  console.log(option);
  
}

</script>

<style lang="scss" scoped></style>
