import { useContext } from "react";
import { SwipeableContext } from "../providers/SwipeableProvider";

export const useSwipeable = () => {
  return useContext(SwipeableContext);
};
