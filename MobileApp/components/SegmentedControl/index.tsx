import { StyleSheet, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { MyText } from "../MyText";
import { CONSTANTS, globalStyles, colors } from "../../utils";
import { Key } from "react";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";

interface SegmentedControl<T, G> {
  types: {
    name: string;
    type: G;
  }[];
  onPressed: (type: G) => void;
  selectedType: G;
}

export const SegmentedControl = <T, G>({ types, onPressed, selectedType }: SegmentedControl<T, G>) => {
  const { width: windowWidth } = useWindowDimensions();

  const internalPadding = CONSTANTS.styles.margin.m;
  const segmentedControlWidth = windowWidth - CONSTANTS.styles.margin.m * 2;
  const itemWidth = (segmentedControlWidth - internalPadding) / types.length;

  const rStyle = useAnimatedStyle(() => {
    const index = types.findIndex((type) => type.type === selectedType);
    return {
      left: withTiming(itemWidth * index + internalPadding / 2),
    };
  }, [selectedType, types, itemWidth]);

  return (
    <View
      style={[
        styles.container,
        {
          width: segmentedControlWidth,
        },
      ]}
    >
      <Animated.View
        style={[
          {
            width: itemWidth,
          },
          rStyle,
          styles.activeBox,
        ]}
      />
      {types.map(({ type, name }) => {
        return (
          <TouchableOpacity
            key={type as Key}
            onPress={() => onPressed(type)}
            style={[
              {
                width: itemWidth,
              },
              styles.labelContainer,
            ]}
          >
            <MyText text={name} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: colors.background.secondary,
    paddingTop: CONSTANTS.styles.margin.m,
    paddingBottom: CONSTANTS.styles.margin.m,
    borderRadius: CONSTANTS.styles.radius,
  },
  activeBox: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -5 }],
    backgroundColor: colors.background.main,
    paddingTop: CONSTANTS.styles.margin.m + 4,
    paddingBottom: CONSTANTS.styles.margin.m + 4,
    ...globalStyles.border,
  },
  labelContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
