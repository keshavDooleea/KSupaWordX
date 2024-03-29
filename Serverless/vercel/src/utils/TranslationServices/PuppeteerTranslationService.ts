import { ITranslationService } from "../../interfaces";
import { Browser, Page, Viewport } from "puppeteer-core";
import { ENV } from "../Env";
import chromium from "@sparticuz/chromium";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import puppeteer from "puppeteer-extra";

export class PuppeteerTranslationService implements ITranslationService {
  private browser: Browser;
  private page: Page;
  private viewport: Viewport = { width: 1366, height: 1024 };

  async init(): Promise<void> {
    puppeteer.use(StealthPlugin());

    this.browser = await puppeteer.launch({
      args: [...chromium.args, "--disable-gpu", "--disable-extensions", "--no-sandbox"],
      executablePath: ENV.chromePath || (await chromium.executablePath()),
      headless: true,
      ignoreHTTPSErrors: true,
    });

    this.page = await this.browser.newPage();
  }

  async close(): Promise<void> {
    await this.browser.close();
  }

  async goTo(url: string): Promise<void> {
    console.log("Chromium:", await this.browser.version());
    await this.page.goto(url, { waitUntil: "networkidle0" });

    console.log("Page Title:", await this.page.title());
  }

  async setViewport(): Promise<void> {
    await this.page.setViewport(this.viewport);
  }

  async grabTranslations(htmlSelectors: string[]): Promise<string[]> {
    const translatedWords = new Set<string>();

    console.log("inasde");

    for await (const selector of htmlSelectors) {
      console.log({ selector });

      const text = await this.page.evaluate(() => Array.from(document.querySelectorAll(".HwtZe"), (element) => element.textContent));
      console.log("TT", { text });

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
