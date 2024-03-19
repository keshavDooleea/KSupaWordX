import { EVocabType, IVocab } from "../interfaces";

export const VOCAB_TYPES: IVocab[] = [
  {
    type: EVocabType.url,
    name: "URL Scrape",
    description: "Provide a URL to visit to extract the word's definition",
  },
  {
    type: EVocabType.word,
    name: "Word Lookup",
    description: "Provide a word to be defined",
  },
  {
    type: EVocabType.image,
    name: "Image Upload",
    description: "Provide an image of a word's definition which will be extracted through OCR",
  },
];
