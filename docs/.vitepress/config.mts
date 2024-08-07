import { defineConfig } from 'vitepress'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'

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
        text: 'CSS',
        items: [
          { text: 'CSS', link: '/src/components/CSS/readme' },
          { text: 'CSS - 标题', link: '/src/components/CSS/title-readme' },
        ]
      },
      {
        text: 'Block',
        items: [
          { text: 'Block-1  ', link: '/src/components/block/block-1/readme' },
          { text: 'Block-2  ', link: '/src/components/block/block-2/readme' },
          { text: 'Block-3  ', link: '/src/components/block/block-3/readme' },
          { text: 'Block-4  ', link: '/src/components/block/block-4/readme' },
          { text: 'Block-5  ', link: '/src/components/block/block-5/readme' },
          { text: 'Block-6  ', link: '/src/components/block/block-6/readme' },
        ]
      },
      {
        text: 'Form',
        items: [
          { text: 'PC端 UI Form', link: '/src/components/form/UiForm/readme' },
        ]
      },
      {
        text: 'UI Table',
        items: [
          { text: '多级表头', link: '/src/components/UITable/levelHeader/readme' },
          { text: '对比表格', link: '/src/components/UITable/comparisonTable/readme' },
          // { text: '填报型表格', link: '/src/components/UITable/fillDataTable/readme' },
          { text: '表格字段JSON', link: '/src/components/UITable/tableJSON/readme' },
          { text: '简单的表格', link: '/src/components/UITable/SimpleTable/readme' },
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
        text: 'Progress',
        items: [
          { text: 'Progress-1', link: '/src/components/progress/progress-1/readme' },
          { text: 'Progress-2', link: '/src/components/progress/progress-2/readme' },
          { text: 'Progress-3', link: '/src/components/progress/progress-3/readme' },
        ]
      },
      {
        text: 'Szzt 在线工具',
        items: [
          { text: 'menu表字段转JSON', link: '/src/components/SzztUtils/menu/readme' },
        ]
      },
      {
        text: 'Szzt CLI',
        items: [
          { text: 'init', link: '/src/components/SzztCLI/init/readme' },
          { text: 'upload', link: '/src/components/SzztCLI/upload/readme' },
          { text: 'g', link: '/src/components/SzztCLI/g/readme' },
        ]
      },
      {
        text: '列表',
        items: [
          { text: '无限滚动列表 RollList', link: '/src/components/list/rollList/readme' },
          { text: '虚拟列表 VirtualList', link: '/src/components/list/virtualList/readme' },
          // { text: '虚拟列表-瀑布流 VirtualWaterFallList', link: '/src/components/list/virtualWaterFallList/readme' },
        ]
      },
      // {
      //   text: '弹窗',
      //   items: [
      //     { text: 'SimpleDialog', link: '/src/components/dialog/simpleDialog/readme' },
      //   ]
      // },

      {
        text: 'Form H5',
        items: [
          { text: 'H5端 UI Form', link: '/src/components/form/UiFormH5/form/readme' },
          { text: 'Picker', link: '/src/components/form/UiFormH5/select/readme' },
        ]
      },



      {
        text: 'Tag',
        items: [
          { text: 'Tag-1', link: '/src/components/Tag/Tag-1/readme' },
        ]
      },

      {
        text: '图表',
        items: [
          { text: 'Bar', link: '/src/components/chart/bar/readme' },
          { text: 'High Chart', link: '/src/components/chart/HighChart/readme' },
        ]
      },
      {
        text: 'Drawer',
        items: []
      },
      {
        text: '无知如何分类的组件',
        items: [
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
      },

      {
        text: 'Factory',
        items: [
          { text: 'form', link: '/src/components/factory/form/readme' },
          { text: 'JSON Edit', link: '/src/components/factory/JSONEdit/readme' },
        ]
      },
      {
        text: 'Home',
        items: [
          { text: '工具网站集合', link: '/src/components/website/readme' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  markdown: {
    config (md) {
      md.use(containerPreview)
      md.use(componentPreview)
    }
  }
})
