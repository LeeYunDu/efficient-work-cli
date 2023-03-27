import { createFile, getSourcePath, mkdir } from "../../utils"
import { Ast } from "../../utils/ast"
import prompts from 'prompts'



const COMPONENT_PATH_MAP = {
  default: ''
}
export async function useDefaultFile (path: string) {
  let { type } = await prompts(promptsOptions)

  // 创建该目录下所需要的模板文件
  let modelPath = `${process.cwd()}/${path}`
  let hasDir = await mkdir(modelPath)
  let file = `/${type}.vue`
  createFile({ filePath: `${modelPath}${file}` })
  const rootDir = await getSourcePath()
  const sourcePath = `${rootDir}/src/template/default/template/${type}.vue`
  let templateResult: any
  let componentsAst = new Ast(sourcePath, { parseOptions: { language: 'vue' } })
  componentsAst.writeFile(`${modelPath}${file}`)
}


const promptsOptions: any = [
  {
    type: 'select',//单选
    name: 'type',
    message: '选择生成模板',
    choices: [
      { title: 'setup+ts的单组件文件', value: 'vue' },
      { title: '表格', value: 'table' }
    ]
  },
]