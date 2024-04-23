---
title: "DBにsocket接続してみた"
excerpt: "みなさんこんにちは、かじりです。DBにsocket接続してみました"
created_at: "2024-04-23 07:10:08"
updated_at: "2024-04-23 07:10:08"
tags: [db, mysql, socket]
---

みなさんこんにちは、かじりです。DBにsocket接続してみました

まずは環境構築。docker composeでmysqlを立ち上げる[^mstn__post]

[^mstn__post]: https://zenn.dev/mstn_/articles/ad5d7c7ad7e2d6

docker compose buildが実行されず、docker compose upでエラーが発生

> no matching manifest for linux/arm64/v8 in the manifest list entries

調べてみると、compose.ymlにplatformの記載が足りない[^jizya_post]ので追記

[^jizya_post]: https://qiita.com/jizya/items/38f15271903de629d1ab

>```yml
>  db:
>    platform: linux/x86_64 // この行を追加。
>```

これでcompose.yml[^compose.yml]が以下のようになり、起動成功

[^compose.yml]: https://github.com/kajirikajiri/toy/blob/eb1469a56a6ddf925d30d62027bc5e989d99d215/projects/mysql-docker-compose/compose.yml

```yml
version: '3.9'

services:
  mysql:
    platform: linux/x86_64
    image: mysql:8.0.27
    environment:
      MYSQL_ROOT_PASSWORD: mysql
      MYSQL_DATABASE: db
      MYSQL_USER: user
      MYSQL_PASSWORD: password
```

次にsocket接続方法がわからなかったのでGPT-4に聞いた

>1. MySQLサーバーでソケットファイルの場所を確認。
>2. MySQLクライアントでソケットファイルを指定して接続。
>コマンド:
>```
>mysql -u [username] -p --socket=/path/to/mysql.sock
>```
>`[username]`をあなたのMySQLのユーザー名に、`/path/to/mysql.sock`をソケットファイルのパスに置き換えて実行。

socketファイルの場所がわからないのでGPT-4に聞いた

>MySQLのデフォルトのsocketファイルの場所は通常、以下のいずれかです:
>- `/var/run/mysqld/mysqld.sock`
>- `/tmp/mysql.sock`
>システムや設定によって異なる場合があるので、`my.cnf` を確認すると確実です。

my.cnfの場所がわからないのでGPT-4に聞いたがよくわからない

>`my.cnf`の場所はシステムによって異なるが、一般的な場所は以下の通り:
>1. `/etc/my.cnf`
>2. `/etc/mysql/my.cnf`
>3. `/var/lib/mysql/my.cnf`
>4. `${MYSQL_HOME}/my.cnf`
>5. `~/.my.cnf` 
>存在を確認するには、ターミナルで `sudo find / -name my.cnf` を実行。

docker image公式で調べた[^hub.docker.com]、ソケットファイルの場所。 

[^hub.docker.com]: https://hub.docker.com/_/mysql

>The default configuration for MySQL can be found in /etc/mysql/my.cnf, which may !includedir additional directories such as /etc/mysql/conf.d or /etc/mysql/mysql.conf.d. Please inspect the relevant files and directories within the mysql image itself for more details.

これで、my.cnfが見つかったので接続して成功。ログは以下

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

試しにsocketファイルの名前をsockからsoccにして接続してみると接続に失敗。ログは以下

```
#  mysql -uroot -pmysql --socket /var/run/mysqld/mysqld.socc
mysql: [Warning] Using a password on the command line interface can be insecure.
ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.socc' (2)
```

