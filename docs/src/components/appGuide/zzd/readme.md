# 浙政钉上架

[专有钉钉——开发平台](https://openplatform-portal.dg-work.cn/portal/#/helpdoc?apiType=jsapi&docKey=2765503)

## 浙政钉PC端扫码登录

### 浙政钉参数配置
``` ts
// 浙政钉扫码
VITE_ZZD_LOGIN_URL = 'https://login-pro.ding.zj.gov.cn/oauth2/auth.htm?response_type=code&scope=get_user_info&authType=QRCODE&embedMode=true'
VITE_SOURCE_PROXY = 'https://lqt.linan.gov.cn:18570/gov-pc/'
VITE_ZZD_CLIENT_ID = 'LQT-QYFW_dingoa'
```

### 浙政钉登录组件
临企通项目示例
``` vue
<template>
  <section v-loading="loading" class="form-zzd">
    <iframe :src="zzdLink"></iframe>
    <!-- <img :src="$loadImg('home/login-code.png')" alt=""> -->
  </section>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import _ from 'lodash-es'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const { VITE_ZZD_LOGIN_URL, VITE_SOURCE_PROXY, VITE_ZZD_CLIENT_ID } = import.meta.env


const router = useRouter()

const store = useStore()
// -------- inject --------
// -------- ref --------

// -------- computed --------
const zzdLink = computed(() => `${VITE_ZZD_LOGIN_URL}&redirect_uri=${VITE_SOURCE_PROXY}&client_id=${VITE_ZZD_CLIENT_ID}`)
// -------- fn --------
const isScan = ref(false)

const loading = ref(false)
function monitorMessage () {
  async function handle (event) {
    const { data } = event || {}
    if (data?.code && !isScan.value) {
      isScan.value = true
      loading.value = true
      const res = await store.dispatch('scanCodeLogin', { code: data.code })
      if(res?.status !== 200) {
        loading.value = false
        return
      }
      ElMessage.success('登录成功!')
      await router.push({ path: '/home' })
    }
  }

  const debounceHandle = _.debounce(handle, 300)

  window.addEventListener('message', debounceHandle)
}

onMounted(() => monitorMessage())
// -------- watch --------

// -------- provide --------

// -------- expose --------
</script>

<style lang="scss" scoped>
.form-zzd {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  iframe {
    //width: 458PX;
    //height: 426PX;
    width: 100%;
    height: 100%;
  }
  > img {
    position: absolute;
    width: 199PX;
    height: 50PX;
    bottom: 20PX;
  }

}
</style>


```

## 上架前代码审查

1. 打包环境判断，检查接口访问地址是否为绝对路径,相对定位的话在浙政钉环境会出现接口请求失败的问题。

``` ts

export const ApiProxy = {
  java: {
    // 主应用
    main: (VITE_ENV == 'irs' ? 'https://lqt.linan.gov.cn:18570' : '') + '/la_platform_gov_api',
    build: (VITE_ENV == 'irs' ? 'https://lqt.linan.gov.cn:18570' : '') + '/building_gov_api',
    project: (VITE_ENV == 'irs' ? 'https://lqt.linan.gov.cn:18570' : '') + '/la_project_gov_api',
  },

  node: {
    main: '/node-szzt'
  }
}

```
