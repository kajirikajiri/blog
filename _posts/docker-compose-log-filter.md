---
title: "大量のJobが実行された時にdocker compose logをフィルタリングしたい"
excerpt: "みなさんこんにちは、かじりです。docker compose logsの結果が見づらかったのでフィルタリングしました。"
created_at: "2024-03-26 21:42:22"
updated_at: "2024-03-26 21:42:22"
tags: [ruby, active-job, docker, log, grep, filter]
---

みなさんこんにちは、かじりです。docker compose logsの結果が見づらかったのでフィルタリングした話です。

```
docker compose logs app -f | grep '\[ActiveJob\] \[Job\]'
```

このように、私の場合は、railsのActiveJobが多すぎたのでフィルタリングして確認しました

特定のサービスに絞らない場合はこう

```
docker compose logs     -f | grep '\[ActiveJob\] \[Job\]'
```

リアルタイムでなくていい場合はこう

```
docker compose logs        | grep '\[ActiveJob\] \[Job\]'
```

---

今回の目的からはずれますが、[を使いたい時は、\でエスケープが必要でした。shellなので、single quoteで囲めばいいと思ったけど無理だった。AIがいうにはgrepにはgrepの文法があるらしい。まあ、そうかもしれない。
