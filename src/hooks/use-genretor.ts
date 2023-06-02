import { generatorTypes } from "../template/generator.types";
import { useInitListModel } from "../template/listModel/init";
import { useInitUtil } from "../template/util/init";
import { genratorMode } from "../typings/genrator";
import { useDefaultFile } from '../template/default/init'
import * as logger from '../utils/logger'
import { useGenretorItems } from "../template/items/init";

/**
 * 
 * @param option 
 */
export function useGenretor (option: genratorMode) {

  let { type, path, force } = option
  const ENUM = ['listModel', 'util', 'types', 'default']
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
    case 'items':
      useGenretorItems()
      break
    case 'default':
      useDefaultFile(path)
      break
    default:
      logger.error(`未找到模块,枚举：${ENUM.join('、')}`)
      break
  }

}