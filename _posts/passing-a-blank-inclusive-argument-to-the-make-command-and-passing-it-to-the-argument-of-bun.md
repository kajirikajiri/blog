---
title: "Makeコマンドに空白込みの引数を渡してbunの引数に渡す"
excerpt: "みなさんこんにちは、かじりです。Makeコマンドに引数を渡してbunの引数に渡す方法を調べました"
created_at: "2024-05-06 12:41:05"
updated_at: "2024-05-06 13:17:20"
tags: [Makefile, JavaScript, Bun, arguments]
---

みなさんこんにちは、かじりです。Makeコマンドに引数を渡してbunの引数に渡す方法を調べました

順番に上から

1. ターミナルで実行するコマンド
2. Makefile
3. JavaScript

```bash
make arguments a='aaa bbb ccc'
```

```makefile
arguments:
	bun arguments.js '$(a)'
```

```javascript
console.log(process.argv[2])
```

makeコマンドは調べた[^makefile-env] [^makefile-variable-reference]感じ、bashやshみたいに全ての引数を表す変数がないので、変数名を決めて渡す必要がある。どうしてもという場合はこんな感じ [^makefile-arguments] らしいが検証してない。

[^makefile-env]: https://www.gnu.org/savannah-checkouts/gnu/make/manual/html_node/Environment.html

[^makefile-variable-reference]: https://www.gnu.org/savannah-checkouts/gnu/make/manual/html_node/Reference.html

[^makefile-arguments]: https://askubuntu.com/a/1448109

また、makefileでbunのコマンドを呼び出す時にも、single quoteをつけることで１つの引数として渡すようにする。

私がこれらを調査して作ったのはこちら[^github]

[^github]: https://github.com/kajirikajiri/blog/commit/b39eb5eb9af81808a5678f3aa99e233a82741798
