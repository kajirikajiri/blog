---
title: "algoliaをブログに実装してみた"
excerpt: "全文検索サービスのalgoliaをブログに実装してみました。その中で、nextjsのssgを使ってビルド時にalgoliaに検索インデックスを送信する方法とインデックスを削除する方法が若干つまづいたので記事にしようと思いました。algoliaの検索は超高速で実行されます。そもそもの情報量が少ないために高速かもしれない可能性もありますが。algoliaのページのresponseが0msって書いてあったんで、0msで返答してるのかなと思っています。"
coverImage: "/assets/blog/engineer-side-job-once-a-week/cover.svg"
date: "2021-05-10 21:40:31"
author:
  name: かじり
  picture: "/me.png"
ogImage:
  url: "/ogp/1200x630.png"
category:
  first: blog
  second: algolia
tags: [algolia, blog]
---


## 実装の参考になるページです。
https://www.algolia.com/doc/guides/building-search-ui/widgets/create-your-own-widgets/react/
https://qiita.com/mktu/items/f3f74a36c4a1ca447f22

## indexのclearと追加のところもかけそう
algoliaの検索用recordsを追加する方法は様々あります

![algolia-add-records](/assets/blog/blog-with-algolia/algolia-add-records.png)

- Upload file
  - 記事執筆時はJSON, CSV, TSVがあります(2021/05/11)
- Use the API
- Add manually
  - editorがブラウザに表示され、入力することで追加できます

自分がやったUse the APIを紹介します

github上では[この](https://github.com/kajirikajiri/jamstack-tech-blog/blob/5735dec/presentations/pages/index.tsx#L93)ファイルになります

```javascript
import algoliasearch from "algoliasearch";
const client = algoliasearch(appId, apiKey);
client
  .initIndex("kajiri.dev")
  .clearObjects()
  .then(() => {
    client
      .initIndex("kajiri.dev")
      .saveObjects(allPostsForAlgolia)
      .then(({ objectIDs }) => {
        console.log(objectIDs);
      })
      .catch((reason) => {
        console.log(reason);
      });
  });
```

まず、algoliaの初期化をします

```javascript
const client = algoliasearch(appId, apiKey);
```

appIdとapiKeyはalgoliaのダッシュボードのAPI Keysにあります

![algolia-side-navigation](/assets/blog/blog-with-algolia/algolia-side-navigation.png)

次にinitIndexですが、このindexはalgoliaに登録する流れで作成済みだと思いますが、なければ下記のようにIndicesの横から追加できるはずです。

![algolia-indices](/assets/blog/blog-with-algolia/algolia-indices.png)

```javascript
client
  .initIndex("kajiri.dev")
```

次に clearObjectsです。

```javascript
  .clearObjects()
```

これはrecordsのデータが削除されます。設定、ルールや同義語は消去されないそうです。

> Clear the records of an index without affecting its settings.
> This method enables you to delete an index’s contents (records) without removing any settings, rules and synonyms.
> If you want to remove the entire index and not just its records, use the delete method instead.
> Clearing an index will have no impact on its Analytics data because you cannot clear an index’s analytics data.
> Clearing an index counts as one operation. Note, however, that this operation is expensive:

日本語訳

> 設定を変えずにインデックスのレコードを消去する
> このメソッドは、設定、ルール、および同義語を削除することなく、インデックスのコンテンツ（レコード）を削除することができます。
> インデックスのレコードだけでなく、インデックス全体を削除したい場合は、代わりにdeleteメソッドを使用します。
> インデックスのアナリティクス データをクリアすることはできないため、インデックスをクリアしてもアナリティクスデータに影響はありません。
> インデックスのクリアは1つの操作としてカウントされます。ただし、この操作は高価であることに注意してください。

これは人によって使わないかも知れません。自分の使い方は、

1. gitにpush
2. github actionでcloudflare pagesのビルドが開始
3. ビルドの中でブログの記事をalgoliaに登録する。

といった流れになっています。このとき、 `objectID` によって、algoliaのrecordは一意になっています。しかし、記事を削除したときのことを考えると、recordの削除をしなければいけないのですが、実装が面倒でした（gitのcommit履歴から変更内容を取得して、mdが削除されていたら、algoliaのrecordsを消す。もしくは手動でrecordsから消す）。なので、登録されているrecordsを一旦全削除し、その後にすべて一括で追加しています。不安としては記事が1000とかなったら、毎回結構な通信量になるかな？というのがありますが、まあその時に対処しようと思っています。

おわります

## algoliaによってcategoryの意味が失われたあたりも記事にできそう