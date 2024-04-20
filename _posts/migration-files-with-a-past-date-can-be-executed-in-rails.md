---
title: "Railsで過去の日付のマイグレーションファイルは実行できる"
excerpt: "みなさんこんにちは、かじりです。Railsで過去の日付のマイグレーションファイルは実行できることを知りました。"
created_at: "2024-04-20 15:57:50"
updated_at: "2024-04-20 15:57:50"
tags: [rails, ruby, migration, db]
---

みなさんこんにちは、かじりです。Railsで過去の日付のマイグレーションファイルは実行できることを知りました。

過去の日付のマイグレーションファイル[^migration]を実行すると、schema.rbの日付は変わらず[^migrated]、columnだけが追加される。

学びだった。エラーになるものと思ってた。

[^migration]: https://github.com/kajirikajiri/toy/blob/2d41e28ac9be703dcdf82ced863c02f30f3b433b/projects/rails-db-migrate-past-dates/db/migrate/20240420064942_add_description_to_tests.rb


[^migrated]: https://github.com/kajirikajiri/toy/blob/0314496a25503e27da8299242f0e444feb531590/projects/rails-db-migrate-past-dates/db/schema.rb
