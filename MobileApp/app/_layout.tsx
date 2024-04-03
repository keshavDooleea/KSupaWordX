import { Slot, useSegments } from "expo-router";
import { useAuth, useRouter, useSupabase } from "../hooks";
import { AuthProvider, BottomSheetProvider, SupabaseProvider, SwipeableProvider, WordsProvider } from "../providers";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { globalStyles } from "../utils";

const InitialLayout = () => {
  const { session, isInitialized } = useAuth();
  const { isDbDataReady } = useSupabase();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!isInitialized || !isDbDataReady) return;

    const isAppGroup = segments[0] === "(app)";

    if (session && !isAppGroup) {
      router.goToHomePage();
    } else if (!session) {
      router.goToAuthPage();
    }
  }, [session, isInitialized, isDbDataReady]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <SupabaseProvider>
        <SwipeableProvider>
          <WordsProvider>
            <GestureHandlerRootView style={globalStyles.flex}>
              <BottomSheetProvider>
                <InitialLayout />
              </BottomSheetProvider>
            </GestureHandlerRootView>
          </WordsProvider>
        </SwipeableProvider>
      </SupabaseProvider>
    </AuthProvider>
  );
}
