---
title: "Dev Containerを使い、local環境でコードを実行しつつ管理する"
excerpt: "みなさんこんにちは、かじりです。replitが便利なのですが、実行したファイルをローカルに残しておきたかったのでDev Containerを使いました。が、最終的にdockerコマンドがいい気がしてきました。"
created_at: "2024-05-19 19:04:38"
updated_at: "2024-05-19 19:45:59"
tags: [DevContainer, replit]
---

みなさんこんにちは、かじりです。replit[^replit]が便利なのですが、実行したファイルをローカルに残しておきたかったのでDev Container[^dev-container]を使いました。が、最終的にdockerコマンドがいい気がしてきました。

[^replit]: https://replit.com/

[^dev-container]: https://containers.dev/

devcontainerコマンドを使いたいのでinstall[^dev-container-install]する

[^dev-container-install]: https://github.com/devcontainers/cli/blob/099d3470c23c12b494281439be003d6100b30d45/README.md?plain=1#L32

vscodeでdevcontainerの設定ファイルを作りたい

vscodeでdevcontainer[^vscode-dev-container-extension]をinstall

[^vscode-dev-container-extension]: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers

「cmd + shift + p」でコマンドパレット開く

「Dev Containers: Add Dev Container Configuration Files...」を実行

「Add configuration to workspace」を選択

「ruby」を入力して選択

バージョンを選択

Features[^dev-container-features]を選択せずに進む

[^dev-container-features]: https://containers.dev/implementors/features/

２つのファイルが作成される。「.devcontainer/devcontainer.json」「.github/dependabot.yml」

rubyのファイルを作って実行したい

a.rbを作る。中身は適当に。puts 'hello'

「devcontainer up --workspace-folder . 」さっき作った設定ファイルでDev Containerを起動

「devcontainer exec --workspace-folder . ruby a.rb」Dev Containerでrubyファイルを実行

終わり

最初のdevcontainer upコマンドはやや時間がかかるがいい感じにできた。docker run --rmコマンドで実行する方法も考えたが、ローカルファイルをマウントするのがだるい。。。と思ったが、こっちの方が依存が少なくてメンテも要らなそうだ。 docker run --rm -it -v $(pwd):/_a -w /_a ruby ruby a.rb

