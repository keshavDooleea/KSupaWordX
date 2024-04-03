import { PropsWithChildren, createContext } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";

interface ISwipeableContext {
  closeCurrentRow: (wordId: string) => void;
  closePreviousRow: (wordId: string) => void;
  setRef: (ref: Swipeable | null, wordId: string) => void;
}

export const SwipeableContext = createContext<ISwipeableContext>({} as ISwipeableContext);

export const SwipeableProvider = ({ children }: PropsWithChildren) => {
  const swipeRefs = new Map<string, Swipeable | null>();
  let previousRow: Swipeable | null = null;

  const closeCurrentRow = (wordId: string): void => {
    swipeRefs.get(wordId)?.close();
  };

  const closePreviousRow = (wordId: string) => {
    if (previousRow && previousRow !== swipeRefs.get(wordId)) {
      previousRow.close();
    }
    previousRow = swipeRefs.get(wordId)!;
  };

  const setRef = (ref: Swipeable | null, wordId: string): void => {
    swipeRefs.set(wordId, ref);
  };

  return <SwipeableContext.Provider value={{ closePreviousRow, closeCurrentRow, setRef }}>{children}</SwipeableContext.Provider>;
};
