---
title: "RspecでYAGNIとKISSを考えた"
excerpt: "みなさんこんにちは、かじりです。RspecでYAGNIとKISSを考えたので少しまとめました。"
created_at: "2024-04-10 22:30:58"
updated_at: "2024-04-10 22:30:58"
tags: [Rspec, YAGNI, KISS]
---

みなさんこんにちは、かじりです。RspecでYAGNIとKISSを考えたので少しまとめました。

1

```ruby
let(:user) { build(:user) }
let(:book) { build(:book, user_id: user.id) }
it do
  expect(book.id).to eq 1
end
```

2

```ruby
let(:book) do
  user = build(:user)
  build(:book, user_id: user.id)
end
it do
  expect(book.id).to eq 1
end
```

1は、テスト中では使用していないuser変数のスコープが公開されていますがuserやbookの変数がletで定義され、見た目がsimpleです。

2は、テスト中では使用していないuser変数のスコープが公開されていませんが、bookの定義が1の例に比べてちゃんと読む必要があり1よりもsimpleではないです。

なので、1はKISSが優先されており、2はYAGNIが優先されていると考えました。

私は結果として1を採用しましたが、変数がもっと多いが実際に使われている変数が少ない場合であれば2の例で書くと思います。

例えば2の例でもっと関係するモデルが多い場合は以下。これなら私はYAGNIを優先すると思いました。

3

```ruby
let(:book) do
  user = build(:user)
  author = build(:author)
  admin = build(:admin)
  bookshelf = build(:bookshelf)
  build(:book, user_id: user.id, author_id: author.id, admin: admin.id, bookshelf: bookshelf.id)
end
it do
  expect(book.id).to eq 1
end
```

