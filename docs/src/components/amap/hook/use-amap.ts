import { ref, onMounted, reactive, toRefs } from 'vue'
import { calculateCenter, isArray, isString } from '@/utils'

export interface AMapOptionsMode {
  container: string | Element
  mapOptions: any
  mapStyle?: string
  loop?: any
  options?: any
}

export interface MarkerMode {
  picture: string
  content: string
}

export interface AMapStateMode {
  map: any
  [key: string]: any
}

export interface PolygonStyleMode {
  strokeColor?: string
  strokeWidth?: number
  fillColor?: string
}

export interface PolylineStyleMode {
  strokeColor?: string
  borderWeight?: number
  lineJoin?: string
}

export interface AddPolygonMode {
  geoJSON: any
  style?: PolygonStyleMode
  activeStyle?: PolygonStyleMode
  type?: string
  calculateCenter?: boolean
}

export interface AddPolylineMode {
  data: any
  style?: PolylineStyleMode
}

export type MarkerOptionsMode = {
  position: any
  icon?: any
  zIndex?: number
  content?: string
  [key: string]: any
}

export interface AddMarkerMode {
  data: MarkerOptionsMode | MarkerOptionsMode[]
}

export default function useAMap (options: AMapOptionsMode): AMapStateMode {
  let polygonResolve: any
  let markerResolve: any
  let infoWindowOpenResolve: any
  let infoWindowCloseResolve: any

  const { container, mapOptions, mapStyle, loop, options: stateOpts }: AMapOptionsMode = options || {}
  const state = reactive<any>({
    labels: [] as any[],
    markers: [] as any[],
    activeMarker: null as any,
    oldIcon: null as any,
    infoWindow: null as any,
    polygons: [] as any[],
    style: null,
    activeStyle: null,

    timer: null,
    num: 0,
    // timer1: null,
    // num1: 0
  })

  const map = ref<any>({})
  onMounted(() => {
    clearInterval(state.timer)
    // clearInterval(state.timer1)
    init()
  })
  function init () {
    initMap()
  }

  function initMap () {

    const useContainer = isString(container) ? document.getElementById(container) : container
    if (!useContainer) throw Error('map widthout container to mounted!')
    useContainer.innerHTML = ''
    const viewerDiv = document.createElement('div')
    viewerDiv.style.width = '100%'
    viewerDiv.style.height = '100%'
    useContainer?.appendChild(viewerDiv)
    map.value = new AMap.Map(viewerDiv, mapOptions)
    mapStyle && map.value.setMapStyle(mapStyle)

  }

  function addPolygon (opts: AddPolygonMode) {
    const { geoJSON, style, activeStyle, type, calculateCenter: cc, showLabelMarker = false }: AddPolygonMode = opts || {}
    state.style = style
    state.activeStyle = activeStyle
    const polygons = [] as any
    const labels = [] as any
    const polygonMap: any = {}
    new AMap.GeoJSON({
      geoJSON: geoJSON,
      getPolygon: (geojson: any, lnglats: any[]) => {
        const center = geojson.properties.center

        const polygon = new AMap.Polygon({
          path: lnglats,
          ...(style || {}),
          extData: {
            center,
            style,
            activeStyle,
            name: geojson.properties.name,
            ...geojson.properties
          }
        })
        polygon.on('click', (target: any) => {
          polygonResolve && polygonResolve({ polygon })
          polygons.map((polygon: any) => {
            polygon.setOptions(style)
          })
          polygon.setOptions(activeStyle)
        })

        // // 创建标签对象，并设置其位置和内容
        // const label = new AMap.Text({
        //   position: center,
        //   text: geojson.properties.name,
        //   extData: {
        //     center,
        //     style,
        //     activeStyle,
        //     name: geojson.properties.name,
        //     ...geojson.properties
        //   }
        //   // 其他样式属性...
        // })
        // labels.push(label)
        // label.on('click', () => {
        //   polygonResolve && polygonResolve({ polygon })
        // })

        if (showLabelMarker) {
          // 创建自定义内容的标记点
          const marker = new AMap.Marker({
            position: center,
            content: `
  <div class="markers">
    <span class="label">${geojson.properties.name}</span>
    <div class="img-box">
      <img src="static/images/screen-home/marker-bottom2.png" alt="">
      <div class="count-box">
        <div class="value">0</div>
        <div class="unit">家</div>
      </div>
    </div>
  </div>
  `, // 自定义内容
            offset: new AMap.Pixel(-15, -15) // 设置偏移量
          })
          // 将标记点添加到地图上
          map.value.add(marker)
        }

        polygons.push(polygon)
        polygonMap[geojson.properties.name] = polygon
      }
    })
    state.labels = state.labels.concat(labels)
    state.polygons = state.polygons.concat(polygons)
    map.value.add(polygons)


    if (loop && !state.timer && type) {
      changeloop(type)
    }

    return {
      polygons,
      polygonMap
    }
  }



  function addPolylinelp (opt: AddPolylineMode) {
    const path = [] as any
    opt.data.map((i: any) => {
      if (i && i.split(',').length > 1) {
        path.push(new AMap.LngLat(i.split(',')[0], i.split(',')[1]))
      }
    })
    // 创建折线实例
    state.polyline = new AMap.Polyline({
      path: path,
      ...opt.style
    })
    // 将折线添加至地图实例
    map.value.add(state.polyline)
    return state.polyline
  }

  function changeloop (type: string) {
    clearInterval(state.timer)
    if (type === 'street') {
      state.num = 0
    } else {
      state.num = 8
    }

    state.timer = setInterval(() => {
      if (type === 'street') {
        if (state.num >= state.polygons.length - 3) state.num = 0
      } else {
        if (state.num >= state.polygons.length) state.num = 8
      }
      polygonResolve && polygonResolve({ polygon: state.polygons[state.num] })
      state.polygons.map((polygon: any) => {
        polygon.setOptions(state.style)
      })
      state.polygons[state.num].setOptions(state.activeStyle)
      state.num++
    }, 5000)
  }

  function addMarker (opts: AddMarkerMode) {
    const { data }: AddMarkerMode = opts || {}
    const umd: any = isArray(data) ? data : [data]
    if (!umd.length) return
    const markers = [] as any
    umd.map((item: MarkerOptionsMode) => {
      const marker = new AMap.Marker({
        ...item
      })
      marker.on('click', () => {
        const { position } = marker.w
        // map.value.panTo([position.lng, position.lat])
        markerResolve && markerResolve({ marker })
        setMarkerActiveStyle(marker)
      })
      markers.push(marker)
    })
    state.markers = state.markers.concat(markers)
    map.value.add(markers)
    return {
      markers
    }
  }



  function removePolygon (polygons?: any[]) {
    map.value.remove(polygons || state.polygons)
    map.value.remove(state.labels || [])
    !polygons?.length && (state.polygons = [])
  }

  function removeMarkers (markers?: any[]) {
    map.value.remove(markers || state.markers)
    !markers?.length && (state.markers = [])
  }

  function setPolygonsOptions (polygons: any[], opts: any = {}) {
    if (!polygons.length) return
    polygons.map((polygon: any) => {
      polygon.setOptions({
        ...opts
      })
    })
  }

  function setMarkerActiveStyle (marker: any) {
    // _amap_id icon唯一标识
    const { w, _amap_id } = marker
    // 点击同一个icon,切换icon
    if (state.activeMarker && _amap_id === state.activeMarker._amap_id) {
      marker.setIcon(state.oldIcon)
      state.activeMarker = null
      return
    } else {
      // 后面点击的icon 需要将先前的icon恢复成默认icon
      if (state.activeMarker) {
        // marker.setOffset(new AMap.Pixel(0, 0))
        state.activeMarker.setIcon(state.oldIcon)
      }
      const { icon, activeStyle } = w
      state.oldIcon = icon
      if (activeStyle) {
        marker.setIcon(activeStyle)
      }
    }
    state.activeMarker = marker
  }


  function addInfoWindow (marker: any, opts: any = {}) {
    const { _amap_id } = opts.marker
    const infoWindow = state.infoWindow
    if (infoWindow && state.activeMarker && _amap_id === state.activeMarker._amap_id) {
      // infoWindow.close()
      removeInfoWindow()
      return
    }
    // 前提dom元素已经渲染了, dom元素设置top：-9999px 看不见就好了
    const dom = document.getElementById(opts.domId)
    state.infoWindow = new AMap.InfoWindow({
      isCustom: true, //使用自定义窗体
      content: dom,
      // content: `<div class='mapInfoWindow' style='position: relative;'>
      // <span></span>
      // </div>`,
      ...opts
    })

    infoWindowCloseResolve && state.infoWindow.on('close', (e: any) => {
      infoWindowCloseResolve(e, opts.marker)
    })

    infoWindowOpenResolve && state.infoWindow.on('open', (e: any) => {
      infoWindowOpenResolve(e, opts.marker)
    })
    state.infoWindow.open(map.value, marker.getPosition())
  }
  function removeInfoWindow () {
    const infoWindow = state.infoWindow
    if (infoWindow) {
      infoWindow.close()
      state.infoWindow = undefined
    }
  }

  return {
    // output ref
    map,
    ...toRefs(state),
    // output fn
    addPolygon,
    addPolylinelp,
    addMarker,
    addInfoWindow,
    removeInfoWindow,
    changeloop,
    removePolygon,
    removeMarkers,
    setPolygonsOptions,
    subPolygonClick: (fn: any) => (polygonResolve = fn),
    subMarkerClick: (fn: any) => (markerResolve = fn),
    subInfoWindowOpen: (fn: any) => (infoWindowOpenResolve = fn),
    subInfoWindowClose: (fn: any) => (infoWindowCloseResolve = fn),
  }
}
