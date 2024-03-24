---
title: "Web componentsでFOUC, CLSが発生する時に対処したこと"
excerpt: "みなさんこんにちは、かじりです。Web componentsのtemplate, scopeとstyleをlinkタグで設定したら、FOUCやCLSが発生した時に対処した話です。"
created_at: "2024-03-24 16:09:21"
updated_at: "2024-03-24 17:31:36"
tags: [FOUC, CLS, WebComponents, style, link]
---

みなさんこんにちは、かじりです。Web componentsでFOUC, CLSが発生する時に対処したことをまとめました。

## 環境

OS: macOS: 14.3.1（23D60）
ブラウザ: chrome: バージョン: 123.0.6312.58（Official Build） （arm64）

## 対処

以下のように、templateタグの内部でcssをlinkタグで読み込むと、Web componentsでFOUC, CLSが発生するので、styleタグで記述しましょう。

after

```html
<template id="blog-name-template">
    <style>
    a {
        text-decoration: none;
    }
    a:hover[href] {
        text-decoration: underline;
    }
    .link {
        color: #9e9e9e;
        font-size: 32px;
    }
    </style>
    <a class="link" href="/">
        かじりブログ
    </a>
</template>
```

before

```html
<template id="blog-name-template">
    <link rel="stylesheet" href="blog-name.css">
    <a class="link" href="/">
        かじりブログ
    </a>
</template>
```

## 調査方法

ChromeのdevtoolでPerformanceタブを使用して、Web componentsでFOUC, CLSが発生している場所を入念に見ましたが、何も発生していませんでした。

次に、:defined擬似クラスを使用して、Web componentsでFOUC, CLSが発生しないようにしましたが、何も変わりませんでした。 https://web.dev/articles/custom-elements-v1?hl=ja#prestyle

次に、原因が思い当たらないので、関連しそうなものを探していたところ、cssはファイルだとダウンロードと解析に時間がかかるのでstyleタグで記述しましょうという記事を見つけました。 https://web.dev/extract-critical-css?hl=ja#extract-critical-css

しばらく時間が経過して確認したら再度再現していた。私はcloudflareにデプロイしているのだが、preview環境では再現せず、本番環境では再現した。先ほどのPerformanceタブで確認すると、本番ではrocket-loaderとbeaconなるものが先に読み込まれている点が異なっていた。rocket-loaderはjsの読み込み遅延。beaconはanalyticsだった。また、ブラウザの同時ファイル読み込み数は6くらいだった。つまり、rocket-loaderによって、webcomponent用のjsが遅延読み込みされた場合に発生しているようだ。ということで、一部無効化するために、data-cfasync="false"を追加。 https://stackoverflow.com/questions/985431/max-parallel-http-connections-in-a-browser https://developers.cloudflare.com/speed/optimization/content/rocket-loader/ignore-javascripts/
