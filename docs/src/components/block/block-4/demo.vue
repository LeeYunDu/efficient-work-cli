<template>
    <div class="div" >
      <Block  :fields="data" > </Block>
    </div>
</template>
<script lang="ts" setup>
import { ref} from 'vue'
import Block from './block-4.vue'
let  data = ref([
  { label:'人才服务',icon:'service/service-icon-04.png',info:'人才认定、人才就业',path:'' },
  { label:'金融服务',icon:'service/service-icon-03.png',info:'银行贷款、上市服务',path:'' },
  { label:'科技服务',icon:'service/service-icon-02.png',info:'产学研合作、资源共享',path:'' },
  { label:'法律服务',icon:'service/service-icon-01.png',info:'法律咨询、法律援助',path:'' },
])
</script>

<style lang="scss">
.div{
  background: black;
  padding: 20px;
}
</style>