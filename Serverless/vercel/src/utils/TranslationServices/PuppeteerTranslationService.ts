import { ITranslationService } from "../../interfaces";
import puppeteer, { Browser, Page, Viewport } from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export class PuppeteerTranslationService implements ITranslationService {
  private browser: Browser;
  private page: Page;
  private viewport: Viewport = { width: 1080, height: 1024 };

  async init(): Promise<void> {
    await chromium.font("https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf");

    this.browser = await puppeteer.launch({
      args: [...chromium.args, "--disable-web-security"],
      executablePath: await chromium.executablePath("https://github.com/Sparticuz/chromium/releases/download/v123.0.0/chromium-v123.0.0-pack.tar"),
      defaultViewport: this.viewport,
      headless: "new",
      ignoreHTTPSErrors: true,
    });

    this.page = await this.browser.newPage();
  }

  async close(): Promise<void> {
    await this.browser.close();
  }

  async goTo(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: "domcontentloaded" });
  }

  async setViewport(): Promise<void> {
    await this.page.setViewport(this.viewport);
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
