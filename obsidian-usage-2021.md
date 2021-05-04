
## 保存方法

Obsidianはローカルで管理できるっていう点が素晴らしいですが、保存されているのがローカルだけだとやはり不安ですよね？ということでgithubに保存しましょう。自分はzsh使ってるんですが、ターミナルにobsidianって入力すると、addからpushまでするコマンドを登録してます。

```
function obsidian() {
  local current_dir
  current_dir="$(pwd)"
  cd /mnt/c/Obsidian
  git add .
  git commit -m "$(date +%Y%m%d%H%M%S)"
  git push
  cd $current_dir
}
```

[自動保存するプラグイン](https://github.com/denolehov/obsidian-git)設定してみたんですがね、動かなかったですよね。まあなんか読み間違えたんだと思うんで、今なら動くかも？

## 削除設定

デフォルトだと削除するとシステムのゴミ箱に入っちゃうんで別のフォルダに移動するようにしましょう
「設定の上から２番目Files&Links > Deleted filesのセレクトボックスでMove to Obsidian trash (.trash folder) 」にしましょう

## 新規作成したファイルの保存先

デフォルトだと新規作成したノートがrootに保存されるのでrootがどんどん膨れていきます。個人的（個人的にです）に嫌なので、これを別のフォルダにしましょう。
「設定の上から２番目Files&Links > Folder to create new notes in  にフォルダを設定」すれば全部そのディレクトリに入ります。

画像も保存先を変えましょう。Obsidianは画像を直接貼り付ける事ができますが、これもrootに保存されます。
「設定の上から２番目Files&Links > Attachment folder path にフォルダを設定」すればokです。
