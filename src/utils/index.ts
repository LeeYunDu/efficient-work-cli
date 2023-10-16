import fs from 'fs'
import path from 'path'
import request from 'request'
import { exec } from 'child_process'

/**
 * 判断项目文件是否存在
 * @param {*} name 
 * @param {*} hasJoin 
 */
export function checkExists (name: string, hasJoin = true) {
  return fs.existsSync(hasJoin ? path.join(process.cwd(), `${name}`) : `${name}`)
}


/**
 * 获取源码位置
 */
const isWin = /^win/.test(process.platform)
export function getSourcePath (path = '') {
  if (path) {
    path = path.substring(0, 1) === '/' ? path : `/${path}`
  }

  return new Promise((rs, rj) => {
    exec('npm config get prefix', (err, data) => {
      const _data = data.replace(/\\/g, '/')
      const EF_WORK_CLI_PATH = `${_data.substring(0, _data.length - 1) + (!isWin ? '/lib' : '')}/node_modules/ef-work-cli`
      rs(`${EF_WORK_CLI_PATH}${path}`)
    })
  })
}


/**
 * 写入文件
 * @param opts 
 * @returns 
 */
export async function writeFile (opts: any) {
  if (!opts) return
  return new Promise((resolve, reject) => {
    const { filePath, data, encoding } = opts
    const encodingType = encoding || 'utf-8'
    const uPath = path.resolve(filePath)
    fs.writeFile(uPath, data, encodingType, err => {
      if (err) {
        return reject(err)
      }
      resolve(data)
    })
  })
}

/**
 * 创建文件
 * @param option 
 * @returns 
 */
export async function createFile (option: any) {
  if (!option) return
  let { filePath } = option
  return new Promise(async (resolve, reject) => {
    // 文件路径目录不存在的话则需要创建
    let lastIndex = filePath.lastIndexOf('/')
    let dirPath = filePath.slice(0, lastIndex)
    await mkdir(dirPath)
    try {
      const writeStream = fs.createWriteStream(path.resolve(filePath),)
      writeStream.end()
      resolve(true)
    } catch (error: any) {
      throw new Error(error);
    }
  })
}
/**
 * 根据路径地址返回该路径下的所有文件
 * @param dirPath 
 * @returns 
 */
export function getAllFilesInDirectory (dirPath: string): any[] {
  // 读取指定路径下的所有文件和文件夹
  const files = fs.readdirSync(dirPath);
  let fields: any[] = []
  // 遍历所有文件和文件夹
  files.forEach(file => {
    // 获取文件或文件夹的完整路径
    const filePath = path.join(dirPath, file);
    // 判断是否为文件
    fields.push({
      type: fs.statSync(filePath).isFile() ? 'file' : 'folder',
      filePath,
      file
    })
  });
  return fields
}

/**
 * 根据路径创建文件目录
 * @param dir 
 * @returns 
 */
export async function mkdir (dir: string) {
  let isExists: any = await getStat(dir)
  // 如果该路径存在且不是文件，返回 true
  if (isExists && isExists.isDirectory()) {
    return true
  } else if (isExists) {
    return false
  }
  // 如果该路径不存在
  const tempDir = path.parse(dir).dir  //拿到上级路径
  // 递归判断，如果上级路径也不存在，则继续循环执行，直到存在
  let status = await mkdir(tempDir)
  let mkdirStatus
  if (status) {
    mkdirStatus = await doMkdir(dir)
  }
  return mkdirStatus
}


/**
 * 创建文件夹
 * @param dir 
 * @returns 
 */
export function doMkdir (dir: string) {
  return new Promise((resolve, reject) => {
    // recursive属性：表示是否创建父目录，默认为false
    fs.mkdir(dir, { recursive: true }, err => {
      if (err) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

/**
 * 根据路径读取该路径下的文件夹
 * @param path 
 * @returns 
 */
export function getFoldersInDirectory (path: string) {
  try {
    const files = fs.readdirSync(path);
    const folders = files.filter(file => {
      return fs.statSync(`${path}/${file}`).isDirectory();
    });
    return folders;
  } catch (error) {
    console.error('Error reading directory:', error);
    return [];
  }
}

/**
 * 获取文件夹下的所有文件
 * @param dirPath 
 * @returns 
 */
export function getAllFilesInFolder (dirPath: string): any[] {
  // 读取指定路径下的所有文件和文件夹
  const files = fs.readdirSync(dirPath);

  let allFiles: any[] = [];

  // 遍历所有文件和文件夹
  files.forEach(file => {
    // 获取文件或文件夹的完整路径
    const filePath = path.join(dirPath, file);

    // 判断是否为文件
    if (fs.statSync(filePath).isFile()) {
      allFiles.push({
        filePath,
        file,
      });
    }
    // 如果是文件夹，则递归调用函数获取文件夹下的所有文件
    else {
      const subDirFiles = getAllFilesInFolder(filePath);
      allFiles = allFiles.concat(subDirFiles);
    }
  });

  return allFiles;
}

/**
 * 读取路径信息
 * @param path 
 * @returns 
 */
export function getStat (path: string) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        resolve(false)
      } else {
        resolve(stats)
      }
    })
  })
}

