import { supabase } from "../utils/supabase/client";
import { useState } from "react";
import { useAlert } from "./useAlert";

interface IUseAuth {
  email: string;
  password: string;
}

export const useAuth = () => {
  const { showError } = useAlert();
  const [loading, setLoading] = useState<boolean>(false);

  async function signInWithEmail({ email, password }: IUseAuth) {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) showError(error.message);
    setLoading(false);
  }

  async function signUpWithEmail({ email, password }: IUseAuth) {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) showError(error.message);
    if (!session) showError("Please check your inbox for email verification!");
    setLoading(false);
  }

  return {
    loading,
    signInWithEmail,
    signUpWithEmail,
  };
};
