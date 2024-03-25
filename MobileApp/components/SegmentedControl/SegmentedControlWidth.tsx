import { View } from "react-native";
import { useDimensions } from "../../hooks";
import { PropsWithChildren } from "react";

export const SegmentedControlWidth = ({ children }: PropsWithChildren) => {
  const { segmentedControlWidth } = useDimensions();

  return (
    <View
      style={{
        width: segmentedControlWidth,
      }}
    >
      {children}
    </View>
  );
};
