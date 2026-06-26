package com.wow.goldenmount.module.event.domain.dto;

import java.util.List;

public record EventStatsResponse(
        Long totalEvents,
        Long totalPayload,
        List<EventStatItemResponse> countByType,
        List<EventStatItemResponse> countByStatus) {
}