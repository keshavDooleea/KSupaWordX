import { Slot, useSegments } from "expo-router";
import { useAuth } from "../hooks/useAuth";
import { AuthProvider } from "../providers/AuthProvider";
import { useEffect } from "react";
import { useRouter } from "../hooks/useRouter";

const InitialLayout = () => {
  const { session, isInitialized } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!isInitialized) return;

    const isAppGroup = segments[0] === "(app)";

    if (session && !isAppGroup) {
      router.goToHomePage();
    } else if (!session) {
      router.goToAuthPage();
    }
  }, [session, isInitialized]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}
