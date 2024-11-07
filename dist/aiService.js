"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const openai_1 = require("openai");
const dotenv = __importStar(require("dotenv"));
// 加载环境变量
dotenv.config();
class AiService {
    constructor() {
        // 验证必要的环境变量是否存在
        if (!process.env.AZURE_OPENAI_API_KEY ||
            !process.env.AZURE_OPENAI_ENDPOINT) {
            throw new Error("缺少必要的Azure OpenAI配置");
        }
        this.client = new openai_1.AzureOpenAI({
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
    getResponse(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.messages.push({ role: "user", content: input });
                const completion = yield this.client.chat.completions.create({
                    model: process.env.AZURE_OPENAI_MODEL || "gpt-4-turbo-2024-04-09",
                    messages: this.messages.map((message) => ({
                        role: message.role,
                        content: message.content,
                    })),
                });
                const assistantResponse = completion.choices[0].message.content;
                if (assistantResponse) {
                    this.messages.push({ role: "assistant", content: assistantResponse });
                }
                return assistantResponse || "抱歉，我没有得到有效的回复";
            }
            catch (error) {
                console.error("AI服务错误:", error);
                return "抱歉，服务出现了错误，请稍后再试";
            }
        });
    }
}
exports.AiService = AiService;
