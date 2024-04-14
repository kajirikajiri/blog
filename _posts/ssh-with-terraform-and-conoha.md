---
title: "TerraformとConoHaでsshする"
excerpt: "みなさんこんにちは、かじりです。TerraformとConohaのVPSでsshした記録です。"
created_at: "2024-04-14 23:49:05"
updated_at: "2024-04-15 00:03:05"
tags: [Terraform, ConoHa, VPS, SSH, SwitchBot]
---

みなさんこんにちは、かじりです。TerraformとConohaのVPSでsshした記録です。

とりあえず概要をメモ

スマホでSwitchBotのスイッチをオン

家のPCの電源をSwitchBotがおす

家のPCが起動する

家のPCが起動したらSystemctlで登録したサービスがTerraformでConoHaにVPSを立てる
- Systemctlでwgetができない。pathを最初から記載する。例えば/usr/bin/wgetみたいな
- wgetに変数が埋め込めない。結局解消できなかった。後で調べたい。slackなのか、wgetなのか。
- TerraformでConoHaのVPSにuser-dataをうまいこと実行できない。一旦諦めた。とはいえ、sshポートは変えたかったので、変更後にConoHaでimageを保存してそれを起動している。

家のPCがVPSにSSHしてリモートポートフォワード

SlackにSSH成功の通知がくれば外出先からConoHaのVPSにSSHして家のPCに接続できる


