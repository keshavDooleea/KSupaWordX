import { SplashScreen } from "../components";
import { useAuth, useFont, useSupabase } from "../hooks";
import Auth from "./auth/Auth";

export default function App() {
  const { isInitialized } = useAuth();
  const { areFontsLoaded } = useFont();
  const { isDbDataReady } = useSupabase();

  if (!areFontsLoaded || !isInitialized || !isDbDataReady) {
    return <SplashScreen />;
  }

  return <Auth />;
}
