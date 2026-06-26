package com.wow.goldenmount.module.event.websocket;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wow.goldenmount.module.event.domain.dto.EventStatItemResponse;
import com.wow.goldenmount.module.event.domain.dto.EventStatsResponse;
import com.wow.goldenmount.module.event.domain.dto.EventDetailResponse;
import com.wow.goldenmount.module.event.domain.entity.EventStatsGroupRow;
import com.wow.goldenmount.module.event.domain.entity.EventStatsTotalRow;
import com.wow.goldenmount.module.event.mapper.EventRecordMapper;
import jakarta.annotation.PreDestroy;
import java.time.OffsetDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class EventWebSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper;
    private final EventRecordMapper eventRecordMapper;
    private final Set<WebSocketSession> sessions = ConcurrentHashMap.newKeySet();
    private final AtomicLong pendingEventCount = new AtomicLong(0);
    private final ScheduledExecutorService batchSender = Executors.newSingleThreadScheduledExecutor();

    public EventWebSocketHandler(ObjectMapper objectMapper, EventRecordMapper eventRecordMapper) {
        this.objectMapper = objectMapper;
        this.eventRecordMapper = eventRecordMapper;
        this.batchSender.scheduleAtFixedRate(this::flushBatchSafely, 1, 1, TimeUnit.SECONDS);
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        sessions.add(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        sessions.remove(session);
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) {
        sessions.remove(session);
    }

    public void broadcastEventCreated(EventDetailResponse response) {
        pendingEventCount.incrementAndGet();
    }

    public void broadcastLatestStatsSnapshot() {
        broadcastStatsSnapshot(0L);
    }

    @PreDestroy
    public void shutdownBatchSender() {
        batchSender.shutdownNow();
    }

    private void flushBatchSafely() {
        try {
            flushBatch();
        } catch (Exception ignored) {
            // Keep scheduled task alive even if one flush fails.
        }
    }

    private void flushBatch() {
        long batchCount = pendingEventCount.getAndSet(0);
        if (batchCount <= 0) {
            return;
        }

        broadcastStatsSnapshot(batchCount);
    }

    private void broadcastStatsSnapshot(long batchCount) {
        EventStatsResponse stats = queryAllStats();

        Map<String, Object> payloadObject = new LinkedHashMap<>();
        payloadObject.put("type", "EVENT_STATS");
        payloadObject.put("count", batchCount);
        payloadObject.put("eventTime", OffsetDateTime.now().toString());
        payloadObject.put("stats", stats);

        String payload;
        try {
            payload = objectMapper.writeValueAsString(payloadObject);
        } catch (JsonProcessingException exception) {
            return;
        }

        TextMessage message = new TextMessage(payload);
        sessions.removeIf(session -> !session.isOpen());
        sessions.forEach(session -> {
            if (!session.isOpen()) {
                return;
            }
            try {
                session.sendMessage(message);
            } catch (Exception ignored) {
                sessions.remove(session);
            }
        });
    }

    private EventStatsResponse queryAllStats() {
        EventStatsTotalRow totalRow = eventRecordMapper.aggregateTotals(null, null);
        List<EventStatsGroupRow> typeRows = eventRecordMapper.aggregateCountByType(null, null);
        List<EventStatsGroupRow> statusRows = eventRecordMapper.aggregateCountByStatus(null, null);

        Long totalEvents = totalRow == null || totalRow.getTotalEvents() == null ? 0L : totalRow.getTotalEvents();
        Long totalPayload = totalRow == null || totalRow.getTotalPayload() == null ? 0L : totalRow.getTotalPayload();

        return new EventStatsResponse(
                totalEvents,
                totalPayload,
                toStatItems(typeRows),
                toStatItems(statusRows));
    }

    private List<EventStatItemResponse> toStatItems(List<EventStatsGroupRow> rows) {
        return rows.stream()
                .map(row -> new EventStatItemResponse(row.getLabel(), row.getCount()))
                .toList();
    }
}