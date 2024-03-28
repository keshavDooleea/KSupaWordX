import { ELanguageType } from "../interfaces/language.ts";
import puppeteer from "puppeteer";
import f from "translate-google";

export class PuppeteerTranslate {
  constructor(private wordToTranslate: string, private currentLang: ELanguageType) {
    this.init();
  }

  private async init(): Promise<void> {
    const browser = await puppeteer.connect({
      browserWSEndpoint: `wss://chrome.browserless.io?token=${Deno.env.get("PUPPETEER_BROWSERLESS_IO_KEY")}`,
    });
  }
}
