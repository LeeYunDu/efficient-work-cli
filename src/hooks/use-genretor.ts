import { generatorTypes } from "../template/generator.types";
import { useInitListModel } from "../template/listModel/init";
import { useInitUtil } from "../template/util/init";
import { genratorMode } from "../typings/genrator";
import * as logger from '../utils/logger'

/**
 * 
 * @param option 
 */
export function useGenretor (option: genratorMode) {

  let { type, path, force } = option
  const ENUM = ['listModel', 'util']
  switch (type) {
    case 'listModel':
      useInitListModel(path)
      break
    case 'util':
      useInitUtil()
      break
    case 'types':
      generatorTypes()
      break;
    default:
      logger.error(`未找到模块,枚举：${ENUM.join('、')}`)
      break
  }

}