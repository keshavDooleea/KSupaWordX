import { ECategoryType, ICategory } from "../interfaces";

export const CATEGORY_TYPES: ICategory[] = [
  {
    type: ECategoryType.url,
    name: "URL Scrape",
    description: "Provide a URL to visit to extract the word's definition",
  },
  {
    type: ECategoryType.word,
    name: "Word Lookup",
    description: "Provide a word to be defined",
  },
  {
    type: ECategoryType.image,
    name: "Image Upload",
    description: "Provide an image of a word's definition which will be extracted through OCR",
  },
];
