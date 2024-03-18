import { Slot, useSegments } from "expo-router";
import { useAuth, useRouter } from "../hooks";
import { AuthProvider, BottomSheetProvider } from "../providers";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetProvider>
          <InitialLayout />
        </BottomSheetProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
