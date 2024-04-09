<template>
  <div class="view-component">
    <template v-if="['.xlsx','.xls'].includes(fileType)">
      <div id="excel-data-preview">
      </div>
    </template>
    <template v-if="fileType == '.pdf'">
      <canvas id="pdf-viewer"></canvas>
      <div class="example-pagination-block">
        <el-pagination
          v-model:current-page="pdfState.pageNum"
          layout="prev, pager, next"
          :total="pdfState.total"
          :page-size="1"
          @currentChange="onChange"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { get } from 'lodash-es'
import { computed, onMounted, reactive, ref } from 'vue'
import * as XLSX from 'xlsx'

let props = defineProps({
  url:{
    type:String,
    default:''
  }
})

let fileType = ref('')
let supportFiles = ['.xlsx','.xls','.pdf']

async function init (){
  switch(getFileType()){
    case '.xlsx':
    case '.xls':
      loadXlsFile()
      break
    case '.pdf':
      await loadPDFJS()
      loadPDFFile()

      break
    default:
  }
}




// 加载excel文件
function loadXlsFile (){
  var excelUrl = props.url // 替换为你的 Excel 文件链接
  fetch(excelUrl)
    .then(response => response.arrayBuffer())
    .then(data => {
      var workbook = XLSX.read(data, { type: 'array', cellStyles: true }) // 添加 cellStyles 选项以保留单元格样式
      var worksheet = workbook.Sheets[workbook.SheetNames[0]]
      var html = XLSX.utils.sheet_to_html(worksheet, { editable: false }) // 设置 editable 为 true 以使得样式生效
      document.getElementById('excel-data-preview').innerHTML = html
    })
    .catch(error => console.error('加载 Excel 文件出错：', error))
}


/**
 * loadPDF
 */

let pdfState = reactive({
  currentPDF:null,
  pageNum:1,
  total:0
})


function onChange (){
  loadPDFPage()
}

function loadPDFFile (){
  const pdfUrl = 'http://36.134.75.79/opts/project/files/c2a5b72e0480488598f2b0671a0f3519.pdf'
  // 异步加载 PDF 文件
  pdfjsLib.getDocument(pdfUrl).promise.then(function (pdfDoc) {
    pdfState.currentPDF = pdfDoc
    pdfState.total = pdfDoc.numPages
    // 获取第一页
    pdfState.pageNum = 1
    loadPDFPage()
  })
}

function loadPDFPage (){
  if(!pdfState.currentPDF){
    return
  }
  const canvas = document.getElementById('pdf-viewer')
  pdfState.currentPDF.getPage(pdfState.pageNum).then(function (page) {
    const scale = 1
    const viewport = page.getViewport({ scale: scale })
    // 将 PDF 渲染到 canvas 上下文中
    const context = canvas.getContext('2d')
    canvas.height = viewport.height
    canvas.width = viewport.width
    const renderContext = {
      canvasContext: context,
      viewport: viewport
    }
    page.render(renderContext)
  })
}

function loadPDFJS (){
  return new Promise((resolve,reject)=>{
  // 创建一个新的 <script> 元素
    let scriptElement = document.createElement('script')
    // 设置要加载的外部 JavaScript 文件的 URL
    scriptElement.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.min.js'
    // 创建一个新的 <link> 元素
    let linkElement = document.createElement('link')
    // 设置要加载的外部 CSS 文件的 URL
    linkElement.rel = 'stylesheet'
    linkElement.type = 'text/css'
    linkElement.href = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf_viewer.css'
    // 将 <link> 元素添加到文档的头部
    document.head.appendChild(linkElement)
    // 将 <script> 元素添加到文档中
    document.body.appendChild(scriptElement)

    scriptElement.onload = ()=>{
      resolve(true)
    }
  })

}


// 获取文件类型
function getFileType (){
  let type = props.url.slice(props.url.lastIndexOf('.')).toLowerCase()
  fileType.value = type
  return type
}
onMounted(()=>{
  if(!supportFiles.includes(getFileType())){
    alert('不支持该文件类型')
  }else{
    init()
  }
})


</script>

<style lang="scss" scoped>
#excel-data-preview{
  overflow: auto;
  padding-bottom: 10px;
  &::-webkit-scrollbar { /*滚动条整体样式*/
    width: 8px!important; /*高宽分别对应横竖滚动条的尺寸*/
    height: 6px!important;
    cursor: pointer;
  }
  ::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 6px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(43, 53, 59, 0.3);
    cursor: pointer;
  }
  ::-webkit-scrollbar-track { /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    background: rgba(43, 53, 59, 0.3);
    cursor: pointer;
  }
}

::v-deep(table){
  border: 1px solid black!important; /* 添加边框样式 */
  border-collapse: collapse!important; /* 边框合并 */
  padding: 5px!important;
  th, td {
    border: 1px solid black!important; /* 添加边框样式 */
    border-collapse: collapse!important; /* 边框合并 */
    padding: 5px!important;
    white-space: nowrap;
  }
}


#pdf-viewer{
  margin: 0 auto;
  display: block;
}

.example-pagination-block{
  text-align: center;
  display: flex;
  justify-content: center;
}
</style>
