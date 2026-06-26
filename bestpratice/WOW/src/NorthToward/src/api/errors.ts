export class ApiError extends Error {
  public readonly status: number;
  public readonly code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

const ERROR_CODE_MESSAGE_MAP: Record<string, string> = {
  "GM-400": "请求参数不合法，请检查输入内容。",
  "GM-404-SOURCE": "来源系统不存在，请确认 sourceCode 是否有效。",
  "GM-404-EVENT": "事件不存在，请确认 eventId 是否正确。",
  "GM-409-EVENT": "请求幂等键冲突，请使用新的 requestId。",
  "GM-500": "服务内部异常，请稍后重试或联系后端排查。"
};

export const toErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    const mappedMessage = error.code ? ERROR_CODE_MESSAGE_MAP[error.code] : undefined;
    const prefix = error.code ? `${error.code}: ` : "";

    if (mappedMessage) {
      return `${prefix}${mappedMessage}`;
    }

    return `${prefix}接口错误(${error.status}): ${error.message}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "发生未知错误";
};
