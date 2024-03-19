import { StyleSheet, View, Text } from "react-native";

export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Splash Screennn</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "yellow",
  },
});
