
import { createFile, getSourcePath, mkdir } from '../../utils/index'
import * as Ast from '../../utils/ast'
import prompts from 'prompts'

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
export async function useInitListModel (path: string, force: boolean = false) {
  let { checkedModels, hasMock } = await prompts(promptsOptions)

  // 创建该目录下所需要的模板文件
  let modelPath = `${process.cwd()}/${path}`
  await mkdir(modelPath)

  const defailtFiles = [
    '/业务模块中文名称',
    '/json.ts',
  ]
  const modelFilePathMap: any = {
    list: '/view.vue',
    detail: '/components/detail.model.vue',
    add: '/components/add.model.vue',
  }
  let renderModel = new Array(0).concat(checkedModels.map((model: string) => modelFilePathMap[model])).concat(defailtFiles)
  renderModel.forEach(file => {
    createFile({ filePath: `${modelPath}${file}` })
  })
  // 文件写入
  const rootDir = await getSourcePath()
  checkedModels.forEach((model: string) => {
    const sourcePath = `${rootDir}/src/template/listModel/template/${modelFilePathMap[model]}`
    switch (model) {
      case 'list':
        // 列表模块需要根据选中的模块来引入组件
        if (checkedModels.indexOf('detail') > 0 && checkedModels.indexOf('add') > 0) {

        } else if (checkedModels.indexOf('add') > 0) {

        } else if (checkedModels.indexOf('detail') > 0) {

        }
        break;

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
  {
    type: 'select',//单选
    name: 'hasMock',
    message: '是否生成模拟数据/字段',
    choices: [
      { title: '是', value: true },
      { title: '否', value: false }
    ]
  },
]