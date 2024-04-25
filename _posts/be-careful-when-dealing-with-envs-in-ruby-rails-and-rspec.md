---
title: "RubyやRails、RspecでENVを扱う時に気をつけること"
excerpt: "みなさんこんにちは、かじりです。RubyでENVを扱う時に気をつけることをまとめました"
created_at: "2024-04-25 20:52:48"
updated_at: "2024-04-25 21:07:50"
tags: [Ruby, Rails, Rspec, ENV]
---

みなさんこんにちは、かじりです。RubyでENVを扱う時に気をつけることをまとめました

今回私はRspecでENV[^ENV]を扱う時に、次のようにしました。

[^ENV]: https://docs.ruby-lang.org/ja/latest/class/ENV.html#S_--5B--5D

```ruby
ENV['variable'] = 1
```

これでは問題があり、これ以降のテストでも同じ値が使われていました。

今回の場合、こちらの記事[^Appirits]のようにするとうまくいきました。

[^Appirits]: https://spirits.appirits.com/doruby/9473/

```ruby
before do
  allow(ENV).to receive(:[]).and_call_original
  allow(ENV).to receive(:[]).with('variable').and_return(1)
end
```

このようにすると、ENV['variable']の場合は1を返し、それ以外はオリジナルの動作をします。

また、先ほどの記事にENVから値を取得するときに気をつけることが書いてあります。

```ruby
ENV.fetch('variable')
```

これには利点があって、環境変数にvariableが未定義の場合にエラーになります[^ENV.fetch]。

[^ENV.fetch]: https://docs.ruby-lang.org/ja/latest/class/ENV.html#S_FETCH

ENV['variable']だとエラーがでません。また、以下のように未定義の場合の動作を設定することもできます。

```ruby
ENV.fetch('variable', nil)
```

これで未定義の場合はnilになります。

