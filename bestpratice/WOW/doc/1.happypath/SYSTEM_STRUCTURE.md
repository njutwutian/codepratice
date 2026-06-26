# WOW 项目结构总览

## 代码结构
- bestpratice/WOW/src/GoldenMount：后端服务。
- bestpratice/WOW/src/NorthToward：前端应用。
- bestpratice/WOW/src/SecretPalace：模拟器服务。
- bestpratice/WOW/docker-compose.yml：统一本地编排入口。

## 运行结构
- mysql：业务数据存储，数据卷持久化到本地目录。
- adminer：MySQL 图形化管理。
- goldenmount：后端 API 服务。
- northtoward：前端页面服务。

## 关键接口（概念级）
- health：健康检查。
- events create：创建事件。
- events list：事件列表。
- events detail：事件详情。

## 协作边界（简化版）
- GoldenMount 只负责 API、模型、持久化。
- NorthToward 只负责页面、交互、前端状态。
- SecretPalace 只负责模拟数据与回放。
- 跨系统修改先更新契约，再落各子系统。
