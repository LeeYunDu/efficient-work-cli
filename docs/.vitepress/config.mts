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
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: '弹窗',
        items: [
          { text: 'Dialog', link: '/Dialog/SimpleModal' },
        ]
      },
      {
        text: 'Group',
        items: [
          { text: 'RadioGroup', link: '/Select/RadioGroup' },
          { text: 'TabGroup', link: '/Select/TabGroup' },


        ]
      },
      {
        text: 'Drawer',
        items: [

        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
