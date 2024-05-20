## CSS



## CSS 动态加载文件系统的资源
``` scss
$node-path: '/node-szzt';
$file-id:'2164';
@function metaFilePathScss($fileName) {
  @return url(#{$node-path}/file/download/#{$file-id}/#{$fileName});
}
```

## CSS 加载文字
``` scss
@font-face {
  font-family: YouSheBiaoTiYuan;
  src: url(#{$node-path}/file/download/2164/YouSheBiao.ttf),
}

@font-face {
  font-family: D-DIN;
  src: url(#{$node-path}/file/download/2164/DIN-Regular.otf),
}


@font-face {
  font-family: DIN-Bold;
  src: url(#{$node-path}/file/download/2164/DIN-Bold.otf),
}


@font-face {
  font-family: Alibaba PuHuiTi;
  src: url(#{$node-path}/file/download/2164/Alibaba-PuHuiTi-Regular.ttf),
}

```
