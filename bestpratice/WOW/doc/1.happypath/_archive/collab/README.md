# 协作控制区（Central Collaboration Layer）

本目录用于集中维护多 Agent 协作时的共享信息，避免在各子系统重复维护同一套规则。

## 目录说明
- `README.md`：协作控制区总入口（本文件）。
- `SHARED_CONTEXT.md`：统一上下文、边界规则、协作流程。
- `HANDOFF_TEMPLATE.md`：跨 Agent 交接模板。
- `PROMPTS_INDEX.md`：三大子系统 Prompt 总索引。

## 使用方式
1. 每个 Agent 开工前先阅读 `SHARED_CONTEXT.md`。
2. 每个 Agent 在各自 `src/<Subsystem>/prompts/TASK_PROMPT.md` 执行本系统任务。
3. 联调阶段参考 `PROMPTS_INDEX.md` 切换到 `INTEGRATION_PROMPT.md`。
4. 需要跨系统协同时，按 `HANDOFF_TEMPLATE.md` 输出交接信息。

## 维护原则
- 公共规则只在本目录维护，不在各子系统重复定义。
- 子系统提示词只保留本系统目标与交付物，公共内容统一引用。
