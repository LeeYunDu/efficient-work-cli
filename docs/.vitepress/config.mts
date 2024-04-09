import { defineConfig } from 'vitepress'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Web Library",
  description: "favorites",
  base: '/efwork/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],
    sidebar: [
      {
        text: 'Home',
        items: [
          { text: '工具网站集合', link: '/src/components/website/readme' },
          { text: 'Szzt CLI', link: '/src/components/SzztCLI/readme' },

        ]
      },
      {
        text: 'UI Table',
        items: [
          { text: '多级表头', link: '/src/components/UITable/levelHeader/readme' },
          { text: '对比表格', link: '/src/components/UITable/comparisonTable/readme' },
          // { text: '填报型表格', link: '/src/components/UITable/fillDataTable/readme' },
          { text: '表格字段JSON', link: '/src/components/UITable/tableJSON/readme' },
        ]
      },
      // {
      //   text: '弹窗',
      //   items: [
      //     { text: 'SimpleDialog', link: '/src/components/dialog/simpleDialog/readme' },
      //   ]
      // },
      {
        text: 'Form',
        items: [
          { text: 'PC端 UI Form', link: '/src/components/form/UiForm/readme' },
        ]
      },
      {
        text: '选择器',
        items: [
          { text: 'RadioSelect', link: '/src/components/select/radioSelect/readme' },
          { text: 'TabSelect', link: '/src/components/select/tabSelect/readme' },
          { text: 'sort', link: '/src/components/select/sort/readme' },
          { text: '移动端 selectPanel', link: '/src/components/select/selectPanel/readme' },
          { text: '移动端 picker', link: '/src/components/select/simpleSelect/readme' },
        ]
      },
      {
        text: 'Block',
        items: [
          { text: 'Block-1  ', link: '/src/components/block/block-1/readme' },
          { text: 'Block-2  ', link: '/src/components/block/block-2/readme' },
          { text: 'Block-3  ', link: '/src/components/block/block-3/readme' },
          { text: 'Block-4  ', link: '/src/components/block/block-4/readme' },
        ]
      },
      {
        text: 'Progress',
        items: [
          { text: 'Progress-1', link: '/src/components/Progress/Progress-1/readme' },
          { text: 'Progress-2', link: '/src/components/Progress/Progress-2/readme' },
        ]
      },
      {
        text: 'Tag',
        items: [
          { text: 'Tag-1', link: '/src/components/Tag/Tag-1/readme' },
        ]
      },
      {
        text: 'Drawer',
        items: []
      },
      {
        text: '无知如何分类的组件',
        items: [
          { text: '无限滚动列表 RollList', link: '/src/components/other/rollList/readme' },
          { text: '富文本编辑器 ', link: '/src/components/other/richTextEditor/readme' },
          { text: '封面 Cover', link: '/src/components/other/cover/readme' },
        ]
      },
      {
        text: 'utils',
        items: [
          { text: '导出', link: '/src/components/utils/export/readme' },
        ]
      },
      {
        text: '正则表达式',
        items: [
          { text: 'el-form 表单校验集合', link: '/src/components/regular/group/readme' },
          { text: 'van-form 表单校验集合', link: '/src/components/regular/group/readmeH5' },
          { text: '数据脱敏', link: '/src/components/regular/group/readmeDesensitization' },
        ]
      },
      {
        text: '高德地图',
        items: [
          { text: 'use-amap Hook', link: '/src/components/amap/hook/readme' },
          { text: '周边配套信息查询', link: '/src/components/amap/service/readme' },
        ]
      },
      {
        text: '应用上架指南',
        items: [
          { text: '浙里办', link: '/src/components/appGuide/zlb/readme' },
          { text: '浙政钉', link: '/src/components/appGuide/zzd/readme' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
