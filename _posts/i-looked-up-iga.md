---
title: "IGAについて調べた"
excerpt: "みなさんこんにちは、かじりです。IGAについて調べました"
created_at: "2024-05-07 10:52:53"
updated_at: "2024-05-07 10:52:53"
tags: [IGA, sailpoint, midpoint]
---

みなさんこんにちは、かじりです。IGAについて調べました

というか、rbacやabacの単語が頭からよく抜けるのでそれのメモ。

rbacとは?GPT-4に聞いてみた

> RBAC（Role-Based Access Control）は、ユーザーやグループにロールを割り当て、そのロールに基づいてシステムやネットワークリソースへのアクセス権を管理するセキュリティメカニズム。

abacとは?GPT-4に聞いてみた

> ABACは「Attribute-Based Access Control」の略で、属性ベースのアクセス制御のことです。利用者の属性（例：役割、所属部門など）に基づいてアクセス権限を管理する方法。

midpoint[^midpoint-doc]

[^midpoint-doc]: https://docs.evolveum.com/book/practical-identity-management-with-midpoint.html

sailpoint[^sailpoint-doc]

[^sailpoint-doc]: https://documentation.sailpoint.com/saas/user-help/

rbacとabacの違い [^rbac-vs-abac-whats-the-difference]

[^rbac-vs-abac-whats-the-difference]: https://www.sailpoint.com/identity-library/rbac-vs-abac-whats-the-difference/

rbacのアプローチ

> -管理者やマネージャーなど、事前に定義された役割に従ってアクセスを許可する。
> -幅広いアクセスを管理
> -役職や年功序列などの属性を考慮する。

abacのアプローチ

> -ユーザー、環境、行動、リソースに関連する属性に従ってアクセスを許可する。
> -きめ細かなアクセス管理
> -ユーザーのタイプ、時間帯、場所などの属性を考慮する。

