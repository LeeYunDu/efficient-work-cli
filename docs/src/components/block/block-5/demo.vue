<template>
    <div class="div" >
      <Block :data="{}" :fields="data"   > </Block>
    </div>
</template>
<script lang="ts" setup>
import { ref} from 'vue'
import Block from './block-5.vue'
let  data = ref([
{ 'label': '昆明高新区人才住房保障申请书（请点击“导出文件”盖章后扫描上传）', 'key': 'tdName', 'props': {} },
  { 'label': '企业信息证明（ 单位营业执照复印件或统一信用代码证复印件）', 'key': 'tdName', 'props': {} },
  { 'label': '入住人才证件（身份证/护照）', 'key': 'tdName', 'props': {} },
  { 'label': '入住人才学历学位证书', 'key': 'tdName', 'props': {} },
  { 'label': '入住人才昆明市不动产登记结果信息查询表', 'key': 'tdName', 'props': {} },
  { 'label': '职业技能证书', 'key': 'tdName', 'props': {} },
  { 'label': '云南省用人单位人员就业（录用）登记表复印件', 'key': 'tdName', 'props': {} },
  { 'label': '结婚证', 'key': 'tdName', 'props': {} },
  { 'label': '配偶昆明市不动产登记结果信息查询表', 'key': 'tdName', 'props': {} },
  { 'label': '子女昆明市不动产登记结果信息查询表', 'key': 'tdName', 'props': {} },
])
</script>

<style lang="scss">

</style>