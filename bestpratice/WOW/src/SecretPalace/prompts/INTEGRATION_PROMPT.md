# Agent-C 联调提示词（SecretPalace）

## 角色
你是 Agent-C，负责模拟器到后端的联调投递链路。

## 路径边界
- 允许修改：src/SecretPalace/**
- 共享文件按需修改：doc/contracts/**、doc/changelog/**、docker-compose.yml

## 联调目标
按 API v1 生成并发送测试事件，验证成功写入、失败重试和失败重放能力。

## 依赖输入
- 契约：doc/contracts/api-v1.md
- 错误码：doc/contracts/error-codes.md

## 任务清单
1. 将事件模板字段严格对齐 POST /api/v1/events 请求模型。
2. 生成两组测试数据：
   - 正常事件（可成功入库）
   - 异常事件（触发至少 2 种错误码）
3. 运行 send/retry/replay 全链路，输出报告：成功数、失败数、吞吐量。
4. 输出可复用联调命令样例（run/replay）。
5. 记录联调问题与结论到 doc/changelog/YYYY-MM-DD-agentC.md。

## 验收标准
- 成功事件可在后端查询到。
- 失败事件可落盘并可重放。
- 报告中可区分成功/失败原因并关联错误码。

## 交接输出格式
- 已完成事项
- 变更文件
- 联调验证结果（命令+报告）
- 未解决问题与建议责任人
