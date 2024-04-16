---
title: "vuejsでコメントを記述する他の方法"
excerpt: "みなさんこんにちは、かじりです。vuejsのtemplateタグの内側でコメントアウトする方法がもう一つあったので共有します"
created_at: "2020-12-31 21:57:22"
updated_at: "2020-12-31 21:57:22"
tags: [vue, comment]
---

みなさんこんにちは、かじりです。vuejsのtemplateタグの内側でコメントアウトする方法がもう一つあったので共有します

## 注意事項
vue3だとcompileエラー出ました。

## codesandbox

<iframe src="https://codesandbox.io/embed/vuejs-other-comment-5cjtu?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vuejs other comment"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## 例

```html
<template>
  <div>
    <!-- コメントです -->
    {{ /* コメントです */ }}
  </div>
</template>
```

{{ /* コメント */ }}こっちは見たことなかった。
