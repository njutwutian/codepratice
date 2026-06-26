# 多 Agent 共享上下文（唯一事实源）

## 1. 项目与目录约束
- 项目根目录：`D:\codepratice\bestpratice\WOW`
- 所有代码必须在：`D:\codepratice\bestpratice\WOW\src`
- 三个子系统：
  - `src/GoldenMount/`（Java）
  - `src/NorthToward/`（React）
  - `src/SecretPalace/`（Node.js）

## 2. 路径边界（硬性规则）
- Agent-A 仅允许修改 `src/GoldenMount/**`
- Agent-B 仅允许修改 `src/NorthToward/**`
- Agent-C 仅允许修改 `src/SecretPalace/**`
- 共享区域：`doc/contracts/**`、`doc/runbooks/**`、`doc/changelog/**`、`docker-compose.yml`

## 3. 协作流程
1. 先对齐契约，再并行开发。
2. 涉及共享区域改动，必须写明影响范围与兼容性。
3. 每次提交后按交接模板输出摘要。
4. 联调问题统一记录到 `doc/changelog/`。

## 4. 当前优先任务
1. Agent-A：输出 API v1 草案与 ER 草案。
2. Agent-B：基于 API v1 搭建前端骨架与 API Client。
3. Agent-C：基于 API v1 构建最小可用数据推送脚本。

## 5. 交付标准（最小）
- 可运行
- 可验证
- 可交接（含风险与下一步）
