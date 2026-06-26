# WOW 错误码草案

## 1. 设计约定

- 前缀统一使用 `GM`，表示 GoldenMount。
- 结构：`GM-<HTTP语义>-<业务标识>`。
- 接口响应体中的 `code` 为业务错误码，HTTP 状态码保留传输语义。

## 2. 错误码清单

| 错误码 | HTTP 状态码 | 含义 | 触发场景 | 处理建议 |
| --- | --- | --- | --- | --- |
| `OK` | 200 | 成功 | 请求处理成功 | 无 |
| `GM-400` | 400 | 请求参数非法 | 缺失字段、时间格式错误、数字越界 | 调整请求参数后重试 |
| `GM-404-SOURCE` | 400 | 来源系统不存在 | `sourceCode` 未注册 | 使用约定来源编码，或先补主数据 |
| `GM-404-EVENT` | 400/404 | 事件不存在 | `eventId` 查无记录 | 确认事件已创建且 ID 正确 |
| `GM-409-EVENT` | 400/409 | 幂等键冲突 | `requestId` 已存在 | 改用新的 `requestId`，或视为重复投递成功 |
| `GM-500` | 500 | 系统内部错误 | 未捕获异常、数据库异常 | 查看服务日志并排查 |

## 3. 响应示例

### 参数错误

```json
{
  "success": false,
  "code": "GM-400",
  "message": "payloadCount must be positive",
  "data": null
}
```

### 幂等冲突

```json
{
  "success": false,
  "code": "GM-409-EVENT",
  "message": "requestId already exists: REQ-20260626-0001",
  "data": null
}
```

### 来源系统不存在

```json
{
  "success": false,
  "code": "GM-404-SOURCE",
  "message": "sourceCode not found: SIMULATOR_X",
  "data": null
}
```

## 4. 后续扩展预留

后续按模块补充分段：

- `GM-401-*`：鉴权失败
- `GM-403-*`：权限拒绝
- `GM-422-*`：业务状态不满足
- `GM-429-*`：限流与频控