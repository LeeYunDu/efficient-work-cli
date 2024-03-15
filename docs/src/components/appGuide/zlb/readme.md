

<script setup>
import imagePreview from '@/global/components/imagePreview.vue'
import img01 from './img01.jpg'
</script>
# 浙里办上架指南
上架应用规范要求
## IRS开发平台

https://op-irs.zj.gov.cn/mobile/login?goto=/mobile/dev/app/management/serverList

## 浙里办插件引入

```html
<script type="text/javascript"  src="https://assets.zjzwfw.gov.cn/assets/ZWJSBridge/1.1.0/zwjsbridge.js"></script>
<script type="text/javascript" src="//assets.zjzwfw.gov.cn/assets/zwlog/1.0.0/zwlog.js"></script>
```

## 上架会审核 -  禁止网站页面缩放设置
HTML文件中修改 meta 标签，添加以下内容：
```  html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

## 微应用嵌入解决方案

[采用micro-app方案实现](https://micro-zoe.github.io/micro-app/docs.html#/)。简单、便捷。

``` npm
npm install @micro-zoe/micro-app
```

``` ts
import microApp from '@micro-zoe/micro-app'
microApp.start()
```

``` vue
<template>
  <div
    id="intermediary-iframe"
    class="view-container"
  >
  <micro-app
    name="resource"
    iframe
    :url="iframeUrl"
    :data="{}"
  >

  </micro-app>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
let route = useRoute()
const iframeUrl = computed(() => {
  return `http://172.16.208.12:18570/resource-recommend-company-pc/#/`
})


</script>

<style lang="scss" scoped>
.view-container {
  padding-top: 0;
  iframe {
    width: 100%;
    height: 100%;
    // min-height: 1200px;
  }
}
</style>

```

子应用路由

``` vue
router.push({
  path:'主应用下的子应用路由地址  /resource-recommend/view',
  query:{
    resource:'#/recommend?type=recommend&id=2',// 子应用路由并且携带参数示例
  }
})

```

## IRS平台文件包要求，小于20MB

- 方案一：上传静态资源文件至公司文件库，修改代码加载资源的方式
- 方案二：向益跑咨询的静态资源重复打包的解决方案

## 富文本安全问题

采用vue-dompurify-html插件加载富文本，防止XSS注入

项目中使用v-html替换为v-dompurify-html即可
``` ts
import VueDOMPurifyHTML from 'vue-dompurify-html'
app.use(VueDOMPurifyHTML)
```
## 移动端文件预览解决方案

[v-viewer](https://github.com/mirari/v-viewer/tree/v3)
``` npm
npm i v-viewer
```

``` vue
<template>
  <viewer :images="[useCover.url]" class="flex">
    <template v-for="(item,index) in [useCover.url]" :key="index">
      <img
        class="cover-image"
        :src="item"
      >
    </template>
  </viewer>
</template>
<script>
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
</script>
```

## 上架会审核 -  禁止页面放大缩小、滑动

在index.html文件中的script标签中添加以下代码

``` js
window.onload = function () {
    // 禁用双指放大
    document.addEventListener('touchstart', function (event) {
      if (event.touches.length > 1) {
        event.preventDefault()
      }
    })
    // 禁用双击放大
    let lastTouchEnd = 0
    document.addEventListener('touchend', function (event) {
      const now = (new Date()).getTime()
      if (now - lastTouchEnd <= 300) {
        event.preventDefault()
      }
      lastTouchEnd = now
    }, false)
    document.addEventListener('gesturestart', function (event) {
      event.preventDefault()
    })
  }

```



## 上架会审核 - 浙里办下载文件

上架会审核是否需要采用浙里办的插件方式下载文件

``` ts
export const downloadFile = (url: any) => {
  return new Promise((resolve, reject) => {
    zwJs.onReady(() => {
      zwJs.downloadFile({ url }).then((res: any) => {
        resolve({ success: true, data: res })
      }).catch((error: any) => {
        resolve({ success: false, errMsg: JSON.stringify(error), data: {} })
      })
    })
  })
}
```


## 上架会审核 - 浙里办打开外链

上架会审核是否需要采用浙里办的插件方式打开外链
``` ts
/**
 * 在一个新的窗口加载一个新的页面
 */
