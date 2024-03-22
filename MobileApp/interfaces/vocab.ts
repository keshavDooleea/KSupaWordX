export enum ECategoryType {
  url,
  word,
  image,
}

export interface ICategory {
  type: ECategoryType;
  name: string;
  description: string;
}
