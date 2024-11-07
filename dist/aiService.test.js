"use strict";
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
const aiService_1 = require("./aiService");
describe("AiService", () => {
    let aiService;
    beforeEach(() => {
        aiService = new aiService_1.AiService();
    });
    it("should return a valid response", () => __awaiter(void 0, void 0, void 0, function* () {
        const input = "你好，帮我解释一下JavaScript的闭包。";
        const response = yield aiService.getResponse(input);
        console.log(response);
        expect(response).toBeDefined();
    }), 15000); // 增加超时时间到15秒
});
