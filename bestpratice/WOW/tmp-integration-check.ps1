$base = "http://127.0.0.1:18080/api/v1"
$requestId = "REQ-INT-" + [DateTimeOffset]::Now.ToUnixTimeMilliseconds()

function Invoke-CurlJson {
	param(
		[string]$Method,
		[string]$Url,
		[string]$Body
	)

	try {
		if ([string]::IsNullOrWhiteSpace($Body)) {
			$resp = Invoke-WebRequest -Uri $Url -Method $Method -ContentType "application/json" -UseBasicParsing
		} else {
			$resp = Invoke-WebRequest -Uri $Url -Method $Method -ContentType "application/json" -Body $Body -UseBasicParsing
		}

		$status = $resp.StatusCode
		if ($status -isnot [int]) {
			$status = $status.value__
		}

		return @{
			Content = $resp.Content
			StatusCode = [string]$status
		}
	} catch [System.Net.WebException] {
		$httpResp = $_.Exception.Response
		$status = [int]$httpResp.StatusCode
		$reader = New-Object System.IO.StreamReader($httpResp.GetResponseStream())
		$content = $reader.ReadToEnd()
		$reader.Close()

		return @{
			Content = $content
			StatusCode = [string]$status
		}
	}
}

$successBody = @{ requestId = $requestId; sourceCode = "SIMULATOR_A"; eventType = "DEVICE_STATUS"; eventTime = (Get-Date).ToString("yyyy-MM-ddTHH:mm:sszzz"); payloadCount = 2; payloadSummary = "integration success sample" } | ConvertTo-Json -Compress
$successResp = Invoke-CurlJson -Method "POST" -Url "$base/events" -Body $successBody
$successJson = $successResp.Content | ConvertFrom-Json
$eventId = $successJson.data.eventId

$listResp = Invoke-CurlJson -Method "GET" -Url "$base/events" -Body ""
$detailResp = Invoke-CurlJson -Method "GET" -Url "$base/events/$eventId" -Body ""

$badSourceBody = @{ requestId = "REQ-BADSOURCE-" + [DateTimeOffset]::Now.ToUnixTimeMilliseconds(); sourceCode = "SIMULATOR_X"; eventType = "DEVICE_STATUS"; eventTime = (Get-Date).ToString("yyyy-MM-ddTHH:mm:sszzz"); payloadCount = 1; payloadSummary = "bad source" } | ConvertTo-Json -Compress
$badSourceResp = Invoke-CurlJson -Method "POST" -Url "$base/events" -Body $badSourceBody

$dupBody = @{ requestId = $requestId; sourceCode = "SIMULATOR_A"; eventType = "DEVICE_STATUS"; eventTime = (Get-Date).ToString("yyyy-MM-ddTHH:mm:sszzz"); payloadCount = 1; payloadSummary = "dup request" } | ConvertTo-Json -Compress
$dupResp = Invoke-CurlJson -Method "POST" -Url "$base/events" -Body $dupBody

$badCountBody = @{ requestId = "REQ-BADCOUNT-" + [DateTimeOffset]::Now.ToUnixTimeMilliseconds(); sourceCode = "SIMULATOR_A"; eventType = "DEVICE_STATUS"; eventTime = (Get-Date).ToString("yyyy-MM-ddTHH:mm:sszzz"); payloadCount = 0; payloadSummary = "bad count" } | ConvertTo-Json -Compress
$badCountResp = Invoke-CurlJson -Method "POST" -Url "$base/events" -Body $badCountBody

$lines = @()
$lines += "# 2026-06-26 Agent-A 联调回执样例"
$lines += ""
$lines += "## 成功链路"
$lines += ""
$lines += "### POST /api/v1/events"
$lines += "- HTTP: $($successResp.StatusCode)"
$lines += ""
$lines += "Response:"
$lines += $successResp.Content
$lines += ""
$lines += "### GET /api/v1/events"
$lines += "- HTTP: $($listResp.StatusCode)"
$lines += ""
$lines += "Response:"
$lines += $listResp.Content
$lines += ""
$lines += "### GET /api/v1/events/$eventId"
$lines += "- HTTP: $($detailResp.StatusCode)"
$lines += ""
$lines += "Response:"
$lines += $detailResp.Content
$lines += ""
$lines += "## 失败场景"
$lines += ""
$lines += "### sourceCode 不存在"
$lines += "- HTTP: $($badSourceResp.StatusCode)"
$lines += ""
$lines += "Response:"
$lines += $badSourceResp.Content
$lines += ""
$lines += "### requestId 重复"
$lines += "- HTTP: $($dupResp.StatusCode)"
$lines += ""
$lines += "Response:"
$lines += $dupResp.Content
$lines += ""
$lines += "### payloadCount <= 0"
$lines += "- HTTP: $($badCountResp.StatusCode)"
$lines += ""
$lines += "Response:"
$lines += $badCountResp.Content

Set-Content -Path "doc/changelog/2026-06-26-agentA-integration.md" -Value $lines -Encoding UTF8
Write-Host "WROTE: doc/changelog/2026-06-26-agentA-integration.md"
Write-Host "SUCCESS_EVENT_ID: $eventId"
Write-Host "POST_STATUS: $($successResp.StatusCode), BAD_SOURCE_STATUS: $($badSourceResp.StatusCode), DUP_STATUS: $($dupResp.StatusCode), BAD_COUNT_STATUS: $($badCountResp.StatusCode)"
