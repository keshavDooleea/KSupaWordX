import { ELanguageType, ISupaPayload, ITranslationService } from "../interfaces";

export class WordTranslate {
  private BASE_URL = "https://translate.google.com";
  private HTML__TRANSLATION_SELECTORS = [".HwtZe", ".ryNqvb"];

  constructor(private word: ISupaPayload, private translationService: ITranslationService) {
    console.log(`Translating: ${word.word}`);
  }

  private get translatedUrl(): string {
    let sl = "";
    let tl = "";

    if (this.word.lang === ELanguageType.en) {
      sl = ELanguageType.en;
      tl = ELanguageType.fr;
    } else {
      sl = ELanguageType.fr;
      tl = ELanguageType.en;
    }

    return `${this.BASE_URL}/?sl=${sl}&tl=${tl}&text=${encodeURIComponent(this.word.word)}&op=translate`;
  }

  async translate(): Promise<string[]> {
    await this.translationService.init();
    await this.translationService.goTo(this.translatedUrl);
    await this.translationService.setViewport();
    const translations = await this.translationService.grabTranslations(this.HTML__TRANSLATION_SELECTORS);
    await this.translationService.close();

    console.log(`Translations found: ${translations}`);
    return translations;
  }
}
