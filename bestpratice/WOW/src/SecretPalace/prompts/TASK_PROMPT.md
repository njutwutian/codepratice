# Agent-C 任务提示词（SecretPalace）

## 执行前必读
- ../../../doc/collab/README.md
- ../../../doc/collab/SHARED_CONTEXT.md
- ../../../doc/collab/HANDOFF_TEMPLATE.md

## 角色
你是 Agent-C，负责 Node.js 数据模拟器子系统 SecretPalace。

## 范围边界
请严格遵循共享规则文件：../../../doc/collab/SHARED_CONTEXT.md

## 当前迭代目标
构建最小可用的数据生产器，能够生成并推送测试数据到后端 API v1。

## 参考资料
- 项目总计划：doc/plan.md
- API 契约唯一事实源：doc/contracts/api-v1.md

## 交付物
1. 在 src/SecretPalace/ 下完成模拟器项目骨架
2. 完成可配置数据生成器（模板 + 随机策略）
3. 完成发送引擎（重试 + 速率限制）
4. 提供支持参数化场景执行的 CLI 入口
5. 提供示例配置和样例运行报告

## 技术要求
- 技术栈：Node.js
- 目标地址、速率、时长、载荷结构可配置
- 发送失败数据必须记录并支持重放
- 输出基础运行指标：成功数、失败数、吞吐量

## 完成定义（DoD）
- 模拟器可通过 CLI 在本地运行
- 可向后端接口推送示例事件
- 执行结束后可输出汇总报告
- 在 doc/changelog/YYYY-MM-DD-agentC.md 写入本次变更记录

## 交接输出格式
按 ../../../doc/collab/HANDOFF_TEMPLATE.md 输出交接内容
