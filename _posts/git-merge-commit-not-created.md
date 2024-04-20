---
title: "gitのmergeコミットが作成されない"
excerpt: "みなさんこんにちは、かじりです。gitのmergeコミットが作成されないので調べました。"
created_at: "2024-04-20 22:02:46"
updated_at: "2024-04-20 22:15:46"
tags: [git, merge]
---

みなさんこんにちは、かじりです。gitのmergeコミットが作成されないので調べました。

ブランチAとブランチAからcheckoutしたブランチBがあるとき、ブランチAに変化がなく、ブランチBにだけコミットが追加され、ブランチAにブランチBをマージするとき、Fast-forwardマージとなりマージコミットが作成されない。 [^qiita]

[^qiita]: https://qiita.com/shyamahira/items/59ff8aa1cf7b893aab60

また、mergeコミットを作成したい場合は--no-ffオプションをつけてmergeすれば良い。

ということで手元で確認したところ、mergeコミットが作成された。

gitのnetwork[^git-network]で確認するか、git log --graphでわかりやすく確認できます。

[^git-network]: https://github.com/kajirikajiri/toy/network
