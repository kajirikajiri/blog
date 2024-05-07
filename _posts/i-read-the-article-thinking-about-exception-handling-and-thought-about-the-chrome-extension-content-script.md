---
title: "「例外処理を考える」という記事を読んでchrome拡張機能のcontent scriptのことを考えた"
excerpt: "みなさんこんにちは、かじりです。例外処理とchrome拡張機能のcontent scriptについて考えました"
created_at: "2024-05-07 21:28:17"
updated_at: "2024-05-07 21:28:17"
tags: [throw, exception, error, chrome-extension]
---

みなさんこんにちは、かじりです。例外処理とchrome拡張機能のcontent scriptについて考えました

この記事[^zenn]を読んで気になりました。

[^zenn]: https://zenn.dev/koduki/articles/e9373cb78fcfef

chrome拡張機能のcontent script[^chrome-extension-content-script]やscriptのinject[^chrome-extension-scripting]は対象のサイトに対してスクリプトを実行できます。

[^chrome-extension-content-script]: https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts
[^chrome-extension-scripting]: https://developer.chrome.com/docs/extensions/reference/api/scripting

これらは対象のサイトに埋め込むので、エラーが出ても拡張機能側でエラーハンドリングがやりづらかった。

例えばchromeを使っていたら、devtoolのconsoleを見れば確認できるがわかりづらい。

なのでその場合は、戻り値を使って表現している。okプロパティにtrueかfalseを入れることは強制して、あとはいい感じにする。これをしないと、エラーの時に戻り値がなくて辛い。

先ほどのzennの記事の話に戻ると、エラーはJavaScriptのようなtry/catch方式、関数言語のようなOption/Either方式、Goのような戻り値方式がある。

場合によって使い分けたい。

例外は原則キャッチしない。は同意。

ただ、なんだっけ、JavaScriptのfetchメソッド？は400, 500とか200以外でエラーが出た気がする。あの場合はそもそも例外が出ないようにカスタムfetchを作った記憶がある。
