make postで_postsに記事ができるので作成。

make filename a='I am title'でファイル名を生成できる

public/assets/blog/記事のtitle/*.(jpg|png|.*)に画像をおく。

scripts/build.jsでビルドしている。やや複雑。sh scripts/build.jsでdistにhtmlができるので確認する。

public/template.htmlは\<\!\-\-\-\-\>によって、分割して必要な属性を埋め込んでいる。

本番環境はcloudflareに上がっているが、こちらでもscripts/build.jsを使っている。

public/web_components.jsは先に読み込まれる必要があるので、data-cfasync="false"によって、cloudflareのjs遅延読み込みを無効化している

コンポーネントを使いたくなったらpublic/web_components.jsとweb_component_templates.htmlに追加

