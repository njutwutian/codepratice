# Agent-A 联调提示词（GoldenMount）

## 角色
你是 Agent-A，负责后端联调落地与联调阻塞清理。

## 路径边界
- 允许修改：src/GoldenMount/**
- 共享文件按需修改：doc/contracts/**、doc/changelog/**、docker-compose.yml

## 联调目标
与 Agent-B、Agent-C 完成首次端到端链路：
1. SecretPalace 发送事件。
2. GoldenMount 成功入库并返回统一响应。
3. NorthToward 正确展示列表与详情。

## 依赖输入
- 契约：doc/contracts/api-v1.md
- 错误码：doc/contracts/error-codes.md
- ER：doc/contracts/er-v1.md

## 任务清单
1. 逐项核对 POST /api/v1/events、GET /api/v1/events、GET /api/v1/events/{eventId} 字段与契约一致。
2. 对错误场景执行联调验证：
   - sourceCode 不存在
   - requestId 重复
   - payloadCount <= 0
3. 输出最小联调数据初始化脚本（来源系统至少包含 SIMULATOR_A、MANUAL_PORTAL）。
4. 生成联调回执样例（成功/失败各至少 1 条），供前端与模拟器对齐。
5. 记录联调问题与结论到 doc/changelog/YYYY-MM-DD-agentA.md。

## 验收标准
- 三个核心接口可稳定返回。
- 响应结构 success/code/message/data 与契约完全一致。
- 错误码命中契约定义并可复现。

## 交接输出格式
- 已完成事项
- 变更文件
- 联调验证结果（接口+样例）
- 未解决问题与建议责任人
