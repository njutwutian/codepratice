# Agent-B 联调提示词（NorthToward）

## 角色
你是 Agent-B，负责前端联调对齐与可视化验证。

## 路径边界
- 允许修改：src/NorthToward/**
- 共享文件按需修改：doc/contracts/**、doc/changelog/**、docker-compose.yml

## 联调目标
消费 GoldenMount 的 API v1，完成事件列表与详情的可视化联调闭环。

## 依赖输入
- 契约：doc/contracts/api-v1.md
- 错误码：doc/contracts/error-codes.md

## 任务清单
1. 对齐 API Client 字段映射，确保与后端响应字段一一对应。
2. 列表页对接 GET /api/v1/events，展示 eventId/requestId/sourceCode/eventType/eventStatus/eventTime。
3. 详情页对接 GET /api/v1/events/{eventId}，展示完整 data 字段。
4. 补齐错误提示映射：
   - GM-400
   - GM-404-SOURCE
   - GM-404-EVENT
   - GM-409-EVENT
   - GM-500
5. 记录联调问题与结论到 doc/changelog/YYYY-MM-DD-agentB.md。

## 验收标准
- 列表与详情均可用真实接口数据渲染。
- 错误码提示文案可区分不同错误场景。
- 页面不依赖硬编码 mock 数据。

## 交接输出格式
- 已完成事项
- 变更文件
- 联调验证结果（页面+接口）
- 未解决问题与建议责任人
