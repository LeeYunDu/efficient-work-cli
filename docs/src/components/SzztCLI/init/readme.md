<script setup>
import imagePreview from '@/global/components/imagePreview.vue'
import demo from './demo.png'

</script>

# szzt init

该指令帮助开发快速创建项目模版。
项目模版如下：

1. szzt-vue2.6
2. szzt-vue3.x
3. szzt-react

## 示例
``` node 
// 创建项目方式一
szzt init 
// 创建项目方式二
szzt init myProject
// 如果存在输入的项目目录，强制删除项目目录
szzt init myProject -f
```

<imagePreview :data="[demo]"></imagePreview>
