import { useContext } from "react";
import { SupabaseContext } from "../providers";

export const useSupabase = () => {
  return useContext(SupabaseContext);
};
