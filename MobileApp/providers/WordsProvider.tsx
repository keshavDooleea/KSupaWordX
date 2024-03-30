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
    setWords(words ?? []);
    setIsFetchingWords(false);
  };

  const setWords = (words: IUserWord[]): void => {
    setUserWords(words.sort((a, b) => a.word.word.localeCompare(b.word.word)));
  };

  const handleUserWordTableChange = async (newWord: IUserWord): Promise<void> => {
    if (!newWord) return;
    if (newWord.user_id !== user?.id) return;

    const word = await SupabaseDB.getWordById(newWord.word_id);

    if (word && word.lang === currentLang) {
      newWord.word = word;
      setWords([...userWords, newWord]);
    }
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
      .on<IUserWord>("postgres_changes", { event: "*", schema: "public", table: SupabaseTypes.USER_WORDS }, async (payload) => await handleUserWordTableChange(payload.new as IUserWord))
      .subscribe();

    return () => {
      realTimeSubscription.unsubscribe();
    };
  }, [user]);

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
