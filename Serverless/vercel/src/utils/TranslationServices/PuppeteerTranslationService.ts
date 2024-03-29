import { ITranslationService } from "../../interfaces";
import puppeteer, { Browser, Page, Viewport } from "puppeteer-core";
import chromium from "chrome-aws-lambda";
import { ENV } from "../Env";

export class PuppeteerTranslationService implements ITranslationService {
  private browser: Browser;
  private page: Page;
  private viewport: Viewport = { width: 1366, height: 1024 };

  async init(): Promise<void> {
    this.browser = await puppeteer.launch({
      args: [...chromium.args, "--disable-gpu"],
      executablePath: ENV.chromePath || (await chromium.executablePath),
      headless: true,
    });

    this.page = await this.browser.newPage();
  }

  async close(): Promise<void> {
    await this.browser.close();
  }

  async goTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async setViewport(): Promise<void> {
    await this.page.setViewport(this.viewport);
  }

  async grabTranslations(htmlSelectors: string[]): Promise<string[]> {
    const translatedWords = new Set<string>();

    console.log("inasde");

    for await (const selector of htmlSelectors) {
      console.log({ selector });
      const words: string[] = await this.page.$$eval(selector, (elements) => {
        console.log({ elements });
        return elements.flatMap((element) => {
          const word = element.textContent;
          console.log({ word });
          return word.includes("Try again") ? [] : word;
        });
      });

      words.forEach(translatedWords.add, translatedWords);
    }

    console.log("d", [...translatedWords]);

    return [...translatedWords];
  }
}
