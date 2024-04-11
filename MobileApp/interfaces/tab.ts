import { ReactElement } from "react";
import { IUserWord } from "./schemas/user_word";

export enum ETabType {
  definition,
  translation,
}

export interface ITab {
  name: string;
  type: ETabType;
  component: (user: IUserWord) => ReactElement;
}
