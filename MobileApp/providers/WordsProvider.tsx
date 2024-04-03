import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { SupabaseDB, SupabaseTypes, supabase } from "../utils";
import { DispatchState, ELanguageType, IUserWord } from "../interfaces";
import { useAuth } from "../hooks/useAuth";
import { useSupabase } from "../hooks/useSupabase";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

interface IWordsContext {
  isFetchingWords: boolean;
  userWordsDisplayed: IUserWord[];
  currentLang: ELanguageType;
  currentSearch: string;
  fetchWords: () => void;
  setCurrentLang: (lang: ELanguageType) => void;
  setCurrentSearch: DispatchState<string>;
}

export const WordsContext = createContext<IWordsContext>({} as IWordsContext);

export const WordsProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();
  const { languages } = useSupabase();

  const [userDBWords, setUserDBWords] = useState<IUserWord[]>([]);
  const [userWordsDisplayed, setUserWordsDisplayed] = useState<IUserWord[]>([]);
  const [isFetchingWords, setIsFetchingWords] = useState<boolean>(true);
  const [currentLang, setCurrentLang] = useState<ELanguageType>(ELanguageType.en);
  const [currentSearch, setCurrentSearch] = useState<string>("");

  const fetchWords = async () => {
    if (!user?.id || !currentLang) return;

    setIsFetchingWords(true);
    const words = (await SupabaseDB.getUserWords(user?.id, currentLang)) ?? [];
    const sortedWords = sortWordsAlphabetically(words);
    setUserDBWords(sortedWords);
    setUserWordsDisplayed(sortedWords);
    setIsFetchingWords(false);
  };

  const sortWordsAlphabetically = (array: IUserWord[]): IUserWord[] => array.sort((a, b) => a.word.word.localeCompare(b.word.word));

  const onUserWordTableChange = async (payload: RealtimePostgresChangesPayload<IUserWord>): Promise<void> => {
    switch (payload.eventType) {
      case "INSERT":
        await onUserWordTableInsert(payload.new);
        break;
      case "DELETE":
        onUserWordTableDelete(payload.old.user_id, payload.old.word_id);
        break;
    }
  };

  const onUserWordTableInsert = async (newWord: IUserWord): Promise<void> => {
    if (!newWord) return;
    if (newWord.user_id !== user?.id) return;

    const word = await SupabaseDB.getWordById(newWord.word_id);

    if (word && word.lang === currentLang) {
      newWord.word = word;
      setUserDBWords((oldWords) => sortWordsAlphabetically([...oldWords, newWord]));
    }
  };

  const onUserWordTableDelete = (userId: string | undefined, wordId: string | undefined) => {
    setUserDBWords((oldWords) => oldWords.filter((word) => !(word.user_id === userId && word.word_id === wordId)));
  };

  const onSearchChange = (search: string, userWords: IUserWord[]): void => {
    if (!search) {
      setUserWordsDisplayed(userWords);
      return;
    }

    const words = userWords.filter((word) => word.word.word.includes(search));
    setUserWordsDisplayed(words);
  };

  useEffect(() => {
    if (languages.length > 0) {
      setCurrentLang(languages[0].type);
    }
  }, [languages]);

  useEffect(() => {
    if (currentLang) fetchWords();
  }, [currentLang, user]);

  useEffect(() => onSearchChange(currentSearch, userDBWords), [currentSearch, userDBWords]);

  useEffect(() => {
    const realTimeSubscription = supabase
      .channel("any")
      .on<IUserWord>("postgres_changes", { event: "*", schema: "public", table: SupabaseTypes.USER_WORDS }, async (payload) => await onUserWordTableChange(payload))
      .subscribe();

    return () => {
      realTimeSubscription.unsubscribe();
    };
  }, [user]);

  return (
    <WordsContext.Provider
      value={{
        userWordsDisplayed,
        isFetchingWords,
        fetchWords,
        currentLang,
        setCurrentLang,
        currentSearch,
        setCurrentSearch,
      }}
    >
      {children}
    </WordsContext.Provider>
  );
};
