import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { SupabaseDB } from "../utils";
import { IDictUrlWebView, IDictUrl, ILanguage } from "../interfaces";

interface ISupabaseContext {
  isDbDataReady: boolean;
  dictionaryUrls: IDictUrl[];
  dictionaryUrlsForWebView: IDictUrlWebView[];
  languages: ILanguage[];
}

export const SupabaseContext = createContext<ISupabaseContext>({} as ISupabaseContext);

export const SupabaseProvider = ({ children }: PropsWithChildren) => {
  const [isDbDataReady, setIsDbDataReady] = useState<boolean>(false);
  const [dictionaryUrls, setDictionaryUrls] = useState<IDictUrl[]>([]);
  const [dictionaryUrlsForWebView, setDictionaryUrlsForWebView] = useState<IDictUrlWebView[]>([]);
  const [languages, setLanguages] = useState<ILanguage[]>([]);

  const getDictionaryUrls = async () => {
    const urls = await SupabaseDB.getDictionaryUrls();
    setDictionaryUrls([...urls]);
    setLanguages([...SupabaseDB.getLanguages(urls)]);
    setDictionaryUrlsForWebView(urls.map((url) => ({ type: url.dict_url, name: url.dict_name, lang: url.lang })));
  };

  useEffect(() => {
    if (dictionaryUrls.length > 0 && languages.length > 0) {
      setIsDbDataReady(true);
    }
  }, [dictionaryUrls, languages]);

  useEffect(() => {
    getDictionaryUrls();
    //get user words
  }, []);

  return (
    <SupabaseContext.Provider
      value={{
        isDbDataReady,
        languages,
        dictionaryUrls,
        dictionaryUrlsForWebView,
      }}
    >
      {children}
    </SupabaseContext.Provider>
  );
};
