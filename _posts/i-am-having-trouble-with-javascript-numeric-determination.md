---
title: "JavaScriptの数値の判定とイベントの処理で詰まったはなし"
excerpt: "みなさんこんにちは、かじりです。JavaScriptの数値の判定にはtypeofを使っていましたが結果、詰まったので共有します"
created_at: "2020-12-31 21:57:23"
updated_at: "2020-12-31 21:57:23"
tags: [javascript, number]
---

みなさんこんにちは、かじりです。JavaScriptの数値の判定にはtypeofを使っていましたが結果、詰まったので共有します

## まとめ

⭕ 数値型の判定に使う

```javascript
  const number = Number(event.target.value)
  const isNaN = Number.isNaN(number)
  if (isNaN) {
    // 文字列のときにやりたい処理
  } else {
    //数値のときにやりたい処理
  }
```


❌ 数値型の判定に使ってはいけない

```javascript
  if (typeof Number(event.target.value) === 'number') {
    // 全部この分岐に入ってくる
  } else {
    // 文字列のときにやりたい処理
  }
```


## JavaScriptで数値判定といえば

自分はこれでやってきた

```javascript
console.log(typeof 1) // 'number'
```

numberが返ってくるので

```javascript
if (typeof 1 === 'number') {
  // 数値のときにしたい処理
}
```

これでイケルと思ってた

## 今回の内容

inputのイベントonChangeをトリガーにして、inputに入力された値を取得し、それが数値であれば計算を行う。というプログラムを作成した

```html
<input onChange="handleChange">

<script>
function handleChange(event) {
  if (typeof Number(event.target.value) === 'number') {
    //数値のときにやりたい処理
  } else {
    // 文字列のときにやりたい処理
  }
}
</script>
```

これだと大問題

なにがわるいかというと

```javascript
console.log(typeof Number(1)) // 'number'
console.log(typeof Number('1')) // 'number'
console.log(typeof Number('a')) // 'number'
console.log(typeof Number(true)) // 'number'
console.log(typeof Number(false)) // 'number'
```

これらすべて、numberと返ってくる

最初意味がわからなかった(よく考えると、何が返ってくると思ったんだ、というはなしではある)

typeof なしでやるとよくわかるのだが、

```javascript
console.log(Number(1)) // 1
console.log(Number('1')) // 1 
console.log(Number('a')) // NaN
console.log(Number(true)) // 1
console.log(Number(false)) // 0
```

このようになる。

で、自分が書いたonChangeはこうなっている

```javascript
function handleChange(event) {
  if (typeof Number(event.target.value) === 'number') {
    //数値のときにやりたい処理
  } else {
    // 文字列のときにやりたい処理
  }
}
```

これやってみるとわかるのだが、event.target.valueはstringが返ってくる。

たとえ、1とか2,3を入力しても、'1', '2', '3'と文字列型で返ってくる。

文字列型で返ってきた値をNumberで型変換して、typeofしてもすべて'number'と判定されるため、自分がonChangeに書いたif文はすべて数値と判定される


```javascript
  if (typeof Number(event.target.value) === 'number') {
    // 全部この分岐に入ってくる // 数値のときにやりたい処理
  } else {
    // 文字列のときにやりたい処理
  }
```

ということでこの場合、文字列の'1'と数値の1を判定したければこのようになった

```javascript
  const number = Number(event.target.value)
  const isNaN = Number.isNaN(number)
  if (!isNaN) {
    // 数値のときにやりたい処理
  } else {
    // 文字列のときにやりたい処理
  }
```

まず、Number(event.target.value)ですべて、数値型に変換する

```javascript
  const number = Number(e.target.value)
```

入力値はstringで入ってくるので

'1' -> 1

'a' -> NaN

このように変換される

その上でNumber.isNaN(number)を行う

```javascript
  const isNaN = Number.isNaN(number)
```

これで

'1' -> 1 -> false

'a' -> NaN -> true

このように判定される

最後にif (!isNaN)で判定すると、

```javascript
  if (!isNaN) {
    // 数値のときにやりたい処理
  } else {
    // 文字列のときにやりたい処理
  }
```

自分が想定していた処理になった

なので、最初のhtmlはこうなった

```html
<input onChange="handleChange">

<script>
function handleChange(event) {
  const number = Number(event.target.value)
  const isNaN = Number.isNaN(number)
  if (isNaN) {
    // 文字列のときにやりたい処理
  } else {
    //数値のときにやりたい処理
  }
}
</script>
```

## reference

[reference qiita](https://qiita.com/taku-0728/items/329e0bee1c49b7ce7cd1)
