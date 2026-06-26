# GoldenMount

GoldenMount 是 WOW 项目的 Java 后端子系统基线工程，当前提供统一响应结构、全局异常处理、健康检查接口，以及首个联调用示例事件接口。

## 环境要求

- JDK 17
- Maven 3.9+
- MySQL 8.x（联调环境）

## 环境变量

| 变量名 | 默认值 | 说明 |
| --- | --- | --- |
| `SPRING_PROFILES_ACTIVE` | `dev` | 当前运行环境，支持 `dev` / `prod` |
| `APP_PORT` | `8080` | 应用监听端口 |
| `DB_URL` | `jdbc:h2:mem:golden_mount;MODE=MySQL;DB_CLOSE_DELAY=-1;DATABASE_TO_LOWER=TRUE` | 本地默认使用 H2 MySQL 兼容模式；联调时改为 MySQL 连接串 |
| `DB_USERNAME` | `sa` | 数据库用户名 |
| `DB_PASSWORD` | 空 | 数据库密码 |
| `DB_DRIVER` | `org.h2.Driver` 或 `com.mysql.cj.jdbc.Driver` | 数据库驱动类 |
| `FLYWAY_BASELINE_ON_MIGRATE` | `false` | 生产库已存在历史表结构时，可显式开启 Flyway baseline |
| `DB_POOL_SIZE` | `10` | 生产环境连接池最大连接数 |
| `DB_MIN_IDLE` | `2` | 生产环境连接池最小空闲连接数 |

## Profile 说明

- `dev`：默认启用，使用 H2 MySQL 兼容模式，并自动执行 `schema.sql` 与 `data.sql`。
- `dev`：默认启用，使用 H2 MySQL 兼容模式，并通过 Flyway 执行迁移脚本初始化库结构和基线数据。
- `prod`：面向容器和联调环境，默认按 MySQL 8.x 连接参数启动，关闭 H2 Console，并通过 Flyway 执行独立迁移脚本 `src/main/resources/db/migration/*`。

MySQL 8.x 示例：

```powershell
$env:SPRING_PROFILES_ACTIVE="prod"
$env:DB_URL="jdbc:mysql://127.0.0.1:3306/golden_mount?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai"
$env:DB_USERNAME="root"
$env:DB_PASSWORD="your-password"
mvn spring-boot:run
```

如果目标库已经存在手工创建的表结构，可额外设置：

```powershell
$env:FLYWAY_BASELINE_ON_MIGRATE="true"
```

## 启动方式

```powershell
mvn spring-boot:run
```

指定 `prod` 启动：

```powershell
mvn "-Dspring-boot.run.profiles=prod" spring-boot:run
```

## Docker

构建镜像：

```powershell
docker build -t golden-mount:local .
```

以 `prod` profile 启动容器：

```powershell
docker run --rm -p 8080:8080 ^
	-e SPRING_PROFILES_ACTIVE=prod ^
	-e DB_URL="jdbc:mysql://host.docker.internal:3306/golden_mount?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai&useSSL=false&allowPublicKeyRetrieval=true" ^
	-e DB_USERNAME=root ^
	-e DB_PASSWORD=your-password ^
	golden-mount:local
```

## 迁移脚本说明

- `dev` 与 `prod` 统一使用 Flyway 迁移脚本：
	- `db/migration/V1__create_golden_mount_tables.sql`
	- `db/migration/V2__seed_source_system.sql`
- 后续生产表结构变更应继续新增 `V3__*.sql`、`V4__*.sql`，不要回改已执行版本文件。

## 已提供接口

- `GET /api/v1/health`
- `POST /api/v1/events`
- `GET /api/v1/events`
- `GET /api/v1/events/{eventId}`