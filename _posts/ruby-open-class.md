---
title: "rubyのopen classを試す"
excerpt: "みなさんこんにちは、かじりです。open classを使って機能拡張する場面があったので試したログです。"
created_at: "2024-03-25 17:30:47"
updated_at: "2024-03-25 17:30:47"
tags: [ruby, OpenClass, eagerLoad]
---

みなさんこんにちは、かじりです。rubyのopen classを使ってみました！

```rb
pp 'load anago.rb'
pp Rails.env
class Anago
  def self.run
    puts 'アナゴ'
  end
end
```

```rb
pp 'load buri.rb'
pp Rails.env
class Buri
  def self.run
    Anago.run
  end
end
class Anago
  def self.run
    puts 'ブリ'
  end
end
```

この状態でbundle exec rails runner Anago.runとBuri.runをすると、それぞれ、アナゴとブリが出力される。
また、railsの設定のconfig.eager_loadを1,0に切り替えるとまた違った出力が出てくる。ファイル名が関わってくるので、場合によるけど、どちらもブリになったりする。おもしろ
