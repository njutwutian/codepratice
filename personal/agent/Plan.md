# Agent学习开发计划

## Single Agent

### To-do
- [x] 实现与大模型的连接
- [x] 实现流式输出
- [x] 已接入 Ollama 请求链路，入口在 [sample/src/index.ts](sample/src/index.ts)
- [x] 当前默认走流式对话 `userStartTalkByStream`
- [x] 已有基础配置加载，配置定义在 [sample/src/config/config.ts](sample/src/config/config.ts)
- [ ] 完善 token 统计口径
- [ ] 补齐请求/响应类型
- [ ] 修复流式响应解析稳定性

## Token统计改造计划

### 目标
- 明确区分输入 token、输出 token、单次请求总 token、会话累计 token。
- 修复流式响应下 token 统计可能不准确的问题。
- 让控制台展示的指标语义一致，不再混用“累计消耗”和“单次上限”。

### 当前代码现状
- 应用入口在 [sample/src/index.ts](sample/src/index.ts)，当前只调用 `userStartTalkByStream()`，所以流式链路是主路径。
- 对话主逻辑在 [sample/src/helpers/ollamaHelper.ts](sample/src/helpers/ollamaHelper.ts)，同时保留了 single 和 stream 两套实现。
- HTTP 请求在 [sample/src/api/ollamaRequest.ts](sample/src/api/ollamaRequest.ts)，其中：
- `getSingleResponse` 走非流式 `/api/generate`
- `getStreamResponse` 走流式 `/api/generate`
- token 展示在 [sample/src/helpers/utilHelper.ts](sample/src/helpers/utilHelper.ts)，当前依赖 `config.ollamaMaxTokens`
- 配置定义在 [sample/src/config/config.ts](sample/src/config/config.ts)，已包含 `OLLAMA_MAX_TOKENS`

### 当前问题
- [sample/src/helpers/ollamaHelper.ts](sample/src/helpers/ollamaHelper.ts) 里只累计了 `prompt_eval_count`，遗漏了 `eval_count`。
- 当前 `usedTokens` 是按轮次累加的数组，但展示时和 `ollamaMaxTokens` 做对比，口径不一致。
- [sample/src/api/ollamaRequest.ts](sample/src/api/ollamaRequest.ts) 的流式解析直接 `JSON.parse(chunk)`，如果返回的是多行 JSON 或半包数据，完成帧里的 token 字段可能被漏掉。
- [sample/src/api/ollamaRequest.ts](sample/src/api/ollamaRequest.ts) 和 [sample/src/helpers/ollamaHelper.ts](sample/src/helpers/ollamaHelper.ts) 里大量使用 `any`，后续很难保证统计字段一定存在。
- [sample/src/helpers/ollamaHelper.ts](sample/src/helpers/ollamaHelper.ts) 当前把历史内容拼进新 prompt，所以如果你统计“会话总消耗”，每轮重复发送历史是会被重复计入的；这本身不是 bug，但必须在展示语义上说明清楚。

### 影响范围
- [sample/src/model](sample/src/model)：新增响应类型、token 统计类型
- [sample/src/api/ollamaRequest.ts](sample/src/api/ollamaRequest.ts)：改造响应类型和流式解析
- [sample/src/helpers/ollamaHelper.ts](sample/src/helpers/ollamaHelper.ts)：调整 single/stream 统计逻辑
- [sample/src/helpers/utilHelper.ts](sample/src/helpers/utilHelper.ts)：调整展示文案和入参结构
- [sample/src/index.ts](sample/src/index.ts)：只需确认入口仍然走 stream，无需大改

### 建议的改造步骤

#### 第一步：先定义清楚统计口径
- [ ] 明确最终要展示的统计口径
- [ ] 定义单次请求输入 token：`prompt_eval_count`
- [ ] 定义单次请求输出 token：`eval_count`
- [ ] 定义单次请求总 token：`prompt_eval_count + eval_count`
- [ ] 定义会话累计 token：所有请求的总 token 之和
- [ ] 废弃 `usedTokens: number[]` 这种混合语义结构
- [ ] 先确定控制台最终输出格式，避免后续返工

#### 第二步：补充类型定义
- [ ] 在 `src/model` 下新增 `OllamaGenerateResponse`
- [ ] 给响应类型补齐 `response`
- [ ] 给响应类型补齐 `done`
- [ ] 给响应类型补齐 `prompt_eval_count`
- [ ] 给响应类型补齐 `eval_count`
- [ ] 让 `getSingleResponse` 使用该类型
- [ ] 让 `getStreamResponse` 使用该类型
- [ ] 让 `talkToOllamaSingle` 使用该类型
- [ ] 让 `talkToOllamaStream` 使用该类型
- [ ] 清理相关 `any`
- [ ] 新增 `TokenUsage { promptTokens, completionTokens, totalTokens }`
- [ ] 视需要新增 `SessionTokenUsage { promptTokens, completionTokens, totalTokens }`

