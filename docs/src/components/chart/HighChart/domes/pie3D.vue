<template>
  <div class="pie-3d">
    <div ref="pieChart" class="pie-box">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import Highcharts from 'highcharts'
import highcharts3d from 'highcharts/highcharts-3d'
highcharts3d(Highcharts) // 启用 Highcharts 的 3D 功能
import chartBottom from 'static/images/chart-bottom.png'
let props = defineProps({
  data:{
    type:Array,
    default:()=>[]
  },
})

let pieChart = ref(null)
function init (){
  // 初始化Highcharts图表
  Highcharts.chart(pieChart.value, {
    chart: {
      backgroundColor:null,
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 70, // 视角旋转角度
        beta: 0 // 视角倾斜角度
      },
      events:{
        load:function (){
          let chart = this
          var chartWidth = chart.plotWidth
          var chartHeight = chart.plotHeight

          // 计算背景图的垂直位置
          var backgroundImageHeight = 96 // 背景图的高度
          var backgroundImageY = (chartHeight - backgroundImageHeight) / 2 // 计算垂直居中的位置
          var backgroundImageWidth = 244 // 背景图的高度
          var backgroundImageX = (chartWidth - backgroundImageWidth) / 2 // 计算垂直居中的位置
          // 添加背景图
          chart.renderer.image(
            chartBottom, // 替换为你的背景图 URL
            backgroundImageX + 10  , // 图片左上角 x 坐标
            backgroundImageY - 10, // 图片左上角 y 坐标
            244,// 图片宽度
            96  // 图片高度

          ).add()
        }
      }
    },
    title: {
      enabled: false,
      text: '',
      align: 'left',
      style:{
        fontSize:'16px'
      }
    },
    credits: {
      enabled: false // 禁用版权信息
    },
    subtitle: {
      enabled: false,
      text: '',
      align: 'left',
      style:{
        fontSize:'16px'
      }
    },
    plotOptions: {
      pie: {
        connectorWidth: 0, // 将连接线的宽度设置为0，隐藏提示线
        size: '120%', // 设置饼图的大小为 75%，可以根据需要调整
        innerSize: '60%',
        depth: 30,
        showInLegend:true,
        center:['50%','10%'],
        dataLabels:{
          enabled:false
        }
      }
    },
    legend: {
      layout: 'horizontal', // 设置图例的布局为水平排列
      align: 'center', // 图例水平居中
      verticalAlign: 'bottom', // 图例垂直底部对齐
      x: 20,
      y: 0, // 调整图例位置，根据需要进行微调
      floating: true,
      symbolHeight: 8, // 调整小圆高度
      symbolWidth: 8, // 调整小圆宽度
      itemStyle: {
        color: '#FFFFFF', // 图例文本颜色
        fontWeight: 'normal',
        fontSize:'12px'
      },
      labelFormatter: function (data) {

        // 使用 HTML 标签和样式来自定义标签的显示
        return '<span style="color: white; ">' + this.name + '<br>' + `<span style="color:${this.color}">${this.y}</span>` + '</span>'
      },
    },
    tooltip: {
      style:{
        fontSize:'16px'
      },
      enabled: true, // 启用 tooltip
      formatter: function () {
        return '<b>' + this.x + '</b><br/>' + this.series.name + ': ' + this.y // 自定义 tooltip 内容
      }
    },
    series: [{
      name: 'Medals',
      colorByPoint: true,
      data: [
        ['Norway', 16],
        ['Germany', 12],
        ['USA', 8],
        ['Sweden', 8],
        ['Netherlands', 8],
        ['ROC', 6],

      ]
    }]
  })
}

onMounted(()=>{
  setTimeout(()=>{
    init()
  },0)
})
</script>

<style lang="scss" scoped>

.pie-box{
  width: 100%;
  height: 220px;
}


.pie-3d{
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(9, 29, 68, 0.6);
  
}
</style>
