import { config } from "../config/config.js";

interface OllamaRequest {
  prompt: string;
}

export const getSingleResponse = async (request: OllamaRequest) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, config.ollamaTimeout);

  try {
    const response = await fetch(`${config.ollamaUrl}/api/generate`, {
      method: "POST",
      body: JSON.stringify({
        model: config.ollamaModel,
        prompt: request.prompt,
        stream: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });
    const data: any = await response.json();
    return data;
  } finally {
    clearTimeout(timeoutId);
  }
};

export const getStreamResponse = async (request: OllamaRequest, callback: (chunk: any) => void) => {
  const response = await fetch(`${config.ollamaUrl}/api/generate`, {
    method: "POST",
    body: JSON.stringify({
      model: config.ollamaModel,
      prompt: request.prompt,
      stream: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    // console.log("read chunk:", { done, value });
    if (done) {
      break;
    }
    if (!value || value.length === 0) continue;
    const chunk = decoder.decode(value);
    try {
      const data = JSON.parse(chunk);
      if (data) {
        callback(data);   // 逐块传递给外层
      }
    } catch (e) {
      // 忽略非 JSON 行
    }
  }
}
