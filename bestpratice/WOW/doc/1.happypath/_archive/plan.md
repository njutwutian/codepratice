# WOW 项目执行计划（多 Agent 并行版）

## 0. 文档目的
本计划用于在同一项目下并行搭建 3 个子系统，并保证在多 Agent 协作时，任何一个 Agent 都能快速理解当前上下文、边界和交付要求。

代码目录强制约束：所有可执行代码必须放在 `D:\codepratice\bestpratice\WOW\src` 下。

子系统范围：
1. Java 后台：Spring Boot + MySQL（参考 `D:\basee\mercermarshbenefits_portal\src\ruoyi-vue-pro` 的工程实践）
2. 前端站点：React
3. 数据模拟生产测试应用：Node.js

子系统目录命名（固定）：
1. `GoldenMount`：Java 子系统
2. `NorthToward`：React 子系统
3. `SecretPalace`：Node.js 子系统

---

## 1. 项目目标与范围

### 1.1 总体目标
- 构建可联调的前后端系统，并提供可重复的数据模拟能力。
- 保证本地开发环境一键启动（至少提供清晰脚本与文档）。
- 建立统一接口契约，避免前后端和模拟器之间脱节。

### 1.2 非目标（当前阶段不做）
- 不在当前阶段引入复杂微服务拆分。
- 不做高可用生产级部署（仅保留部署扩展点）。
- 不做深度性能压测平台化（仅保留基础压测入口）。

---

## 2. 多 Agent 协作总则（关键）

### 2.1 Agent 分工
- Agent-A（后端 Agent）：负责 Spring Boot + MySQL 子系统。
- Agent-B（前端 Agent）：负责 React 前端子系统。
- Agent-C（模拟器 Agent）：负责 Node.js 数据模拟生产测试应用。

### 2.2 协作原则
- 单一事实源：接口契约与字段定义以 `doc/contracts` 下文档为准。
- 先契约后实现：接口和数据结构先对齐，再分别开发。
- 每次变更必须更新文档：涉及 API、数据库、环境变量时，同步更新 `doc`。
- 跨 Agent 改动要走“变更说明”：说明影响面、回滚方式、验证步骤。

### 2.3 目录与产物约定
- `src/GoldenMount/`：Java 后台源码与 SQL 迁移脚本。
- `src/NorthToward/`：React 前端源码。
- `src/SecretPalace/`：Node.js 模拟器源码。
- `src/GoldenMount/Dockerfile`、`src/NorthToward/Dockerfile`、`src/SecretPalace/Dockerfile`：各子系统镜像构建文件。
- 根目录 `docker-compose.yml`：统一编排 3 个子系统及其依赖（如 MySQL）。
- `doc/collab/`：多 Agent 协作控制区（共享上下文、交接模板、协作入口）。
- `doc/contracts/`：API 契约、事件字段、错误码定义。
- `doc/runbooks/`：启动、联调、排障手册。
- `doc/changelog/`：跨 Agent 变更记录。

---

## 3. 总体技术方案

### 3.1 后端（Spring Boot + MySQL）
- 参考 RuoYi-Vue-Pro 的实践点：
	- 分层结构（Controller / Service / Mapper / Domain）。
	- 统一响应结构与异常处理。
	- 统一鉴权与日志审计思路（先保留扩展点，逐步实现）。
- 数据库：MySQL 8.x。
- 建议引入：MyBatis-Plus 或 JPA（二选一，尽早定）。

### 3.2 前端（React）
- 使用 React + 路由 + 状态管理（Redux Toolkit 或 Zustand 二选一）。
- 与后端通过 REST API 交互。
- 建立统一 API Client 层和错误处理机制。

### 3.3 模拟器（Node.js）
- 支持生成可配置测试数据（批量、时间间隔、随机分布）。
- 支持将数据推送到后端 API（支持重试、限流、失败落盘）。
- 支持回放模式（从样本文件重放）。

---

## 4. 分阶段执行计划

## 阶段 P0：项目初始化与对齐（第 1 周）

### 目标
- 完成 3 子系统的骨架、统一约定、联调基线。

