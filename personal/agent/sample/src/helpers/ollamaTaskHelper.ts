import path from "node:path";
import fs from "node:fs";
import { getSingleResponse, getStreamResponse } from "../api/ollamaRequest.js";
import { HistoryItem } from "../model/HistoryItem.js";
import { Role } from "../model/Role.js";
import { showTokenUsage } from "./utilHelper.js";

const usedTokens: number[] = [];

let promptForTaskHandlerRole = "";
const initOllamaTaskHandlerRole = async () => {
    process.stdout.write("Agent: 正在读取角色提示词...\n");
    promptForTaskHandlerRole = fs.readFileSync(path.resolve(process.cwd(), "src/prompts/ReActWithTool.md"), "utf-8");
    process.stdout.write("Agent: 读取完成，正在初始化角色...\n");
    // await talkToOllamaSingle(promptForTaskHandlerRole, (res) => {
    //     if (res.done) {
    //         process.stdout.write(res.response);
    //         process.stdout.write('\n');
    //     }
    // });
};

const actionRegex = /<Action>([\s\S]*?)<\/Action>/;
const thoughtRegex = /<Thought>([\s\S]*?)<\/Thought>/;
const actionInputRegex = /<ActionInput>([\s\S]*?)<\/ActionInput>/;
const finalAnswerRegex = /<FinalAnswer>([\s\S]*?)<\/FinalAnswer>/;

enum OllamaResponseType {
    Thought = "Thought",
    Action = "Action",
    ActionInput = "ActionInput",
    FinalAnswer = "FinalAnswer",
}

interface OllamaResponseItem {
    type: OllamaResponseType;
    content: string;
}

const checkOllamaResponseText = (text: string) => {
    const actionContent = text.match(actionRegex)?.[1] || '';
    const thoughtContent = text.match(thoughtRegex)?.[1] || '';
    const actionInputContent = text.match(actionInputRegex)?.[1] || '';
    const finalAnswerContent = text.match(finalAnswerRegex)?.[1] || '';
    const responseItems: OllamaResponseItem[] = [];
    if (thoughtContent) {
        responseItems.push({ type: OllamaResponseType.Thought, content: thoughtContent });
    }
    if (actionContent) {
        responseItems.push({ type: OllamaResponseType.Action, content: actionContent });
    }
    if (actionInputContent) {
        responseItems.push({ type: OllamaResponseType.ActionInput, content: actionInputContent });
    }
    if (finalAnswerContent) {
        responseItems.push({ type: OllamaResponseType.FinalAnswer, content: finalAnswerContent });
    }
    return responseItems;
};

const getCurrentCity = () => {
    return "北京";
}

const getCurrentWeatherByCity = (city: string) => {
    if (city === "北京") {
        return "晴，25度，风力3级，湿度40%，空气质量良";
    }
    if (city === "上海") {
        return "多云，28度，风力2级，湿度60%，空气质量优";
    }
    if (city === "广州") {
        return "小雨，30度，风力4级，湿度80%，空气质量良";
    }
    if (city === "深圳") {
        return "雷阵雨，32度， 风力5级，湿度90%，空气质量优";
    }
    if (city === "杭州") {
        return "阴，27度，风力3级，湿度50%，空气质量良";
    }
    return "未知";
}

const History: HistoryItem[] = [];

const buildPromptHistory = () => {
    let prompt = "# 历史记录，顺序是从最早到最新\n";
    History.forEach(item => {
        const roleName = item.role === Role.User ? "用户" : item.role === Role.Ollama ? "大模型助手" : "工具助手";
        prompt += `${roleName}：${item.content}\n`;
    });
    return prompt;
}

const buildAgentResponse = (query: string) => {
    return `<Observation>${query}</Observation>`;
}

const buildAgentPrompt = (query: string) => {
    let header = "# 当前用户/工具助手的问题是：\n";
    return `${promptForTaskHandlerRole}\n ${buildPromptHistory()} \n ${header} ${query}`;
}

const buildTaskPrompt = (query: string) => {
    return `${promptForTaskHandlerRole}\n <Task>${query}</Task>`;
};

export const userTaskBySingle = async () => {
    await initOllamaTaskHandlerRole();
    process.stdout.write("你：");
    process.stdin.on("data", async (data) => {
        if (!data) {
            return;
        }
        const text = data.toString().trim();
        const ollamaResponse = await talkToOllamaSingle(buildTaskPrompt(text), (res) => {
            if (res.done) {
                process.stdout.write('\n');
            }
        });
        History.push({ role: Role.User, content: text });
        History.push({ role: Role.Ollama, content: ollamaResponse });
        // do loop
        let responseItems = checkOllamaResponseText(ollamaResponse);
        let queryCount = 0; // 避免死循环，设置最大查询次数
        const maxQueryCount = 10;
        while (!responseItems.some(item => item.type === OllamaResponseType.FinalAnswer)) {
            console.log("解析后的响应项：", responseItems);
            if (queryCount >= maxQueryCount) {
                process.stdout.write("查询次数过多，可能存在死循环，已终止。\n");
                break;
            }
            queryCount++;
            if (responseItems.some(item => item.type === OllamaResponseType.Thought)) {
                const thoughtItem = responseItems.find(item => item.type === OllamaResponseType.Thought);
                process.stdout.write(`Ollama 思考中：${thoughtItem?.content}\n`);
            }
            if (responseItems.some(item => item.type === OllamaResponseType.Action)) {
                const actionItem = responseItems.find(item => item.type === OllamaResponseType.Action);
                if (actionItem?.content === "agent_search_position") {
                    const currentCity = getCurrentCity();
                    const agentResponse = buildAgentResponse(currentCity);
                    let response = await talkToOllamaSingle(buildAgentPrompt(agentResponse), (res) => {
                        if (res.done) {
                            process.stdout.write('\n');
                        }
                    });
                    History.push({ role: Role.Agent, content: agentResponse });
                    History.push({ role: Role.Ollama, content: response });
                    responseItems = checkOllamaResponseText(response);
                    continue;
                } else if (actionItem?.content === "agent_search_weather") {
                    const actionInputItem = responseItems.find(item => item.type === OllamaResponseType.ActionInput);
                    const weatherInfo = getCurrentWeatherByCity(actionInputItem?.content || '');
                    const agentResponse = buildAgentResponse(weatherInfo);
                    let response = await talkToOllamaSingle(buildAgentPrompt(agentResponse), (res) => {
                        if (res.done) {
                            process.stdout.write('\n');
                        }
                    });
                    History.push({ role: Role.Agent, content: agentResponse });
                    History.push({ role: Role.Ollama, content: response });
                    responseItems = checkOllamaResponseText(response);
                    continue;
                } else {
                    // 未知行动，直接反馈给用户
                    process.stdout.write(`Ollama 给出的行动 ${actionItem?.content} 无法识别，请重新提问。\n`);
                    break;
                }
            }
        }
        if (responseItems.some(item => item.type === OllamaResponseType.FinalAnswer)) {
            const finalAnswerItem = responseItems.find(item => item.type === OllamaResponseType.FinalAnswer);
            process.stdout.write(`Ollama 最终回答：${finalAnswerItem?.content}\n`);
        }
    });
};

export const talkToOllamaSingle = async (text: string, callback: (chunk: any) => void) => {
    const data = await getSingleResponse({ prompt: text });
    // process.stdout.write(`Ollama:${data.response}`);
    callback(data);
    return data.response;
};

export const talkToOllamaStream = async (text: string, callback: (chunk: any) => void) => {
    process.stdout.write("Ollama:");
    await getStreamResponse({ prompt: text }, callback);
};