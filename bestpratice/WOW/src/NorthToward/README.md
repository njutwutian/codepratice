# NorthToward 前端

React + TypeScript + Vite 的 NorthToward 前端骨架，面向 API v1 联调。

## 目录说明

- `src/api`：API Client、类型定义、错误处理
- `src/layouts`：页面基础布局
- `src/pages`：列表页、详情页、编辑页、404页
- `src/components`：基础组件
- `src/styles`：全局样式

## 环境变量

复制 `.env.example` 为 `.env`：

```bash
VITE_API_BASE_URL=http://localhost:8080
```

## 本地运行

```bash
npm install
npm run dev
```

默认访问：`http://localhost:5173/events`

## 构建验证

```bash
npm run build
```

## Docker 运行

### 开发环境（dev）

```bash
docker compose -f docker-compose.dev.yml up --build
```

访问地址：`http://localhost:5173/events`

可通过环境变量覆盖 API 地址：

```bash
VITE_API_BASE_URL=http://host.docker.internal:8080 docker compose -f docker-compose.dev.yml up --build
```

### 生产环境（prod）

```bash
docker compose -f docker-compose.prod.yml up --build -d
```

访问地址：`http://localhost:8088/events`

可在构建时注入 API 地址：

```bash
VITE_API_BASE_URL=http://your-api-host:8080 docker compose -f docker-compose.prod.yml up --build -d
```

## API 约定

当前 API Client 已对接 API v1：

- `GET /api/v1/events`
- `GET /api/v1/events/{eventId}`

接口采用统一响应包裹结构，并在前端解析 `code` 字段映射错误文案。
