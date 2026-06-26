package com.wow.goldenmount.module.health.controller;

import com.wow.goldenmount.common.api.ApiResponse;
import java.time.OffsetDateTime;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/health")
public class HealthController {

    @GetMapping
    public ApiResponse<Map<String, Object>> health() {
        return ApiResponse.ok(Map.of(
                "service", "golden-mount",
                "status", "UP",
                "timestamp", OffsetDateTime.now().toString()));
    }
}