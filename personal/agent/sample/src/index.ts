import { userStartTalkByStream } from "./helpers/ollamaHelper.js";
import { userTaskBySingle } from "./helpers/ollamaTaskHelper.js";
import { signOutListener } from "./helpers/utilHelper.js";

const start = async () => {
  // userStartTalkByStream(); 
  userTaskBySingle(); 
  signOutListener();
};

start();
