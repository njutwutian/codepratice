package com.wow.goldenmount.module.event.websocket;

import com.wow.goldenmount.module.event.domain.dto.EventDetailResponse;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;

@Component
public class EventWebSocketPublisher {

    private final EventWebSocketHandler eventWebSocketHandler;

    public EventWebSocketPublisher(EventWebSocketHandler eventWebSocketHandler) {
        this.eventWebSocketHandler = eventWebSocketHandler;
    }

    public void publishEventCreated(EventDetailResponse response) {
        if (TransactionSynchronizationManager.isSynchronizationActive()) {
            TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
                @Override
                public void afterCommit() {
                    eventWebSocketHandler.broadcastEventCreated(response);
                }
            });
            return;
        }

        eventWebSocketHandler.broadcastEventCreated(response);
    }
}