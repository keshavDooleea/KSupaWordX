import { useFonts } from "expo-font";

export const useFont = () => {
  const [areFontsLoaded] = useFonts({
    IBM: require("../assets/fonts/IBM.ttf"),
  });

  return {
    areFontsLoaded,
  };
};
