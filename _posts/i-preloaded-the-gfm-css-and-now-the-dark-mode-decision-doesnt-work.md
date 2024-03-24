---
title: "gfmのcssをpreloadしたらダークモードの判定が効かなくなった"
excerpt: "みなさんこんにちは、かじりです。chrome devtoolでcssの読み込みがコンテンツの表示をブロックしているというので、preloadしたらcssが効かなくなった話です"
created_at: "2024-03-24 17:01:41"
updated_at: "2024-03-24 17:01:41"
tags: [css, preload, darkmode]
---

みなさんこんにちは、かじりです。今回は簡潔にまとめます。

上が効かない。下が効く。 hrefからは一緒です。
```html
<link rel="preload" as="style" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.5.1/github-markdown.min.css" integrity="sha512-h/laqMqQKUXxFuu6aLAaSrXYwGYQ7qk4aYCQ+KJwHZMzAGaEoxMM6h8C+haeJTU1V6E9jrSUnjpEzX23OmV/Aw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.5.1/github-markdown.min.css" integrity="sha512-h/laqMqQKUXxFuu6aLAaSrXYwGYQ7qk4aYCQ+KJwHZMzAGaEoxMM6h8C+haeJTU1V6E9jrSUnjpEzX23OmV/Aw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
```
