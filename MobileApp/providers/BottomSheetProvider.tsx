import { PropsWithChildren, createContext, useState } from "react";
import { IUserWord } from "../interfaces";

interface IBottomSheetContext {
  shouldOpenCreateBS: boolean;
  openCreateBS: () => void;
  closeCreateBS: () => void;

  webViewWord: IUserWord | null;
  openWebViewBS: (word: IUserWord) => void;
  closeWebViewBS: () => void;

  deleteUserWord: IUserWord | null;
  openDeleteUserWordBS: (userWord: IUserWord) => void;
  closeDeleteUserWordBS: () => void;

  closeAllBS: () => void;
}

export const BottomSheetContext = createContext<IBottomSheetContext>({} as IBottomSheetContext);

export const BottomSheetProvider = ({ children }: PropsWithChildren) => {
  const [shouldOpenCreateBS, setShouldOpenCreateBS] = useState<boolean>(false);
  const [webViewWord, setWebViewWord] = useState<IUserWord | null>(null);
  const [deleteUserWord, setDeleteUserWord] = useState<IUserWord | null>(null);

  const openCreateBS = () => setShouldOpenCreateBS(true);
  const closeCreateBS = () => setShouldOpenCreateBS(false);

  const openDeleteUserWordBS = (word: IUserWord) => setDeleteUserWord(word);
  const closeDeleteUserWordBS = () => setDeleteUserWord(null);

  const openWebViewBS = (word: IUserWord) => setWebViewWord(word);
  const closeWebViewBS = () => setWebViewWord(null);

  const closeAllBS = () => {
    closeCreateBS();
    closeWebViewBS();
    closeDeleteUserWordBS();
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
        deleteUserWord,
        openDeleteUserWordBS,
        closeDeleteUserWordBS,
        closeAllBS,
      }}
    >
      {children}
    </BottomSheetContext.Provider>
  );
};
