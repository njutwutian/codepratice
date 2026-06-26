package com.wow.goldenmount.module.event.domain.dto;

public record EventDetailResponse(
        Long eventId,
        String requestId,
        String sourceCode,
        String sourceName,
        String eventType,
        String eventStatus,
        String eventTime,
        Integer payloadCount,
        String payloadSummary,
        String createdAt) {
}