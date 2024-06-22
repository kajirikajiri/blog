---
title: "attr_accessorで生成される値の初期値について悩んだ"
excerpt: "みなさんこんにちは、かじりです。attr_accessorで生成される値の初期値について考えてみたのですが、考えてみたら値を代入したらそれで、代入しなかったらnilだなって思いました"
created_at: "2020-12-06 16:02:25"
updated_at: "2020-12-31 21:57:23"
tags: [attr_accessor, rails]
---

みなさんこんにちは、かじりです。attr_accessorで生成される値の初期値について考えてみたのですが、考えてみたら値を代入したらそれで、代入しなかったらnilだなって思いました

## 結果をオンラインエディタで確認

http://tpcg.io/kEJ3mtih

## 雑に書いたサンプル

```ruby
class Person
  attr_accessor :hand
  def initialize(params={})
    @hand = params[:hand]
  end
end

ben = Person.new(hand: 8)
p ben.hand
# 8

pen = Person.new
p pen.hand
# nil
```

hand8ってなんやねん。10だろ。fingerか
