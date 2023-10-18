<template>
  <div class="page-view">
    <section class="content">
      <section class="page-top">
        标题
      </section>
      <section class="page-center">
        <div class="table-box">
          <div class="map-box">
            <MapQuery />
            <MapLegend />
            <MapList />
            <MapAMap ref="mapRef" />
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script lang="ts" setup>

import MapAMap from './components/map.AMap.vue'
import MapQuery from './components/map.query.vue'
import MapLegend from './components/map.legend.vue'
import MapList from './components/map.list.vue'


</script>

<style lang="scss" scoped>

.page-center{
  margin-top: 0!important;
}
.table-box{
  overflow: initial!important;
}
.map-box{
  height: 100%;
  box-shadow: 0 0 14px  #D4DCE8;
  position: relative;
}
</style>
