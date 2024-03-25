import { ELanguageType } from "../language";

export interface IDictUrl {
  id: string;
  dict_name: string;
  dict_url: string;
  lang: ELanguageType;
}

export interface IDictUrlWebView {
  type: string; // url
  name: string;
  lang: ELanguageType;
}
