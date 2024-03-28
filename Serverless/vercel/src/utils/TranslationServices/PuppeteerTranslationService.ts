import { ITranslationService } from "../../interfaces";
import puppeteer, { Browser, Page } from "puppeteer";

export class PuppeteerTranslationService implements ITranslationService {
  private browser: Browser;
  private page: Page;

  async init(): Promise<void> {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();
  }

  async close(): Promise<void> {
    await this.browser.close();
  }

  async goTo(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: "domcontentloaded" });
  }

  async setViewport(): Promise<void> {
    await this.page.setViewport({ width: 1080, height: 1024 });
  }

  async grabTranslations(htmlSelectors: string[]): Promise<string[]> {
    await this.page.waitForSelector(htmlSelectors[1]);

    const translatedWords = new Set<string>();

    for await (const selector of htmlSelectors) {
      const words: string[] = await this.page.$$eval(selector, (elements) =>
        elements.flatMap((element) => {
          const word = element.textContent;
          return word.includes("Try again") ? [] : word;
        })
      );

      words.forEach(translatedWords.add, translatedWords);
    }

    return [...translatedWords];
  }
}
