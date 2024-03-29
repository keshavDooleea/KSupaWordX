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
    // await this.page.goto(url);
    // console.log("WAIT DONE");
    // await this.page.waitForSelector("#source");
    // console.log("WAIT DONE 2");

    await this.page.goto("https://developer.chrome.com/");

    // Set screen size
    await this.page.setViewport({ width: 1080, height: 1024 });
    console.log("1");
    // Type into search box
    await this.page.type(".devsite-search-field", "automate beyond recorder");
    console.log("2");

    // Wait and click on first result
    const searchResultSelector = ".devsite-result-item-link";
    await this.page.waitForSelector(searchResultSelector);
    console.log("3");
    await this.page.click(searchResultSelector);
    console.log("4");

    // Locate the full title with a unique string
    const textSelector = await this.page.waitForSelector("text/Customize and automate");
    const fullTitle = await textSelector?.evaluate((el) => el.textContent);

    // Print the full title
    console.log('The title of this blog post is "%s".', fullTitle);
  }

  async setViewport(): Promise<void> {
    await this.page.setViewport(this.viewport);
    await this.page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36");
  }

  async grabTranslations(htmlSelectors: string[]): Promise<string[]> {
    console.log("sele", htmlSelectors);

    const translatedWords = new Set<string>();

    for await (const selector of htmlSelectors) {
      console.log("selector", selector);

      const translatedResult2 = await this.page.evaluate(() => {
        console.log("BBB", document.querySelectorAll(".result-shield-container"));
        return document.querySelectorAll(".result-shield-container")[0].textContent;
      });
      console.log("TT2", translatedResult2);

      const translatedResult = await this.page.evaluate(() => {
        console.log("AAA", document.querySelectorAll(".ryNqvb"));
        return document.querySelectorAll(".ryNqvb")[0].textContent;
      });

      console.log("TT", translatedResult);

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
