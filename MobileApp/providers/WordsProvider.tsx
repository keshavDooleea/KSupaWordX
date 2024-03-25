import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { SupabaseDB, SupabaseTypes, supabase } from "../utils";
import { ELanguageType, IUserWord } from "../interfaces";
import { useAuth } from "../hooks/useAuth";
import { useSupabase } from "../hooks/useSupabase";

interface IWordsContext {
  isFetchingWords: boolean;
  userWords: IUserWord[];
  currentLang: ELanguageType;
  fetchWords: () => void;
  setCurrentLang: (lang: ELanguageType) => void;
}

export const WordsContext = createContext<IWordsContext>({} as IWordsContext);

export const WordsProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();
  const { languages } = useSupabase();

  const [userWords, setUserWords] = useState<IUserWord[]>([]);
  const [isFetchingWords, setIsFetchingWords] = useState<boolean>(true);
  const [currentLang, setCurrentLang] = useState<ELanguageType>(ELanguageType.en);

  const fetchWords = async () => {
    if (!user?.id || !currentLang) return;

    setIsFetchingWords(true);
    const words = await SupabaseDB.getUserWords(user?.id, currentLang);
    setUserWords(words ?? []);
    setIsFetchingWords(false);
  };

  useEffect(() => {
    if (languages.length > 0) {
      setCurrentLang(languages[0].type);
    }
  }, [languages]);

  useEffect(() => {
    if (currentLang) fetchWords();
  }, [currentLang, user]);

  useEffect(() => {
    const realTimeSubscription = supabase
      .channel("any")
      .on<IUserWord>("postgres_changes", { event: "*", schema: "public", table: SupabaseTypes.USER_WORDS }, (payload) => {
        const changes = payload.new as IUserWord;
        if (!changes) return;
        if (changes.user_id === user?.id) fetchWords();
      })
      .subscribe();

    return () => {
      realTimeSubscription.unsubscribe();
    };
  });

  return (
    <WordsContext.Provider
      value={{
        userWords,
        isFetchingWords,
        fetchWords,
        currentLang,
        setCurrentLang,
      }}
    >
      {children}
    </WordsContext.Provider>
  );
};
