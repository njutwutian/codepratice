import fs from "fs";
import path from "path";

import { MetricsSummary } from "../types";
import { resolveFromCwd } from "../utils/paths";

export const writeReport = (
  summary: MetricsSummary,
  outputDir?: string,
  explicitPath?: string
): Promise<string> => {
  const resolvedOutputDir = resolveFromCwd(outputDir || "reports");
  const reportFileName =
    "run-report-" + new Date().toISOString().replace(/[.:]/g, "-") + ".json";
  const targetPath = explicitPath
    ? resolveFromCwd(explicitPath)
    : path.join(resolvedOutputDir, reportFileName);

  return fs.promises
    .mkdir(path.dirname(targetPath), { recursive: true })
    .then(() => fs.promises.writeFile(targetPath, JSON.stringify(summary, null, 2), "utf8"))
    .then(() => targetPath);
};
