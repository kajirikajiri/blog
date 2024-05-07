---
title: "sqlcを調べた"
excerpt: "みなさんこんにちは、かじりです。sqlcを調べました"
created_at: "2024-05-07 09:26:33"
updated_at: "2024-05-07 09:26:33"
tags: [sqlc, sql]
---

みなさんこんにちは、かじりです。sqlc[^sqlc-top]を調べました

[^sqlc-top]: https://sqlc.dev/

playground[^sqlc-play]をみた感じ、sqlやschemaファイルから型定義ありでデータの取得や更新ができるようにファイル生成してくれるやつ。

[^sqlc-play]: https://play.sqlc.dev/

sqlが書ければ中間ファイルを自動生成してくれるのか、良さそうだな。

GPT-4に聞いてみた

> SQLCはSQLをGoのコードに自動で変換するツール。SQLとGoの型安全なインタフェースを生成。

previewと書いているが最近はTypeScriptにも対応した[^sqlc-typescript] [^sqlc-typescript-2]ようだ

[^sqlc-typescript]: https://sqlc.dev/posts/2023/12/04/preview-typescript-support-with-sqlc-gen-typescript/

[^sqlc-typescript-2]: https://zenn.dev/voluntas/scraps/cdb3923dafa631