export const openLink = (url: any, type?: any) => {
  const symbol = url.includes('?') ? '&' : '?'
  const link: any = `${(url + symbol)}uiType=${localStorage.getItem('ui') || 'normal'}`
  console.log('🚀 ~ file:zw line:55 跳转链接-----', link)
  if (import.meta.env.VITE_ENV === 'prod' && isZlb() && type === 'JSBridge') {
    return new Promise((resolve, reject) => {
      window.ZWJSBridge.onReady(() => {
        window.ZWJSBridge.openLink({
          url: link,
          onSuccess: () => resolve({ success: true }),
          onFail: () => reject({ success: false })
        })
      })
    })
  }

  window.history.pushState({ url: '#' }, '', '#')
  window.location.href = link
}
```

## 上架会审核 - 浙里办适老化

在App.vue文件中添加一下代码

``` ts
import { isZlb } from './utils'
import { getUiStyle } from './utils/zw'
import { setRem } from './utils/rem'


async function getUiStatus () {
  const res = await getUiStyle()
  if (!res.success) return Toast.fail('获取UI类型失败!')
  _.get(res, 'data.uiStyle') && setRem(_.get(res, 'data.uiStyle'))
}

onMounted(()=>{
  isZlb() && setTimeout(async () => await getUiStatus(), 1000)
  isZlb() && document.addEventListener('visibilitychange', async () => {
    document.title = route.meta?.title || '临企通'
    !document.hidden && await getUiStatus()
  }, false)
})
```

### rem.ts

```ts
import store from '@/store'
function resizeRem (uiType: string) {
  // uiType ==> elder 老年版 normal 正常版
  const baseSize = uiType === 'elder' ? 55 : 37.5

  const scale = document.documentElement.clientWidth / 375

  const size = baseSize * Math.min(scale, 2) + 'px'

  document.documentElement.style.fontSize = size

  localStorage.setItem('ui', uiType)

  store.commit('SET_UI_STYLE', uiType)

  if (document.documentElement.style.fontSize !== size) resizeRem(uiType)

  console.log(`ui: ${uiType} size: ${size}`)
}

export function setRem (uiType: string) {

  resizeRem(uiType)
  function resizeHandle () {
    resizeRem(uiType)
  }
  window.removeEventListener('resize', resizeHandle)
  window.addEventListener('resize', resizeHandle)
}

```

## 上架会审核 - 联系方式拨打电话功能

涉及到联系方式的信息需要支持拨打电话功能

``` ts
phoneCall(15168777777)

export const phoneCall = (corpId: any) => {
  const sUserAgent = window.navigator.userAgent.toLowerCase()
  const bIsDtDreamApp = sUserAgent.indexOf('dtdreamweb') > -1 // 浙里办APP
  // 浙里办支付宝小程序
  if (!bIsDtDreamApp) {
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = 'tel:' + corpId
    a.click()
    a.remove()
  } else {
    return new Promise((resolve, reject) => {
      window.ZWJSBridge.onReady(() => {
        window.ZWJSBridge.phoneCall({ corpId }).then((res: any) => {
          resolve({ success: true, data: res })
        }).catch((error: any) => {
          resolve({ success: false, errMsg: JSON.stringify(error), data: {} })
        })
      })
    })
  }
}
```


## 上架审核清单
<imagePreview :data="[img01]"></imagePreview>

## zw.ts —— 浙里办封装方法集合  

``` ts
/**./src/utils/zw.js 政务网二次封装的方法*/
function isZlb () {
  const sUserAgent = window.navigator.userAgent.toLowerCase()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return sUserAgent.indexOf('dtdreamweb') > -1
}
const zwJs = window.ZWJSBridge
/**
 * 获取用户类型
 */
export const getUserType = () => {
  return new Promise((resolve, reject) => {
    window.ZWJSBridge.onReady(() => {
      window.ZWJSBridge.getUserType().then((res: any) => {
        resolve({ success: true, data: res })
      }).catch((error: any) => {
        resolve({ success: false, errMsg: JSON.stringify(error), data: {} })
      })
    })
  })
}
/**
 * 获取用户ui类型
 */
export const getUiStyle = () => {
  return new Promise((resolve, reject) => {
    window.ZWJSBridge.onReady(() => {
      window.ZWJSBridge.getUiStyle().then((res: any) => {
        resolve({ success: true, data: res })
      }).catch((error: any) => {
        resolve({ success: false, errMsg: JSON.stringify(error), data: {} })
      })
    })
  })
}


