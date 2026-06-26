package com.wow.goldenmount.module.event.service;

import com.wow.goldenmount.module.event.domain.dto.CreateEventRequest;
import com.wow.goldenmount.module.event.domain.dto.EventDetailResponse;
import com.wow.goldenmount.module.event.domain.dto.EventStatsResponse;
import java.util.List;

public interface EventService {

    EventDetailResponse createEvent(CreateEventRequest request);

    List<EventDetailResponse> listEvents(Integer limit);

    EventDetailResponse getEvent(Long eventId);

    EventStatsResponse getEventStats(String eventType, String eventStatus);

    void pushLatestStatsSnapshot();
}