### 任务清单
- 建立项目目录结构与基础 README。
- 定义统一命名规范（接口路径、DTO、数据库命名、分支命名）。
- 定义契约初稿：核心 API、请求/响应模型、错误码。
- 明确本地环境依赖：JDK、Node、MySQL、包管理器版本。
- 输出联调最小闭环场景（一个核心业务流）。

### 交付物
- `doc/contracts/api-v1.md`
- `doc/contracts/error-codes.md`
- `doc/runbooks/local-setup.md`
- 三个子系统空骨架与启动脚本。

---

## 阶段 P1：后端核心能力（第 2-3 周）

### Agent-A 任务
- 完成项目脚手架、配置分层（dev/test）。
- 设计并落地核心表结构与索引。
- 实现核心业务 API（增删改查 + 分页 + 基础校验）。
- 实现全局异常处理、统一响应、基础日志。
- 提供 OpenAPI/Swagger 文档。

### 验收标准
- 核心 API 可用，接口文档可访问。
- 数据库迁移脚本可重复执行。
- 至少覆盖核心服务层单元测试与基础集成测试。

### 交付物
- 后端可运行服务。
- SQL 初始化/迁移脚本。
- API 文档与测试样例（Postman 或 curl）。

---

## 阶段 P2：前端核心能力（第 2-3 周，与 P1 并行）

### Agent-B 任务
- 初始化 React 工程并建立页面路由框架。
- 封装 API Client（鉴权头、错误拦截、超时重试策略）。
- 实现核心页面（列表、详情、编辑）。
- 接入后端接口并完成状态管理。
- 增加基本表单校验与异常提示。

### 验收标准
- 能完整跑通核心业务流程。
- 页面在主流桌面分辨率下可用。
- 与后端契约一致，无硬编码假数据依赖。

### 交付物
- 前端可运行站点。
- 页面与组件说明文档。
- 前端环境变量说明。

---

## 阶段 P3：数据模拟器能力（第 3-4 周）

### Agent-C 任务
- 初始化 Node.js 项目结构与配置。
- 设计数据生成器（模板 + 随机策略 + 约束规则）。
- 实现发送引擎（并发控制、失败重试、速率限制）。
- 支持命令行参数化运行（场景、时长、速率、目标地址）。
- 输出运行报告（成功率、失败原因、吞吐量）。

### 验收标准
- 可在本地稳定生成并推送测试数据。
- 可复现指定测试场景（同参数可重复）。
- 失败数据可追踪并可重放。

### 交付物
- 模拟器可执行程序。
- 示例配置文件与样例数据。
- 运行报告样例。

---

## 阶段 P4：联调与稳定性（第 4-5 周）

### 联调任务
- 打通“模拟器 -> 后端 -> 前端展示”的全链路。
- 对齐时区、时间格式、数值精度、分页规则。
- 统一错误码映射与前端提示文案。
- 进行基础压测与异常注入测试。

### 验收标准
- 全链路场景稳定运行。
- 关键错误具备可定位日志。
- 已知问题进入问题清单并有责任人。

---

## 阶段 P5：发布准备（第 6 周）

### 任务
- 完善部署文档与环境变量模板。
- 为每个子系统编写并验证 Dockerfile（src/GoldenMount、src/NorthToward、src/SecretPalace）。
- 在项目根目录编写 docker-compose.yml，统一编排启动与停止。
- 校验一键启动链路：通过 docker compose up 可完成基础联调环境拉起。
- 完成回归测试与冒烟测试清单。
- 输出版本发布说明与回滚预案。

### 验收标准
- 三个子系统均可通过各自 Dockerfile 独立构建镜像。
- 在项目根目录执行 docker compose up 后，核心链路可用。
- 通过 docker compose down 可完整停止并清理基础运行环境。

### 交付物
- `src/GoldenMount/Dockerfile`
- `src/NorthToward/Dockerfile`
- `src/SecretPalace/Dockerfile`
- 根目录 `docker-compose.yml`
- `doc/runbooks/deploy.md`
- `doc/runbooks/release-checklist.md`
- `doc/changelog/v1.0.0.md`

---

## 5. 跨 Agent 上下文模板（每次交接都要填）

