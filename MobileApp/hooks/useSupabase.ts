import { useContext } from "react";
import { SupabaseContext } from "../providers/SupabaseProvider";

export const useSupabase = () => {
  return useContext(SupabaseContext);
};
