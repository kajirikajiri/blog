---
title: "Cloudflareのビルドをnodeからbunに変えた"
excerpt: "みなさんこんにちは、かじりです。Cloudflareのビルドをbunでできるという情報をみたのでbunにしました！"
created_at: "2024-04-05 21:44:44"
updated_at: "2024-04-05 22:06:55"
tags: [Cloudflare, Bun, CloudflarePages, Node]
---

みなさんこんにちは、かじりです。Cloudflareのビルドをbunでできるという情報をみたのでこのブログのビルドをnodeからbunにしました！

BUN_VERSIONを設定して、最新を使うこともできる。2024/04/05現在では、1.0.1のようだ。Cloudflare Pagesのログは以下

```
Detected the following tools from environment: bun@1.0.1, nodejs@18.17.1
```

https://gist.github.com/Hebilicious/88e5a444f42b8dc09fb86dfa865c6ed3

変更内容 [gitのcommit](https://github.com/kajirikajiri/blog/commit/a10e76f790002e90c8c67fbbc19db2bf16fe70f4)

```sh
npm install
↓
bun install
```

```sh
node script.js
↓
bun script.js
```

そもそも、このブログのビルドは6秒くらいだったので、変化がわかりづらいが、bunの場合は最短で3秒で終わった。最近の10個くらいのビルドを見ると、nodeの最短は5秒なので早くなっているようだ。
