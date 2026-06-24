# javascript事件传播
## 传播机制
DOM 事件机制（发布-订阅系统（pub-sub）），本质是一个“运行时调度系统”，不是简单 callback
沿着DOM树传播，点击某个元素时，不是值触发这个元素。
```html
<div id="parent">
  <button id="child">Click</button>
</div>
```
存在三个阶段
- 捕获阶段capture `window -> document -> html -> body -> parent -> child`

- 目标阶段 `child`
- 冒泡阶段bubble 反向传播 `child -> parent -> body -> html -> document -> window`

核心控制API addEventListener
```js
element.addEventListener(type, handler, useCapture) //定义

event.stopPropagation(); // 组织继续冒泡/捕获
event.stopImmediatePropagation(); // 立刻停止，后续的handler也停止
```

`如果没有它：`

- 组件无法通信
- 无法事件委托
- 无法全局拦截
- 无执行顺序规则
- UI 行为不可控

反例，winform/J2SE没有这种机制，只能使用"点对点的监听"来处理事件，对于父子关系的处理上很依赖手动管理，

## event.stopPropagation() 的价值：

- ✅ 防止事件冒泡污染父组件
- ✅ 实现组件行为隔离（子 → 父解耦）
- ✅ 控制 UI 交互边界（modal / dropdown）
- ✅ 避免嵌套点击冲突
- ✅ 精细控制事件委托范围

stopImmediatePropagation的粒度则再细一点
