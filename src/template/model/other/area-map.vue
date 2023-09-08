<template>
  <section id="map-container" class="area-map"></section>
</template>

<script setup lang="ts">
import { coordinateQueryAddress } from '@/api'
import { inject, onMounted, ref } from 'vue'
import _ from 'lodash-es'
import { ElMessage } from 'element-plus'

const props = defineProps({})

const emits = defineEmits(['locationChange'])
// -------- inject --------
const message = inject('message')
// -------- ref --------

// -------- computed --------

// -------- fn --------
const mapInstance = ref(null)

const markerArr = []

function getLocation (params) {
  return coordinateQueryAddress({ location: `${params.lng},${params.lat}` }).then(res => {
    if (res.info !== 'OK' && res.status !== '1') return ElMessage.error('获取地址失败,请稍后重试!')
    const { formatted_address,addressComponent } = _.get(res,'regeocode',{})
    return {
      formatted_address,
      addressComponent,
      lnglat: [params.lng, params.lat]
    }
  })
}

function addMarker (position) {
  const marker = new AMap.Marker({
    position: new AMap.LngLat(position.lng, position.lat),
  })
  if (_.size(markerArr)) _.forEach(markerArr,item => mapInstance.value.remove(item))
  markerArr.push(marker)
  mapInstance.value.add(marker)
}

function mapEvent (map) {
  map.on('click', e => {
    const { lnglat } = e
    addMarker(lnglat)
    getLocation(lnglat).then(res => emits('locationChange', res))
  })
}

function initMap () {
  const map = new AMap.Map('map-container',{
    zoom: 16,
    center: [102.833669,24.88149],
    viewMode:'2D'
  })
  mapEvent(map)
  mapInstance.value = map
}
onMounted(() => initMap())
// -------- watch --------

// -------- provide --------

// -------- expose --------
</script>

<style lang="scss" scoped>
.area-map {
  width: 100%;
  height: 320px;
  margin-top: 16px;
  margin-left: 5px;
}
</style>
