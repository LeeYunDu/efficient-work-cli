"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const utils_1 = require("@/utils");
const lodash_es_1 = require("lodash-es");
function useAMap(options) {
    let polygonResolve;
    let markerResolve;
    let infoWindowOpenResolve;
    let infoWindowCloseResolve;
    const { container, mapOptions, mapStyle, loop, options: stateOpts } = options || {};
    const state = (0, vue_1.reactive)({
        labels: [],
        markers: [],
        activeMarker: null,
        oldIcon: null,
        infoWindow: null,
        polygons: [],
        style: null,
        activeStyle: null,
        timer: null,
        num: 0,
        // timer1: null,
        // num1: 0
    });
    const map = (0, vue_1.ref)({});
    (0, vue_1.onMounted)(() => {
        clearInterval(state.timer);
        // clearInterval(state.timer1)
        init();
    });
    function init() {
        initMap();
    }
    function initMap() {
        const useContainer = (0, utils_1.isString)(container) ? document.getElementById(container) : container;
        if (!useContainer)
            throw Error('map widthout container to mounted!');
        useContainer.innerHTML = '';
        const viewerDiv = document.createElement('div');
        viewerDiv.style.width = '100%';
        viewerDiv.style.height = '100%';
        useContainer === null || useContainer === void 0 ? void 0 : useContainer.appendChild(viewerDiv);
        map.value = new AMap.Map(viewerDiv, mapOptions);
        mapStyle && map.value.setMapStyle(mapStyle);
    }
    function addPolygon(opts) {
        const { geoJSON, style, activeStyle, type, calculateCenter: cc } = opts || {};
        state.style = style;
        state.activeStyle = activeStyle;
        const polygons = [];
        const labels = [];
        const polygonMap = {};
        new AMap.GeoJSON({
            geoJSON: geoJSON,
            getPolygon: (geojson, lnglats) => {
                const center = geojson.properties.center;
                const polygon = new AMap.Polygon(Object.assign(Object.assign({ path: lnglats }, (style || {})), { extData: Object.assign({ center,
                        style,
                        activeStyle, name: geojson.properties.name }, geojson.properties) }));
                // polygon.on('click', (target: any) => {
                //   polygonResolve && polygonResolve({ polygon })
                //   polygons.map((polygon: any) => {
                //     polygon.setOptions(style)
                //   })
                //   activeStyle && polygon.setOptions(activeStyle)
                // })
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
                // 创建自定义内容的标记点
                // const marker = new AMap.Marker({
                //   position: center,
                //   content: `
                //   <div class="markers">
                //     <span class="label">${geojson.properties.name}</span>
                //     <div class="img-box">
                //       <img src="static/images/screen-home/marker-bottom2.png" alt="">
                //       <div class="count-box">
                //         <div class="value">0</div>
                //         <div class="unit">家</div>
                //       </div>
                //     </div>
                //   </div>
                //   `, // 自定义内容
                //   offset: new AMap.Pixel(-15, -15) // 设置偏移量
                // })
                // 将标记点添加到地图上
                // map.value.add(marker)
                polygons.push(polygon);
                polygonMap[geojson.properties.name] = polygon;
            }
        });
        state.labels = state.labels.concat(labels);
        state.polygons = state.polygons.concat(polygons);
        map.value.add(polygons);
        if (loop && !state.timer && type) {
            changeloop(type);
        }
        return {
            polygons,
            polygonMap
        };
    }
    function addPolylinelp(opt) {
        const path = [];
        opt.data.map((i) => {
            if (i && i.split(',').length > 1) {
                path.push(new AMap.LngLat(i.split(',')[0], i.split(',')[1]));
            }
        });
        // 创建折线实例
        state.polyline = new AMap.Polyline(Object.assign({ path: path }, opt.style));
        // 将折线添加至地图实例
        map.value.add(state.polyline);
        return state.polyline;
    }
    function changeloop(type) {
        clearInterval(state.timer);
        if (type === 'street') {
            state.num = 0;
        }
        else {
            state.num = 8;
        }
        state.timer = setInterval(() => {
            if (type === 'street') {
                if (state.num >= state.polygons.length - 3)
                    state.num = 0;
            }
            else {
                if (state.num >= state.polygons.length)
                    state.num = 8;
            }
            polygonResolve && polygonResolve({ polygon: state.polygons[state.num] });
            state.polygons.map((polygon) => {
                polygon.setOptions(state.style);
            });
            state.polygons[state.num].setOptions(state.activeStyle);
            state.num++;
        }, 5000);
    }
    function addMarker(opts) {
        const { data } = opts || {};
        const umd = (0, utils_1.isArray)(data) ? data : [data];
        if (!umd.length)
            return;
        const markers = [];
        umd.map((item) => {
            const marker = new AMap.Marker(Object.assign({}, item));
            marker.on('click', () => {
                const { position } = (0, lodash_es_1.get)(marker, '_opts');
                // map.value.panTo([position.lng, position.lat])
                markerResolve && markerResolve({ marker });
                setMarkerActiveStyle(marker);
            });
            markers.push(marker);
        });
        state.markers = state.markers.concat(markers);
        map.value.add(markers);
        return {
            markers
        };
    }
    function removePolygon(polygons) {
        map.value.remove(polygons || state.polygons);
        map.value.remove(state.labels || []);
        !(polygons === null || polygons === void 0 ? void 0 : polygons.length) && (state.polygons = []);
    }
    function removeMarkers(markers) {
        map.value.remove(markers || state.markers);
        !(markers === null || markers === void 0 ? void 0 : markers.length) && (state.markers = []);
    }
    function setPolygonsOptions(polygons, opts = {}) {
        if (!polygons.length)
            return;
        polygons.map((polygon) => {
            polygon.setOptions(Object.assign({}, opts));
        });
    }
    function setMarkerActiveStyle(marker) {
        // _amap_id icon唯一标识
        const { _opts: w, _amap_id } = marker;
        // 点击同一个icon,切换icon
        if (state.activeMarker && _amap_id === state.activeMarker._amap_id) {
            marker.setIcon(state.oldIcon);
            marker.setOffset(new AMap.Pixel(0, 0));
            state.activeMarker = null;
            return;
        }
        else {
            // 后面点击的icon 需要将先前的icon恢复成默认icon
            if (state.activeMarker) {
                marker.setOffset(new AMap.Pixel(0, 0));
                state.activeMarker.setIcon(state.oldIcon);
                state.activeMarker.setOffset(new AMap.Pixel(0, 0));
            }
            else {
                marker.setOffset(new AMap.Pixel(0, 0));
            }
            const { icon, activeStyle, activeOffset } = w;
            state.oldIcon = icon;
            if (activeStyle) {
                activeOffset && marker.setOffset(activeOffset);
                marker.setIcon(activeStyle);
            }
        }
        state.activeMarker = marker;
    }
    function addInfoWindow(marker, opts = {}) {
        const { _amap_id } = opts.marker;
        const infoWindow = state.infoWindow;
        if (infoWindow && state.activeMarker && _amap_id === state.activeMarker._amap_id) {
            // infoWindow.close()
            removeInfoWindow();
            return;
        }
        // 前提dom元素已经渲染了, dom元素设置top：-9999px 看不见就好了
        const dom = document.getElementById(opts.domId);
        state.infoWindow = new AMap.InfoWindow(Object.assign({ isCustom: true, content: dom }, opts));
        infoWindowCloseResolve && state.infoWindow.on('close', (e) => {
            infoWindowCloseResolve(e, opts.marker);
        });
        infoWindowOpenResolve && state.infoWindow.on('open', (e) => {
            infoWindowOpenResolve(e, opts.marker);
        });
        state.infoWindow.open(map.value, marker.getPosition());
    }
    function removeInfoWindow() {
        const infoWindow = state.infoWindow;
        if (infoWindow) {
            infoWindow.close();
            state.infoWindow = undefined;
        }
    }
    return Object.assign(Object.assign({ 
        // output ref
        map }, (0, vue_1.toRefs)(state)), { 
        // output fn
        addPolygon,
        addPolylinelp,
        addMarker,
        addInfoWindow,
        removeInfoWindow,
        changeloop,
        removePolygon,
        removeMarkers,
        setPolygonsOptions, subPolygonClick: (fn) => (polygonResolve = fn), subMarkerClick: (fn) => (markerResolve = fn), subInfoWindowOpen: (fn) => (infoWindowOpenResolve = fn), subInfoWindowClose: (fn) => (infoWindowCloseResolve = fn) });
}
exports.default = useAMap;
