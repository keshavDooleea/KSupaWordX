import { SplashScreen } from "../components";
import { useAuth, useFont } from "../hooks";
import Auth from "./auth/Auth";

export default function App() {
  const { isInitialized } = useAuth();
  const { areFontsLoaded } = useFont();

  if (!areFontsLoaded || !isInitialized) {
    return <SplashScreen />;
  }

  return <Auth />;
}
