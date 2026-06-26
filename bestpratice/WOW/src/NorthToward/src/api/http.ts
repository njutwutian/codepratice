import { ApiError } from "./errors";
import type { ApiEnvelope } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const normalizeUrl = (path: string): string => {
  const base = API_BASE_URL?.trim();

  if (!base) {
    throw new Error("缺少 VITE_API_BASE_URL 环境变量");
  }

  return `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
};

const parseJsonSafely = (response: Response): Promise<unknown> => {
  return response
    .text()
    .then((text) => {
      if (!text) {
        return null;
      }

      try {
        return JSON.parse(text) as unknown;
      } catch {
        return null;
      }
    });
};

export const request = <TResponse>(path: string, init?: RequestInit): Promise<TResponse> => {
  return fetch(normalizeUrl(path), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    }
  }).then((response) => {
    return parseJsonSafely(response).then((payload) => {
      const envelope = payload as ApiEnvelope<TResponse> | null;

      if (!response.ok) {
        const code =
          typeof envelope === "object" && envelope && "code" in envelope
            ? String(envelope.code)
            : undefined;
        const message =
          typeof envelope === "object" && envelope && "message" in envelope
            ? String(envelope.message)
            : response.statusText || "请求失败";

        throw new ApiError(message, response.status, code);
      }

      if (
        typeof envelope === "object" &&
        envelope &&
        "success" in envelope &&
        "code" in envelope &&
        "message" in envelope
      ) {
        if (!envelope.success) {
          throw new ApiError(envelope.message || "请求失败", response.status || 400, envelope.code);
        }

        return envelope.data as TResponse;
      }

      return payload as TResponse;
    });
  });
};
