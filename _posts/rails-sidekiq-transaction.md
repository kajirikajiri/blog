---
title: "railsのトランザクションとsidekiq"
excerpt: "みなさんこんにちは、かじりです。トランザクションとsidekiq関連でやや複雑な事象に遭遇しました。"
created_at: "2024-03-28 21:00:26"
updated_at: "2024-03-28 21:00:26"
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

---

こういうの調査してると楽しいのですが、本題から外れないように、全体を見ながらやっていきたい