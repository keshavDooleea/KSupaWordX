import { useWindowDimensions } from "react-native";
import { CONSTANTS } from "../utils";

export const useDimensions = () => {
  const { width, height } = useWindowDimensions();
  const segmentedControlWidth = width - CONSTANTS.styles.margin.m * 2;

  const webViewHeight = height * 0.75;

  return {
    width,
    height,
    segmentedControlWidth,
    webViewHeight,
  };
};
