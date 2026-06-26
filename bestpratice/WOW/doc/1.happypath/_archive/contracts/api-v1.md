# WOW API v1 草案

## 1. 文档范围

本草案定义 WOW 第一次联调的后端 REST 基线，面向以下最小闭环：

1. `SecretPalace` 模拟器向后端投递事件。
2. `GoldenMount` 持久化事件并返回统一响应。
3. `NorthToward` 前端查询事件列表与详情。

统一约束：

- Base URL：`/api/v1`
- Content-Type：`application/json`
- 时间格式：ISO-8601 Offset DateTime，例如 `2026-06-26T14:00:00+08:00`
- 统一响应结构：

```json
{
  "success": true,
  "code": "OK",
  "message": "success",
  "data": {}
}
```

失败示例：

```json
{
  "success": false,
  "code": "GM-404-SOURCE",
  "message": "sourceCode not found: SIMULATOR_X",
  "data": null
}
```

## 2. 核心业务流

### 2.1 事件入站流

1. 模拟器按约定 `sourceCode` 发送事件。
2. 后端校验参数、幂等键 `requestId`、来源系统有效性。
3. 后端写入 `gm_event_record`。
4. 后端返回已受理事件详情。

### 2.2 事件查询流

1. 前端请求事件列表。
2. 后端返回倒序列表。
3. 前端按 `eventId` 拉取详情。

## 3. 接口定义

### 3.1 健康检查

**请求**

- Method：`GET`
- Path：`/api/v1/health`

**响应字段**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `success` | boolean | 是否成功 |
| `code` | string | 固定为 `OK` |
| `message` | string | 固定为 `success` |
| `data.service` | string | 服务名 |
| `data.status` | string | 服务状态，当前固定 `UP` |
| `data.timestamp` | string | 服务时间 |

**成功响应示例**

```json
{
  "success": true,
  "code": "OK",
  "message": "success",
  "data": {
    "service": "golden-mount",
    "status": "UP",
    "timestamp": "2026-06-26T14:00:00+08:00"
  }
}
```

**状态码**

- `200 OK`
- `500 Internal Server Error`

### 3.2 创建事件

**请求**

- Method：`POST`
- Path：`/api/v1/events`

**请求字段**

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `requestId` | string | 是 | 请求幂等键，全局唯一 |
| `sourceCode` | string | 是 | 来源系统编码，需在 `gm_source_system` 中存在 |
| `eventType` | string | 是 | 事件类型，例如 `DEVICE_STATUS` |
| `eventTime` | string | 是 | 事件发生时间，ISO-8601 Offset DateTime |
| `payloadCount` | integer | 是 | 当前事件包含的数据条数，必须大于 0 |
| `payloadSummary` | string | 否 | 事件内容摘要，长度建议不超过 512 |

**请求示例**

```json
{
  "requestId": "REQ-20260626-0001",
  "sourceCode": "SIMULATOR_A",
  "eventType": "DEVICE_STATUS",
  "eventTime": "2026-06-26T14:00:00+08:00",
  "payloadCount": 20,
  "payloadSummary": "20 device status records uploaded"
}
```

**响应字段**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `data.eventId` | number | 事件主键 |
| `data.requestId` | string | 请求幂等键 |
| `data.sourceCode` | string | 来源系统编码 |
| `data.sourceName` | string | 来源系统名称 |
| `data.eventType` | string | 事件类型 |
| `data.eventStatus` | string | 当前状态，v1 固定 `RECEIVED` |
| `data.eventTime` | string | 事件时间 |
| `data.payloadCount` | integer | 数据条数 |
| `data.payloadSummary` | string | 事件摘要 |
| `data.createdAt` | string | 入库时间 |

**成功响应示例**

```json
{
  "success": true,
  "code": "OK",
  "message": "success",
  "data": {
    "eventId": 1001,
    "requestId": "REQ-20260626-0001",
    "sourceCode": "SIMULATOR_A",
    "sourceName": "SecretPalace Simulator",
    "eventType": "DEVICE_STATUS",
    "eventStatus": "RECEIVED",
    "eventTime": "2026-06-26T14:00:00+08:00",
    "payloadCount": 20,
    "payloadSummary": "20 device status records uploaded",
    "createdAt": "2026-06-26T14:00:01+08:00"
  }
}
```

**状态码**

- `200 OK`
- `400 Bad Request`
- `409 Conflict`
- `500 Internal Server Error`

**错误场景**

- `requestId` 缺失或重复
- `sourceCode` 不存在
- `eventTime` 不是 ISO-8601 Offset DateTime
- `payloadCount <= 0`

### 3.3 查询事件列表

**请求**

- Method：`GET`
- Path：`/api/v1/events`

v1 暂不提供分页参数，默认按 `eventId` 倒序返回最近记录。后续版本补充分页和筛选。

**响应字段**

返回数组，每个元素字段与“创建事件”响应中的 `data` 一致。

**成功响应示例**

```json
{
  "success": true,
  "code": "OK",
  "message": "success",
  "data": [
    {
      "eventId": 1002,
      "requestId": "REQ-20260626-0002",
      "sourceCode": "MANUAL_PORTAL",
      "sourceName": "NorthToward Portal",
      "eventType": "MANUAL_REVIEW",
      "eventStatus": "RECEIVED",
      "eventTime": "2026-06-26T14:05:00+08:00",
      "payloadCount": 1,
      "payloadSummary": "manual review created",
      "createdAt": "2026-06-26T14:05:02+08:00"
    }
  ]
}
```

**状态码**

- `200 OK`
- `500 Internal Server Error`

### 3.4 查询事件详情

**请求**

- Method：`GET`
- Path：`/api/v1/events/{eventId}`

**路径参数**

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `eventId` | number | 事件主键 |

**响应字段**

与“创建事件”响应中的 `data` 一致。

**状态码**

- `200 OK`
- `400 Bad Request`
- `404 Not Found`
- `500 Internal Server Error`

**错误场景**

- `eventId` 不存在
- `eventId` 格式错误

## 4. 来源系统基线数据

| sourceCode | sourceName | 用途 |
| --- | --- | --- |
| `SIMULATOR_A` | SecretPalace Simulator | 模拟器事件上报 |
| `MANUAL_PORTAL` | NorthToward Portal | 前端人工提交或回填 |

## 5. 联调建议

1. Agent-C 优先按 `POST /api/v1/events` 对接，并保证 `requestId` 唯一。
2. Agent-B 先消费 `GET /api/v1/events` 和 `GET /api/v1/events/{eventId}`。
3. 分页、鉴权、批量写入结果回执放入 v1.1 迭代。