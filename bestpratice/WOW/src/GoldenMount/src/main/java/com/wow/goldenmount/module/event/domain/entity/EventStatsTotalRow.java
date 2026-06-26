package com.wow.goldenmount.module.event.domain.entity;

public class EventStatsTotalRow {

    private Long totalEvents;
    private Long totalPayload;

    public Long getTotalEvents() {
        return totalEvents;
    }

    public void setTotalEvents(Long totalEvents) {
        this.totalEvents = totalEvents;
    }

    public Long getTotalPayload() {
        return totalPayload;
    }

    public void setTotalPayload(Long totalPayload) {
        this.totalPayload = totalPayload;
    }
}