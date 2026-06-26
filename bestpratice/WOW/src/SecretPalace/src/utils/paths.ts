import path from "path";

export const resolveFromCwd = (inputPath?: string): string => {
  if (!inputPath) {
    return "";
  }

  if (path.isAbsolute(inputPath)) {
    return inputPath;
  }

  return path.resolve(process.cwd(), inputPath);
};
