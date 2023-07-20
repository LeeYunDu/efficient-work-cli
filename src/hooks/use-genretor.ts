import { generatorTypes } from "../template/generator.types";
import { useInitUtil } from "../template/util/init";
import { genratorMode } from "../typings/genrator";
import { useDefaultFile } from '../template/default/init'
import * as logger from '../utils/logger'
import { useGenretorItems } from "../template/items/init";
import { useInitListPage } from "../template/listPage/init";
import { useGeneratorModel } from "../template/model/init";

/**
 * 
 * ..param option 
 */
export function useGenretor (option: genratorMode) {
  let { type, path, force } = option
  const ENUM = ['listPage', 'util', 'types', 'default', 'items', 'model']
  switch (type) {
    case 'listPage':
      useInitListPage(path)
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
    case 'model':
      useGeneratorModel()
      break
    default:
      logger.error(`未找到模块,枚举：${ENUM.join('、')}`)
      break
  }

}