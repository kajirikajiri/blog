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

www.postgresql.org にあった。[^acid-postgresql]

[^acid-postgresql]: https://www.postgresql.org/docs/current/glossary.html#GLOSSARY-ACID

dev.mysql.com にドキュメントがあった。[^acid-mysql-1] [^acid-mysql-2]

[^acid-mysql-1]: https://dev.mysql.com/doc/refman/8.0/en/mysql-acid.html

[^acid-mysql-2]: https://dev.mysql.com/doc/refman/8.0/en/glossary.html#glos_acid

長いが、これが正確に表していそうだ。

dev.mysql.comからの引用

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
Isolation(隔離)
トランザクションは進行中に互いに保護（隔離）され、互いに干渉したり、コミットされていないデータを見たりすることはできない。
経験豊富なユーザーであれば、トランザクションが本当に互いに干渉しないと確信できる場合に、パフォーマンスや並行性の向上を優先して保護レベルを下げ、隔離レベルを調節できる。

Durability(耐久性)
トランザクションの結果は耐久性がある。コミット操作が成功すると、そのトランザクションによって行われた変更は、停電、システムクラッシュ、競合状態、その他多くのデータベースアプリケーションが脆弱である潜在的な危険から安全に保護される。耐久性には通常、書き込み捜査中の電源故障やソフトウェアクラッシュから保護するために、ある程度の冗長性を持ったディスクストレージへの書き込みが含まれる。(InnoDBでは、ダブルライトバッファが耐久性を支援する)。

アトミック、コミット、同時実行、ダブルライトバッファ、隔離レベル、ロック、ロールバック、トランザクションも参照のこと。

隔離レベルのあたりが気になる。

停電やシステムクラッシュから保護されるってすごいな。


isolation level(隔離レベル)[^isolation-level]

[^isolation-level]: https://dev.mysql.com/doc/refman/8.0/en/glossary.html#glos_isolation_level

dev.mysql.com から引用

>One of the foundations of database processing. Isolation is the I in the acronym ACID; the isolation level is the setting that fine-tunes the balance between performance and reliability, consistency, and reproducibility of results when multiple transactions are making changes and performing queries at the same time.
>From highest amount of consistency and protection to the least, the isolation levels supported by InnoDB are: SERIALIZABLE, REPEATABLE READ, READ COMMITTED, and READ UNCOMMITTED.
>With InnoDB tables, many users can keep the default isolation level (REPEATABLE READ) for all operations. Expert users might choose the READ COMMITTED level as they push the boundaries of scalability with OLTP processing, or during data warehousing operations where minor inconsistencies do not affect the aggregate results of large amounts of data. The levels on the edges (SERIALIZABLE and READ UNCOMMITTED) change the processing behavior to such an extent that they are rarely used.

dev.mysql.com から引用したものを DeepL で翻訳した

データベース処理の基礎の１つ。隔離レベルとは、複数のトランザクションが同時に変更を加えたりクエリを実行したりする際にパフォーマンスと信頼性、一貫性、結果の再現性のバランスを微調節する設定。
InnoDBがサポートする隔離レベルは、一貫性と保護が最も高いものから低いものまで、SERIALIZABLE、REPEATABLE READ、READ COMMITTED、READ UNCOMMITTED。
InnoDBテーブルでは、多くのユーザーは全ての操作に対してデフォルトの分離レベル（REPEATABLE READ）を維持することができる。熟練したユーザーはOLTP処理でスケーラビリティの限界に挑戦するときやデータウェアハウス処理で些細な不整合が大量のデータの集計結果に影響を与えない時にREAD COMMITTEDレベルを選択するかもしれない。端にあるレベル（SERIALIZABLEと READ UNCOMMITTED）は、ほとんど使用されない程度に処理動作を変更する。

感想

OLTP処理ってなんやねん

データウェアハウスってなんやねん

端の２つはほとんど使われないんだな。真ん中の２つくらいは調べてみたいな。

