# Prompts 索引

本文件汇总所有子系统 Prompt，并给出使用场景。

## GoldenMount（Java 后端）
- `../../src/GoldenMount/prompts/TASK_PROMPT.md`
  - 用途：子系统开发任务（P1 阶段主用）。
- `../../src/GoldenMount/prompts/INTEGRATION_PROMPT.md`
  - 用途：联调任务（P4 阶段主用）。

## NorthToward（React 前端）
- `../../src/NorthToward/prompts/TASK_PROMPT.md`
  - 用途：子系统开发任务（P2 阶段主用）。
- `../../src/NorthToward/prompts/INTEGRATION_PROMPT.md`
  - 用途：联调任务（P4 阶段主用）。

## SecretPalace（Node.js 模拟器）
- `../../src/SecretPalace/prompts/TASK_PROMPT.md`
  - 用途：子系统开发任务（P3 阶段主用）。
- `../../src/SecretPalace/prompts/INTEGRATION_PROMPT.md`
  - 用途：联调任务（P4 阶段主用）。

## 使用建议
1. 子系统开发时优先使用 `TASK_PROMPT.md`。
2. 跨系统联调时切换到 `INTEGRATION_PROMPT.md`。
3. 执行前始终先读：`SHARED_CONTEXT.md`。
4. 执行后按 `HANDOFF_TEMPLATE.md` 输出交接。
