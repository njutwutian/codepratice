import { userStartTalkByStream } from "./helpers/ollamaHelper.js";
import { signOutListener } from "./helpers/utilHelper.js";

const start = async () => {
  userStartTalkByStream();  
  signOutListener();
};

start();