#### 第三步：把统计结构拆开
- [ ] 在 [sample/src/helpers/ollamaHelper.ts](sample/src/helpers/ollamaHelper.ts) 中移除 `usedTokens: number[]`
- [ ] 增加当前请求统计：`promptTokens`、`completionTokens`、`totalTokens`
- [ ] 增加会话统计：`sessionPromptTokens`、`sessionCompletionTokens`、`sessionTotalTokens`
- [ ] 至少完成“单次总量”和“会话累计总量”拆分
- [ ] 如无必要，先用两个 plain object：`currentTokenUsage`、`sessionTokenUsage`

#### 第四步：修正 single 模式统计逻辑
- [ ] 在 `userStartTalkBySingle` 中只在 `res.done === true` 时记录统计数据
- [ ] 按公式计算单次请求总 token：`requestTotalTokens = (res.prompt_eval_count ?? 0) + (res.eval_count ?? 0)`
- [ ] 让会话累计 token 正确累加 `requestTotalTokens`
- [ ] 提取公共函数，统一处理 `history.push(...)` 和 token 更新

#### 第五步：修正 stream 模式统计逻辑
- [ ] 在 `userStartTalkByStream` 中只在最终 `chunk.done === true` 时读取 token 字段
- [ ] 在最终帧读取 `prompt_eval_count`
- [ ] 在最终帧读取 `eval_count`
- [ ] 不在中间 chunk 上累计 token
- [ ] 在最终帧一次性更新当前请求 token
- [ ] 在最终帧一次性更新会话累计 token
- [ ] 在最终帧一次性更新 history
- [ ] 优先完成并验证 stream 链路，因为它是当前主路径

#### 第六步：修复流式响应解析
- [ ] 改造 [sample/src/api/ollamaRequest.ts](sample/src/api/ollamaRequest.ts) 的 `getStreamResponse`
- [ ] 移除对整个 `chunk` 直接 `JSON.parse` 的写法
- [ ] 增加 `buffer` 拼接 decoder 输出文本
- [ ] 按换行符切分完整 JSON 行
- [ ] 对每一行单独 `JSON.parse`
- [ ] 在循环结束后处理 buffer 中最后残留的一行
- [ ] 确保完成帧里的 token 字段不会因拆包丢失
- [ ] 为解析失败场景保留原始内容用于调试，不再完全静默吞掉

#### 第七步：重构展示函数
- [ ] 修改 [sample/src/helpers/utilHelper.ts](sample/src/helpers/utilHelper.ts) 的 `showTokenUsage`
- [ ] 移除 `累计 token / ollamaMaxTokens` 这种混合口径输出
- [ ] 输出 `本次: prompt=120, completion=280, total=400` 这类结构
- [ ] 输出 `会话累计: prompt=350, completion=760, total=1110` 这类结构
- [ ] 如果保留 `ollamaMaxTokens`，仅用于提示当前请求 prompt token 是否接近上限
- [ ] 如保留上限提示，单独输出 `上下文占用估算: 120/1000`

#### 第八步：补充最小验证
- [ ] 先验证 stream 模式输出文本正常
- [ ] 验证 stream 最后一帧能正确拿到 `prompt_eval_count` 和 `eval_count`
- [ ] 验证多轮对话后会话累计值递增
- [ ] 再补 single 模式回归验证
- [ ] 确认 single 和 stream 展示口径一致
- [ ] 最后执行一次 `npm run build`

### 推荐改造顺序
1. [ ] 先补响应类型，去掉 `any`
2. [ ] 再修 `getStreamResponse` 的 NDJSON 解析
3. [ ] 再拆 `usedTokens` 为“当前请求”和“会话累计”两套结构
4. [ ] 先完成 stream 链路统计，因为它是当前入口主路径
5. [ ] 再补齐 single 链路，保持两者一致
6. [ ] 最后改 `showTokenUsage` 和控制台文案

### 可以直接落地的小任务拆分
1. [ ] 新增 `OllamaGenerateResponse.ts` 和 `TokenUsage.ts`
2. [ ] 替换 `ollamaRequest.ts` 中的 `any`
3. [ ] 改造 `getStreamResponse` 的 buffer + 按行解析
4. [ ] 在 `ollamaHelper.ts` 中提取一个 `buildTokenUsage` 函数
5. [ ] 在 `ollamaHelper.ts` 中提取一个 `updateHistory` 函数
6. [ ] 重写 `showTokenUsage` 的入参和输出文案
7. [ ] 跑通 stream 手工验证
8. [ ] 跑通 single 手工验证

### 验收标准
- single 和 stream 两种模式都能显示输入、输出、总 token。
- 流式模式下不会因为拆包丢失最终 token 统计。
- 展示文案不再把“会话累计消耗”与“单次 token 上限”混为一谈。
- 关键函数不再依赖 `any`。
- 当前默认入口 [sample/src/index.ts](sample/src/index.ts) 跑起来后，stream 模式输出和 token 统计都正常。