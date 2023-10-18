
<template>
  <div class="h-map">
    <!-- <teleport to="#app">

    </teleport> -->
    <div class="tl_map">
      <div id="mapContainer" class="map-container">
        <!-- <img src="@static/images/layout/map_bg.png" class="amapc_img"> -->
      </div>
    </div>
  </div>
  <Tooltip :fields="[]" :data="state.tooltipInfo" />
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'
import useAmap from '@/hooks/map/use-amap'
import { useStore } from 'vuex'
import { linanMapJSON } from './linan'
import Tooltip from './map.tooltip.vue'

const geoJSONMap ={
  '临安区':linanMapJSON,
}
import { onMounted } from 'vue'
import { mockMapData } from '../json'
import { imgPath } from '@/utils'
import { cloneDeep, get } from 'lodash-es'
import { AbiRo } from '@/api/types/BuildingInfo.type'
import { BuildingInfoGetById } from '@/api'
let state = reactive({
  data: [],
  show: false,
  tooltipInfo:{}
})
const store = useStore()
let mapInstance: any = useAmap({
  container: 'mapContainer',
  mapOptions: {
    center: [119.724446,30.234355],
    zoom: 10
  },
  // mapStyle: 'amap://styles/79a256d0e6beaac5277dccea748f0f9c',
})


mapInstance.subMarkerClick(async (pick:any)=>{

  let { marker } = pick

  let id = get(marker,'_opts.extData.id',{})

  if(state.tooltipInfo.id !== id ){
    const { data }: any = await BuildingInfoGetById({ id })
    state.tooltipInfo = data

  }else{
    // mapInstance.removeInfoWindow()
  }
  mapInstance.addInfoWindow(marker,{
    marker:marker,
    offset:  new AMap.Pixel(350,150),
    domId:'screen-area-tooltip'
  })

})


const cityName = computed(()=>'临安区')

const cityGeoJSON = computed(()=>{
  let { features } = linanMapJSON
  let data = features.find(item=>{
    return item.properties.name === cityName.value
  })
  return data
})


function addGeoJSON (){
  mapInstance.removePolygon()
  let { polygon } =  mapInstance.addPolygon({
    geoJSON:geoJSONMap[cityName.value],
    calculateCenter:{
      cc:true
    },
    style:{
      strokeColor: 'rgb(3, 131, 245)',
      strokeOpacity: .8,
      strokeWeight: 2,
      fillColor: 'rgb(3, 131, 245)',
      fillOpacity: 0.15,
      strokeStyle: 'dashed', // 设置为虚线
    },
    // activeStyle:{
    //   strokeColor: 'rgb(3, 131, 245)',
    //   strokeOpacity: 1,
    //   strokeWeight: 3,
    //   fillColor: 'rgb(3, 131, 245)',
    //   fillOpacity:1,
    //   strokeStyle: 'dashed', // 设置为虚线
    // }
  })
  // map.setFitView(polygon)
  // map.setZoom(15)
}

PubSub.subscribe('map-addMarker',(key,data)=>{

  addMarker(data.filter(item=>{
    let { latitude,longitude } = item

    return latitude&&longitude
  }))
})

let markerIconMap:any = {
  '楼宇':'ly',
  '园区':'yq',
  '厂房':'cf',
}

function addMarker (data:AbiRo[]){

  data.map(item=>{
    let markerData = cloneDeep(item)
    let { latitude,longitude } = item

    item.position = [longitude,latitude]

    let chooseType24Names = item.chooseType24Names??'楼宇'
    let markerConfig = {
      icon: new AMap.Icon({
        size: new AMap.Size('20', '25'),
        offset: new AMap.Pixel(0, 0),
        image: imgPath(`/map/map-${markerIconMap[chooseType24Names]}.png`),
        imageSize: new AMap.Size('20', '25'),
      }),
      // offset: new AMap.Pixel(0, 0),
    }

    item.icon = markerConfig.icon
    item.activeStyle = new AMap.Icon({
      size: new AMap.Size('66', '75'),
      offset:new AMap.Pixel(-110, -110),
      image: imgPath(`/map/map-${markerIconMap[chooseType24Names]}-active.png`),
      imageSize: new AMap.Size('66', '75'),
    })
    item.activeOffset = new AMap.Pixel(-16, -38)
    item.extData = markerData
    console.log(item,'item')


  })
  mapInstance.addMarker({ data })
}

onMounted(()=>{
  addGeoJSON()
  // addMarker(mockMapData)
})
</script>

<style lang="scss" scoped>
.map-container {
  width: 100%;
  height: 100%;

}

.amapc_img {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.map-teleport-box {
  position: absolute;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: transparent !important;
}

.fiexd-box {
  position: absolute;
  color: white;
  z-index: 111;
  width: 100px;
  height: 100px;
  outline: 1px solid;
  left: 10px;
  top: 10px;
  cursor: pointer;
}

.h-map {
  // pointer-events: none;

  :deep() {
    .amap-logo {
      display: none;
    }

    .marker-content {
      position: relative;

      img.position {
        position: absolute;
        top: -40px;
        left: -20px;
        width: 40px;

        &.active {
          top: -50px;
          left: -25px;
          width: 50px;
        }
      }
    }
  }
}
.tl_map {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: transparent !important;
  .amapc_img{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
  }
  .amapc{
    width: 100%;
    height: 100%;
  }
}

</style>
