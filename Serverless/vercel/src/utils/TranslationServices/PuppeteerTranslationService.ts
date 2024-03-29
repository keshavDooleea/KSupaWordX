import { ITranslationService } from "../../interfaces";
import puppeteer, { Browser, Page, Viewport } from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export class PuppeteerTranslationService implements ITranslationService {
  private browser: Browser;
  private page: Page;
  private viewport: Viewport = { width: 1366, height: 1024 };

  async init(): Promise<void> {
    this.browser = await puppeteer.launch({
      args: [...chromium.args, "--start-maximized"],
      executablePath: await chromium.executablePath(),
      headless: true,
      ignoreHTTPSErrors: true,
    });

    this.page = await this.browser.newPage();
  }

  async close(): Promise<void> {
    await this.browser.close();
  }

  async goTo(url: string, word?: string): Promise<void> {
    await this.page.goto(url);
  }

  async setViewport(): Promise<void> {
    await this.page.setViewport(this.viewport);
    await this.page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36");
  }

  async grabTranslations(htmlSelectors: string[]): Promise<string[]> {
    const translatedWords = new Set<string>();

    for await (const selector of htmlSelectors) {
      const words: string[] = await this.page.$$eval(selector, (elements) => {
        return elements.flatMap((element) => {
          const word = element.textContent;
          return word.includes("Try again") ? [] : word;
        });
      });

      words.forEach(translatedWords.add, translatedWords);
    }

    console.log("d", [...translatedWords]);

    return [...translatedWords];
  }
}
