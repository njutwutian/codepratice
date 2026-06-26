# WOW 项目持久记忆

## 一句话
WOW 是一个事件链路演示项目：模拟器产生日志事件，后端入库并提供查询接口，前端展示列表与详情。

## 三个子系统
- GoldenMount：后端 API 与数据持久化，技术栈 Spring Boot + MySQL + Flyway。
- NorthToward：前端控制台，技术栈 React + TypeScript + Vite。
- SecretPalace：数据模拟器，负责生成与发送测试事件。

## 核心数据流
1. SecretPalace 发送事件到 GoldenMount API。
2. GoldenMount 校验并写入 MySQL。
3. NorthToward 调用 API 查询事件列表与详情。

## 当前稳定能力
- 容器编排可启动：MySQL + Adminer + GoldenMount + NorthToward。
- 事件 Happy Path 已打通：创建事件 -> 查询列表 -> 查看详情。
- 前端首页为两栏布局：左侧功能菜单，右侧内容区。

## 目录定位
- 文档快览：README.md
- 结构说明：SYSTEM_STRUCTURE.md
- 联调流程：HAPPY_PATH_RUNBOOK.md
- 历史细节：_archive/
