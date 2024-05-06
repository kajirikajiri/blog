---
title: "clickhouseについて調べてみた"
excerpt: "みなさんこんにちは、かじりです。clickhouseを調べてみました"
created_at: "2024-05-06 09:15:40"
updated_at: "2024-05-06 09:30:20"
tags: [clickhouse]
---

みなさんこんにちは、かじりです。clickhouseを調べてみました

zennの記事でclickhouse[^clickhouse]をみた[^clickhouse-zenn]時の印象としては、ブラウザでユーザーのクリックをキャプチャするとか？思ったけど全然違いました

[^clickhouse]: https://clickhouse.com/

[^clickhouse-zenn]: https://zenn.dev/voluntas/scraps/cdb3923dafa631

GPT-4回答

ClickHouseは列指向DBMS (データベース管理システム) で、大量のデータ上でのリアルタイムの分析クエリを高速に実行することを目的としています。

列指向だそうです。大規模データの分析を得意としているらしい。列データの物理的な位置を近くして取得を速くしているそうです。例えば名前カラムのデータを全部取得して分析するとかそういう感じらしい。

clickhouseのLP[^clickhouse-lp]より

[^clickhouse-lp]: https://clickhouse.com/

> Column-oriented databases are better suited to OLAP scenarios. They are at least 100x faster in processing most queries. ClickHouse uses all available system resources to their full potential to process each analytical query as fast as possible.

OLAPの場合に高速らしい。

GPT-4によると、オンライン分析処理（Online Analytical Processing）。大量のデータから複雑な分析や集計を行うための技術。

