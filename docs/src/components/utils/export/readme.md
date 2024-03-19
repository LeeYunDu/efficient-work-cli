### 导出

收集项目中导出的写法



## xlsx,A标签导出

接口请求方式为GET,需要将参数放置接口地址后,通过模拟A标签Click事件触发

``` ts
export function onExport (): any {
  let params = encodeURIComponent(JSON.stringify({
    pageSize:10,
    pageNum:1
  }))
  const a = document.createElement('a')
  a.type = 'download'
  a.href = prefix + '/pc/ads/project/recommend/export?params=' + params
  a.click()
}
```


## xlsx,导出接口返回的数据

``` ts
/**
 * 导出excel功能，请求接口拿到数据
 */
async function onExport () {
  let { data } = await apiName(Object.assign({}, table.value.params, {}))
  exportExcelByJson(data.excelData, '项目清单.xlsx')
}

/**
 *  xlsx 下载
 *  "xlsx": "^0.18.5"
 * @param data 
 * @param fileName 
 * @returns 
 */
export const exportExcelByJson = function (data, fileName) {
  if (!isArray(data)) return
  const excelBook = XLSX.utils.book_new()
  const excelSheet = XLSX.utils.aoa_to_sheet(data)
  XLSX.utils.book_append_sheet(excelBook, excelSheet, 'sheet1')
  XLSX.writeFile(excelBook, fileName)
}

```

## xlsx 导出,数据格式为流

``` ts

interface ExcelStreamParam {
  url: string,
  name: string,
  params: any
}
async function exportExcelByStream (options: ExcelStreamParam) {
  let { url, name, params } = options
  var xhr = new XMLHttpRequest()
  xhr.open('POST', url, true)
  xhr.responseType = 'arraybuffer'
  //发送合适的请求头信息
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
  xhr.onload = function () {
    // 请求结束后，在此处写处理代码
    if (xhr.status === 200) {
      var blob = new Blob([xhr.response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      var url = URL.createObjectURL(blob)
      var link = document.createElement('a')
      link.href = url
      link.download = `${name}.xlsx`
      link.click()
    }
  }
  xhr.send(JSON.stringify(params))
}


```


## pdf导出,数据格式为流

``` ts
function exportPDFByStream () {
  let params = {

  }
  let url = apiUrl()
  var xhr = new XMLHttpRequest()
  xhr.open('POST', url, true)
  xhr.responseType = 'arraybuffer'
  //发送合适的请求头信息
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
  xhr.onload = function () {
    // 请求结束后，在此处写处理代码
    if (xhr.status === 200) {
      var blob = new Blob([xhr.response], { type: 'application/pdf' })
      var url2 = URL.createObjectURL(blob)
      var link = document.createElement('a')
      link.href = url2
      window.open(url2)
      link.download = '测试用例.pdf'
      link.click()
    }
  }
  xhr.send(JSON.stringify(params))
}

```

