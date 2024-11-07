import * as vscode from "vscode";
import { SpeechService } from "./speechService";
import { AiService } from "./aiService";

export function activate(context: vscode.ExtensionContext) {
  const speechService = new SpeechService();
  const aiService = new AiService();

  let disposable = vscode.commands.registerCommand(
    "voiceCodeMentor.start",
    async () => {
      // 启动语音服务
      await speechService.initialize();

      // 开始监听
      speechService.startListening(async (text) => {
        // 获取AI响应
        const response = await aiService.getResponse(text);

        // 将响应转换为语音
        await speechService.speak(response);
      });
    }
  );

  context.subscriptions.push(disposable);
}
