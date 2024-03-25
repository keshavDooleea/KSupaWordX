import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { SupabaseDB } from "../utils";
import { IDictUrls, ILanguage } from "../interfaces";

interface ISupabaseContext {
  isDbDataReady: boolean;
  dictionaryUrls: IDictUrls[];
  languages: ILanguage[];
}

export const SupabaseContext = createContext<ISupabaseContext>({} as ISupabaseContext);

export const SupabaseProvider = ({ children }: PropsWithChildren) => {
  const [isDbDataReady, setIsDbDataReady] = useState<boolean>(false);
  const [dictionaryUrls, setDictionaryUrls] = useState<IDictUrls[]>([]);
  const [languages, setLanguages] = useState<ILanguage[]>([]);

  const getDictionaryUrls = async () => {
    const urls = await SupabaseDB.getDictionaryUrls();
    setDictionaryUrls([...urls]);
    setLanguages([...SupabaseDB.getLanguages(urls)]);
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
        dictionaryUrls,
        languages,
        isDbDataReady,
      }}
    >
      {children}
    </SupabaseContext.Provider>
  );
};
