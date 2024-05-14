<script setup>
import imagePreview from '@/global/components/imagePreview.vue'
import demo01 from './demo01.png'
import gc from './gc.png'
import form from './form.png'
import list from './list.png'
</script>
# szzt g

g = generator 的缩写，该指令的主要功能是生成文件。


## types

该功能实现通过输入showDoc文档的IP+业务标识获取文档的resources,生成typescript的Interface类型声明。

声明的类型包含接口的请求参数和接口200响应的返回结果。

将接口按业务进行划分,生成 业务模块名称.types.ts 文件和 java.业务模块名称.ts 接口函数定义文件

每次调用该命令生成文件会覆盖原文件,后端接口更新再调用即可。


### 示例

``` node 
szzt g types 
```

<imagePreview :data="[demo01]"></imagePreview>

IP：172.16.208.12:18550

业务标识：zhaoshang-project-api

### 版本更新说明
1. 2023/02/27 初次上线
2. 2023/02/28 feat 接口请求字段添加是否选填判断（fieldName？:string）
3. 2023/03/08 （szzt-cli@3.2.0） feat:业务文件.ts、interface 修改为首字母大写；递归生成interface嵌套的实体类；添加字段类型判断interger、array<originaRef|基本数据类型>;
4. 2023/04/27 （szzt-cli@3.4.0） fix: 修复接口文档路径返回乱码问题；修复递归生成interface 陷入死循环问题
5. 2023/08/07 （szzt-cli@3.7.3）
feat: 生成接口定义函数功能； 
在项目文件夹 api/project 中定义所有业务接口函数
在项目文件夹 api/index.ts 中导出所有接口函数
判断项目中是否有 typings/params.ts 文件,调整 ResponseMode 中data字段为必有项  ，不存在则会生成一份模版文件
6. 2023/11/16 （szzt-cli@3.8.2）feat: 修复GET类型的接口未生成问题；优化interface字段注释；项目中生成接口文档标识,优化重复输入接口文档地址的操作；

## gc

在指定路径下生成生成gc-content模块文件。

如下示例，将在/views/demo路径下生成view.vue文件,内容为gc-content的模版。

``` node 
szzt g gc '/views/demo/view.vue'
```

<imagePreview :data="[gc]"></imagePreview>


## list

在指定路径下生成生成list模块文件。

如下示例，将在/views/demo路径下生成list.vue文件,内容为list的模版。

``` node 
szzt g list '/views/demo/list.vue'
```

<imagePreview :data="[list]"></imagePreview>

## form

在指定路径下生成生成form模块文件。

如下示例，将在/views/demo路径下生成form.vue文件,内容为form的模版。

``` node 
szzt g form '/views/demo/form.vue'
```

<imagePreview :data="[form]"></imagePreview>
