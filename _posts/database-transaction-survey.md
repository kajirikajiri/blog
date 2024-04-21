---
title: "データベースとトランザクションについて調べてまとめる"
excerpt: "みなさんこんにちは、かじりです。データベースとトランザクションが気になったので調べます"
created_at: "2024-04-21 10:39:11"
updated_at: "2024-04-21 11:19:25"
tags: [transaction, db, acid]
---

みなさんこんにちは、かじりです。データベースとトランザクションが気になったので調べます

GPT-4に聞いたり、Google検索したりする。

GPT-4に聞いてまとめた

トランザクションとはデータベースを変更する一連の操作をまとめたもの。全ての操作が実行されるか、１つも実行されないことを保証する。ACID原則に基づいて機能する。
ACID原則は原子性、一貫性、隔離性、持続性。

私の感想

トランザクションの認識は同じ感じ。ACID原則を少し調べる

GPT-4に聞いてまとめた

ACID原則は、データベース管理システムのトランザクションが満たすべき四つの特性を指す。それは、原子性(Atomicity)、一貫性(Consistency)、独立性(Isolation)、持続性(Durability)である。

www.postgresql.orgにあった。

https://www.postgresql.org/docs/current/glossary.html#GLOSSARY-ACID

dev.mysql.comにドキュメントがあった。

https://dev.mysql.com/doc/refman/8.0/en/mysql-acid.html

https://dev.mysql.com/doc/refman/8.0/en/glossary.html#glos_acid

長いが、これが正確に表していそうだ。

mysql.comからの引用

> An acronym standing for atomicity, consistency, isolation, and durability. These properties are all desirable in a database system, and are all closely tied to the notion of a transaction. The transactional features of InnoDB adhere to the ACID principles.
> Transactions are atomic units of work that can be committed or rolled back. When a transaction makes multiple changes to the database, either all the changes succeed when the transaction is committed, or all the changes are undone when the transaction is rolled back.
> The database remains in a consistent state at all times — after each commit or rollback, and while transactions are in progress. If related data is being updated across multiple tables, queries see either all old values or all new values, not a mix of old and new values.
> Transactions are protected (isolated) from each other while they are in progress; they cannot interfere with each other or see each other's uncommitted data. This isolation is achieved through the locking mechanism. Experienced users can adjust the isolation level, trading off less protection in favor of increased performance and concurrency, when they can be sure that the transactions really do not interfere with each other.
> The results of transactions are durable: once a commit operation succeeds, the changes made by that transaction are safe from power failures, system crashes, race conditions, or other potential dangers that many non-database applications are vulnerable to. Durability typically involves writing to disk storage, with a certain amount of redundancy to protect against power failures or software crashes during write operations. (In InnoDB, the doublewrite buffer assists with durability.)

DeepLで翻訳したやつを自分で入力しながら理解する。

Atomicity(原子性)
トランザクションはコミットまたはロールバック可能なアトミックな作業単位。
つまり、分割不可能な最小の処理単位。
トランザクションがデータベースに複数の変更を加えると、コミットされた時に全ての変更が成功するか、ロールバックされた時に全ての変更が取り消される。

Consistency(一貫性)
データベースは、コミットやロールバックの後も、トランザクションの進行中も常に一貫した状態を維持する。
関連するデータが複数のテーブルにわたって更新されている場合、クエリには全ての古い値または全ての新しい値が表示され、古い値と新しい値が混在することはない。
Isolation(分離)
トランザクションは進行中に互いに保護（分離）され、互いに干渉したり、コミットされていないデータを見たりすることはできない。
経験豊富なユーザーであれば、トランザクションが本当に互いに干渉しないと確信できる場合に、パフォーマンスや並行性の向上を優先して保護レベルを下げ、隔離レベルを調節できる。

Durability(耐久性)
トランザクションの結果は耐久性がある。コミット操作が成功すると、そのトランザクションによって行われた変更は、停電、システムクラッシュ、競合状態、その他多くのデータベースアプリケーションが脆弱である潜在的な危険から安全に保護される。耐久性には通常、書き込み捜査中の電源故障やソフトウェアクラッシュから保護するために、ある程度の冗長性を持ったディスクストレージへの書き込みが含まれる。(InnoDBでは、ダブルライトバッファが耐久性を支援する)。

アトミック、コミット、同時実行、ダブルライトバッファ、分離レベル、ロック、ロールバック、トランザクションも参照のこと。

経験豊富なユーザーであればのあたりが気になる。

停電やシステムクラッシュから保護されるってすごいな。


