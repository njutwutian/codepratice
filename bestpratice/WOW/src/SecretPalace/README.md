# SecretPalace

Node.js data simulator for generating and pushing test data to backend API v1.

## Features

- Configurable target endpoint, rate, duration, and payload template.
- Configurable random strategies (requestId, int, pick, nowOffsetIso, string), including random `eventStatus` generation.
- Send engine with retry, rate limit, and worker concurrency.
- Runtime concurrency tuning with arrow keys and pause toggle (`P`).
- Failed event persistence as JSONL for replay.
- Runtime summary metrics and JSON report output (including backend error code breakdown).

## Quick Start

1. Use Node.js 18+.
2. Run commands from `src/SecretPalace`.

```bash
npm run dry-run
```

```bash
npm run start
```

```bash
npm run hyper
```

```bash
npm run replay
```

## CLI

```bash
npm run build
node dist/cli.js run [--config config/custom.json] [--dry-run] [--preview 5] [--report reports/custom.json]
node dist/cli.js replay [--config config/custom.json] [--input failures/failed-events.jsonl] [--report reports/replay.json]
```

API v1 联调常用命令：

```bash
# 正常事件（sourceCode=SIMULATOR_A）
node dist/cli.js run --config config/scenario.sample.json --no-interactive

# 异常事件 1：触发 GM-404-SOURCE
node dist/cli.js run --config config/scenario.invalid-source.json --no-interactive

# 异常事件 2：触发 GM-400 (payloadCount <= 0)
node dist/cli.js run --config config/scenario.invalid-payload.json --no-interactive

# 失败重放
node dist/cli.js replay --config config/scenario.sample.json --input failures/failed-events.jsonl

# 高压配置（1000 QPS 目标）
npm run hyper
```

默认情况下使用 `node-config` 分层配置：

- 基础配置：`config/default.json`
- 环境覆盖：`config/{NODE_ENV}.json`（例如 `config/production.json`）
- 若传入 `--config`，则按指定 JSON 文件加载并覆盖分层模式

运行 `run` 命令时（非 dry-run），默认启用交互式并发调整：

- `↑ / ↓`: 按 LogN 级步长增加/减少并发。
- `→ / ←`: 每步 `+50/-50`。
- `P`: 暂停/恢复派发新请求。
- 并发上限默认 `1000`，可在配置中通过 `run.maxConcurrency` 调整。
- 默认并发为 `2`、默认速率为 `50`，可在配置中通过 `run.concurrency` 与 `run.ratePerSecond` 覆盖。
- 默认运行时长为 `300000ms`（5分钟），可通过 `run.durationMs` 覆盖。
- 每次运行总量上限默认 `100000`，可通过 `run.quota` 调整。
- 若不需要交互，可加 `--no-interactive`。

CLI 会实时显示单行进度 UI（自动刷新）：

- 百分比与完成量：`completed/total`。
- 成功/失败计数：`ok/fail`。
- 实时吞吐：`qps`。
- 活跃 worker 与并发设定：`active/conc`。
- 已运行时长与状态：`t/status`（RUNNING 或 PAUSED）。

## Project Structure

```text
src/
  cli.ts
  index.ts
  config/loadConfig.ts
  generator/
  engine/
  storage/
  report/
  utils/
config/
  default.json
  scenario.sample.json
  scenario.invalid-source.json
  scenario.invalid-payload.json
templates/
reports/
failures/
```

## Notes

- Current event payload is aligned to `POST /api/v1/events` contract fields.
- Replay mode reads payloads from failure file and resends them with the same retry strategy.
