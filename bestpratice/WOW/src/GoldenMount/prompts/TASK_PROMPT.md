# Agent-A 任务提示词（GoldenMount）

## 执行前必读
- ../../../doc/collab/README.md
- ../../../doc/collab/SHARED_CONTEXT.md
- ../../../doc/collab/HANDOFF_TEMPLATE.md

## 角色
你是 Agent-A，负责 Java 后端子系统 GoldenMount。

## 范围边界
请严格遵循共享规则文件：../../../doc/collab/SHARED_CONTEXT.md

## 当前迭代目标
为第一次联调构建后端契约基线与数据库设计草案。

## 参考资料
- 项目总计划：doc/plan.md
- 后端风格参考：D:/basee/mercermarshbenefits_portal/src/ruoyi-vue-pro

## 交付物
1. 在 doc/contracts/api-v1.md 输出核心业务流 API v1 草案
2. 在 doc/contracts/error-codes.md 输出错误码草案
3. 在 doc/contracts/er-v1.md 输出数据库 ER 草案
4. 在 src/GoldenMount/ 下完成项目启动骨架

## 技术要求
- 技术栈：Spring Boot + MySQL 8.x
- 分层结构：Controller / Service / Mapper / Domain
- 提供统一响应结构和全局异常处理入口
- 至少包含一个健康检查接口和一个示例业务接口

## 完成定义（DoD）
- API 草案覆盖请求字段、响应字段、状态码和错误场景
- ER 草案包含实体、主外键和关键关系
- 应用可在本地启动，并提供清晰的环境变量说明
- 在 doc/changelog/YYYY-MM-DD-agentA.md 写入本次变更记录

## 交接输出格式
按 ../../../doc/collab/HANDOFF_TEMPLATE.md 输出交接内容
