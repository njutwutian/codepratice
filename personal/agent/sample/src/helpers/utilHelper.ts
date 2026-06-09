import { config } from "../config/config.js";

export const signOutListener = () => {
  process.on('SIGINT', () => {
    console.log('\n再见！');
    process.exit(0);
  });
};

export const showTokenUsage = (usedTokens: number[]) => {
  return `用量: ${usedTokens.reduce((acc, cur) => acc + cur, 0)}/${config.ollamaMaxTokens}`;
};