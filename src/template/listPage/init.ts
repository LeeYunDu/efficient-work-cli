
import { createFile, getSourcePath, mkdir, writeFile } from '../../utils/index'
import { Ast } from '../../utils/ast'
import prompts from 'prompts'
import * as logger from '../../utils/logger'
import { ASTNode, HTMLNode } from '../../typings/ast.types'

// import child_process from 'child_process'
// let gitPath = 'git clone git@codeup.aliyun.com:60810cde35f5934d3af8e181/szzt/Gov-Group/Industrial-Brain-Group/KunMing-GongXin-Group/Frontend-Group/Portal-PC.git'
// child_process.exec(gitPath, { encoding: 'utf-8' }, (stdout, error) => {
//   console.log(stdout);
// })

/**
 * 
 * @param path 
 * @description 根据输入的文件路径先依次创建文件,再往文件里写代码 
 * @param force
 */
export async function useInitListPage (path: string) {
  // let rootDir1 = await getSourcePath()

  // const sourcePath = `${rootDir1}/src/template/listModel/template//json.ts`
  // let componentsAst1 = new Ast(sourcePath, {})
  // console.log(componentsAst1.getExportNode('tableColumns').remove());

  let { checkedModels, force } = await prompts(promptsOptions)
  if (!checkedModels || checkedModels.length === 0) {
    logger.info(`${checkedModels && checkedModels.length === 0 ? '因为未选择模块,' : ''}已取消操作`)
    return
  }
  // 创建该目录下所需要的模板文件
  let modelPath = `${process.cwd()}/${path}`
  let hasDir = await mkdir(modelPath)


  // 是否覆盖文件判断

  // if (hasDir) {
  //   let { force } = await prompts({
  //     type: 'select',//单选
  //     name: 'force',
  //     message: '输入的文件路径已存在,是否覆盖原有的文件',
  //     choices: [
  //       { title: '否', value: false },
  //       { title: '是', value: true }
  //     ]
  //   })
  //   if (!force) {
  //     logger.success('已取消操作')
  //     return
  //   }
  // }


  const defailtFiles = [
    '/业务模块中文名称',
    '/json.ts',
  ]
  const modelFilePathMap: any = {
    list: '/view.vue',
    detail: '/components/detail.model.vue',
    add: '/components/add.model.vue',
    mock: '/json.ts',
  }
  let renderModel = new Array(0).concat(checkedModels.map((model: string) => modelFilePathMap[model])).concat(defailtFiles)
  renderModel.forEach(file => {
    createFile({ filePath: `${modelPath}${file}` })
  })
  // 文件写入
  const rootDir = await getSourcePath()
  let componentsAst: any

  [...checkedModels, 'mock'].forEach((model: string, index: number) => {
    const sourcePath = `${rootDir}/src/template/listPage/template/${modelFilePathMap[model]}`
    let templateResult: any
    switch (model) {
      case 'list':
        componentsAst = new Ast(sourcePath, { parseOptions: { language: 'vue' } })
        // 列表模块需要根据选中的模块来引入组件
        const importMap: any = {
          add: `import addDialog from './components/add.model.vue';`,
          detail: `import detailDialog from './components/detail.model.vue';`,
        }
        const importComponentTag: any = {
          add: 'addModel',
          detail: 'detailModel'
        }
        Object.keys(importMap).forEach((key: any) => {
          if (checkedModels.includes(key)) {
            componentsAst.insertImport(importMap[key], componentsAst.jsAst)
          } else {

            // // 不引入则删除 <template> 下的组件标签，这次选择删除节点，是因为删除比插入简单
            // let tagName = importComponentTag[key]
            // let tagNodes = componentsAst.getElementByTagName(tagName);
            // tagNodes.forEach((node: any) => {
            //   node.remove()
            // })

          }
        })

        let nodes = componentsAst.getElementByTagName('ui-table');
        nodes.forEach((node: ASTNode) => {
          // console.log(componentsAst.editAttributes(node, 'ref', 'tt'))
          // console.log(componentsAst.removeAttributes(node, 'ref'))
          console.log(componentsAst.addAttributes(node, 'ref2', 'tet'))
          console.log(componentsAst.getSingleAttribute(node, 'ref',))

        })

        componentsAst.writeFile(`${modelPath}${modelFilePathMap[model]}`)

        // writeFile({ filePath: `${modelPath}${renderModel[index]}`, data: templateResult })
        break;
      case 'detail':
      case 'add':
        componentsAst = new Ast(sourcePath, { parseOptions: { language: 'vue' } })
        componentsAst.writeFile(`${modelPath}${modelFilePathMap[model]}`)
        break
      case 'mock':
        /**
         * 根据选择的模块,生成对应的mock字段数据
         */
        componentsAst = new Ast(sourcePath, {})

        let mockFieldMap: any = {
          list: 'tableColumn',
          add: 'formFields',
          detail: 'detailFields',
        }

        Object.keys(mockFieldMap).forEach((key: any) => {
          if (!checkedModels.includes(key)) {
            componentsAst.removeNode(componentsAst.getExportNode(mockFieldMap[key]))
          }
        })

        componentsAst.writeFile(`${modelPath}${modelFilePathMap[model]}`)
        break
      default:

        break;
    }
  })
}

const promptsOptions: any = [
  {
    type: 'multiselect', //多选
    name: 'checkedModels',
    message: '请选择需要下载的模块',
    choices: [
      { title: '列表', value: 'list' },
      { title: '详情弹窗', value: 'detail' },
      { title: '新增/修改表单弹窗', value: 'add' }
    ]
  },
  // {
  //   type: 'select',//单选
  //   name: 'hasMock',
  //   message: '是否生成模拟数据/字段',
  //   choices: [
  //     { title: '是', value: true },
  //     { title: '否', value: false }
  //   ]
  // },
]