export const setTitle = (obj: any) => {
  return new Promise((resolve, reject) => {
    window.ZWJSBridge.onReady(() => {
      window.ZWJSBridge.setTitle(obj).then((res: any) => {
        resolve({ success: true, data: res })
      }).catch((error: any) => {
        resolve({ success: false, errMsg: JSON.stringify(error), data: {} })
      })
    })
  })
}


/**
 * 在一个新的窗口加载一个新的页面
 */
export const openLink = (url: any, type?: any) => {
  const symbol = url.includes('?') ? '&' : '?'
  const link: any = `${(url + symbol)}uiType=${localStorage.getItem('ui') || 'normal'}`
  console.log('🚀 ~ file:zw line:55 跳转链接-----', link)
  if (import.meta.env.VITE_ENV === 'prod' && isZlb() && type === 'JSBridge') {
    return new Promise((resolve, reject) => {
      window.ZWJSBridge.onReady(() => {
        window.ZWJSBridge.openLink({
          url: link,
          onSuccess: () => resolve({ success: true }),
          onFail: () => reject({ success: false })
        })
      })
    })
  }

  window.history.pushState({ url: '#' }, '', '#')
  window.location.href = link
}
/**
 * 获取设备唯一标识
 */
export const getUserDeviceUUID = () => {
  return new Promise((resolve, reject) => {
    window.ZWJSBridge.onReady(() => {
      window.ZWJSBridge.getUUID().then((res: any) => {
        resolve({ success: true, data: res })
      }).catch((error: any) => {
        resolve({ success: false, errMsg: JSON.stringify(error), data: {} })
      })
    })
  })
}
/**
 * 获取用户经纬度
 */
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    window.ZWJSBridge.onReady(() => {
      window.ZWJSBridge.getLocation().then((res: any) => {
        resolve({ success: true, data: res })
      }).catch((error: any) => {
        resolve({ success: false, errMsg: JSON.stringify(error), data: {} })
      })
    })
  })
}
export const phoneCall = (corpId: any) => {
  const sUserAgent = window.navigator.userAgent.toLowerCase()
  const bIsDtDreamApp = sUserAgent.indexOf('dtdreamweb') > -1 // 浙里办APP
  // 浙里办支付宝小程序
  if (!bIsDtDreamApp) {
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = 'tel:' + corpId
    a.click()
    a.remove()
  } else {
    return new Promise((resolve, reject) => {
      window.ZWJSBridge.onReady(() => {
        window.ZWJSBridge.phoneCall({ corpId }).then((res: any) => {
          resolve({ success: true, data: res })
        }).catch((error: any) => {
          resolve({ success: false, errMsg: JSON.stringify(error), data: {} })
        })
      })
    })
  }
}

export const windowClose = () => {
  return new Promise((resolve, reject) => {
    zwJs.onReady(() => {
      zwJs.close().then((res: any) => {
        resolve({ success: true, data: res })
      }).catch((error: any) => {
        resolve({ success: false, errMsg: JSON.stringify(error), data: {} })
      })
    })
  })
}

export const getLocalStorage = (obj: any) => {
  return new Promise((resolve, reject) => {
    zwJs.onReady(() => {
      zwJs.getLocalStorage(obj).then((res: any) => {
        resolve({ success: true, data: res })
      }).catch((error: any) => {
        resolve({ success: false, errMsg: JSON.stringify(error), data: {} })
      })
    })
  })
}
export const setLocalStorage = (obj: any) => {
  return new Promise((resolve, reject) => {
    zwJs.onReady(() => {
      zwJs.setLocalStorage(obj).then((res: any) => {
        resolve({ success: true, data: res })
      }).catch((error: any) => {
        resolve({ success: false, errMsg: JSON.stringify(error), data: {} })
      })
    })
  })
}

