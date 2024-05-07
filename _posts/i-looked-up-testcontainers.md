---
title: "Testcontainersを調べた"
excerpt: "みなさんこんにちは、かじりです。Testcontainersを調べを調べました。"
created_at: "2024-05-07 09:54:26"
updated_at: "2024-05-07 10:03:46"
tags: [Testcontainers, docker, docker-compose]
---

みなさんこんにちは、かじりです。Testcontainers[^testcontainers-top]を調べを調べました。

[^testcontainers-top]: https://testcontainers.com/

dockerのコンテナを使ってテストを実行するようです。

docker, docker-composeと何が違うのか？と思った。

環境変数で環境を分けるのでは何かしらコードの変更が必要になるが、Testcontainersを使えば、そういったことが不要になるのがいいようだ。確かに良さそうと思った。

DeepLで翻訳した、DockerおよびDocker Composeとの違い

https://testcontainers.com/getting-started/#differences-with-docker-and-docker-compose

> DockerとDocker Composeは、テストに必要な依存関係をスピンアップするために直接使用することもできますが、このアプローチには欠点があります。生のDockerコマンドやDocker Composeを使用して、信頼性が高く完全に初期化されたサービス依存関係を作成するには、Dockerの内部や、コンテナ内で特定のテクノロジを最適に実行する方法に関する十分な知識が必要です。例えば、Dockerコマンドやdocker-composeを直接使って動的な "統合テスト環境 "を作成すると、ポートの競合が発生したり、テスト開始時にコンテナが完全に初期化されていなかったり、インタラクションの準備ができていなかったりする可能性があります。

しかし、どうなんだろう、既存のdockerであればcontainerは起動済みだから、初回はcontainerを立ち上げる必要がある分遅い。databaseならvolumeを消すだけか。良さそうだな。
