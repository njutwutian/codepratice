# 关于this的一些问题
- 内部函数没有自动继承外部函数的 this
```js
function outer() {
    console.log(this);  // 取决于 outer 怎么被调用
    
    return function inner() {
        console.log(this);  // 取决于 inner 怎么被调用
    };
}

// 场景 1：全局调用
const fn1 = outer();   // outer 的 this = window
fn1();                 // inner 的 this = window

// 场景 2：作为对象方法调用
const obj2 = { outer };
obj2.outer();          // outer 的 this = obj2
const fn2 = obj2.outer();
fn2();                 // inner 的 this = window（又变回去了！）

// 场景 3：bind 固定
const boundOuter = outer.bind({ x: 1 });
const fn3 = boundOuter();  // outer 的 this = { x: 1 }
fn3();                     // inner 的 this = window（inner 没有被 bind！）
```
- 闭包 + this 的完整对比表

|场景	|闭包捕获的this 是谁？|	如何修正|
| :--- | :--- | :--- |
|内部函数直接返回|调用时的 this（动态）|用 self = this 或 bind 或箭头函数|
|箭头函数作为闭包	|定义时的 this（静态）	|✅ 天然修正|
|事件回调（普通函数）	|event.currentTarget	|用 bind(this) 或箭头函数|
|React 类组件方法	|丢失（undefined）	|用箭头函数方法或 bind|
|setTimeout 回调	|window（非严格）	|用箭头函数或 bind|
```
┌─────────────────────────────────────────────────────────────────┐
│  this 绑定方式对比                                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  默认绑定：    fn()                     → this = window/global   │
│                                                                 │
│  隐式绑定：    obj.fn()                 → this = obj             │
│                                                                 │
│  显式绑定：    fn.call(obj)             → this = obj             │
│               fn.apply(obj)            → this = obj             │
│                                                                 │
│  硬绑定：      fn.bind(obj)            → this = obj（固定）      │
│                                                                 │
│  箭头函数：    () => {}                 → this = 外层 this       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```
- JavaScript 中 this 的绑定发生在函数执行上下文创建阶段，而箭头函数跳过 this 绑定过程，直接在定义时通过词法作用域引用外层 this。
- `Java 是“出生即带户口本”（this 跟着类定义走），JavaScript 是“动态身份证”（this 跟着调用者走）。
正因为 JS 的身份证是动态的，你才需要像 CEO 管理公章一样，用 bind、箭头函数等手段，确保公章（this）不会在传递过程中被冒领。`
- 常规函数通过调用固定this的指向，而箭头函数在定义时就已经确定了
- 在 React class 组件中，箭头函数的 this 之所以正确，并不是因为 React 调用了它，而是因为箭头函数在组件实例创建阶段就通过词法作用域捕获了 this，从而使后续调用方式不再影响 this 的取值。
- 箭头函数并没有“存一个 this/没有ThisBinding”，而是存了一个“指向外层执行上下文的引用”，访问 this 时是通过这个引用间接拿到的。核心本质是 this 在 箭头函数中被当作“词法变量”处理。这也是call/bind/apply无法作用于箭头函数的原因
- JavaScript 中 this 之所以在 obj.fn() 中正确，是因为中间存在一个 Reference Type 保存了 base 对象；而赋值操作会解包这个 Reference，导致调用时失去 base，从而丢失 this。

React class组件的流程示例
```text
以react class组件render一个button并调用回调函数为例
1. class 组件在被实例化（new Component）时，会执行 constructor 和 class field 初始化逻辑，此时 this 被绑定为组件实例，所有 class field（包括函数）都会在这个执行过程中被赋值。
2. 初始化的过程中button的回调函数如果是一个箭头函数，则箭头函数在创建时，由于自身没有this，会直接捕获执行上下文中的this，即class组件
3. classs组件初始化完成，用户点击button调用回调
4. 箭头函数内部使用的是创建阶段捕获的 this，因此在回调执行时不会受到调用方式影响，仍然指向组件实例。，能够正确获取信息
```

## 核心理解，为什么要存在this
JavaScript 中 this 的设计，本质上是为了解决函数与调用上下文解耦的问题，使得函数可以在不同对象之间复用，同时通过调用方式动态决定执行上下文。这种设计比传统面向对象语言将方法绑定到类或实例上更加灵活，也更轻量。

## 一些思考
Q: 为什么 JS 允许 this 丢失，而 Java 不允许
A: JS 允许 this 丢失，是因为函数是“独立的一等公民”，this 是调用时的上下文参数，Java 不允许 this 丢失，是因为方法必须隶属于对象，this 是绑定在方法上的
