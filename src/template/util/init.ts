import prompts from 'prompts'
import { checkExists, createFile, getSourcePath } from '../../utils'
import { Ast } from '../../utils/ast'
import * as logger from '../../utils/logger'



export async function useInitUtil () {
  // 文件默认位置 src/units/

  const UTIL_FILE_PATH = 'src/utils/'
  let { checkedModels } = await prompts(promptsOptions)
  const MODEL_PATH = `${process.cwd()}/${UTIL_FILE_PATH}`
  const rootDir = await getSourcePath()

  let promiseArr: any[] = []
  checkedModels.forEach(async (model: string) => {
    // 验证文件是否存在
    let state = checkExists(`${UTIL_FILE_PATH}${model}`)
    if (state) {
      logger.error(`${model}文件已存在,跳过下载`)
    } else {
      promiseArr.push(
        {
          model,
          state: createFile({
            filePath: `${MODEL_PATH}${model}`
          })
        }
      )
    }
  })
  Promise.all(promiseArr.map((file: any) => file.state)).then(result => {
    result.forEach((e, index) => {
      let { model } = promiseArr[index]
      const sourcePath = `${rootDir}/src/template/util/template/${model}`
      let componentsAst = new Ast(sourcePath, {})
      // 按理来讲，文件已经生成了啊
      setTimeout(() => {
        componentsAst.writeFile(`${MODEL_PATH}${model}`)
      }, 0);
    })

  })

}

const promptsOptions: any = [
  {
    type: 'multiselect', //多选
    name: 'checkedModels',
    message: '请选择需要下载的工具',
    choices: [
      { title: '表单字段正则验证', value: 'validator.ts' },
    ]
  }
]