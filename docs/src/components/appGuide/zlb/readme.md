

<script setup>
import imagePreview from '@/global/components/imagePreview.vue'
import filePreview from '@/global/components/filePreview.vue'
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
## 《“浙里办”服务开发指引+V1.3.8》


## 浙里办服务上架审核要求20240201


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

## 上架会审核 - App只面向法人时,需要提示并且关闭该应用页面
在代码中zlbLogin接口的后续处理逻辑中添加以下代码;该方法可以在[zw.ts](#zw-ts-——-浙里办封装方法集合)中查询 
```  ts
Toast.fail({
  message: '该服务仅面向法人，请用法人账号访问',
  onClose: () => {
    // zwJS
    window.ZWJSBridge.onReady(() => {
      window.ZWJSBridge.close().then((res: any) => {
        resolve({ success: true, data: res })
      }).catch((error: any) => {
        resolve({ success: false, errMsg: JSON.stringify(error), data: {} })
      })
    })
  }
})
```

## 上架会审核 -  禁止网站页面缩放设置
HTML文件中修改 meta 标签，添加以下内容：
```  html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
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

上架会审核是否需要采用浙里办的插件方式打开外链。该方法可以在[zw.ts](#zw-ts-——-浙里办封装方法集合)中查询 
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

涉及到联系方式的信息需要支持拨打电话功能；该方法可以在[zw.ts](#zw-ts-——-浙里办封装方法集合)中查询 

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

在src/router/index.ts文件中引入以下代码

``` ts

const isAplus = import.meta.env.VITE_ENV === 'irs'

const t0 = new Date().getTime()
let t1 = new Date().getTime()
let t2 = new Date().getTime()
let zw: any = null

//埋点
async function aplusRouter () {
  try {
    const userId = store?.getters?.user.username || ''
    if (!zw) {
      zw = new ZwLog({
        _user_id: 'debug' + userId
      })
    }
    t2 = new Date().getTime()
    t1 = new Date().getTime()
    zw.onReady(function () {
      zw.sendPV({
        miniAppId: '2002348417',
        miniAppName: '临企通',
        // 页面加载时间
        t2: (t1 - t0 + Math.floor(Math.random() * 500)) / 1000,
        // 页面响应时间
        t0: (t2 - t0 + Math.floor(Math.random() * 100)) / 1000,
        log_status: userId ? '02' : '01',
        pageId: btoa(window.location.href),
        pageName: encodeURIComponent(window.location.href)
      })
    })
  } catch (e) {
    console.log(e)
  }
}

router.afterEach(async () => {
  if (isAplus) await aplusRouter()
})
```

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>