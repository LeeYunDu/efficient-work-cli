import { App } from 'vue'

import '../../styles/index.scss'

// 大屏组件
import Header1 from './header-1/index.vue'
import Header2 from './header-2/index.vue'
import Header3 from './header-3/index.vue'
import Header4 from './header-4/index.vue'
import Header5 from './header-5/index.vue'
import Header6 from './header-6/index.vue'
import Header7 from './header-7/index.vue'
import Header8 from './header-8/index.vue'
import Header9 from './header-9/index.vue'
import Header10 from './header-10/index.vue'
import Header11 from './header-11/index.vue'
import Header12 from './header-12/index.vue'
import Header13 from './header-13/index.vue'
import Header14 from './header-14/index.vue'
import Header15 from './header-15/index.vue'
import Header16 from './header-16/index.vue'



const install = (app: App) => {
  app.component('Header1', Header1)
  app.component('Header2', Header2)
  app.component('Header3', Header3)
  app.component('Header4', Header4)
  app.component('Header5', Header5)
  app.component('Header6', Header6)
  app.component('Header7', Header7)
  app.component('Header8', Header8)
  app.component('Header9', Header9)
  app.component('Header10', Header10)
  app.component('Header11', Header11)
  app.component('Header12', Header12)
  app.component('Header13', Header13)
  app.component('Header14', Header14)
  app.component('Header15', Header15)
  app.component('Header16', Header16)
}

export {
  Header1,
  Header2,
  Header3,
  Header4,
  Header5,
  Header6,
  Header7,
  Header8,
  Header9,
  Header10,
  Header11,
  Header12,
  Header13,
  Header14,
  Header15,
  Header16
}

export default {
  install
}
