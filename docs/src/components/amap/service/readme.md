

<script setup>
import { ref} from 'vue'
let  data = ref([  { y1:'10000',y2:55 }])

</script>
# 周边配套信息查询
## 使用说明
高德地图，根据经纬度查询周边服务，包含以下功能

1. 根据经纬度查询周边服务
2. 拿到数据后加载markers
3. markers样式设置，包含正常加载样式和选中加载样式
4. marker 点击事件订阅
5. marker 点击后弹窗，addInfoWindow事件,根据传入的domId显示自定义内容,详情请查看 [use-amap 源代码](../hook/readme.md) 

## 示例
``` vue
<template>
  <div id="mapContainer" class="map-container"></div>
</template>

<script lang="ts" setup>
import { ref} from 'vue'

const props = defineProps({
  data:{
    type:Object,
    default:()=>{}
  }
})

let state = reactive({
  marker: [],
  form: {},
  searchData:[],
  serverDialogShow:false,
  active: '150700',
  activeType: '',
  activeLabel:'',
  windowTip:'',
  mapEquipments: [],
  serverMarkers: [],
  tooltipInfo: {},
  markerInfo: false,
  showMarkerWindow: false
})

// 是由高德地图提供的服务编码
let types =  [
  // { label: '地铁', key: '150500|150501|150800', icon: 'bus' },
  { label: '公交', key: '150700', icon: 'bus' },
  { label: '医疗', key: '090000', icon: 'hospital' },
  { label: '商圈', key: '060000', icon: 'shopping' },
  { label: '住宅', key: '120300', icon: 'house' },
  { label: '酒店', key: '100000', icon: 'hotel' },
  { label: '楼宇', key: '120200', icon: 'buiding' },
  { label: '教育', key: '141200', icon: 'school' },
]

let mapInstance: any = useAmap({
  container: 'mapContainer',
  mapOptions: {
    center: [103.226155, 25.662497362],
    zoom: 10
  },
  mapStyle: 'amap://styles/79a256d0e6beaac5277dccea748f0f9c', // 地图样式
})
// marker 点击事件订阅
mapInstance.subMarkerClick((pick: any) => {
  let { marker } = pick
  state.tooltipInfo = get(marker, '_opts.extData', {})
  mapInstance.addInfoWindow(marker, {
    marker: marker,
    offset: new AMap.Pixel(150, 50),
    domId: 'area-tooltip'
  })
})

function getServer () {
  let lng = get(props.data,'longitude',null)
  let lat = get(props.data,'latitude',null)
  if (!(lng && lat)) return
  let types = state.active
  let radius = 1000
  let key = '5dae52b5fd99a7ad96705bdd9219abe3'
  fetch(`https://restapi.amap.com/v3/place/around?types=${types}&key=${key}&location=${position.value.join(',')}&radius=${radius}`).then(res => {
    res.json().then(data => {
      if (data.status === '0') return
      let result = data.pois.slice(0, 100)
      state.searchData = result
      let tip = `【${get(props.data,'address')}】附近${radius}米内包含${state.activeLabel}${result.length}个`
      state.windowTip = tip
      addMarker(result)
    })
  })
}


function addMarker (data) {
  data.map(item => {
    let lnglat = item.location.split(',')
    item.position = [
      lnglat[0],
      lnglat[1]
    ]
    let markerConfig = {
      icon: new AMap.Icon({
        size: new AMap.Size('62', '67'),
        offset: new AMap.Pixel(0, 0),
        image: imgPath(`/map/marker-${state.activeType}.png`),
        imageSize: new AMap.Size('62', '67'),
      }),
      // offset: new AMap.Pixel(0, 0),
    }

    item.icon = markerConfig.icon
    item.activeStyle = new AMap.Icon({
      size: new AMap.Size('62', '67'),
      image: imgPath(`/map/marker-${state.activeType}-active.png`),
      imageSize: new AMap.Size('62', '67'),
    })
    item.activeOffset = new AMap.Pixel(0, 0)
    item.extData = item
  })
  mapInstance.addMarker({ data })
}

</script>

<style lang="scss" scoped>
.map-container {
  width: 100%;
  height: 100%;
}
</style>
```
## Attributes

| 属性名      | 说明        |  类型         |  默认值       | 
| :---        | :---   |   :---  |:----: |
| data   | 数据集合        | array      |—  |

## Progress 源代码

::: details 查看源代码
``` vue 
<template>
  <template v-for="(item, index) in propsData" :key="index">
    <div class="progress-box">
      <div class="circle">
        <svg class="svg-box" viewBox="0 0 140 140">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#0E6CF8;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#FF7E06;stop-opacity:1" />
            </linearGradient>
          </defs>
          <path id="path" d="M 70,70 m 0,-65 a 65,65 0 1 0 0,130 a 65,65 0 1 0 0,-130" stroke-linecap="round" fill="none"
                stroke-dasharray="408 408" :stroke-dashoffset="((408 - 408 * get(item, 'y2', 0) / 100) * -1)"
                stroke="url(#grad1)" stroke-width="5" />
        </svg>
        <div class="count-value">
          <div class="value-div flex f-aic">
            <span :id="`${get(item, 'x1', 0)}_value`" class="value">{{ get(item, 'y1', 0) }}</span>
            <span class="unit">件</span>
          </div>
          <div :id="`${get(item, 'x1', 0)}_percent`" class="percent">{{ get(item, 'y2', 0) }}%</div>
        </div>
      </div>
    </div>
  </template>
</template>

<script lang="ts" setup>
import { get } from 'lodash-es'
import { computed } from 'vue'
const props = defineProps({
  data: {
    type: Object || Array,
    default: () => []
  },

})
const propsData = computed(() => props.data || [])
</script>

<style lang="scss" scoped>
.progress-box {

  .circle {
    width: 126px;
    height: 126px;
    border-radius: 50%;
    position: relative;

    .svg-box {
      position: absolute;
      left: -7.5px;
      top: -6px;
      width: 140px;
      height: 140px;
      z-index: 11;

      #path {
        transition: stroke-dasharray 0.6s ease 0s, stroke 0.6s ease 0s, opacity 0.6s ease 0s;
      }
    }

    &::after {
      content: '';
      width: 126px;
      height: 126px;
      border-radius: 50%;
      background: linear-gradient(180deg, #7DA1FF 0%, rgba(86, 154, 255, 0) 100%), linear-gradient(238deg, #85FFD3 0%, rgba(255, 255, 255, 0) 38%);
      position: absolute;
      opacity: .3;
    }

    .count-value {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 24px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      .value-div {
        display: flex;
        align-items: center;
      }


      .value {
        font-size: 24px;
        font-family: D-DIN;
        font-weight: bold;
        color: block;
      }

      .unit {
        font-size: 16px;
        font-weight: 400;
        color: #A6BFE4;
        margin-left: 6px;
      }

      .percent {
        font-size: 16px;
        font-family: D-DIN;
        font-weight: 400;
        color: #8EBBFF;
        margin-top: 6px;
      }

    }

  }

}
</style>


```
:::

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>