import 'element-plus/theme-chalk/index.css'
import DefaultTheme from 'vitepress/theme'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import {
  ElCol,
  ElRow,
  ElButton,
  ElInput,
  ElInputNumber,
  ElSelect,
  ElOption,
  ElCascader,
  ElForm,
  ElFormItem,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElProgress,
  ElTabs,
  ElTabPane,
  ElTable,
  ElTableColumn,
  ElIcon,
  ElImage,
  ElPopover,
  ElPagination,
  ElRate,
  ElTag,
  ElCheckTag,
  ElDescriptions,
  ElDescriptionsItem,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElRadio,
  ElRadioGroup,
  ElRadioButton,
  ElEmpty,
  ElSteps,
  ElStep,
  ElDialog,
  ElUpload,
  ElSwitch,
  ElDatePicker,
  ElConfigProvider,
  ElCarousel,
  ElCarouselItem,
  ElDivider,
  ElTimeline,
  ElTimelineItem,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElCheckbox,
  ElCheckboxGroup,
} from 'element-plus'



export default {
  ...DefaultTheme,
  enhanceApp ({ app }) {
    app.component(ElConfigProvider.name, ElConfigProvider)
    app.component(ElButton.name, ElButton)
    app.component(ElInput.name, ElInput)
    app.component(ElInputNumber.name, ElInputNumber)
    app.component(ElSelect.name, ElSelect)
    app.component(ElOption.name, ElOption)
    app.component(ElCascader.name, ElCascader)
    app.component(ElForm.name, ElForm)
    app.component(ElFormItem.name, ElFormItem)
    app.component(ElMenu.name, ElMenu)
    app.component(ElSubMenu.name, ElSubMenu)
    app.component(ElMenuItem.name, ElMenuItem)
    app.component(ElProgress.name, ElProgress)
    app.component(ElTabs.name, ElTabs)
    app.component(ElTabPane.name, ElTabPane)
    app.component(ElTable.name, ElTable)
    app.component(ElTableColumn.name, ElTableColumn)
    app.component(ElIcon.name, ElIcon)
    app.component(ElImage.name, ElImage)
    app.component(ElPopover.name, ElPopover)
    app.component(ElCol.name, ElCol)
    app.component(ElRow.name, ElRow)
    app.component(ElPagination.name, ElPagination)
    app.component(ElRate.name, ElRate)
    app.component(ElTag.name, ElTag)
    app.component(ElCheckTag.name, ElCheckTag)
    app.component(ElDescriptions.name, ElDescriptions)
    app.component(ElDescriptionsItem.name, ElDescriptionsItem)
    app.component(ElBreadcrumb.name, ElBreadcrumb)
    app.component(ElBreadcrumbItem.name, ElBreadcrumbItem)
    app.component(ElRadio.name, ElRadio)
    app.component(ElRadioGroup.name, ElRadioGroup)
    app.component(ElRadioButton.name, ElRadioButton)
    app.component(ElEmpty.name, ElEmpty)
    app.component(ElSteps.name, ElSteps)
    app.component(ElStep.name, ElStep)
    app.component(ElDialog.name, ElDialog)
    app.component(ElUpload.name, ElUpload)
    app.component(ElSwitch.name, ElSwitch)
    app.component(ElDatePicker.name, ElDatePicker)
    app.component(ElCarousel.name, ElCarousel)
    app.component(ElCarouselItem.name, ElCarouselItem)
    app.component(ElDivider.name, ElDivider)
    app.component(ElTimeline.name, ElTimeline)
    app.component(ElTimelineItem.name, ElTimelineItem)
    app.component(ElDropdown.name, ElDropdown)
    app.component(ElDropdownMenu.name, ElDropdownMenu)
    app.component(ElDropdownItem.name, ElDropdownItem)
    app.component(ElCheckbox.name, ElCheckbox)
    app.component(ElCheckboxGroup.name, ElCheckboxGroup)
    // 注册ElementPlus
    app.use(VueViewer)
  }
}
