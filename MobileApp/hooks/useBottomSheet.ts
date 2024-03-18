import { useContext } from "react";
import { BottomSheetContext } from "../providers";

export const useBottomSheet = () => {
  const bsContext = useContext(BottomSheetContext);

  return {
    ...bsContext,
  };
};
