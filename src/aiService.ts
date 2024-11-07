import { AzureOpenAI } from "openai";
import * as dotenv from "dotenv";

// 加载环境变量
dotenv.config();

export class AiService {
  private client: AzureOpenAI;
  private messages: Array<{ role: string; content: string; name?: string }>;

  constructor() {
    // 验证必要的环境变量是否存在
    if (
      !process.env.AZURE_OPENAI_API_KEY ||
      !process.env.AZURE_OPENAI_ENDPOINT
    ) {
      throw new Error("缺少必要的Azure OpenAI配置");
    }

    this.client = new AzureOpenAI({
      apiKey: process.env.AZURE_OPENAI_API_KEY,
      apiVersion: process.env.AZURE_OPENAI_API_VERSION || "2024-02-01",
      endpoint: process.env.AZURE_OPENAI_ENDPOINT,
    });

    this.messages = [
      {
        role: "system",
        content: "你是一个编程教学助手，需要用通俗易懂的语言解释代码概念。",
      },
    ];
  }

  async getResponse(input: string) {
    try {
      this.messages.push({ role: "user", content: input });

      const completion = await this.client.chat.completions.create({
        model: process.env.AZURE_OPENAI_MODEL || "gpt-4-turbo-2024-04-09",
        messages: this.messages.map((message) => ({
          role: message.role as "system" | "user" | "assistant",
          content: message.content,
        })),
      });

      const assistantResponse = completion.choices[0].message.content;

      if (assistantResponse) {
        this.messages.push({ role: "assistant", content: assistantResponse });
      }

      return assistantResponse || "抱歉，我没有得到有效的回复";
    } catch (error) {
      console.error("AI服务错误:", error);
      return "抱歉，服务出现了错误，请稍后再试";
    }
  }
}
