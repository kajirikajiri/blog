---
title: "rubyのbase64encode→decodeを日本語に実行したら失敗した"
excerpt: "みなさんこんにちは、かじりです。日本語にrubyのbase64 encode→decodeをしたら文字化けして悩んだ時の話です。実際には文字コードが違うだけでした。"
created_at: "2020-12-06 15:04:41"
updated_at: "2020-12-31 21:57:23"
tags: [ruby, base64, encode, decode]
---

みなさんこんにちは、かじりです。日本語にrubyのbase64 encode→decodeをしたら文字化けして悩んだ時の話です。実際には文字コードが違うだけでした。

## 実際の出力をオンラインエディタで確認

http://tpcg.io/aaIkeWVL

## 実際に起きたこと

```ruby
require 'base64'

encoded = Base64.encode64('おはよう')
decoded = Base64.decode64(encoded)
p decoded
# "\xE3\x81\x8A\xE3\x81\xAF\xE3\x82\x88\xE3\x81\x86"

p decoded.encoding
# #<Encoding:ASCII-8BIT>

p decoded.force_encoding('utf-8')
# "おはよう"
```

解決法まで書きましたが、force_encoding('utf-8')するといいです。

最初は英語のhelloをエンコードして成功。次に日本語も見ておくか、と思いやってみたら変な文字に。
過去にcsvの文字コードで色々やっていた同僚にhelpを求めたところ、上記解決策を教えてもらいました。
ASCII-8BITはよく知りませんが
rubyで文字がおかしくなったら、
- TEXT.encoding
で確認するようにします
