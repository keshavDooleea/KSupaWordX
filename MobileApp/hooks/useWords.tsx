import { useContext } from "react";
import { WordsContext } from "../providers";

export const useWords = () => useContext(WordsContext);
