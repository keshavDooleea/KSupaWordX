import { ISupaPayload } from "../interfaces";

export class WordTranslate {
  constructor(private word: ISupaPayload) {
    this.init();
  }

  private init(): void {
    console.log("WWW");
  }

  async translate(): Promise<void> {
    console.log(this.word);
  }
}
