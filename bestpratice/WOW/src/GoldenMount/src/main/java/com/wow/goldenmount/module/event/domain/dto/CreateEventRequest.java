package com.wow.goldenmount.module.event.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CreateEventRequest(
        @NotBlank(message = "requestId cannot be blank") String requestId,
        @NotBlank(message = "sourceCode cannot be blank") String sourceCode,
        @NotBlank(message = "eventType cannot be blank") String eventType,
        @NotNull(message = "eventTime cannot be null") String eventTime,
        @NotNull(message = "payloadCount cannot be null") @Positive(message = "payloadCount must be positive") Integer payloadCount,
        String payloadSummary) {
}