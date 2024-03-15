import { Session, User } from "@supabase/supabase-js";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { supabase } from "../utils";

interface IAuthContext {
  user: User | null | undefined;
  session: Session | null;
  isInitialized: boolean;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>();
  const [session, setSession] = useState<Session | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const setSessionInfo = (session: Session | null): void => {
    setSession(session);
    setUser(session ? session.user : null);
    setIsInitialized(true);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSessionInfo(session));
    const { data } = supabase.auth.onAuthStateChange(async (_event, session) => setSessionInfo(session));

    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isInitialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
