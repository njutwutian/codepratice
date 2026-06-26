import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { EChartsOption } from "echarts";
import ReactECharts from "echarts-for-react";

import { getEventStats } from "../api/client";
import type { EventStatItem, EventStatsResponse } from "../api/types";
import ErrorBanner from "../components/ErrorBanner";

type WsState = "disabled" | "connecting" | "open" | "closed" | "error";

const ALL_VALUE = "ALL";

const resolveWsUrl = (): string | null => {
  const explicit = import.meta.env.VITE_WS_EVENTS_URL?.trim();
  if (explicit) {
    return explicit;
  }

  const apiBase = import.meta.env.VITE_API_BASE_URL?.trim();
  if (!apiBase) {
    return null;
  }

  try {
    const url = new URL(apiBase);
    url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
    url.pathname = "/ws/events";
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return null;
  }
};

const buildEmptyStats = (): EventStatsResponse => {
  return {
    totalEvents: 0,
    totalPayload: 0,
    countByType: [],
    countByStatus: []
  };
};

const isValidStats = (value: unknown): value is EventStatsResponse => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;
  if (typeof record.totalEvents !== "number" || typeof record.totalPayload !== "number") {
    return false;
  }

  const countByType = record.countByType;
  const countByStatus = record.countByStatus;
  if (!Array.isArray(countByType) || !Array.isArray(countByStatus)) {
    return false;
  }

  const isValidItem = (item: unknown): boolean => {
    if (!item || typeof item !== "object") {
      return false;
    }
    const row = item as Record<string, unknown>;
    return typeof row.label === "string" && typeof row.count === "number";
  };

  return countByType.every(isValidItem) && countByStatus.every(isValidItem);
};

const extractStatsFromWsPayload = (payload: unknown): EventStatsResponse | null => {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const record = payload as Record<string, unknown>;
  if (record.type !== "EVENT_STATS") {
    return null;
  }

  const stats = record.stats;
  if (!isValidStats(stats)) {
    return null;
  }

  return stats;
};

const extractLabels = (items: EventStatItem[]): string[] => {
  return items
    .map((item) => item.label)
    .filter((label) => Boolean(label))
    .sort((a, b) => a.localeCompare(b));
};

const buildBarOption = (title: string, items: EventStatItem[]): EChartsOption => {
  return {
    title: {
      text: title,
      left: "middle",
      textStyle: {
        fontSize: 14,
        fontWeight: 600,
        baseline: "middle",
        color: "#1b2a41"
      }
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      left: 36,
      right: 16,
      top: 44,
      bottom: 44,
      containLabel: true
    },
    xAxis: {
      type: "category",
      data: items.map((item) => item.label),
      axisLabel: {
        interval: 0,
        rotate: 20
      }
    },
    yAxis: {
      type: "value",
      minInterval: 1
    },
    series: [
      {
        type: "bar",
        data: items.map((item) => item.count),
        barMaxWidth: 42,
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: "#2f7af8"
        },
        animationDuration: 400
      }
    ]
  };
};

const StatBarChart = ({ title, items }: { title: string; items: EventStatItem[] }) => {
  const option = useMemo(() => buildBarOption(title, items), [title, items]);

  return (
    <article className="chart-card">
      {items.length === 0 ? (
        <p className="chart-empty">当前筛选条件下暂无统计数据。</p>
      ) : (
        <ReactECharts option={option} className="echarts-canvas" notMerge lazyUpdate />
      )}
    </article>
  );
};

