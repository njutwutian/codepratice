import { request } from "./http";
import type { EventRecord, EventStatsResponse } from "./types";

export const getEvents = (limit: number = 100): Promise<EventRecord[]> => {
  const safeLimit = Math.max(1, Math.floor(limit));
  return request<EventRecord[]>(`/api/v1/events?limit=${safeLimit}`);
};

export const getEventById = (eventId: string): Promise<EventRecord> => {
  return request<EventRecord>(`/api/v1/events/${eventId}`);
};

export const getEventStats = (filters?: {
  eventType?: string;
  eventStatus?: string;
}): Promise<EventStatsResponse> => {
  const params = new URLSearchParams();

  if (filters?.eventType && filters.eventType !== "ALL") {
    params.set("eventType", filters.eventType);
  }
  if (filters?.eventStatus && filters.eventStatus !== "ALL") {
    params.set("eventStatus", filters.eventStatus);
  }

  const query = params.toString();
  const path = query ? `/api/v1/events/stats?${query}` : "/api/v1/events/stats";
  return request<EventStatsResponse>(path);
};
