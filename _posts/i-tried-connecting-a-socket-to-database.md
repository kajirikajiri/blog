---
title: "DBにsocket接続してみた"
excerpt: "みなさんこんにちは、かじりです。DBにsocket接続してみました"
created_at: "2024-04-23 07:10:08"
updated_at: "2024-04-23 09:30:08"
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

docker image公式で調べた[^hub.docker.com]、socketファイルの場所。 

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

で、socket接続ってなんなのとGPT-4に聞いてみた

>MySQLのsocket接続は、ファイルベースの通信方法であり、クライアントとサーバーが同じマシン上にある場合に使用される。TCP/IPよりも速く、安全です。

どの点が安全なのかGPT-4に聞いてみた

> 外部ネットワークを介さずにローカルファイルシステムを通じて直接通信するため、外部からの不正アクセスのリスクが低く、内部的な安全性が高いです。

なるほど、同じマシン上だと確かにsocket接続が良さそう

接続した後にどの接続方法なのか判断する方法をGPT-4に聞いてみた

>はい、できます。`status` コマンドを使用してください。出力に「UNIX socket」または「TCP/IP」が表示されます。

やってみた。確かにConnectionにsocketと書いてあるし、ソケットファイルの場所も書いてある。

```
mysql> status
--------------
mysql  Ver 8.0.27 for Linux on x86_64 (MySQL Community Server - GPL)

Connection id:          15
Current database:
Current user:           root@localhost
SSL:                    Not in use
Current pager:          stdout
Using outfile:          ''
Using delimiter:        ;
Server version:         8.0.27 MySQL Community Server - GPL
Protocol version:       10
Connection:             Localhost via UNIX socket
Server characterset:    utf8mb4
Db     characterset:    utf8mb4
Client characterset:    latin1
Conn.  characterset:    latin1
UNIX socket:            /var/run/mysqld/mysqld.sock
Binary data as:         Hexadecimal
Uptime:                 2 hours 34 min 9 sec

Threads: 2  Questions: 22  Slow queries: 0  Opens: 135  Flush tables: 3  Open tables: 54  Queries per second avg: 0.002
--------------
```

dev.mysql.com のドキュメント[^dev.mysql.com]によると、特定の条件でsocket接続になる。私の場合はsocket接続になった。

[^dev.mysql.com]: https://dev.mysql.com/doc/mysql-shell/8.3/en/mysql-shell-connection-socket.html

>On Unix, MySQL Shell connections default to using Unix sockets when the following conditions are met:
>A TCP port is not specified.
>A host name is not specified or it is equal to localhost.
>The --socket or -S option is specified, with or without a path to a socket file.
>If you specify --socket with no value and no equal sign, or -S without a value, the default Unix socket file for the protocol is used. If you specify a path to an alternative Unix socket file, that socket file is used.

DeepLで翻訳

>Unix では、MySQL Shell 接続のデフォルトは、以下の条件を満たす場合に Unix ソケットを使用するようになっています：
>TCPポートが指定されていない。
>ホスト名が指定されていないか、localhostと等しい。
>ソケット・ファイルへのパスの有無にかかわらず、-socketまたは-Sオプションが指定される。
>値を指定せず等号も付けない--socketまたは-S を指定した場合、そのプロトコルのデフォルトの Unix ソケット・ファイルが使用される。代替のUnixソケット・ファイルへのパスを指定すると、そのソケット・ファイルが使用される。

