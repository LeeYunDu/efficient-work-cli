import { generatorTypes } from "../template/generatorTypes/index";
import { useInitUtil } from "../template/util/init";
import { genratorMode } from "../typings/genrator";
import * as logger from '../utils/logger'
import { useInitListPage } from "../template/listPage/init";
import { useGeneratorModel } from "../template/model/init";

/**
 * 
 * ..param option 
 */
export function useGenretor (option: genratorMode) {
  let { type, path, force } = option
  const ENUM = ['listPage', 'types', 'model']
  switch (type) {
    case 'listPage':
      useInitListPage(path)
      break
    case 'types':
      generatorTypes()
      break;
    case 'model':
      useGeneratorModel()
      break
    default:
      logger.error(`未找到模块,枚举：${ENUM.join('、')}`)
      break
  }

}