# 2026-06-26 Agent-A 联调回执样例

## 成功链路

### POST /api/v1/events
- HTTP: 200

Response:
{"success":true,"code":"OK","message":"success","data":{"eventId":1,"requestId":"REQ-INT-1782463331192","sourceCode":"SIMULATOR_A","sourceName":"SecretPalace Simulator","eventType":"DEVICE_STATUS","eventStatus":"RECEIVED","eventTime":"2026-06-26T16:42:11+08:00","payloadCount":2,"payloadSummary":"integration success sample","createdAt":"2026-06-26T16:42:11.325276700+08:00"}}

### GET /api/v1/events
- HTTP: 200

Response:
{"success":true,"code":"OK","message":"success","data":[{"eventId":1,"requestId":"REQ-INT-1782463331192","sourceCode":"SIMULATOR_A","sourceName":"SecretPalace Simulator","eventType":"DEVICE_STATUS","eventStatus":"RECEIVED","eventTime":"2026-06-26T16:42:11+08:00","payloadCount":2,"payloadSummary":"integration success sample","createdAt":"2026-06-26T16:42:11.325277+08:00"}]}

### GET /api/v1/events/1
- HTTP: 200

Response:
{"success":true,"code":"OK","message":"success","data":{"eventId":1,"requestId":"REQ-INT-1782463331192","sourceCode":"SIMULATOR_A","sourceName":"SecretPalace Simulator","eventType":"DEVICE_STATUS","eventStatus":"RECEIVED","eventTime":"2026-06-26T16:42:11+08:00","payloadCount":2,"payloadSummary":"integration success sample","createdAt":"2026-06-26T16:42:11.325277+08:00"}}

## 失败场景

### sourceCode 不存在
- HTTP: 400

Response:
{"success":false,"code":"GM-404-SOURCE","message":"sourceCode not found: SIMULATOR_X","data":null}

### requestId 重复
- HTTP: 400

Response:
{"success":false,"code":"GM-409-EVENT","message":"requestId already exists: REQ-INT-1782463331192","data":null}

### payloadCount <= 0
- HTTP: 400

Response:
{"success":false,"code":"GM-400","message":"payloadCount payloadCount must be positive","data":null}
