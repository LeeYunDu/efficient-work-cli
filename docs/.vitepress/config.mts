import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "efwork library",
  description: "efwork-CLI  instructions",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],
    sidebar: [
      {
        text: '弹窗',
        items: [
          { text: 'SimpleDialog', link: '/src/components/dialog/simpleDialog/readme' },
        ]
      },
      {
        text: '选择器',
        items: [
          { text: 'RadioSelect', link: '/src/components/select/radioSelect/readme' },
          { text: 'TabSelect', link: '/src/components/select/tabSelect/readme' },
        ]
      },
      // {
      //   text: 'Block',
      //   items: [
      //     { text: 'Block-1  ', link: '/Block/Block-1' },
      //     { text: 'Block-2  ', link: '/Block/Block-1' },
      //     { text: 'Block-3  ', link: '/Block/Block-1' },
      //     { text: 'Block-4  ', link: '/Block/Block-1' },
      //   ]
      // },
      // {
      //   text: 'Group',
      //   items: [
      //     { text: 'RadioGroup', link: '/Select/RadioGroup' },
      //     { text: 'TabGroup', link: '/Select/TabGroup' },
      //   ]
      // },
      {
        text: 'Drawer',
        items: []
      },
      {
        text: '无知如何分类的组件',
        items: [
          { text: '无限滚动列表 RollList', link: '/src/components/other/rollList/readme' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
