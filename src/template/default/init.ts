import { createFile, getSourcePath, mkdir } from "../../utils"
import { Ast } from "../../utils/ast"


export async function useDefaultFile (path: string) {
  // 创建该目录下所需要的模板文件
  let modelPath = `${process.cwd()}/${path}`
  let hasDir = await mkdir(modelPath)
  let file = '/default.vue'
  createFile({ filePath: `${modelPath}${file}` })
  const rootDir = await getSourcePath()
  const sourcePath = `${rootDir}/src/template/default/template/vue.vue`
  let templateResult: any
  let componentsAst = new Ast(sourcePath, { parseOptions: { language: 'vue' } })
  componentsAst.writeFile(`${modelPath}${file}`)

}