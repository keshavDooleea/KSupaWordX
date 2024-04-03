import { ActivityIndicator, StyleProp, View, ViewStyle } from "react-native";
import { colors, globalStyles } from "../utils";
import { Button } from "react-native-elements";
import { useDimensions } from "../hooks";
import { MyText } from "./MyText";

interface IMyButtonProps {
  titleNormal: string;
  titleLoading: string;
  onPressed: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  useSegmentedWidth?: boolean;
  styles?: StyleProp<unknown>;
  kind?: "primary" | "secondary" | "delete";
}

export const MyButton = ({ useSegmentedWidth = false, isLoading = false, isDisabled = false, onPressed, titleNormal, titleLoading, styles, kind = "primary" }: IMyButtonProps) => {
  const btnStyles: StyleProp<ViewStyle> = [];
  let { buttonColor, title, subtitle } = colors.text;

  if (styles) btnStyles.push(styles);

  if (isLoading || isDisabled) {
    btnStyles.push({ pointerEvents: "none" });
  }

  switch (kind) {
    case "primary":
      btnStyles.push(globalStyles.button);
      break;
    case "secondary":
      btnStyles.push({ backgroundColor: colors.background.secondary });
      buttonColor = colors.text.subtitle;
      break;
    case "delete":
      btnStyles.push({ backgroundColor: colors.error });
      break;
  }

  if (useSegmentedWidth) {
    const { segmentedControlWidth } = useDimensions();
    btnStyles.push({ width: segmentedControlWidth });
  }

  const Title = () => {
    if (!isLoading) return <MyText text={titleNormal} style={{ color: buttonColor }} />;

    return (
      <View style={{ flexDirection: "row", gap: 20 }}>
        <ActivityIndicator color={title} />
        <MyText text={titleLoading} style={{ color: kind === "delete" ? buttonColor : subtitle }} />
      </View>
    );
  };

  return <Button buttonStyle={btnStyles} title={<Title />} onPress={onPressed} />;
};