每个 Agent 在提交阶段成果时，必须附上以下内容：
- 当前目标：本次完成了什么。
- 影响范围：涉及哪些模块/接口/表。
- 变更清单：新增、修改、删除的文件和关键配置。
- 验证方式：如何运行、如何验证通过。
- 风险与待办：当前遗留问题与下一步建议。

建议在 `doc/changelog/` 下按日期记录，例如：`YYYY-MM-DD-agentA.md`。

---

## 6. 管理机制

### 6.1 节奏建议
- 每日：站会同步阻塞项和契约变更。
- 每周：一次里程碑评审，确认是否可进入下一阶段。

### 6.2 质量门禁
- 关键模块必须有测试。
- 契约变更必须评审。
- 无文档变更的代码变更不允许合入主分支。

### 6.3 风险清单（初始）
- 契约频繁变化导致前后端返工。
- 模拟数据与真实业务数据偏差过大。
- 多 Agent 并行下出现重复实现或职责重叠。

应对策略：
- 优先冻结 v1 契约，变更走审批。
- 建立样本数据基线并持续校准。
- 使用统一任务看板，明确 Owner 与截止时间。

---

## 7. 多 Agent 隔离规范（强制）

### 7.1 路径边界规范
- Agent-A 仅允许修改 `src/GoldenMount/**`。
- Agent-B 仅允许修改 `src/NorthToward/**`。
- Agent-C 仅允许修改 `src/SecretPalace/**`。
- `doc/contracts/**`、`doc/runbooks/**`、`docker-compose.yml` 属于共享区域，修改前必须在变更说明中标注影响面并通知其他 Agent。
- 非本人负责路径出现改动时，必须停止提交并发起确认。

### 7.2 提交与变更说明规范
- 每次提交仅包含单一目标变更，禁止混合多个子系统改动。
- 变更申请标题格式：`[Agent-X][Subsystem] 变更摘要`。
- 变更申请描述必须包含：变更范围、验证步骤、回滚方式、风险评估。
- 若涉及共享区域，必须附带契约变更说明与兼容性说明。

### 7.3 合并门禁规范
- CI 或脚本检查必须校验路径白名单：
	- Agent-A 提交仅允许 `src/GoldenMount/**` 与必要共享文档。
	- Agent-B 提交仅允许 `src/NorthToward/**` 与必要共享文档。
	- Agent-C 提交仅允许 `src/SecretPalace/**` 与必要共享文档。
- 出现跨子系统越界改动时，合并申请自动拦截，不允许合并。
- 至少 1 名对应子系统负责人评审通过后方可合并。

### 7.4 每日协作检查清单
- 检查当天变更文件是否越界。
- 检查是否修改了共享契约且已通知其他 Agent。
- 检查 docker-compose 变更是否同步更新 runbook。
- 检查联调失败项是否写入 `doc/changelog/` 并分配责任人。

---

## 8. 第一批可立即执行任务（从今天开始）

1. 在 `D:\codepratice\bestpratice\WOW\src` 下创建三套工程骨架目录：`GoldenMount/`、`NorthToward/`、`SecretPalace/`。
2. 先由 Agent-A 输出 API v1 草案与数据库 ER 草案。
3. Agent-B 按 API v1 草案搭建页面与 API Client 骨架。
4. Agent-C 按 API v1 草案实现最小可用数据推送脚本。
5. 三方完成第一次联调并记录问题到 `doc/changelog/`。

> 备注：若后续确定了具体业务域（例如保单、用户、权益、工单等），可在本计划上继续细化为领域级任务分解（Epic -> Story -> Task）。

---

## 9. 当前进度快照（2026-06-26）

### 已完成
- 三个子系统目录与 prompts 专用目录已建立。
- 协作控制区（`doc/collab/`）与统一交接模板已建立。
- 契约文档（API / 错误码 / ER）已形成并可用于联调。
- 根目录 `docker-compose.yml` 已可拉起 GoldenMount、NorthToward、MySQL、Adminer。
- happy path 已打通（事件创建 -> 后端入库 -> 查询可见 -> 前端可访问）。

### 下一步建议
1. 将前端页面字段与 API v1 契约继续逐项收敛，减少兼容层。
2. 补齐 runbooks（`doc/runbooks/`）中的本地启动、联调排障、发布检查清单。
3. 进入 P4/P5 收尾，补充回归清单与版本发布说明。