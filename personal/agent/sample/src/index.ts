import { sendSingleRequest } from "./api/ollamaRequest.js";

const start = async () => {
  console.log("你有什么想要问的：");
  process.stdin.on("data", async (data) => {
    if (!data) {
      return;
    }
    const text = data.toString().trim();
    const res = await talkToOllama(text);
    if (res.done) {
      console.log("ollama:", res.response);
    }
  });
  process.on('SIGINT', () => {
    console.log('\n再见！');
    process.exit(0);
  });
};

const talkToOllama = async (text: string) => {
  const response = await sendSingleRequest({
    model: "qwen2.5-coder:7b-instruct-q4_K_M",
    prompt: text,
    stream: false,
  });
  return response as any;
};
start();
