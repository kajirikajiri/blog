---
title: "vscodeにsolargraphをいれようとしたら最新版が入ってエラー"
excerpt: "みなさんこんにちは、かじりです。vscodeにsolargraphを入れようとしたら、最新のversionがinstallされてしまいエラーが発生したので修正した時のことを共有します"
created_at: "2020-12-05 23:23:20"
updated_at: "2020-12-31 21:57:23"
tags: [vscode, solargraph, ruby]
---

みなさんこんにちは、かじりです。vscodeにsolargraphを入れようとしたら、最新のversionがinstallされてしまいエラーが発生したので修正した時のことを共有します

## 環境

- windows 10
- wsl2 Ubuntu 20.04
- rbenv

## 1.bundler が古く、solargraphがエラーを出力

```ruby
gem install solargraph -v 0.31.2
```

今回solargraphを入れたプロジェクトでは、bundlerのバージョンが1.16.1と古かった(Gemfile.lockの一番下に書いてある　BUNDLED WITH)。この場合、solargraphのバージョンは古いものを使用することになる。現在(2020/09/27)はsolargraphの最新は0.39.16のようだが、bundler 1.16.1では0.31.2のsolargraphが使えるらしい[link](https://qiita.com/lp-peg/items/58f49c2f4920f363370b#2system%E3%81%A7%E4%BD%BF%E3%81%86solargraph%E3%81%AE%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3%E3%82%92%E4%B8%8B%E3%81%92%E3%82%8B)。なので上記コマンドを使って、solargraphを古いバージョンでインストールする。

もし、新しいバージョンのsolargraphを使っていた場合、solargraphを実行しようとして、下記エラーがでるはず。

```bash
solargraph -v
Traceback (most recent call last):
        8: from /home/kajiri/.rbenv/versions/2.5.1/bin/solargraph:23:in `<main>'
        7: from /home/kajiri/.rbenv/versions/2.5.1/lib/ruby/2.5.0/rubygems.rb:309:in `activate_bin_path'
        6: from /home/kajiri/.rbenv/versions/2.5.1/lib/ruby/2.5.0/rubygems.rb:309:in `synchronize'
        5: from /home/kajiri/.rbenv/versions/2.5.1/lib/ruby/2.5.0/rubygems.rb:310:in `block in activate_bin_path'
        4: from /home/kajiri/.rbenv/versions/2.5.1/lib/ruby/2.5.0/rubygems/specification.rb:1440:in `activate'
        3: from /home/kajiri/.rbenv/versions/2.5.1/lib/ruby/2.5.0/rubygems/specification.rb:1458:in `activate_dependencies'
        2: from /home/kajiri/.rbenv/versions/2.5.1/lib/ruby/2.5.0/rubygems/specification.rb:1458:in `each'
        1: from /home/kajiri/.rbenv/versions/2.5.1/lib/ruby/2.5.0/rubygems/specification.rb:1469:in `block in activate_dependencies'
/home/kajiri/.rbenv/versions/2.5.1/lib/ruby/2.5.0/rubygems/dependency.rb:312:in `to_specs': Could not find 'bundler' (1.16.6) required by your /home/kajiri/ghq/github.com/Gemfile.lock. (Gem::MissingSpecVersionError)
To update to the lastest version installed on your system, run `bundle update --bundler`.
To install the missing version, run `gem install bundler:1.16.6`
Checked in 'GEM_PATH=/home/kajiri/.gem/ruby/2.5.0:/home/kajiri/.rbenv/versions/2.5.1/lib/ruby/gems/2.5.0', execute `gem env` for more information
```

version指定をせず、gem install solargraphとした場合、bundlerのバージョンを気にしないでインストールするようで、最新バージョンのsolargraphがインストールされてしまう。

また、上記エラーが発生している状態で別のディレクトリでsolargraphを実行すると動いたりするが、これはbundlerのバージョンが異なっているために(rbenvとかで)発生していた。

## 2.bundlerのバージョンが間違っている場合

```ruby
rbenv global YOUR_RUBY_VERSION
```

上でも書いたが、BUNDLED WITHがGemfile.lockに書いてある。このバージョンと自分のbundlerのバージョンが違うと、不具合が起きやすいので揃えた方がいい。
自分の場合、rbenvを使っていて、rbenv globalに指定したrubyのバージョンで導入したbundlerとBUNDLED WITHに指定されたbundlerのバージョンが違うために、bundle install に失敗することがあった。

## 3.vscodeの設定

```json
  "solargraph.useBundler": false,
  "solargraph.commandPath": "/home/kajiri/.rbenv/shims/solargraph", // YOUR solargraph path
```

今回のプロジェクトにはsolargraphが入っていなかったのでsystemの（自分のローカルにinstallしている)solargraphを使用した。その場合、vscodeのsettings.jsonに上記設定を書き込む必要がある。commandPathがわからない場合、

```bash
which solargraph
```

で出力されたものを使用すればいいと思う。プロジェクトにsolargraphが入っている場合、solargraph.useBundler: trueで動くと思うがその状況になったことがまだない。

## おまけ
クラス名をクリックして移動できるとやっぱり楽！solargraphはぜひ入れましょう

## link
[rbenv](https://github.com/rbenv/rbenv)

