export interface ITranslationService {
  init(): Promise<void>;
  goTo(url: string, word?: string): Promise<void>;
  setViewport(): Promise<void>;
  grabTranslations(htmlSelectors: string[]): Promise<string[]>;
  close(): Promise<void>;
}
