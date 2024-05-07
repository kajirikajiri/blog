---
title: "Sealed Interfaceを調べてみた"
excerpt: "みなさんこんにちは、かじりです。sealed interfaceを調べてみました"
created_at: "2024-05-07 20:48:01"
updated_at: "2024-05-07 21:23:48"
tags: [SealedInterface, Ruby, Kotlin, Java, SingletonPattern, FactoryMethod]
---

みなさんこんにちは、かじりです。Sealed Interfaceを調べてみました

permitsでインターフェースの実装を制御できる[^SealedInterface]

[^SealedInterface]: https://docs.oracle.com/en/java/javase/15/language/sealed-classes-and-interfaces.html#GUID-0C709461-CC33-419A-82BF-61461336E65F

例えばこんな感じ。GPT-4に出力してもらった

```java
public sealed interface Animal permits Cat, Dog {
    void makeSound();
}

final class Cat implements Animal {
    public void makeSound() { System.out.println("Meow"); }
}

final class Dog implements Animal {
    public void makeSound() { System.out.println("Woof"); }
}
```

例えばAnimalインターフェースでSheepクラスを実装しようとするとエラーになるらしい。

便利だな。

kotlinの公式によるとprivate constructorもかけるようだ [^private-constructor]
[^private-constructor]: https://kotlinlang.org/docs/sealed-classes.html#constructors

```java
sealed class IOError {
    // A sealed class constructor has protected visibility by default. It's visible inside this class and its subclasses
    constructor() { /*...*/ }

    // Private constructor, visible inside this class only.
    // Using a private constructor in a sealed class allows for even stricter control over instantiation, enabling specific initialization procedures within the class.
    private constructor(description: String): this() { /*...*/ }

    // This will raise an error because public and internal constructors are not allowed in sealed classes
    // public constructor(code: Int): this() {}
}
```

これも良さそうだな。役割を明確にできそう。

ファクトリーメソッドに使えそう。

rubyで書くとこう。

GPT-4に聞いて、replit.comで試した。

rubyだとprivate_class_methodで同じことができた。

```ruby
class Product
  # コンストラクタをprivateにする
  private_class_method :new

  def self.create(name)
    new(name)
  end

  def initialize(name)
    @name = name
  end

  def display_name
    @name
  end
end

# 直接newは使えない
# product = Product.new('Test') # これはエラー

# クラスメソッド経由でインスタンスを作る
product = Product.create('Test')
puts product.display_name
```

話がそれるけど、シングルトンパターン

```ruby
class SingletonObject
  @instance = new

  private_class_method :new

  def self.instance
    @instance
  end
end

puts SingletonObject.instance
puts SingletonObject.instance == SingletonObject.instance
```

SingletonObjectクラスのロード時に@instance変数がnewで初期化され、SingletonObject.instanceメソッドは毎回同じインスタンスを呼び出す。
