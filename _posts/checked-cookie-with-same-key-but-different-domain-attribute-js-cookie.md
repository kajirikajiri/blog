---
title: "keyが同じでdomain属性が別のcookieを調べた(js-cookie)"
excerpt: "みなさんこんにちは、かじりです。js-cookieの場合は先に見つかった値が取得できるようです。また、domain属性はdocument.cookieに含まれないのでdomainを指定した取得はできません。"
created_at: "2021-01-11 22:49:44"
updated_at: "2021-01-11 22:49:44"
tags: [cookie, js-cookie]
---

みなさんこんにちは、かじりです。js-cookieの場合は先に見つかった値が取得できるようです。また、domain属性はdocument.cookieに含まれないのでdomainを指定した取得はできません。

## js-cookieの返り値はstring|undefined
package.jsonのversionが下記でvscode上ではCookies.getの返り値はstring|undefinedとなっていた

```json
{
  "@types/js-cookie": "^2.2.6",
  "js-cookie": "^2.2.1",
}
```

```javascript
import Cookies from 'js-cookie'
Cookies.get('hoge') // <- string
```

## document.cookieには同じkeyの値を複数設定することができる
しかし、もしcookieにdomainを指定した場合、userがkeyに指定されたcookieは複数見つかる

```javascript
document.cookie = "user=ja.reactjs.org;domain=ja.reactjs.org"
// "user=ja.reactjs.org;domain=ja.reactjs.org"

document.cookie
// "user=ja.reactjs.org"

document.cookie = "user=reactjs.org;domain=reactjs.org"
// "user=reactjs.org;domain=reactjs.org"

document.cookie
// "user=ja.reactjs.org; user=reactjs.org"
```

## js-cookieは特定の属性を指定してcookieを読むことはできない
[js-cookieのREADME](https://github.com/js-cookie/js-cookie#basic-usage)
>Note: It is not possible to read a particular cookie by passing one of the cookie attributes (which may or may not have been used when writing the cookie in question):

日本語訳
>注意: クッキーの属性(問題のクッキーを書くときに使われたかもしれないし、使われていないかもしれない)の一つを渡すことで、特定のクッキーを読むことはできません。

## js-cookieのgetは実装がどうなっている
[js-cookieのgetの実装](https://github.com/js-cookie/js-cookie/blob/eceefcc0be5bcb07d6ca32b03978e2c6f8cc848e/src/api.mjs#L50)

たしかに見た限りでは属性を見ていない。また、指定したキーが見つかった場合にbreakしているので複数の値が設定されていたとしても最初の１つを返すようだ

## 特定のdomainのcookieを消したいときにどうすればよいのか
[stackoverflow:特定のcookieを消す必要がある](https://stackoverflow.com/questions/2959010/how-to-get-the-domain-value-for-a-cookie-in-javascript#:~:text=To%20read%20a%20cookie%20that,and%20read%20it%20from%20there.&text=specificity%2C%20eg.%3A-,document.,%3A00%20GMT'%3B%20document.)
>Sorry, all you get is what you see in document.cookie. The cookie metadata like path, domain and expires are not visible to site code (neither to JavaScript nor to the server-side).

日本語訳
申し訳ありませんが、document.cookieに表示されているものしか表示されません。パス、ドメイン、有効期限などのクッキーのメタデータはサイトコードからは見えません(JavaScriptからもサーバー側からも見えません)。

>If, as you say, you only need to remove a cookie, what you could do is try to remove the cookie at every possible level of specificity, eg.:

日本語訳
>あなたが言うように、クッキーを削除する必要があるだけならば、あなたができることは、例えば、可能な限りの特異性のレベルでクッキーを削除しようとすることです。

## document.cookieはdomainを取得できないのかためした
たしかにdocument.cookieはdomainを取得できない

```javascript
document.cookie = "user=ja.reactjs.org;domain=ja.reactjs.org"
// "user=ja.reactjs.org;domain=ja.reactjs.org"
document.cookie
// "user=ja.reactjs.org"
document.cookie = "user=reactjs.org;domain=reactjs.org"
// "user=reactjs.org;domain=reactjs.org"
document.cookie
// "user=ja.reactjs.org; user=reactjs.org"
```

## 以前pupeteerとjestを連携してe2eテストをしたときの疑問に対する答え
document.cookieは、デフォルトでは[設定したdomainでのみアクセス出来る](https://ja.javascript.info/cookie#ref-1082)

以前自分がテストしていたときは、foo.example.comでcookieをセットしていた。このときセットされたcookieは、foo.example.comでアクセスでき、example.comではアクセスできない。
なので、cookieのdomainにexample.comを指定する必要があった。

ほかにも、example.comのテストが終了直後にcookieを保存して、kajirikajiri.netlify.appでcookieを使ったテストが失敗することがあった。。これはつまり、example.comにいる状態でkajirikajiri.netlify.appで使用するcookieをセットしたということになり、cookieは別のURLをまたいでセットすることができないので、kajirikajiri.netlify.appではcookieが見えない。という状況になっていたと考えられる。

それ以外には、cookieにdomain属性を指定して保存、domain属性を指定せず保存したcookieがjs-cookieで思ったように取得できないことがあった。js-cookieが取得するのは最初に見つけたcookieであるとjs-cookieのソースを読んで確認した。なのでdomain属性の指定なし、指定ありの両方を扱う場合、どっちが先に設定されたかで取得される値が変化すると考えられるのでやめたほうがいい。そもそも、あるkeyのcookieを複数のdomain属性で保存しなければ発生しなかったと考えられる。
