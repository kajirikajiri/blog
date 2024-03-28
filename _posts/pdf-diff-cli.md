---
title: "pdfのdiffを見たい"
excerpt: "みなさんこんにちは、かじりです。pdfのdiffを確認したいことがあり調べました"
created_at: "2024-03-28 21:07:53"
updated_at: "2024-03-28 21:07:53"
tags: [pdf, diff, cli]
---

みなさんこんにちは、かじりです。pdfのdiffが見たいなと前から思っていたので、やり方を調べました。

これをダウンロード。

https://github.com/vslavik/diff-pdf

macだったのでbrewで入れた

実際の確認はこのコマンドがおすすめ。GUIで見れる。ブラウザだった気がする。

```
diff-pdf --view a.pdf b.pdf
```