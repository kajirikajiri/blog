---
title: "ReactHookFormのperformance対応が難しいと思った"
excerpt: "みなさんこんにちは、かじりです。ReactHookFormのperformance対応が難しいと思ったはなし"
created_at: "2024-06-24 22:09:45"
updated_at: "2024-06-24 22:40:42"
tags: [ReactHookForm, React, performance, tuning]
---

みなさんこんにちは、かじりです。ReactHookForm[^react-hook-form-doc]のperformance対応が難しいと思ったはなしです。

[^react-hook-form-doc]: https://react-hook-form.com/

ReactHookFormの基本的な使い方でuseFormを使って、戻り値のwatchを使うことがあったのだが、watchを使い始めたところでReactDevToolがページ全体の再レンダリングを伝え始めたので、useWatchを使ったら再レンダリングの範囲を抑えられてめでたしめでたし。。。

だったのですが、なんでと思って、ドキュメントを見て、やっとwatch, useWatchに気づいた。

と言うのも、どれが原因なのかわからなかったから。useFormの戻り値のobjectは10個くらいのkeyを持っているし、そのkeyの値もobjectだったりする。どれが原因かわからないので、検索するにしても曖昧な感じになる。

結果的に、ReactHookFormのドキュメントにおいては、RULESという項目があり、そこに大事なことが書かれていることが多いことに気づいた。

あとは、先ほどのperformanceの問題であれば、公式ドキュメントの検索フォームでperformanceを調べれば、ある程度ヒットする。

他には、ドキュメント用のリポジトリ[^react-hook-form-doc-repo]があるので、cloneしてきて全文検索するのが早いかもしれない。

[^react-hook-form-doc-repo]: https://github.com/react-hook-form/documentation

Reactの理解が深ければいけたのか、React Hook Formの理解なのか、両方か