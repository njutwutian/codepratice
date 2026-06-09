import dotenvFlow from "dotenv-flow";
import { cleanEnv, num, str } from "envalid";

export interface AppConfig {
	ollamaUrl: string;
	ollamaModel: string;
	ollamaTimeout: number;
    ollamaMaxTokens: number;
}

const nodeEnv = process.env.NODE_ENV ?? "dev";

dotenvFlow.config({
	path: process.cwd(),
	node_env: nodeEnv,
	default_node_env: "dev",
	silent: true,
});

const validatedEnv = cleanEnv(process.env, {
	OLLAMA_URL: str(),
	OLLAMA_MODEL: str(),
	OLLAMA_TIMEOUT: num({ default: 30000 }),
	OLLAMA_MAX_TOKENS: num({ default: 1000 }),
});

export const config: AppConfig = {
	ollamaUrl: validatedEnv.OLLAMA_URL,
	ollamaModel: validatedEnv.OLLAMA_MODEL,
	ollamaTimeout: validatedEnv.OLLAMA_TIMEOUT,
	ollamaMaxTokens: validatedEnv.OLLAMA_MAX_TOKENS,
};
