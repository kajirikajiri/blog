---
title: "react.createElementはArrayをうまく処理しているようだ"
excerpt: "みなさんこんにちは、かじりです。description: react.createElementの動作が謎だったので調べてみたので共有します。"
created_at: "2020-12-06 20:02:50"
updated_at: "2020-12-06 20:02:50"
tags: [React, JavaScript, createElement]
---

みなさんこんにちは、かじりです。description: react.createElementの動作が謎だったので調べてみたので共有します。

[https://ja.reactjs.org/docs/lists-and-keys.html#rendering-multiple-components](https://ja.reactjs.org/docs/lists-and-keys.html#rendering-multiple-components)
> 要素の集合を作成し中括弧 {} で囲むことで JSX に含めることができます。

[https://ja.reactjs.org/docs/introducing-jsx.html#embedding-expressions-in-jsx](https://ja.reactjs.org/docs/introducing-jsx.html#embedding-expressions-in-jsx)
> Babel は JSX を React.createElement() の呼び出しへとコンパイルします。

[https://ja.reactjs.org/docs/introducing-jsx.html#jsx-represents-objects](https://ja.reactjs.org/docs/introducing-jsx.html#jsx-represents-objects)
> このようなオブジェクトは “React 要素” と呼ばれます。これらは画面に表示したいものの説明書きとして考えることができます。React はこれらのオブジェクトを読み取り、DOM を構築して最新に保ちます。

ReactElementじゃないのか？？ React要素と同じことだと思うけど、ReactElement === React要素ではない気がする

```javascript
function list (tasks: Tasks[]): ReactElement {
  const result: ReactElement[] = tasks.map(element => {
    return (
      <div>{element.name}</div>
    )
  });
  return (
    <div>{result}</div>
  )
}
```

しかし、ReactElement[]をうまいこと展開してくれるのは便利。

[https://ja.reactjs.org/docs/introducing-jsx.html#jsx-represents-objects](https://ja.reactjs.org/docs/introducing-jsx.html#jsx-represents-objects)
> 以下の 2 つの例は等価です：

```javascript
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

React.createElementすげえ

自分で使っても行けるのかと思ったけど無理だった。
```javascript
return React.createElement(
  <div>{result}</div>
)
```

'div'とかにすればいいのか？

```javascript
  return createElement(
    'div',
    '',
    result
  )
```

うごいたよこれは！！
タグ名, クラス名とか, childか。

勝手に展開してくれるなら、見た目てきにもわかりやすいから普通にreturn ()したほうがいいな。
