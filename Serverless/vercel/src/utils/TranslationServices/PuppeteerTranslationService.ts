import { ITranslationService } from "../../interfaces";
import puppeteer, { Browser, Page, Viewport } from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export class PuppeteerTranslationService implements ITranslationService {
  private browser: Browser;
  private page: Page;
  private viewport: Viewport = { width: 1080, height: 1024 };

  async init(): Promise<void> {
    this.browser = await puppeteer.launch({
      args: chromium.args,
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
    console.log("url", word);
    await this.page.goto(url, { waitUntil: "domcontentloaded" });
    // await this.page.waitForNavigation({ waitUntil: "networkidle2" });
  }

  async setViewport(): Promise<void> {
    await this.page.setViewport(this.viewport);
  }

  async grabTranslations(htmlSelectors: string[]): Promise<string[]> {
    console.log("sele", htmlSelectors);

    const translatedWords = new Set<string>();

    for await (const selector of htmlSelectors) {
      console.log("selector", selector);
      const words: string[] = await this.page.$$eval(selector, (elements) => {
        console.log("ele", elements);
        return elements.flatMap((element) => {
          const word = element.textContent;
          console.log("W", word);
          return word.includes("Try again") ? [] : word;
        });
      });

      words.forEach(translatedWords.add, translatedWords);
    }

    console.log("d", [...translatedWords]);

    return [...translatedWords];
  }
}
