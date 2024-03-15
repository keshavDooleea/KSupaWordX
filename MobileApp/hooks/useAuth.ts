import { supabase } from "../utils/supabase/client";
import { useContext, useState } from "react";
import { useAlert } from "./useAlert";
import { AuthContext } from "../providers/AuthProvider";

interface IUseAuth {
  email: string;
  password: string;
}

export const useAuth = () => {
  const { showError } = useAlert();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const authContext = useContext(AuthContext);

  async function signInWithEmail({ email, password }: IUseAuth) {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) showError(error.message);
    setIsLoading(false);
  }

  async function signUpWithEmail({ email, password }: IUseAuth) {
    setIsLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) showError(error.message);
    if (!session) showError("Please check your inbox for email verification!");
    setIsLoading(false);
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return {
    isLoading,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    ...authContext,
  };
};
