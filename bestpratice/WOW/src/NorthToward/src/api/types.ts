export interface ApiEnvelope<TData> {
  success: boolean;
  code: string;
  message: string;
  data: TData;
}

export interface EventRecord {
  eventId: number;
  requestId: string;
  sourceCode: string;
  sourceName: string;
  eventType: string;
  eventStatus: string;
  eventTime: string;
  payloadCount: number;
  payloadSummary?: string;
  createdAt: string;
}

export interface EventStatItem {
  label: string;
  count: number;
}

export interface EventStatsResponse {
  totalEvents: number;
  totalPayload: number;
  countByType: EventStatItem[];
  countByStatus: EventStatItem[];
}
