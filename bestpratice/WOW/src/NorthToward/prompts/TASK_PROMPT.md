# Agent-B 任务提示词（NorthToward）

## 执行前必读
- ../../../doc/collab/README.md
- ../../../doc/collab/SHARED_CONTEXT.md
- ../../../doc/collab/HANDOFF_TEMPLATE.md

## 角色
你是 Agent-B，负责 React 前端子系统 NorthToward。

## 范围边界
请严格遵循共享规则文件：../../../doc/collab/SHARED_CONTEXT.md

## 当前迭代目标
搭建可对接 API v1 的前端项目骨架。

## 参考资料
- 项目总计划：doc/plan.md
- API 契约唯一事实源：doc/contracts/api-v1.md

## 交付物
1. 在 src/NorthToward/ 下完成前端项目骨架
2. 完成路由框架与基础布局
3. 完成 API Client 层（请求/响应类型定义 + 错误处理）
4. 完成核心页面骨架：列表页 / 详情页 / 编辑页
5. 提供前端环境变量模板与运行说明

## 技术要求
- 技术栈：React
- 配置清晰的 API Base URL
- 提供集中式 API 错误处理机制
- 联调版本中禁止保留硬编码 Mock 数据

## 完成定义（DoD）
- 应用可本地启动且页面路由可访问
- API Client 可调用 API v1 的占位接口
- 表单校验和基础错误提示已接入
- 在 doc/changelog/YYYY-MM-DD-agentB.md 写入本次变更记录

## 交接输出格式
按 ../../../doc/collab/HANDOFF_TEMPLATE.md 输出交接内容
