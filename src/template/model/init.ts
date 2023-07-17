import { createFile, getSourcePath, mkdir, getFoldersInDirectory } from "@/utils"
import { Ast } from "@/utils/ast"
import prompts from 'prompts'



const COMPONENT_PATH_MAP = {
  default: ''
}
export async function useGeneratorModel () {
  // console.log(getFoldersInDirectory('./'))
  console.log(222222222)
  return
  let { type } = await prompts(promptsOptions)

  // 创建该目录下所需要的模板文件
  let modelPath = `${process.cwd()}/${path}`
  let hasDir = await mkdir(modelPath)
  let file = `/${type}.vue`
  createFile({ filePath: `${modelPath}${file}` })
  const rootDir = await getSourcePath()
  if (type === 'json') {

  } else {

  }
  let sourcePath = ''
  let templateResult: any = ''
  let componentsAst: any

  switch (type) {
    case 'json':
      sourcePath = `${rootDir}/src/template/default/template/${type}.ts`
      componentsAst = new Ast(sourcePath, {})
      componentsAst.writeFile(`${modelPath}/json.ts`)
      break;
    default:
      sourcePath = `${rootDir}/src/template/default/template/${type}.vue`
      componentsAst = new Ast(sourcePath, { parseOptions: { language: 'vue' } })
      componentsAst.writeFile(`${modelPath}${file}`)
      break
  }

}


const promptsOptions: any = [
  {
    type: 'select',//单选
    name: 'type',
    message: '选择生成模板',
    choices: [
      { title: 'setup+ts的单组件文件', value: 'vue' },
      { title: '大屏Vue单组件文件', value: 'vue.screen' },
      { title: 'list-view', value: 'list-view' },
      { title: '表格', value: 'table' },
      { title: '弹窗', value: 'dialog' },
      { title: '弹窗-表格', value: 'dialog.table' },
      { title: '弹窗-表单', value: 'dialog.form' },
      { title: 'json', value: 'json' },
    ]
  },
]
