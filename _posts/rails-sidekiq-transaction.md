---
title: "railsのトランザクションとsidekiq"
excerpt: "みなさんこんにちは、かじりです。トランザクションとsidekiq関連でやや複雑な事象に遭遇しました。"
created_at: "2024-03-28 21:00:26"
updated_at: "2024-04-08 20:37:26"
tags: [ruby, rails, transaction, process, thread, sidekiq, job, worker, queue, ps]
---

みなさんこんにちは、かじりです。railsのトランザクションとsidekiqででやや複雑な事象に遭遇したので調査しました。

トランザクションの内部で保存して、Job内部でそのレコードを参照したら見えませんでした。
Jobを作る直前では見えていたので、なんだろうと思って調査してみました。

```ruby
ApplicationRecord.transaction do
    User.save!
    pp User.exists?(id: user.id)
    MyJob.perform_later(user)
end

class MyJob < ApplicationJob
    def perform(user)
        pp User.exists?(id: user.id)
    end
end
```


今の所の調査結果

トランザクション内の保存したレコードは同一Railsプロセスでは確認できます。これは、先ほどのUser.save!直後のppによって確認できます。
しかし、異なるプロセスでは確認できませんでした。これは、保存処理の直後にbyebugを入れて処理を止め、rails consoleからレコードを確認したところ存在しませんでした。
railsサーバーとrails consoleは別プロセスで動いていることをpsコマンドで確認済みです。
railsサーバーとsidekiqは別プロセスで動くようなので（まだ確認できてない）、この検証と同じ結果になるはずです。

```ruby
ApplicationRecord.transaction do
    User.save!
    pp User.exists?(id: user.id)
    byebug
    MyJob.perform_later(user)
end

class MyJob < ApplicationJob
    def perform(user)
        pp User.exists?(id: user.id)
    end
end
```

プロセスを見たコマンド

```
ps aux |grep "PID\|rails\|puma\|sidekiq"

USER         PID %CPU %MEM COMMAND
root          21  0.3  2.3 puma (tcp://0.0.0.0:4000) [apps]
root         128  0.1  0.9 /usr/local/bin/ruby bin/rails c
root         180  0.0  0.0 grep PID\|rails\|puma
```

スレッドを見たコマンド

```
ps -eLf | grep 21
ps -eLf | grep 128
```

色々と情報をえたよ

どうやらこの現象は割と存在する。after_saveコールバックよりjobが先に動くやつ。で、after_commitっていうコールバックもあるのだが、不具合っぽい動きがある[^after-commit-bug-1] [^after-commit-bug-2] [^after-commit-bug-3]ので、こういったパッケージ[^after-commit-everywhere]が存在する。これでおもっているようなafter_commitができるらしい。まだ試してない。

[^after-commit-everywhere]: https://github.com/Envek/after_commit_everywhere
[^after-commit-bug-1]: https://zenn.dev/hirken/articles/157d6b6a65a359
[^after-commit-bug-2]: https://github.com/rails/rails/issues/39400
[^after-commit-bug-3]: https://github.com/rails/rails/issues/39714

とおもってたら、Railsにそれっぽい機能が作られるらしい[^after-commit-everywhere-tweet]です。やったね

[^after-commit-everywhere-tweet]: https://twitter.com/ohbarye/status/1776501769281077339?s=46&t=v194Coyp_FV_l8pr_miO5g

after-commit-everywhereに関してはテストしなくてもとりあえずの概要が把握できそう。githubに例[^after-commit-everywhere-example]があった。

[^after-commit-everywhere-example]: https://github.com/Envek/after_commit_everywhere/blob/bcb47760b0cecae972868b52280dbbf53ef54099/README.md?plain=1#L69

```ruby
include AfterCommitEverywhere

ActiveRecord::Base.transaction do
  puts "We're in transaction now"

  ActiveRecord::Base.transaction do
    puts "More transactions"
    after_commit { puts "We're all done!" }
  end

  puts "Still in transaction…"
end
```

出力がこれ。

```
We're in transaction now
More transactions
Still in transaction…
We're all done!
```

このように、途中で仕込んだafter_commitがネストしたトランザクションを抜けた後に実行されている。

---

こういうの調査してると楽しいのですが、本題から外れないように、全体を見ながらやっていきたい
