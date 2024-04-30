<template>
  <div class="chart">
    <s-chart
      :series="['BarLinear','bar']"
      :x="['category']"
      :y="['value']"
      :color="[
        LinearGradient('180deg',['rgba(28, 104, 213,1) 0%','rgba(59, 186,236, 1) 100%']),
      ]"
      :data="chartData"
      :units="units"
      :merge="merge"
    />
  </div>
</template>

<script lang="ts" setup>

import { computed, ref } from 'vue'
import { useChartData,LinearGradient } from 'sz-chart'
const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
  data: {
    type: Array,
    default: () => []
  },
  fields: {
    type: Array,
    default: () => []
  },
  startAngle: {
    type: Number,
    default: 30
  },
  iconSize: {
    type: [Number,String],
    default: 140
  },
  chartMerge: {
    type: Object,
    default: () => ({})
  },
  legend: { type: String, default: 'RightLegendVP' }
})

const useData = computed<any>(() => props.data)

const units = computed(() => fields.value?.slice(1).map((f: any) => f.unit))


const fields = ref([
  {
    label: '月份',
    key: 'x1'
  },
  {
    label: '数量',
    key: 'y1',
    unit: '个'
  },
  {
    label: '',
    key: 'value',
  },
])



const merge = ref({
  tooltip:{
    trigger: 'axis',
    formatter: (params: any) => {
      var result = `${params[0].name}<br />`
      for (var i = 0; i < params.length; i++) {
        if (params[i].seriesName) {
          fields.value.map((u:any)=>{
            if(u.label===params[i].seriesName){
              if(u.unit){
                result += params[i].marker + params[i].seriesName + ': ' + params[i].value[params[i].seriesName] + ' ' + u.unit + '<br />'
              }else{
                result += params[i].marker + params[i].seriesName + ': ' + params[i].value[params[i].seriesName] +  '<br />'
              }
            }
          })
        }
      }
      return result
    }
  },
  series:[
    {
      showBackground:true,
      barWidth:28,
      label: {
        show: true,
        position: 'top',
        color: '#F6F9FE',
      },
    },
    {
      name:'',
      type: 'pictorialBar',
      symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAKCAYAAACngj4SAAAAAXNSR0IArs4c6QAAAIlJREFUOE9jZKAzYHz94992QnYyMjAwwtT8Z2D4T0g9PnnG19//LoUqgBuKpAFmONXkGF//+NtJhIuRLaTMh29+/M1EtxAWbMhBSYSjiFLC+PLHb3eQSmyGkxJfxMYz45uf/zWwxCEpcYccxLCgRw92eJQwvvv/n5+osKCSImypj0pGYzeG7hYCAKkLJwbr79giAAAAAElFTkSuQmCC',
      symbolSize: [28, 10],
      symbolOffset: [0, 0],
      symbolPosition:'end',
      z: 12,
      itemStyle: {
        color: '#EBF8FD',
      },
    },

  ]
})


const chartData = useChartData(fields, useData)

</script>


<style scoped lang="scss">


.chart{
  height: 100%;
  position: relative;
}

.offset-box{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;


    .center{
      top: 0%;
      left: 0;
      position: absolute;
    }

    .bg{
      width: 183px;
      height: 183px;
      left:30%;
      top: 50%;
      transform: translate(-92px,-92px);
    }
    .circle{
      border-radius: 50%;
      width: 126px;
      height: 126px;
      left:30%;
      top: 50%;
      transform: translate(-63px,-63px);
    }
  }
</style>
