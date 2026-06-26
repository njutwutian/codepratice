package com.wow.goldenmount.module.event.service.impl;

import com.wow.goldenmount.common.enums.ErrorCode;
import com.wow.goldenmount.common.exception.BusinessException;
import com.wow.goldenmount.module.event.domain.dto.CreateEventRequest;
import com.wow.goldenmount.module.event.domain.dto.EventDetailResponse;
import com.wow.goldenmount.module.event.domain.dto.EventStatItemResponse;
import com.wow.goldenmount.module.event.domain.dto.EventStatsResponse;
import com.wow.goldenmount.module.event.domain.entity.EventRecordDO;
import com.wow.goldenmount.module.event.domain.entity.EventStatsGroupRow;
import com.wow.goldenmount.module.event.domain.entity.EventStatsTotalRow;
import com.wow.goldenmount.module.event.domain.entity.SourceSystemDO;
import com.wow.goldenmount.module.event.mapper.EventRecordMapper;
import com.wow.goldenmount.module.event.mapper.SourceSystemMapper;
import com.wow.goldenmount.module.event.service.EventService;
import com.wow.goldenmount.module.event.websocket.EventWebSocketHandler;
import com.wow.goldenmount.module.event.websocket.EventWebSocketPublisher;
import java.time.OffsetDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EventServiceImpl implements EventService {

    private final EventRecordMapper eventRecordMapper;
    private final SourceSystemMapper sourceSystemMapper;
    private final EventWebSocketPublisher eventWebSocketPublisher;
    private final EventWebSocketHandler eventWebSocketHandler;

    public EventServiceImpl(
            EventRecordMapper eventRecordMapper,
            SourceSystemMapper sourceSystemMapper,
            EventWebSocketPublisher eventWebSocketPublisher,
            EventWebSocketHandler eventWebSocketHandler) {
        this.eventRecordMapper = eventRecordMapper;
        this.sourceSystemMapper = sourceSystemMapper;
        this.eventWebSocketPublisher = eventWebSocketPublisher;
        this.eventWebSocketHandler = eventWebSocketHandler;
    }

    @Override
    @Transactional
    public EventDetailResponse createEvent(CreateEventRequest request) {
        EventRecordDO existedRecord = eventRecordMapper.findByRequestId(request.requestId());
        if (existedRecord != null) {
            throw new BusinessException(ErrorCode.EVENT_DUPLICATED, "requestId already exists: " + request.requestId());
        }

        SourceSystemDO sourceSystem = sourceSystemMapper.findBySourceCode(request.sourceCode());
        if (sourceSystem == null) {
            throw new BusinessException(ErrorCode.SOURCE_NOT_FOUND, "sourceCode not found: " + request.sourceCode());
        }

        EventRecordDO record = new EventRecordDO();
        OffsetDateTime now = OffsetDateTime.now();
        record.setRequestId(request.requestId());
        record.setSourceId(sourceSystem.getId());
        record.setSourceCode(sourceSystem.getSourceCode());
        record.setEventType(request.eventType());
        record.setEventStatus("RECEIVED");
        record.setEventTime(parseEventTime(request.eventTime()));
        record.setPayloadCount(request.payloadCount());
        record.setPayloadSummary(request.payloadSummary());
        record.setCreatedAt(now);
        record.setUpdatedAt(now);
        eventRecordMapper.insert(record);
        EventDetailResponse response = toResponse(record, sourceSystem.getSourceName());
        eventWebSocketPublisher.publishEventCreated(response);
        return response;
    }

    @Override
    public List<EventDetailResponse> listEvents(Integer limit) {
        int safeLimit = limit == null ? 100 : Math.min(500, Math.max(1, limit));
        return eventRecordMapper.findLatest(safeLimit).stream()
                .map(record -> {
                    SourceSystemDO sourceSystem = sourceSystemMapper.findBySourceCode(record.getSourceCode());
                    String sourceName = sourceSystem == null ? null : sourceSystem.getSourceName();
                    return toResponse(record, sourceName);
                })
                .toList();
    }

    @Override
    public EventDetailResponse getEvent(Long eventId) {
        EventRecordDO record = eventRecordMapper.findById(eventId);
        if (record == null) {
            throw new BusinessException(ErrorCode.EVENT_NOT_FOUND, "eventId not found: " + eventId);
        }
        SourceSystemDO sourceSystem = sourceSystemMapper.findBySourceCode(record.getSourceCode());
        String sourceName = sourceSystem == null ? null : sourceSystem.getSourceName();
        return toResponse(record, sourceName);
    }

    @Override
    public EventStatsResponse getEventStats(String eventType, String eventStatus) {
        String normalizedType = normalizeFilter(eventType);
        String normalizedStatus = normalizeFilter(eventStatus);

        EventStatsTotalRow totalRow = eventRecordMapper.aggregateTotals(normalizedType, normalizedStatus);
        List<EventStatsGroupRow> typeRows = eventRecordMapper.aggregateCountByType(normalizedType, normalizedStatus);
        List<EventStatsGroupRow> statusRows = eventRecordMapper.aggregateCountByStatus(normalizedType, normalizedStatus);

        Long totalEvents = totalRow == null || totalRow.getTotalEvents() == null ? 0L : totalRow.getTotalEvents();
        Long totalPayload = totalRow == null || totalRow.getTotalPayload() == null ? 0L : totalRow.getTotalPayload();

        return new EventStatsResponse(
                totalEvents,
                totalPayload,
                toStatItems(typeRows),
                toStatItems(statusRows));
    }

    @Override
    public void pushLatestStatsSnapshot() {
        eventWebSocketHandler.broadcastLatestStatsSnapshot();
    }

    private OffsetDateTime parseEventTime(String eventTime) {
        try {
            return OffsetDateTime.parse(eventTime);
        } catch (DateTimeParseException exception) {
            throw new BusinessException(ErrorCode.INVALID_PARAM, "eventTime must use ISO-8601 offset datetime format");
        }
    }

    private EventDetailResponse toResponse(EventRecordDO record, String sourceName) {
        return new EventDetailResponse(
                record.getId(),
                record.getRequestId(),
                record.getSourceCode(),
                sourceName,
                record.getEventType(),
                record.getEventStatus(),
                record.getEventTime().toString(),
                record.getPayloadCount(),
                record.getPayloadSummary(),
                record.getCreatedAt().toString());
    }

    private String normalizeFilter(String value) {
        if (value == null) {
            return null;
        }

        String trimmed = value.trim();
        if (trimmed.isEmpty() || "ALL".equalsIgnoreCase(trimmed)) {
            return null;
        }

        return trimmed;
    }

    private List<EventStatItemResponse> toStatItems(List<EventStatsGroupRow> rows) {
        return rows.stream()
                .map(row -> new EventStatItemResponse(row.getLabel(), row.getCount()))
                .toList();
    }
}