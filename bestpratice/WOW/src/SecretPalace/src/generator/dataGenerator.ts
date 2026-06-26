import fs from "fs";

import { resolveFromCwd } from "../utils/paths";
import { DataGenerator, GeneratorConfig, JsonObject, RunConfig, StrategyConfig } from "../types";
import { materializeTemplate } from "./templateEngine";
import { createSeededRandom, randomFloat, randomInt, randomUuidV4 } from "./random";

const formatOffsetDateTime = (offset: string): string => {
  const now = new Date();
  if (offset !== "+08:00") {
    const iso = now.toISOString();
    return iso.replace(".000Z", offset).replace("Z", offset);
  }

  const shifted = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  const isoWithoutMs = shifted.toISOString().split(".")[0];
  return isoWithoutMs + "+08:00";
};

const createRunId = (): string => {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.floor(Math.random() * 1679616)
    .toString(36)
    .toUpperCase()
    .padStart(4, "0");
  return (ts + rand).slice(-10);
};

const formatRequestId = (
  prefix: string,
  sequence: number,
  width: number,
  runId: string
): string => {
  const now = new Date();
  const yyyy = String(now.getUTCFullYear());
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(now.getUTCDate()).padStart(2, "0");
  const seq = String(sequence).padStart(width, "0");
  return [prefix, yyyy + mm + dd, runId, seq].join("-");
};

const buildStrategyValue = (
  strategy: StrategyConfig | undefined,
  rng: () => number,
  sequence: number,
  runId: string
): unknown => {
  if (!strategy || typeof strategy !== "object") {
    return null;
  }

  switch (strategy.type) {
    case "int":
      return randomInt(rng, strategy.min ?? 0, strategy.max ?? 100);
    case "float":
      return randomFloat(rng, strategy.min ?? 0, strategy.max ?? 1, strategy.precision);
    case "pick": {
      const values = Array.isArray(strategy.values) ? strategy.values : [];
      if (values.length === 0) {
        return null;
      }
      return values[randomInt(rng, 0, values.length - 1)];
    }
    case "uuid":
      return randomUuidV4(rng);
    case "nowIso":
      return new Date().toISOString();
    case "nowOffsetIso":
      return formatOffsetDateTime(String(strategy.offset || "+08:00"));
    case "requestId":
      return formatRequestId(
        String(strategy.prefix || "REQ"),
        sequence,
        Math.max(1, Number(strategy.width || 6)),
        runId
      );
    case "sequence":
      return sequence;
    case "boolean":
      return rng() >= 0.5;
    case "string":
      return String(strategy.value ?? "");
    default:
      return null;
  }
};

export const createDataGenerator = (
  generatorConfig: GeneratorConfig,
  runConfig: RunConfig
): Promise<DataGenerator> => {
  const templatePath = resolveFromCwd(generatorConfig.templatePath);
  const rng = createSeededRandom(runConfig.seed);
  const runId = createRunId();
  let sequence = 1;

  return fs.promises.readFile(templatePath, "utf8").then((rawTemplate) => {
    const template = JSON.parse(rawTemplate) as unknown;

    const generate = (): JsonObject => {
      const values = Object.keys(generatorConfig.strategies || {}).reduce(
        (acc, key) => {
          acc[key] = buildStrategyValue(
            generatorConfig.strategies[key],
            rng,
            sequence,
            runId
          );
          return acc;
        },
        {} as Record<string, unknown>
      );

      sequence += 1;

      const materialized = materializeTemplate(template, values) as JsonObject;
      return Object.assign({}, materialized, generatorConfig.staticFields || {});
    };

    return {
      generate,
      templatePath
    };
  });
};
