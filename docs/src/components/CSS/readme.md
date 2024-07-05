## CSS


## CSS 循环设置ICON

``` scss
$images: (
  'image1': url('@static/images/app/header-icon-1.png'),
  'image2': url('@static/images/app/header-icon-2.png'),
  'image3': url('@static/images/app/header-icon-3.png'),
  'image4': url('@static/images/app/header-icon-4.png'),
  'image5': url('@static/images/app/header-icon-5.png'),
);

$images-active: (
  'image1': url('@static/images/app/header-icon-1-active.png'),
  'image2': url('@static/images/app/header-icon-2-active.png'),
  'image3': url('@static/images/app/header-icon-3-active.png'),
  'image4': url('@static/images/app/header-icon-4-active.png'),
  'image5': url('@static/images/app/header-icon-5-active.png'),
);


@for $i from 1 through 5 {
  &:nth-child(#{$i})  {
    span{

      &::before{
        background-image: map-get($images, 'image#{$i}');
        background-size: cover; // 确保图片覆盖整个元素
        background-position: center; // 图片居中显示
      }
    }

    &.is-active{
      span{
          &::before{
          background-image: map-get($images-active, 'image#{$i}');
          background-size: cover; // 确保图片覆盖整个元素
          background-position: center; // 图片居中显示
        }
      }
    }

  }
}

```


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
