---
title: "sourcemapの理解が深まった"
excerpt: "みなさんこんにちは、かじりです。sourcemapの理解が深まったのでまとめました"
created_at: "2024-04-28 17:26:16"
updated_at: "2024-04-28 18:16:00"
tags: [JavaScript, sourcemap]
---

みなさんこんにちは、かじりです。sourcemapの理解が深まったのでまとめました

SentryやChromeのdevtoolに表示されるログはファイルの場所がわかりやすいかった。

しかし、今日Chrome拡張機能で発生したエラーを確認したところ、minifyされており、ぱっと見わけわからないログになっていた。

例えばこれ。2行目でiとか言われてもよくわからないし、1行目の1914てどこやねん。ていう感じ。

```
[ServiceWorker][Alarms]: Name: Error, Message: [Watch]: Error: test, Stack: Error: [Watch]: Error: test
    at i (chrome-extension://lbiklpidmbalbeplknbcnioeemgocmjd/assets/service-worker.js.07123491.js:1:1914)
    at async chrome-extension://lbiklpidmbalbeplknbcnioeemgocmjd/assets/service-worker.js.07123491.js:1:2002"
```

その時点での私の理解では、ビルド済みのコードにsourcemapが同梱されており、それが反映されていないためにminifyされたソースのstackが送信されてきていると思っていた。

GPT-4に聞いてみたところ、どう質問してもサーバー側でやることじゃないらしい。

GPT-4の回答1

いいえ、開発用です。本番環境には不要。

GPT-4の回答2

いいえ、開発時に使うものです。ビルド時にソースマップを生成し、デバッグ時に参照しますが、本番環境に同梱する必要はありません。

GPT-4の回答3

いいえ、ビルド済みのコードに同梱しません。サーバーでsourcemapを保持し、エラー解析時に使用します。公開環境ではsourcemapを提供しないのが一般的です。
ここで質問を変えてみると、このような回答だった。つまり、stacktraceとsourcemapを組み合わせて、元のソースコードの位置を特定しているようだ。

GPT-4の回答

はい、その通りです。stacktraceとsourcemapを組み合わせて、minified（圧縮された）コードから元のソースコードの位置を特定し、ログをわかりやすくします。

ということで、こちらのサイト[^thundermiracle.com]を参考に、source-mapを扱うパッケージ[^mozilla/source-map]とstacktraceのパーサ[^errwischt/stacktrace-parser]をinstall。

[^thundermiracle.com]: https://thundermiracle.com/blog/2021-07-14-parse-sourcemap/#source-map%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E7%89%B9%E5%AE%9A

[^mozilla/source-map]: https://github.com/mozilla/source-map

[^errwischt/stacktrace-parser]: https://github.com/errwischt/stacktrace-parser

ほぼほぼ、そのまま使えたが、一部修正した

zipを扱うために、jszip[^Stuk/jszip]を使った。

[^Stuk/jszip]: https://github.com/Stuk/jszip

stacktraceをnodeコマンドの引数に渡して使用したかったので、process.argvを使った。nodeコマンドの引数に改行をそのまま渡すために、stacktraceの改行は\\nに置換しておき、元に戻している。

stacktraceの先頭にバージョン番号をつけて、元になっているzipファイルを探せるようにしている。私はchrome拡張機能を作っていたのだが、chrome拡張機能はzipファイルにして読み込んでいたので、その度に解凍するのは手間だったので、プログラムで解凍して中身を確認できるようにした。

結果は以下

```javascript
const StackTraceParser = await import("stacktrace-parser");
const JSZip = await import("jszip");
const { SourceMapConsumer } = await import("source-map");
const fs = await import("fs");

const stack = process.argv[2].replace(/\\n/g, '\n')
const output = StackTraceParser.parse(stack);
const match = stack.match(/\[(.*?)\]/);
const version = match ? match[1] : null

fs.readFile(`dist-zip/${version}.zip`, (err, data) => {
  if (err) throw err;
  new JSZip.default().loadAsync(data).then(async(zip) => {
    for await (const { file, lineNumber, column } of output) {
      const mapFile = file.replace("chrome-extension://lbiklpidmbalbeplknbcnioeemgocmjd/", '') + '.map'
      const map = await zip.file(mapFile).async("string")
      const smc = await SourceMapConsumer.fromSourceMap(map);
      console.log(
        smc.originalPositionFor({
          line: lineNumber,
          column: column,
        })
      );
    }
  });
});
```

これをやると以下の感じになる。

before

```
[0.0.1][ServiceWorker][Alarms]: Name: Error, Message: [Watch]: Error: test, Stack: Error: [Watch]: Error: test
    at i (chrome-extension://lbiklpidmbalbeplknbcnioeemgocmjd/assets/service-worker.js.07123491.js:1:1914)
    at async chrome-extension://lbiklpidmbalbeplknbcnioeemgocmjd/assets/service-worker.js.07123491.js:1:2002"
```

コマンド

```
node source-map-parse.mjs "[0.0.1][ServiceWorker][Alarms]: Name: Error, Message: [Watch]: Error: test, Stack: Error: [Watch]: Error: test\n    at i (chrome-extension:
//lbiklpidmbalbeplknbcnioeemgocmjd/assets/service-worker.js.033d6957.js:1:1914)\n    at async chrome-extension://lbiklpidmbalbeplknbcnioeemgocmjd/assets/service-worker.
js.033d6957.js:1:2002"
```

after

```
{
  source: '../../service-worker.js',
  line: 105,
  column: 16,
  name: null
}
{ source: '../../service-worker.js', line: 113, column: 3, name: null }
```
