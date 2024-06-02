---
title: "Gemfileを更新したときに、docker compose buildしなおす理由と回避"
excerpt: "みなさんこんにちは、かじりです。Gemfileを更新したときに、docker compose buildしなおす理由と回避をまとめました"
created_at: "2024-06-02 18:19:12"
updated_at: "2024-06-02 18:36:13"
tags: [Gemfile, docker, compose, build, volume]
---

みなさんこんにちは、かじりです。Gemfileを更新したときに、docker compose buildしなおす理由と回避をまとめました

この記事[^qiita-mom0tomo]によると、Gemfileが変わったからそこからbuildしなおすのが理由。うろ覚えだけど、確かコマンドごとにレイヤーみたいなものがつくられるはずで、差分が検知されるとそれ以降のコマンドはやり直しだった気がする。

[^qiita-mom0tomo]: https://qiita.com/mom0tomo/items/2e7f7c2dbe2855b2c91d

この記事[^qiita-neko-neko]によると、volumeにbundlerの結果を配置すれば良い。

[^qiita-neko-neko]: https://qiita.com/neko-neko/items/abe912eba9c113fd527e

なので以下のように、volumeを設定し、bundle installすれば良い

```
services:
  app:
    volumes:
      - bundle:/myapp/vendor/bundle
volumes:
  bundle:
```

```dockerfile
RUN bundle config set path 'vendor/bundle' && bundle install
```
