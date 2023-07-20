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
export function getFoldersInDirectory (path) {
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