```


## zwLog.ts —— 浙里办埋点封装方法

### 注意事项

需要调整源码中浙里办上架应用的相关参数配置,以及当前用户是否登录的判断。

### 使用方法

在vue文件中引入以下代码

``` ts
import useBuryingPoint from '@/utils/zwLog'
const { sendPageView } = useBuryingPoint()
sendPageView()
```

### 源码
``` ts
import { computed, ComputedRef, ref, Ref, nextTick, watchEffect, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import store from '@/store'

interface ZwlogReceiveObj {
  _user_id?: string
  _user_nick?: string
}

enum LogStatus {
  Unlogged = '01',
  Logged = '02'
}

interface PvReceiveObj {
  /** IRS 服务侧应用 appid */
  miniAppId: string
  /** IRS 服务侧应用 appName */
  miniAppName: string
  /** 页面启动到加载完成的时间 */
  t2: string | number
  /** 页面启动到页面响应完成的时间 */
  t0: string | number
  /** 各页面唯一标识 */
  pageId: string
  /** 用户登录状态（01:未登录/ 02:单点登录） */
  log_status: LogStatus
  /** 默认取页面 title，服务提供方自己定义，与服务埋点方案内名称一致即可 */
  pageName?: string
  /** 用户从进入到离开当前页面的时长 */
  Page_duration?: string
}

interface IZwlog {
  onReady: any
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  sendPV: (PvReceiveObj) => never
}

const zwlog: Ref<null | IZwlog> = ref(null)
const currentRoutePath: Ref<null | string> = ref(null)
const isFirstComing = ref(true)

function useBuryingPoint () {
  /**
   * 初始化 zwlog 方法
   * @param ZwlogReceiveObj - 接受用户唯一标识与用户昵称
   */
  function init (ZwlogReceiveObj: ZwlogReceiveObj = {}) {
    try {
      // 在 d.ts 中声明ZwLog属于window，否则ts报错
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      zwlog.value = new window.ZwLog(ZwlogReceiveObj)
      console.log('zwlog 初始化成功')
    } catch {
      throw new Error('zwlog 初始化失败')
    }
  }

  /**
   * 发送 PV 日志
   * @param miniAppId - IRS 服务侧应用 appid
   * @param t2 - 页面启动到加载完成的时间
   * @param t0 - 页面启动到页面响应完成的时间
   * @param pageId - 各页面唯一标识
   * @param pageName - 默认取页面 title，服务提供方自己定义，与服务埋点方案内名称一致即可
   * @param log_status - 用户登录状态（01:未登录/ 02:单点登录）
   */
  function useSendPV (data: PvReceiveObj) {
    try {
      if (zwlog.value === null) throw new Error('zwlog 未初始化')
      zwlog.value.onReady(function () {
        zwlog.value?.sendPV(data)
      })
    } catch (e: any) {
      throw new Error(`useSendPV 方法错误:${e?.message || e}`)
    }
  }

  /**
   * 获取页面加载时间
   */
  function sendPageView () {
    const login = new Date().getTime() //进入时间
    const upTime: any = ref(0) //更新时间
    const beforeTime = ref(0) //beforeUpdate
    //获取router-->meta中设置的页面Id、Name
    const route = useRoute()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const pageId = computed(() => route?.meta?.data?.id ?? '未定义的pageId') as ComputedRef<string>
    const pageName = computed(() => route?.meta?.title ?? process.env.VUE_APP_ZLB_TITLE) as ComputedRef<string>
    const isAbleToSend = computed(() => currentRoutePath.value !== route?.fullPath)

    nextTick(() => {
      upTime.value = new Date().getTime()
    })
    onMounted(() => {
      beforeTime.value = new Date().getTime()
      currentRoutePath.value = route.fullPath
    })
    //监听时间，时间拿到之后调用pv发送日志
    watchEffect(() => {
      if (zwlog.value && (isAbleToSend.value || isFirstComing.value) && (beforeTime.value - login) > 0 && (upTime.value - login) > 0) {
        try {
          currentRoutePath.value = route.fullPath
          isFirstComing.value = false
          const t0 = (beforeTime.value - login) / 1000
          const t2 = (upTime.value - login) / 1000
          const log_status: any = sessionStorage.getItem('JSESSIONID_LA_PLATFORM_COMPANY_API') ? '02' : '01'

          useSendPV({
            t2,
            t0,
            miniAppId: '2002348417',
            miniAppName: '临企通',
            pageId: pageId.value,
            pageName: pageName.value,
            log_status,
          })
          console.log(`发送PV,t2:${t2},t0:${t0},pageId:${pageId.value},pageName:${pageName.value},log_status:${log_status}`)
        } catch (e: any) {
          console.error(`发送PV失败：${e.message}`)
        }
      }
    })
  }


  onMounted(() => {
    if (!zwlog.value && store.getters.isLogin && store.getters.loginInfo.token) {
      useBuryingPoint().init({
        _user_id: store.getters.user.id || '',
        _user_nick: store.getters.user.userName || ''
      })
    }
  })

  return {
    zwlog,
    init,
    useSendPV,
    sendPageView
  }
}
export default useBuryingPoint
```
<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>