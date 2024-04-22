---
title: "DBにsocket接続してみた"
excerpt: "みなさんこんにちは、かじりです。DBにsocket接続してみました"
created_at: "2024-04-23 07:10:08"
updated_at: "2024-04-23 07:10:08"
tags: [db, mysql, socket]
---

みなさんこんにちは、かじりです。DBにsocket接続してみました

とりあえず雑にまとめた。

GPT-4に聞いたsocket接続方法

>1. MySQLサーバーでソケットファイルの場所を確認。
>2. MySQLクライアントでソケットファイルを指定して接続。
>コマンド:
>```sh
>mysql -u [username] -p --socket=/path/to/mysql.sock
>```
>`[username]`をあなたのMySQLのユーザー名に、`/path/to/mysql.sock`をソケットファイルのパスに置き換えて実行。

GPT-4に聞いたsocketファイルの場所

>MySQLのデフォルトのsocketファイルの場所は通常、以下のいずれかです:
>- `/var/run/mysqld/mysqld.sock`
>- `/tmp/mysql.sock`
>システムや設定によって異なる場合があるので、`my.cnf` を確認すると確実です。

GPT-4に聞いたmy.cnfの場所。よくわからん。

>`my.cnf`の場所はシステムによって異なるが、一般的な場所は以下の通り:
>1. `/etc/my.cnf`
>2. `/etc/mysql/my.cnf`
>3. `/var/lib/mysql/my.cnf`
>4. `${MYSQL_HOME}/my.cnf`
>5. `~/.my.cnf` 
>存在を確認するには、ターミナルで `sudo find / -name my.cnf` を実行。

docker image公式で調べた、ソケットファイルの場所 https://hub.docker.com/_/mysql

```
The default configuration for MySQL can be found in /etc/mysql/my.cnf, which may !includedir additional directories such as /etc/mysql/conf.d or /etc/mysql/mysql.conf.d. Please inspect the relevant files and directories within the mysql image itself for more details.
```

成功ログ

```
mysql -uroot -pmysql --socket /var/run/mysqld/mysqld.sock
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 11
Server version: 8.0.27 MySQL Community Server - GPL

Copyright (c) 2000, 2021, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> ^DBye
```

失敗ログ socc

```
#  mysql -uroot -pmysql --socket /var/run/mysqld/mysqld.socc
mysql: [Warning] Using a password on the command line interface can be insecure.
ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.socc' (2)
```


