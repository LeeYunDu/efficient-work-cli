import prompts from "prompts"

export async function useGenretorItems () {
  let { items } = await prompts(promptsOptions)
  console.log(2);


}

const promptsOptions: any = [
  {
    type: 'multiselect',
    name: 'items',
    message: '选择生成的组件',
    choices: [
      { title: 'model标题', value: 'title' },
      { title: '渐变文字', value: 'font' },
      { title: 'item.block', value: 'item.block' },
      { title: 'item.block.topicon', value: 'item.block.topicon' },
      { title: 'item.block.bg', value: 'item.block.bg' },
      { title: 'item.progress', value: 'item.progress' },
      { title: 'banner', value: 'banner' },
      { title: '移动端-select-box', value: 'select.box' },
    ]
  },
]