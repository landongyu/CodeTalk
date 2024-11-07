import { AiService } from "./aiService";

describe("AiService", () => {
  let aiService: AiService;

  beforeEach(() => {
    aiService = new AiService();
  });

  it("should return a valid response", async () => {
    const input = "你好，帮我解释一下JavaScript的闭包。";
    const response = await aiService.getResponse(input);
    console.log(response);
    expect(response).toBeDefined();
  }, 15000); // 增加超时时间到15秒
});
