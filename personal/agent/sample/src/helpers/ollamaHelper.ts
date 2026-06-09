import { getSingleResponse, getStreamResponse } from "../api/ollamaRequest.js";
import { HistoryItem } from "../model/HistoryItem.js";
import { Role } from "../model/Role.js";
import { showTokenUsage } from "./utilHelper.js";

const history: HistoryItem[] = [];
const getCurrentPromptsWithHistory = (query: string) => {
    if (history.length === 0) {
        return query;
    }
    let prompts = "# 历史记录：\n";
    history.forEach(item => {
        prompts += `${item.role === Role.User ? "用户" : "Ollama"}：${item.content}\n`;
    });
    prompts += "# 用户当前问题：\n";
    prompts += query + "\n";
    prompts += "# 回答要求：\n";
    prompts += "- 基于上述历史记录和用户当前问题进行回答。\n";
    prompts += "- 在本次回答中不要回答与当前问题无关的内容。\n";
    prompts += "- 给出一个尽可能详细的回答。\n";
    return prompts;
}

const usedTokens: number[] = [];

export const userStartTalkBySingle = async () => {
    process.stdout.write("你：");
    process.stdin.on("data", async (data) => {
        if (!data) {
            return;
        }
        const text = data.toString().trim();
        const prompt = getCurrentPromptsWithHistory(text);
        await talkToOllamaSingle(prompt, (res) => {
            if (res.done) {
                history.push({ role: Role.User, content: text });
                history.push({ role: Role.Ollama, content: res.response });
                usedTokens.push(res.prompt_eval_count);
                process.stdout.write(showTokenUsage(usedTokens));
                process.stdout.write('\n');
            }
        });
    });
};
export const userStartTalkByStream = async () => {
    process.stdout.write("你：");
    process.stdin.on("data", async (data) => {
        if (!data) {
            return;
        }
        let userInput = data.toString().trim();
        let ollamaResponse = "";
        const text = data.toString().trim();
        const prompt = getCurrentPromptsWithHistory(text);
        await talkToOllamaStream(prompt, (chunk) => {
            // console.log("chunk:", chunk);
            ollamaResponse += chunk.response;
            process.stdout.write(chunk.response);
            if (chunk.done) {
                usedTokens.push(chunk.prompt_eval_count);
                process.stdout.write('\n');
                process.stdout.write(showTokenUsage(usedTokens));
                process.stdout.write('\n');
                history.push({ role: Role.User, content: userInput });
                history.push({ role: Role.Ollama, content: ollamaResponse });
            }
        });
        process.stdout.write('\n');
        process.stdout.write("你：");
    });
};

export const talkToOllamaSingle = async (text: string, callback: (chunk: any) => void) => {
    const data = await getSingleResponse({ prompt: text });
    callback(data);
    console.log("ollama:", data.response);
};

export const talkToOllamaStream = async (text: string, callback: (chunk: any) => void) => {
    process.stdout.write("Ollama:");
    await getStreamResponse({ prompt: text }, callback);
};