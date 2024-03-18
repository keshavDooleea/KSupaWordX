import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useAuth } from "../../../hooks";
import { CreateBottomSheet } from "../../../components/bottom_sheets";
import { Text } from "react-native-elements";

export default function Home() {
  const { session } = useAuth();

  useEffect(() => {
    if (session) getSnapshots();
  }, [session]);

  async function getSnapshots() {}

  return (
    <View style={styles.container}>
      <Text>afef</Text>
      <CreateBottomSheet />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    backgroundColor: "red",
  },
});
