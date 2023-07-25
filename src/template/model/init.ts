import { createFile, getSourcePath, mkdir, getFoldersInDirectory, getAllFilesInDirectory, getAllFilesInFolder } from "../..//utils"
import { Ast } from "../../utils/ast"
import prompts from 'prompts'

export async function useGeneratorModel (path = 'cli') {
  const rootDir = await getSourcePath()
  // 根据路径扫描出该路径下有什么文件夹
  let models: string[] = getFoldersInDirectory(`${rootDir}/src/template/model`)
  let { modelType } = await prompts(getOptions('modelType', '请选择模块', models.map(item => {
    return {
      title: item,
      value: item
    }
  })))
  if (!modelType) return
  let fields = getAllFilesInDirectory(`${rootDir}/src/template/model/${modelType}`)
  let { activeIndex } = await prompts(getOptions('activeIndex', '请选择生成的文件', fields.map(item => {
    item.title = item.file
    return item
  })))
  let model = fields[activeIndex]
  if (!model) return
  let modelFiles = []
  let modelPath = `${process.cwd()}/${path}`
  let hasDir = await mkdir(modelPath)

  // 文件夹的话需要遍历文件夹生成所有文件地址
  if (model.type === 'folder') {
    modelFiles = getAllFilesInFolder(model.filePath)
    let createFilePromise: Promise<any>[] = []
    modelFiles.map((modelFile) => {
      generatorFile(modelFile, { modelPath, rootDir, modelType })
    })
  } else {
    generatorFile(model, { modelPath, rootDir, modelType })
  }
}
function getOptions (key: string, message = '', options: { title: string, value: any, [x: string]: any }[] = []): any {
  return {
    type: 'select',//单选
    name: key,
    message,
    choices: options,
  }
}
async function generatorFile (modelFile, options) {
  let createFilePromise: Promise<any>[] = []
  let { modelPath, rootDir, modelType } = options
  // 处理文件路径字符串，拼接文件地址，生成文件
  let filePath = `\\${modelFile.filePath.slice(modelFile.filePath.indexOf(modelType) + modelType.length)}`
  const regex = /\\/g;
  let replaceFile = filePath.replace(regex, '/');
  let createFilePath = `${modelPath}${replaceFile}`
  // 创建该目录下所需要的模板文件
  createFilePromise.push(createFile({ filePath: createFilePath }))
  await Promise.all(createFilePromise)
  // 拼接源文件地址,即本地全局 node_modules包的位置 + 需要被生成的文件的地址
  let sourcePath = `${modelFile.filePath.replace(regex, '/')}`
  // 根据文件类型定义AST解析文件的方式
  let fileType = filePath.split('.').pop();
  let componentsAst: any = null
  switch (fileType) {
    case 'ts':
    case 'javascript':
      componentsAst = new Ast(sourcePath, {})
      break
    case 'vue':
      componentsAst = new Ast(sourcePath, { parseOptions: { language: 'vue' } })
      break
  }
  setTimeout(() => {
    componentsAst && componentsAst.writeFile(createFilePath)
  }, 0)
}
