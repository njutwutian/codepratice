# js任务调度
以下核心组成

- 主线程调用栈
- 微任务队列
- 宏任务队列

执行完主线程调用栈之后，先检查微任务队列，有东西则清空，然后检查宏任务队列，拿出一个执行，再检查微任务队列，后面loop这个过程
```text

1. 执行 Call Stack（同步代码）

2. 清空 Microtask Queue（微任务全部执行）

3. 进行一次渲染（浏览器可能执行）

4. 从 Task Queue（宏任务队列）中取出一个任务执行

5. 回到步骤 2（循环）

```

`一个 DOM 事件 = 一个宏任务`
详细时间线
```text
用户点击
  ↓
浏览器创建 click task
  ↓
Event Loop 取出 click task
  ↓
Event Dispatch 开始
  ↓
capture:
  root capture
  parent capture
  ↓
target:
  button target
    - Promise.then 入 microtask queue
    - setTimeout 入 timer task queue
  ↓
bubble:
  parent bubble
  root bubble
  ↓
click task 结束
  ↓
清空 microtask:
  microtask in button
  ↓
浏览器可能渲染
  ↓
下一轮 Event Loop:
  timeout in button
```

# 一些思考

为什么“微任务一定要在宏任务之后清空”？这个设计到底解决了什么问题？