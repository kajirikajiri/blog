---
title: "git diffとgit diffの結果を比較したい"
excerpt: "みなさんこんにちは、かじりです。git diffとgit diffの結果を比較したかったので調べました。"
created_at: "2024-04-21 09:16:39"
updated_at: "2024-04-21 09:34:42"
tags: [git, diff, range-diff]
---

みなさんこんにちは、かじりです。git diffとgit diffの結果を比較したかったので調べました。

使い方の想定としては、ちょっと前に作った検証用のブランチAと今作った検証用のブランチBがあるときに、ブランチBは親のブランチが少し進んでいる場合に、ブランチAとブランチBを比較すると、親のブランチの変更が入ってくるので、過去の親とAの差分と親とBの差分を取得し、それぞれを比較したかった。黙って、両方のブランチの親を最新にすればいいといえばそうなのだが面倒。

ということで調査結果。

GPT-4に聞いて言われたのはdiffコマンドに渡すこと。stackoverflow[^stackoverflow1]にもあった。コマンドと結果は以下。

[^stackoverflow1]: https://stackoverflow.com/a/28114114


```
diff <(git diff f2f3c26fa177e80f1087d1e3dbdbd95ac4dde29e..cd9c6e2f3db3e583830afcf8681cd6f6c12516d0) <(git diff  f7cc914212255283c35164665d5396b4ad7131e2..47ba9d4b4945341d7e425bd8fe40b2143da4834e)

2c2
< index a30a52a..8b13789 100644
---
> index a30a52a..58c9bdf 100644
6c6
< -111
---
>  111
8d7
< +
```

diffコマンドにgit diffの結果を２つ渡して比較する方法

stackoverflow[^stackoverflow2]で見つけたのはこれ。

[^stackoverflow2]: https://stackoverflow.com/a/52512813

```
git range-diff E..G E'..G'
```

range-diff。出力がわかりづらかった。コマンドと出力は以下。

```
git range-diff f2f3c26fa177e80f1087d1e3dbdbd95ac4dde29e..cd9c6e2f3db3e583830afcf8681cd6f6c12516d0 f7cc914212255283c35164665d5396b4ad7131e2..47ba9d4b4945341d7e425bd8fe40b2143da4834e
1:  45f7753 = 1:  47ba9d4 Line remove
2:  cd9c6e2 < -:  ------- Line remove
```

git diffのように消えた行が出力されることを期待したが、そんな出力はなかった。

適当に作成したbranch-a[^branch-a]とbranch-b[^branch-b]を比較している。

[^branch-a]: https://github.com/kajirikajiri/toy/tree/branch-a

[^branch-b]: https://github.com/kajirikajiri/toy/tree/branch-b

git range-diffは違いがあるのか？を検出するのに使えそうだった。diffコマンドを使えば差分が見れそうだったがなんかわかりづらい。

こんな感じであれば、rebaseとかして条件揃えた方がいいか。
