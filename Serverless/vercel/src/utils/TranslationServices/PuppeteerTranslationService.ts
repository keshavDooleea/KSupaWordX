import { ITranslationService } from "../../interfaces";
import { Browser, Page, Viewport } from "puppeteer-core";
import { ENV } from "../Env";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-extra";

import "puppeteer-extra-plugin-stealth/evasions/chrome.app";
import "puppeteer-extra-plugin-stealth/evasions/chrome.csi";
import "puppeteer-extra-plugin-stealth/evasions/chrome.loadTimes";
import "puppeteer-extra-plugin-stealth/evasions/chrome.runtime";
import "puppeteer-extra-plugin-stealth/evasions/defaultArgs"; // pkg warned me this one was missing
import "puppeteer-extra-plugin-stealth/evasions/iframe.contentWindow";
import "puppeteer-extra-plugin-stealth/evasions/media.codecs";
import "puppeteer-extra-plugin-stealth/evasions/navigator.hardwareConcurrency";
import "puppeteer-extra-plugin-stealth/evasions/navigator.languages";
import "puppeteer-extra-plugin-stealth/evasions/navigator.permissions";
import "puppeteer-extra-plugin-stealth/evasions/navigator.plugins";
import "puppeteer-extra-plugin-stealth/evasions/navigator.vendor";
import "puppeteer-extra-plugin-stealth/evasions/navigator.webdriver";
import "puppeteer-extra-plugin-stealth/evasions/sourceurl";
import "puppeteer-extra-plugin-stealth/evasions/user-agent-override";
import "puppeteer-extra-plugin-stealth/evasions/webgl.vendor";
import "puppeteer-extra-plugin-stealth/evasions/window.outerdimensions";
import "puppeteer-extra-plugin-user-preferences";
import "puppeteer-extra-plugin-user-data-dir";

import StealthPlugin from "puppeteer-extra-plugin-stealth";

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
    await this.page.goto(url);

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
