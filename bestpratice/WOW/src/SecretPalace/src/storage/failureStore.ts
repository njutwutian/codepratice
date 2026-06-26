import fs from "fs";
import path from "path";

import { FailureRecord, FailureStore, JsonObject } from "../types";
import { resolveFromCwd } from "../utils/paths";

const ensureDirectory = (filePath: string): Promise<void> => {
  const directory = path.dirname(filePath);
  return fs.promises.mkdir(directory, { recursive: true }).then(() => undefined);
};

export const createFailureStore = (failedEventsPath: string): FailureStore => {
  const absolutePath = resolveFromCwd(failedEventsPath);

  const append = (record: FailureRecord): Promise<void> => {
    return ensureDirectory(absolutePath).then(() => {
      return fs.promises.appendFile(absolutePath, JSON.stringify(record) + "\n", "utf8");
    });
  };

  const loadReplayEvents = (inputPath?: string): Promise<JsonObject[]> => {
    const absoluteInputPath = resolveFromCwd(inputPath || absolutePath);

    return fs.promises.readFile(absoluteInputPath, "utf8").then((raw) => {
      return raw
        .split(/\r?\n/)
        .filter((line) => line.trim().length > 0)
        .map((line) => JSON.parse(line) as FailureRecord)
        .map((record) => record.payload)
        .filter(Boolean);
    });
  };

  return {
    path: absolutePath,
    append,
    loadReplayEvents
  };
};
