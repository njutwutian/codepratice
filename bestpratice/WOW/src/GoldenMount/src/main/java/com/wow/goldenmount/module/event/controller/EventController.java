package com.wow.goldenmount.module.event.controller;

import com.wow.goldenmount.common.api.ApiResponse;
import com.wow.goldenmount.module.event.domain.dto.CreateEventRequest;
import com.wow.goldenmount.module.event.domain.dto.EventDetailResponse;
import com.wow.goldenmount.module.event.domain.dto.EventStatsResponse;
import com.wow.goldenmount.module.event.service.EventService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

@Validated
@RestController
@RequestMapping("/api/v1/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping
    public ApiResponse<EventDetailResponse> createEvent(@Valid @RequestBody CreateEventRequest request) {
        return ApiResponse.ok(eventService.createEvent(request));
    }

    @GetMapping
    public ApiResponse<List<EventDetailResponse>> listEvents(@RequestParam(defaultValue = "100") Integer limit) {
        return ApiResponse.ok(eventService.listEvents(limit));
    }

    @GetMapping("/stats")
    public ApiResponse<EventStatsResponse> getEventStats(
            @RequestParam(required = false) String eventType,
            @RequestParam(required = false) String eventStatus) {
        return ApiResponse.ok(eventService.getEventStats(eventType, eventStatus));
    }

    @PostMapping("/stats/push")
    public ApiResponse<Void> pushLatestStatsSnapshot() {
        eventService.pushLatestStatsSnapshot();
        return ApiResponse.ok();
    }

    @GetMapping("/{eventId}")
    public ApiResponse<EventDetailResponse> getEvent(@PathVariable Long eventId) {
        return ApiResponse.ok(eventService.getEvent(eventId));
    }
}