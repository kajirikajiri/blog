---
title: "docker composeでrailsを立ち上げてsocketのエラーが発生した"
excerpt: "みなさんこんにちは、かじりです。docker composeでrailsを立ち上げてsocketのエラーが発生した時の対応内容です"
created_at: "2024-04-20 14:31:29"
updated_at: "2024-04-20 14:50:29"
tags: [docker, compose, rails, socket]
---

みなさんこんにちは、かじりです。docker composeでrailsを立ち上げてsocketのエラーが発生した時の対応内容です

たまにrailsの挙動を確認したくなるんですが、その時にlocalに依存すると色々面倒なので、docker composeでよくやるんですが、webの記事を見てやると途中で失敗することが多いです。そうなったら面倒なので、他の記事に当たるんですが、たまにはちゃんとやってみようと思って対応しました。

まず、私が参考にした Kento210 さんの記事[^qiita]は悪くなくて、私に問題がありました。

まず１つ目に、記事中でconfig/database.ymlを修正するように記載があり、修正したのですが、権限の問題で上書き保存できていませんでした。nvimが上書き失敗している警告を出していましたが、気づいてませんでした。ということでちゃんと反映したら大丈夫だった。

２つ目に、socketのエラーが出ていました。こちらはGPT-4にsocketの場所の指定方法を聞いて、config/database.ymlにsocketの設定を記載したら直りました。

エラー

```
ActiveRecord::ConnectionNotEstablished: Can't connect to local server through socket '/run/mysqld/mysqld.sock' (2) (
ActiveRecord::ConnectionNotEstablished)
```

修正

```
default: &default
...
  socket: /var/run/mysqld/mysqld.sock
```

怪しいと思ったログ

```
'/var/lib/mysql/mysql.sock' -> '/var/run/mysqld/mysqld.sock'
```

ということで、今回は無事に起動できました！ [^repository]

[^qiita]: https://qiita.com/Kento210/items/5f153bc20e9ba28375fd

[^repository]: https://github.com/kajirikajiri/toy/tree/3fafd11d32816f903482ad9b918e88f9e1920256/projects/rails-docker-compose
