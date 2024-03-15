import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { View } from "react-native";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./utils/supabase/client";
import Home from "./components/app/Home";
import Auth from "./components/auth/Auth";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  return <View>{session && session.user ? <Home key={session.user.id} session={session} /> : <Auth />}</View>;
}
