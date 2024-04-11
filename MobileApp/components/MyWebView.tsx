import { SafeAreaView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { CONSTANTS, globalStyles } from "../utils";
import { useDimensions } from "../hooks";
import { ReactNode } from "react";

interface IMyWebViewProps {
  uri: string;
  children?: ReactNode;
}

export const MyWebView = ({ uri, children }: IMyWebViewProps) => {
  const { webViewHeight, segmentedControlWidth } = useDimensions();

  return (
    <SafeAreaView style={[styles.container, { height: webViewHeight, width: segmentedControlWidth }]}>
      {children}
      <WebView style={styles.webViewContainer} source={{ uri }} nestedScrollEnabled />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    ...globalStyles.border,
  },
  webViewContainer: {
    flex: 1,
    marginTop: CONSTANTS.styles.margin.l,
  },
});
