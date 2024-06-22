---
title: "tigのインストールと使い方(wsl2)"
excerpt: "みなさんこんにちは、かじりです。tigをインストールして使ってみました。一行取り消しや、インストール途中で発生したエラーの修正、日本語文字化けなどに対応しました。"
created_at: "2021-01-02 07:59:44"
updated_at: "2021-01-02 08:02:59"
tags: [tig, wsl2]
---

みなさんこんにちは、かじりです。tigをインストールして使ってみました。一行取り消しや、インストール途中で発生したエラーの修正、日本語文字化けなどに対応しました。

## tigとは
### repository
https://github.com/jonas/tig

repositoryで説明していた。tigとは？

> Tig is an ncurses-based text-mode interface for git. It functions mainly as a Git repository browser, but can also assist in staging changes for commit at chunk level and act as a pager for output from various Git commands.

翻訳

> Tig は ncurses ベースの git 用テキストモードインターフェースです。主に Git リポジトリブラウザとして機能しますが、チャンクレベルでのコミットのための変更のステージングを支援したり、さまざまな Git コマンドからの出力のためのページャーとしても機能します。

## environment
wsl2 ubuntu 20.04

## install
ここからはinstallしていきます

### 公式のinstallガイド
https://github.com/jonas/tig/blob/master/INSTALL.adoc

### wsl2でinstallに使ったコマンド
```bash
git clone git://github.com/jonas/tig.git
cd tig/
make prefix=/usr/local/bin
sudo make install prefix=/usr/local/bin
```

注意: 日本語が文字化けした場合は、最後の方に解決法があります。参考にしてください

## 使い方

### 基本操作

```bash
tig # tigを開く
q # tigを終了
tig
enter # 選択
h # ヘルプを開く
q # ヘルプを閉じる
q # tigを終了
```

### git add 取り消し

全てに共通する。
- addされてないファイルを選択して、作業すればaddされる
- add済みのファイルを選択して、作業すればaddが取り消される
- 作業とはadd、add取り消し。`ファイル単位ならuを押す。行単位なら1`を押す

ファイル一覧の
- Changes to be commitedはadd済み
- Changes not staged for commitedはaddしてない

例: 例えば以下画像だとChanges not staged for commitにあるREADME.mdがaddされてない

![add](assets/blog/installation-and-usage-of-tig-wsl2/add.png)

### git add 1行

```bash
tig
shift + s # 差分表示(以下に説明)
enter # ファイルを選択して
jjjj # 行を移動
1 # add される
```

#### shift + sの説明

Changes to be commited
- add済み

Changes not staged for commit
- 変更済み、addしてない

### git add ファイル

```bash
tig
shift + s
enter # ファイルを選択して
u # add される
```

### git commit

```bash
# 何かしらgit addしておいてください
tig
shift + s
shift + c
１行目にcommitメッセージを入力してエディタを終了
```

## installで発生したエラー

### error1

エラー内容

```
./autogen.sh: 17: aclocal: not found
```

解決

```
sudo apt-get install automake
```

### error2

エラー内容

日本語が文字化けする

解決

```
make configure
./configure
make prefix=/usr/local/bin
sudo make install prefix=/usr/local/bin
```

これでだめなら、.zshrcや.bashrcに以下を書いてみてください

```
export LC_ALL=en_US.UTF-8
```
