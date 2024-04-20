---
title: "git rebase -iにはmergeコミットが表示されない"
excerpt: "みなさんこんにちは、かじりです。git rebase -iをした時にマージコミットが表示されないことを知りました。"
created_at: "2024-04-20 22:17:24"
updated_at: "2024-04-20 22:22:24"
tags: [git, rebase, merge, commit]
---

みなさんこんにちは、かじりです。git rebase -iをした時にマージコミットが表示されないことを知りました。

これがgit log --onelineで表示された。

```
c3513fa (HEAD -> no-ff-merge, origin/no-ff-merge, main) Merge branch 'remove-line'
3884c97 (remove-line) Revert "Remove line"
```

これが git rebase -i HEAD~1 をした時に表示された。

```
pick 3884c97 Revert "Remove line"
```

上のマージコミットがrebaseでは表示されていないことがわかります。

