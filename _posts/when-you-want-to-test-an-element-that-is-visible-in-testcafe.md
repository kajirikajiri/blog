---
title: "testcafeで見えているelementを対象にテストしたい時"
excerpt: "みなさんこんにちは、かじりです。testcafeでinvisibleな要素(display none, visibility hidden)以外を対象にする方法を共有します"
created_at: "2020-11-22 23:14:52"
updated_at: "2020-12-31 21:57:22"
tags: [testcafe, JavaScript]
---

みなさんこんにちは、かじりです。testcafeでinvisibleな要素(display none, visibility hidden)以外を対象にする方法を共有します

## ⭕️visibleな要素のみ

```javascript
Selector().filterVisible()
```

## ❌invisibleな要素を含む

```javascript
Selector()
```

## reference

[testcafe](https://devexpress.github.io/testcafe/documentation/reference/test-api/selector/filtervisible.html)

## 解説

[testcafe](https://devexpress.github.io/testcafe/documentation/reference/test-api/selector/filtervisible.html)
> The elements that do not have display: none or visibility: hidden CSS properties and have non-zero width and height are considered visible.

日本語にすると

display: noneまたはvisibility: hiddenのCSSプロパティを持たず、widthとheightが0ではない要素はvisibleとみなされます。

となるので、以下のいずれかを含む場合はSelector.filterVisible()では検出されないということになります。

- display: none;
- visibility: hidden;
- width: 0;
- height: 0;