/**
 * 对象转模板
 * @param data 
 * @returns 
 */
export function convertTemplate (data: any) {
  let temp = ``
  let type = Object.prototype.toString.call(data)
  if (type === '[object Array]') {
    temp += `[${data.length > 1 ? '\n' : ''}`
    data.forEach((item: any, index: any) => {
      item = convertTemplate(item)
      temp += `${item}${data.length - index > 1 ? ',' : ''}${data.length > 1 ? '\n' : ''}`
    })
    temp += `]`
  } else if (type === '[object Object]') {
    temp += `{${'\n'}`
    Object.keys(data).forEach((key, index: any) => {
      data[key] = convertTemplate(data[key])
      temp += `${key}:${data[key]}${Object.keys(data).length - index > 1 ? ',' : ''}${'\n'}`
    })
    temp += `}`
  } else if (type === `[object Undefined]`) {
    temp += 'undefined'
  } else if (type === `[object Function]`) {
    temp += data
  } else {
    temp += JSON.stringify(data)
  }
  return temp
}


/**
 * 将网络文件下载到指定位置
 * @param url 
 * @param fileName 
 * @param dir 
 */
export function downloadFileByUrl (url: string, fileName: string, dir: string) {
  let stream = fs.createWriteStream(path.join(dir, fileName));
  request(url).pipe(stream).on("close", function (err: any) {
    console.log("文件" + fileName + "下载完毕");
  });
}


function getValue (props) {
  let uValue: any = '-'
  try {
    const { data, field } = props
    switch (true) {
      case field.format && isFunction(field.format):
        uValue = field.format(data, field)
        break
      case !!field.valueFormat:
        uValue = getDictValue(field.valueFormat, get(data, field.key, '-'))
        break
      case !!field.parseTime:
        uValue = get(data, field.key, '') ? parseTime(new Date(get(data, field.key, '')), field.parseTime) : '-'
        break
      case isArray(field.key):
        uValue = field.key.map((item: string) => get(data, item, '-')).join(field.split || ' - ')
        break
      default:
        uValue = get(data, field.key, '-') + (field.unit || '')
        break
    }
    if (field.unit) {
      // uValue = uValue + field.unit
    }
  } catch (error) {

  }
  return uValue
}


export function transformTableData (fields: FieldItem[], data: any) {
  const needTransField = fields.filter((field: FieldItem) => {
    return field
  })

  needTransField.forEach((field: FieldItem) => {
    const { transform, key, unit } = field
    let tKey = ''
    try {
      tKey = key.split('_')[0]
    } catch (error) {
      console.log(error)

    }
    // 目前就判断下是否为时间、字典
    let type = ''
    try {
      if (typeof transform === 'function') {
        type = 'function'
      }
      if (transform.indexOf('x') > -1 || (transform.indexOf('{') > -1 && transform.indexOf('}') > -1)) {
        type = 'time'
      }
      if (transform.indexOf('.') > -1) {
        type = 'dict'
      }
    } catch (error) {

    }



    data.map((e: any) => {
      switch (type) {
        case 'time':
          e[key] = parseTime(new Date(e[tKey]), transform) + (unit || '')
          break
        case 'dict':
          e[key] = getDictValue(transform, e[tKey]) + (unit || '')
          break
        case 'function':
          e[key] = transform(e[key])
        default:
          e[key] = e[key] ?? '-' + (unit || '')
          break
      }
      if (unit) {
        e[key] = e[key]
      }
      return e
    })
  })

  return data
}


// 字典值转换
export function getDictValue (target: any, value: any, valueKey?: string) {
  value = +value
  if (!value && !String(value)) return value
  return store.getters.dictDataOnly(target)?.find((dict: any) => +dict[valueKey || 'id'] === value)?.name || value
}


function scrollToElement (containerId, title) {
  const container = document.getElementById(containerId);
  const element = document.getElementById(title);

  if (container && element) {
    container.scrollTo({
      top: element.offsetTop,
      behavior: 'smooth'
    });
  } else {
    console.log('没有找到容器或匹配的元素');
  }
}