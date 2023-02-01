import { useInitListModel } from "../template/listModel/init";
import { genratorMode } from "../typings/genrator";
/**
 * 
 * @param option 
 */
export function useGenretor (option: genratorMode) {

  let { type, path, force } = option

  switch (type) {
    case 'listModel':
      useInitListModel(path, force)
      break
  }

}