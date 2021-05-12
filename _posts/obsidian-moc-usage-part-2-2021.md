---
title: "Obsidian MOCの使い方 第２話"
excerpt: "前回Obsidian MOCの使い方 第１話をまとめていたら、lyt-kitが最新版になっていることに気づきました。その時おっ、これいいやん、ってなったやつをパクってきたらいい感じになったので記事にまとめてみました。前回には無かったタグの使い方、MOCの連携方法についてまとめています。以前より繋がりが見えやすくなり、とても気に入っています。途中で面倒だったタグの一括置換についても紹介しています。"
coverImage: "/assets/blog/obsidian-moc-usage-part-2-2021/cover.svg"
date: "2021-05-08 10:57:46"
author:
  name: かじり
  picture: "/me.png"
ogImage:
  url: "/ogp/1200x630.png"
category:
  first: editor
  second: obsidian
tags: [obsidian]
---

[前回](/obsidian-moc-usage-2021)MOCの使い方についてまとめましたが、なんかおしいんだよなーっていう気持ちでした。それで[lyt-kit](https://publish.obsidian.md/lyt-kit/)を見ていて、これいいやん！ってやつを真似してみたらいい感じにまとまったので紹介します。たぶんMOCはObsidianのバージョンに関係なく使えると思いますが、一応今のObsidianのバージョンはv0.11.13です

あ、書いてて思ったんですが、テキストや画像で分かりづらい場合は実際に[lyt-kit](https://publish.obsidian.md/lyt-kit/)を開いてみて、[Home MOC](https://publish.obsidian.md/lyt-kit/%2BHome)や[Interests MOC](https://publish.obsidian.md/lyt-kit/Umami/Interests+MOC)を触ってみるとイメージがつかめると思います

## Table of Contents

## 全体の超端折った概要

- MOCとMOCをlinkでつなぎます
- MOCの中でタグを使い、MOCの中で分類します
- 自分の場合こんな感じです。 Home MOC > Interests MOC > Programming MOC > YYYYMMDDHHmmss-JavaScript-debug(タグとして、 #programming/JavaScript #debug #console)

## Interests MOCの使い方

[前回 lyt-kitのMOCの使い方](/obsidian-moc-usage-2021#lyt-kit%E3%81%AEmoc%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9)のところで書いたのですが、[lyt-kit](https://publish.obsidian.md/lyt-kit/)では[Interests MOC](https://publish.obsidian.md/lyt-kit/Umami/Interests+MOC)を使用しています。

![Interests MOC](/assets/blog/obsidian-moc-usage-part-2-2021/interests-moc.png)

このようにパット見すごくごちゃごちゃしていて、あまり見たく無かったのですが(え)、[Interests MOC](https://publish.obsidian.md/lyt-kit/Umami/Interests+MOC)をちゃんと見てみると[Home MOC](https://publish.obsidian.md/lyt-kit/%2BHome)みたいになってます。どこらへんが[Home MOC](https://publish.obsidian.md/lyt-kit/%2BHome)みたいかというと、下の方に[Commentary on an A-Z list of MOCs](https://publish.obsidian.md/lyt-kit/Umami/Interests+MOC#Commentary+on+an+A-Z+list+of+MOCs)という行があるんですが、その下のあたりが[Home MOC](https://publish.obsidian.md/lyt-kit/%2BHome)のようになっています。

Commentary on an A-Z list of MOCs | Home MOC
---- | ---- 
![Commentary on an A-Z list of MOCs](/assets/blog/obsidian-moc-usage-part-2-2021/example-moc.png)|![Home MOC](/assets/blog/obsidian-moc-usage-part-2-2021/home-moc.png)

すこし見た目は違いますが、他の行も [Home MOC](https://publish.obsidian.md/lyt-kit/%2BHome)のように[MOC]を集めたグループのようになっています

![Interests MOC](/assets/blog/obsidian-moc-usage-part-2-2021/other-mocs.png)

なので、[Interests MOC](https://publish.obsidian.md/lyt-kit/Umami/Interests+MOC)は[Home MOC](https://publish.obsidian.md/lyt-kit/%2BHome)のグループのように扱っているようです。

テキストや画像で分かりづらい場合は実際に[lyt-kit](https://publish.obsidian.md/lyt-kit/)を開いてみて、[Home MOC](https://publish.obsidian.md/lyt-kit/%2BHome)や[Interests MOC](https://publish.obsidian.md/lyt-kit/Umami/Interests+MOC)を触ってみるとイメージがつかめると思います

## MOCの中でのMOCの使い方

[上段で説明したように](/obsidian-moc-usage-part-2-2021#interests-moc%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9)[Interests MOC](https://publish.obsidian.md/lyt-kit/Umami/Interests+MOC)は[Home MOC](https://publish.obsidian.md/lyt-kit/%2BHome)のグループのようになっています。

[Home MOC](https://publish.obsidian.md/lyt-kit/%2BHome) > [Interests MOC](https://publish.obsidian.md/lyt-kit/Umami/Interests+MOC) > MOCのまとまり で階層になるイメージでつないでいきます。

**実際に[lyt-kit](https://publish.obsidian.md/lyt-kit)では[Home MOC](https://publish.obsidian.md/lyt-kit/%2BHome) > [Interests MOC](https://publish.obsidian.md/lyt-kit/Umami/Interests+MOC) > [Language MOC](https://publish.obsidian.md/lyt-kit/Umami/Language+MOC) > English Language MOC というように何層にもつながっています**

テキストや画像で分かりづらい場合は実際に[lyt-kit](https://publish.obsidian.md/lyt-kit/)を開いてみて、[Home MOC](https://publish.obsidian.md/lyt-kit/%2BHome)や[Interests MOC](https://publish.obsidian.md/lyt-kit/Umami/Interests+MOC)を触ってみるとイメージがつかめると思います

### MOCの上段にリンク[^1]を設置する

[^1]: [リンクの設置方法はこちら](/obsidian-usage-2021#%E3%83%AA%E3%83%B3%E3%82%AF%E3%82%92%E4%BD%BF%E3%81%86)

**リンクの設置は最初はわかりづらいと思うので[こちら](/obsidian-usage-2021#%E3%83%AA%E3%83%B3%E3%82%AF%E3%82%92%E4%BD%BF%E3%81%86)を参照してください。**

ここがポイントですが、[Interests MOC](https://publish.obsidian.md/lyt-kit/Umami/Interests+MOC)の一番上の行に[Home MOC](https://publish.obsidian.md/lyt-kit/%2BHome)へのリンク[^2]があります
他にも、[Language MOC](https://publish.obsidian.md/lyt-kit/Umami/Language+MOC)の上には[Interests MOC](https://publish.obsidian.md/lyt-kit/Umami/Interests+MOC)へのリンクがあります。

[^2]: +Homeってやつです

Interests MOC | Language MOC
---- | ---- 
![Interests MOC](/assets/blog/obsidian-moc-usage-part-2-2021/interests-moc-top.png)|![Language MOC](/assets/blog/obsidian-moc-usage-part-2-2021/language-moc-top.png)

これがあれば、[Home MOC](https://publish.obsidian.md/lyt-kit/%2BHome)から[Interests MOC](https://publish.obsidian.md/lyt-kit/Umami/Interests+MOC)。[Interests MOC](https://publish.obsidian.md/lyt-kit/Umami/Interests+MOC)から[Home MOC](https://publish.obsidian.md/lyt-kit/%2BHome)への移動が可能になります。また、ファイルの繋がりがわかりやすくなります。

![toggle moc](/assets/blog/obsidian-moc-usage-part-2-2021/home-toggle-interests.png)

テキストや画像で分かりづらい場合は実際に[lyt-kit](https://publish.obsidian.md/lyt-kit/)を開いてみて、[Home MOC](https://publish.obsidian.md/lyt-kit/%2BHome)や[Interests MOC](https://publish.obsidian.md/lyt-kit/Umami/Interests+MOC)を触ってみるとイメージがつかめると思います

## MOCとタグを一緒に使う

ここまでで、MOCのつなぎ方がわかっていればいいな
ということで、つぎはタグを使います。

[lyt-kit](https://publish.obsidian.md/lyt-kit)では[Writings MOC](https://publish.obsidian.md/lyt-kit/Umami/Writings+MOC)がわかりやすいと思います。

![writings moc](/assets/blog/obsidian-moc-usage-part-2-2021/writings-moc.png)

### タグを/で区切る

タグが`/`で区切られています。このようにして、分類していきます。
これObsidianの仕様だと思いますが、ObsidianのTag検索で例えばmoneyタグが存在するノートを探そうとして、`tag:#mone`と検索しても出てきません。`tag:#money`と入力した時に、moneyタグのノートが見つかります。ただ、`tag:#money`を入力した場合、moneyタグとmoney/accountタグのように、`/`で区切ったものも見つかります。まとめると

🔍 `tag:#moneyで検索`
💡️ みつかる
- `#money`
- `#money/account`
- `#money/investment`
- `#money/virtualCurrency`
- `#money/virtualCurrency/bitcoin`
✖ みつからない
- `#mone`

このようになっていて、`/`で区切ったものは見つかるようです。

たぶんこの仕様はどこかに書いてあるんだと思いますが見つけれていません。

ですが、上記のようになっているので`/`でタグを区切るというのはいい作戦です。
入力補完で見つける事ができますし、検索でもmoneyからmoney/accountが見つけられるので便利です。

## 実際にどういうMOCの使い方になるの？

### ディレクトリ構成

lyt-kit | 自分
---- | ---- 
![lyt-kit](/assets/blog/obsidian-moc-usage-part-2-2021/lyt-kit.png) |![my-obsidian](/assets/blog/obsidian-moc-usage-part-2-2021/my-obsidian.png)

ディレクトリはこのようになっています。
また、[lyt-kit](https://publish.obsidian.md/lyt-kit)は実際に触ってみるとわかりやすいです。

lyt-kitは
Sourcesに画像や音声、資料をまとめています
Timestampsはタイムスタンプ付きのファイル
Umamiはいろんな味が合わさった旨味。。いろんな情報が混ざった場所みたいな感じらしいです。
+Homeが[Home MOC](https://publish.obsidian.md/lyt-kit/%2BHome)ですね

自分のは
Brainがlyt-kitのUmami(Umamiって言いたいことはわかるけどなんか違うねんっておもた)
Templatesがpluginのためのtemplateファイル
Workが会社名やプロジェクト名ごとにディレクトリわけされています。

### 自分のいつもの使い方

1. Daily notes(ObsidianのCore plugins)のショートカットキー起動でファイル名にTimestampがついたファイルが生成されます。(ディレクトリは Brain > Timestamps > DailyNotes　にファイルが作成されます。)
2. YYYYMMDDHHmmssが最初から入力されてるんで、後ろにjavascript-debugとかにゅうりょくして、YYYYMMDDHHmmss-javascript-debugとか作ります。
3. ファイル入力状態になったら、一番上にMOCへのリンクを入力します(今回はProgrammingです)
4. 一番下にはタグを書きます。(programming/javascript, debugのタグを追加します)
5. 後は真ん中に console.log('kajiri')とか書いておきます。

以上でこんな感じになります

![example input](/assets/blog/obsidian-moc-usage-part-2-2021/example-input.png)

あとは、Programming MOCって何あったっけって思ったらProgramming MOCをクリックします

![programming moc](/assets/blog/obsidian-moc-usage-part-2-2021/programming-moc.png)

最初の方で説明した感じの構成で一番上にMOCの名前下にタグ一覧です。

このMOCは [Home MOC](https://publish.obsidian.md/lyt-kit/%2BHome) > [Interests MOC](https://publish.obsidian.md/lyt-kit/Umami/Interests+MOC) > Programming MOC って感じの繋がりなので、一番上には[Interests MOC](https://publish.obsidian.md/lyt-kit/Umami/Interests+MOC)へのリンクがあります。

[Interests MOC](https://publish.obsidian.md/lyt-kit/Umami/Interests+MOC)の上には[Home Moc](https://publish.obsidian.md/lyt-kit/%2BHome)へのリンクがあります。

![interests moc example](/assets/blog/obsidian-moc-usage-part-2-2021/interests-moc-example.png)

[Home MOC](https://publish.obsidian.md/lyt-kit/%2BHome)はこうです

![home moc example](/assets/blog/obsidian-moc-usage-part-2-2021/home-moc-example.png)

以上になります

## 参考

こちらの記事も参考になるかも知れません

[１年使ってわかったObsidianの使い方](/obsidian-usage-2021)
[Obsidian MOCの使い方 第１話](/obsidian-moc-usage-2021)

## あとがき

もじにまとめると意味不明になるんで実際に[lyt-kit](https://publish.obsidian.md/lyt-kit)や画像を参照してみてください

以上です。[不滅のあなたへ](https://anime-fumetsunoanatae.com/)(公式)[^3]、[ひげひろ](http://higehiro-anime.com/)(公式)[^4]いいよ

[^3]: [不滅のあなたへ](https://amzn.to/3xQMXGe) ← プライムビデオ見てる人
[^4]: [ひげひろ](https://amzn.to/2SxkZ21) ← プライムビデオ見てる人

### 番外編 タグの一括置換

これはvscode入れてね！ってことになるんですが、（Obsidianの機能にはみつからない）
簡単に言うと、vscodeで調べたいタグ`#kajiri`とかで全文検索します。で、全部一括置換します。

### 番外編 タグの抜き出し

メインじゃないんで端折ります。多分伝わないかも知れません。ゆるしてください
タグを`/`で区切るのはいいんですが、膨大になってくると、管理が辛いです。そこで`#programming`から始まるタグを全部抜き出したくなります。
これもvscode入れてね！あと、vim拡張入れてねってことになるんですが、（Obsidianの機能にはみつからない）
vscodeの[search editor](https://code.visualstudio.com/updates/v1_43#_search-editors)で`#programming`全検索してください。すると、検索結果がテキストで出力されるので、結果のテキストをすべてコピーして別のファイルに貼り付けます。その後、`#programming`で検索して、`ctrl/cmd + shift + l`で`#programming`を全選択状態にします。ここでカーソルを一つ戻して、vimの`shift + e`で次の空白までを全選択します。これで`#programming`から始まるタグが全選択されるので、これをコピーして、別のファイルに貼り付けます。あとは重複業を削除すればいいので、[qiita](https://qiita.com/ucan-lab/items/b82d9c698b2cb3d76e79)に従って、超副業を削除します。たぶん伝わらないです。ゆるしてください
