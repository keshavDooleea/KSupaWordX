import { useWindowDimensions } from "react-native";
import { CONSTANTS } from "../utils";

export const useDimensions = () => {
  const { width, height } = useWindowDimensions();
  const segmentedControlWidth = width - CONSTANTS.styles.margin.m * 2;

  return {
    width,
    height,
    segmentedControlWidth,
  };
};
