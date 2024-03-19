export enum EVocabType {
  url,
  word,
  image,
}

export interface IVocab {
  type: EVocabType;
  name: string;
  description: string;
}
