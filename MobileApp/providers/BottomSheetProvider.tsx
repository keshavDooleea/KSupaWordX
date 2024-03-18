import { PropsWithChildren, createContext, useState } from "react";

interface IBottomSheetContext {
  shouldOpenCreateBS: boolean;
  openCreateBS: () => void;
  closeCreateBS: () => void;
  closeAllBS: () => void;
}

export const BottomSheetContext = createContext<IBottomSheetContext>({} as IBottomSheetContext);

export const BottomSheetProvider = ({ children }: PropsWithChildren) => {
  const [shouldOpenCreateBS, setShouldOpenCreateBS] = useState<boolean>(false);

  const openCreateBS = () => setShouldOpenCreateBS(true);
  const closeCreateBS = () => setShouldOpenCreateBS(false);

  const closeAllBS = () => {
    closeCreateBS();
  };

  return (
    <BottomSheetContext.Provider
      value={{
        shouldOpenCreateBS,
        openCreateBS,
        closeCreateBS,
        closeAllBS,
      }}
    >
      {children}
    </BottomSheetContext.Provider>
  );
};