const DashboardPage = () => {
  const [stats, setStats] = useState<EventStatsResponse>(buildEmptyStats);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [wsState, setWsState] = useState<WsState>("disabled");
  const [wsEnabled, setWsEnabled] = useState<boolean>(true);
  const [selectedType, setSelectedType] = useState<string>(ALL_VALUE);
  const [selectedStatus, setSelectedStatus] = useState<string>(ALL_VALUE);
  const latestWsStatsRef = useRef<EventStatsResponse | null>(null);
  const hasPendingWsStatsRef = useRef<boolean>(false);

  const refreshStats = useCallback((filters: { eventType: string; eventStatus: string }): Promise<void> => {
    return getEventStats({
      eventType: filters.eventType,
      eventStatus: filters.eventStatus
    })
      .then((data) => {
        setStats(data);
        setError(null);
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "加载事件统计失败";
        setError(message);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    refreshStats({ eventType: selectedType, eventStatus: selectedStatus }).finally(() => {
      setLoading(false);
    });
  }, [refreshStats, selectedType, selectedStatus]);

  useEffect(() => {
    if (!wsEnabled) {
      hasPendingWsStatsRef.current = false;
      return;
    }

    const timer = window.setInterval(() => {
      if (!hasPendingWsStatsRef.current) {
        return;
      }

      if (selectedType !== ALL_VALUE || selectedStatus !== ALL_VALUE) {
        return;
      }

      if (!latestWsStatsRef.current) {
        return;
      }

      setStats(latestWsStatsRef.current);
      setError(null);
      setLoading(false);
      hasPendingWsStatsRef.current = false;
    }, 2000);

    return () => {
      window.clearInterval(timer);
    };
  }, [selectedStatus, selectedType, wsEnabled]);

  useEffect(() => {
    const wsUrl = resolveWsUrl();
    if (!wsEnabled) {
      setWsState("disabled");
      return;
    }

    if (!wsUrl) {
      setWsState("disabled");
      return;
    }

    let socket: WebSocket | null = null;
    let reconnectTimer: number | null = null;
    let stopped = false;

    const clearReconnectTimer = (): void => {
      if (reconnectTimer === null) {
        return;
      }
      window.clearTimeout(reconnectTimer);
      reconnectTimer = null;
    };

    const connect = (): void => {
      if (stopped) {
        return;
      }

      setWsState("connecting");
      socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        setWsState("open");
      };

      socket.onmessage = (event) => {
        if (typeof event.data === "string" && event.data.length === 0) {
          return;
        }

        try {
          const payload = JSON.parse(String(event.data)) as unknown;
          const statsFromWs = extractStatsFromWsPayload(payload);
          if (!statsFromWs) {
            return;
          }

          latestWsStatsRef.current = statsFromWs;
          hasPendingWsStatsRef.current = true;
        } catch {
          setError((current) => current ?? "WebSocket 消息解析失败");
        }
      };

      socket.onerror = () => {
        setWsState("error");
      };

      socket.onclose = () => {
        if (stopped) {
          return;
        }
        setWsState("closed");
        clearReconnectTimer();
        reconnectTimer = window.setTimeout(() => {
          connect();
        }, 2000);
      };
    };

    connect();

    return () => {
      stopped = true;
      clearReconnectTimer();
      if (socket) {
        socket.close();
      }
    };
  }, [wsEnabled]);

  const typeOptions = useMemo(() => {
    return extractLabels(stats.countByType);
  }, [stats.countByType]);

  const statusOptions = useMemo(() => {
    return extractLabels(stats.countByStatus);
  }, [stats.countByStatus]);

  const wsStateText = useMemo(() => {
    if (!wsEnabled) {
      return "WS: 已关闭";
    }

    if (!resolveWsUrl()) {
      return "WS: 未配置";
    }

    const mapping: Record<WsState, string> = {
      disabled: "WS: 已关闭",
      connecting: "WS: 连接中",
      open: "WS: 已连接",
      closed: "WS: 已断开",
      error: "WS: 异常"
    };
    return mapping[wsState];
  }, [wsEnabled, wsState]);

  return (
    <section className="page-card">
      <div className="page-head">
        <h2>Dashboard</h2>
        <div className="ws-head-controls">
          <span className={`ws-state ws-state-${wsState}`}>{wsStateText}</span>
          <button
            type="button"
            className={`ws-toggle-button ${wsEnabled ? "ws-toggle-button-on" : "ws-toggle-button-off"}`}
            onClick={() => setWsEnabled((current) => !current)}
          >
            {wsEnabled ? "关闭" : "开启"}
          </button>
        </div>
      </div>

      {error ? <ErrorBanner message={error} /> : null}

      <div className="dashboard-filter-row">
        <label>
          Event Type
          <select value={selectedType} onChange={(event) => setSelectedType(event.target.value)}>
            <option value={ALL_VALUE}>ALL</option>
            {typeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Event Status
          <select value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value)}>
            <option value={ALL_VALUE}>ALL</option>
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="dashboard-metrics">
        <article className="metric-card">
          <h3>当前事件数</h3>
          <p>{loading ? "..." : stats.totalEvents}</p>
        </article>
        <article className="metric-card">
          <h3>累计 Payload</h3>
          <p>{loading ? "..." : stats.totalPayload}</p>
        </article>
      </div>

      {loading ? (
        <p>数据加载中...</p>
      ) : (
        <div className="dashboard-chart-grid">
          <StatBarChart title="EventType" items={stats.countByType} />
          <StatBarChart title="EventStatus" items={stats.countByStatus} />
        </div>
      )}
    </section>
  );
};

export default DashboardPage;
