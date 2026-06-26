package com.wow.goldenmount.module.event.domain.entity;

public class EventStatsGroupRow {

    private String label;
    private Long count;

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }
}