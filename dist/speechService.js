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
exports.SpeechService = void 0;
const sdk = __importStar(require("microsoft-cognitiveservices-speech-sdk"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class SpeechService {
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!process.env.AZURE_SPEECH_KEY || !process.env.AZURE_SPEECH_REGION) {
                throw new Error("缺少必要的Azure语音服务配置");
            }
            this.speechConfig = sdk.SpeechConfig.fromSubscription(process.env.AZURE_SPEECH_KEY, process.env.AZURE_SPEECH_REGION);
            this.speechConfig.speechRecognitionLanguage = "zh-CN";
            this.speechConfig.speechSynthesisLanguage = "zh-CN";
            this.synthesizer = new sdk.SpeechSynthesizer(this.speechConfig);
            this.recognizer = new sdk.SpeechRecognizer(this.speechConfig);
        });
    }
    speak(text) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.synthesizer.speakTextAsync(text, (result) => {
                    resolve(result);
                }, (error) => {
                    reject(error);
                });
            });
        });
    }
    startListening(callback) {
        this.recognizer.recognizing = (s, e) => {
            console.log(`正在识别: ${e.result.text}`);
        };
        this.recognizer.recognized = (s, e) => {
            callback(e.result.text);
        };
        this.recognizer.startContinuousRecognitionAsync();
    }
}
exports.SpeechService = SpeechService;
