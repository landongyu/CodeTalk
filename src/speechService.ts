import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import * as dotenv from "dotenv";

dotenv.config();

export class SpeechService {
  private speechConfig!: sdk.SpeechConfig;
  private synthesizer!: sdk.SpeechSynthesizer;
  private recognizer!: sdk.SpeechRecognizer;

  async initialize() {
    if (!process.env.AZURE_SPEECH_KEY || !process.env.AZURE_SPEECH_REGION) {
      throw new Error("缺少必要的Azure语音服务配置");
    }

    this.speechConfig = sdk.SpeechConfig.fromSubscription(
      process.env.AZURE_SPEECH_KEY,
      process.env.AZURE_SPEECH_REGION
    );

    this.speechConfig.speechRecognitionLanguage = "zh-CN";
    this.speechConfig.speechSynthesisLanguage = "zh-CN";

    this.synthesizer = new sdk.SpeechSynthesizer(this.speechConfig);
    this.recognizer = new sdk.SpeechRecognizer(this.speechConfig);
  }

  async speak(text: string) {
    return new Promise((resolve, reject) => {
      this.synthesizer.speakTextAsync(
        text,
        (result) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  startListening(callback: (text: string) => void) {
    this.recognizer.recognizing = (s, e) => {
      console.log(`正在识别: ${e.result.text}`);
    };

    this.recognizer.recognized = (s, e) => {
      callback(e.result.text);
    };

    this.recognizer.startContinuousRecognitionAsync();
  }
}
