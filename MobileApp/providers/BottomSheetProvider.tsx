import { PropsWithChildren, createContext, useState } from "react";
import { IUserWord } from "../interfaces";

interface IBottomSheetContext {
  shouldOpenCreateBS: boolean;
  openCreateBS: () => void;
  closeCreateBS: () => void;

  webViewWord: IUserWord | null;
  openWebViewBS: (word: IUserWord) => void;
  closeWebViewBS: () => void;

  closeAllBS: () => void;
}

export const BottomSheetContext = createContext<IBottomSheetContext>({} as IBottomSheetContext);

export const BottomSheetProvider = ({ children }: PropsWithChildren) => {
  const [shouldOpenCreateBS, setShouldOpenCreateBS] = useState<boolean>(false);
  const [webViewWord, setWebViewWord] = useState<IUserWord | null>(null);

  const openCreateBS = () => setShouldOpenCreateBS(true);
  const closeCreateBS = () => setShouldOpenCreateBS(false);

  const openWebViewBS = (word: IUserWord) => setWebViewWord(word);
  const closeWebViewBS = () => setWebViewWord(null);

  const closeAllBS = () => {
    closeCreateBS();
    closeWebViewBS();
  };

  return (
    <BottomSheetContext.Provider
      value={{
        shouldOpenCreateBS,
        openCreateBS,
        closeCreateBS,
        webViewWord,
        openWebViewBS,
        closeWebViewBS,
        closeAllBS,
      }}
    >
      {children}
    </BottomSheetContext.Provider>
  );
};
