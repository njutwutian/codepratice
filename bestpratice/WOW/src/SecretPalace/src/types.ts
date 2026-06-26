export type JsonObject = Record<string, unknown>;

export type StrategyType =
  | "int"
  | "float"
  | "pick"
  | "uuid"
  | "nowIso"
  | "nowOffsetIso"
  | "requestId"
  | "sequence"
  | "boolean"
  | "string";

export interface StrategyConfig {
  type: StrategyType;
  min?: number;
  max?: number;
  precision?: number;
  values?: unknown[];
  value?: unknown;
  prefix?: string;
  width?: number;
  offset?: string;
}

export type StrategyMap = Record<string, StrategyConfig>;

export interface TargetConfig {
  url: string;
  method: string;
  headers: Record<string, string>;
  timeoutMs: number;
}

export interface RunConfig {
  durationMs: number;
  ratePerSecond: number;
  quota: number;
  concurrency: number;
  maxConcurrency: number;
  maxRetries: number;
  retryBaseDelayMs: number;
  seed: number;
  requestTimeoutMs: number;
}

export interface ConcurrencyController {
  getConcurrency: () => number;
  setConcurrency: (next: number) => number;
  isPaused: () => boolean;
  setPaused: (paused: boolean) => boolean;
  togglePaused: () => boolean;
  maxConcurrency: number;
}

export interface GeneratorConfig {
  templatePath: string;
  strategies: StrategyMap;
  staticFields: JsonObject;
}

export interface StorageConfig {
  failedEventsPath: string;
}

export interface ReportConfig {
  outputDir: string;
}

export interface NormalizedConfig {
  target: TargetConfig;
  run: RunConfig;
  generator: GeneratorConfig;
  storage: StorageConfig;
  report: ReportConfig;
}

export interface LoadConfigResult {
  path: string;
  config: NormalizedConfig;
}

export interface DataGenerator {
  generate: () => JsonObject;
  templatePath: string;
}

export interface RetryableError extends Error {
  status?: number;
  code?: string;
  retryable?: boolean;
  attempts?: number;
}

export interface FailureRecord {
  failedAt: string;
  attempts: number;
  error: {
    message: string;
    status: number | null;
    code?: string;
    retryable: boolean;
  };
  payload: JsonObject;
}

export interface FailureStore {
  path: string;
  append: (record: FailureRecord) => Promise<void>;
  loadReplayEvents: (inputPath?: string) => Promise<JsonObject[]>;
}

export interface MetricsSummary {
  startedAt: string;
  endedAt: string;
  durationMs: number;
  total: number;
  successCount: number;
  failureCount: number;
  successRate: number;
  throughputPerSecond: number;
  avgLatencyMs: number;
  errorBreakdown: Record<string, number>;
}

export interface Metrics {
  markSuccess: (latencyMs: number) => void;
  markFailure: (latencyMs: number, error: RetryableError) => void;
  summarize: () => MetricsSummary;
}

export interface ProgressSnapshot {
  totalEvents: number;
  dispatchedCount: number;
  completedCount: number;
  successCount: number;
  failureCount: number;
  activeWorkers: number;
  elapsedMs: number;
  throughputPerSecond: number;
  percent: number;
  paused: boolean;
  concurrency: number;
}

export interface SendEngineResult {
  totalEvents: number;
  replayMode: boolean;
}

export interface SendEngine {
  run: (
    dataGenerator: DataGenerator,
    options?: {
      replayEvents?: JsonObject[];
      concurrencyController?: ConcurrencyController;
      onProgress?: (progress: ProgressSnapshot) => void;
    }
  ) => Promise<SendEngineResult>;
}

export interface RunSimulationOptions {
  configPath?: string;
  dryRun?: boolean;
  previewCount?: string | number;
  reportPath?: string;
  concurrencyController?: ConcurrencyController;
  onProgress?: (progress: ProgressSnapshot) => void;
}

export interface ReplaySimulationOptions {
  configPath?: string;
  inputPath?: string;
  reportPath?: string;
  onProgress?: (progress: ProgressSnapshot) => void;
}
