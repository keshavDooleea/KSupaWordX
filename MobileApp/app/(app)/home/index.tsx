import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useAuth } from "../../../hooks";
import { CreateBottomSheet, WebViewBottomSheet } from "../../../components";
import { CONSTANTS, colors } from "../../../utils";
import { HomeDashboard } from "./dashboard";

export default function Home() {
  const { session } = useAuth();

  useEffect(() => {
    if (session) getSnapshots();
  }, [session]);

  async function getSnapshots() {}

  return (
    <View style={styles.container}>
      <HomeDashboard />

      <CreateBottomSheet />
      <WebViewBottomSheet />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.background.main,
    paddingTop: CONSTANTS.styles.margin.m,
    paddingBottom: CONSTANTS.styles.margin.m,
  },
});
