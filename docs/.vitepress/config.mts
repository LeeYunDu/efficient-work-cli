import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Web Library",
  description: "favorites",
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
        text: 'Form',
        items: [
          { text: 'Table Form', link: '/src/components/dialog/simpleDialog/readme' },
          { text: 'UI Form', link: '/src/components/dialog/simpleDialog/readme' },
        ]
      },
      {
        text: '选择器',
        items: [
          { text: 'RadioSelect', link: '/src/components/select/radioSelect/readme' },
          { text: 'TabSelect', link: '/src/components/select/tabSelect/readme' },
        ]
      },
      {
        text: 'Block',
        items: [
          { text: 'Block-1  ', link: '/src/components/block/block-1/readme' },
          { text: 'Block-2  ', link: '/src/components/block/block-2/readme' },
          { text: 'Block-3  ', link: '/src/components/block/block-3/readme' },
        ]
      },
      {
        text: 'Progress',
        items: [
          { text: 'Progress-1  ', link: '/src/components/Progress/Progress-1/readme' },
          { text: 'Progress-2  ', link: '/src/components/Progress/Progress-2/readme' },
        ]
      },
      {
        text: 'Tag',
        items: [
          { text: 'Tag-1  ', link: '/src/components/Tag/Tag-1/readme' },
        ]
      },
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
