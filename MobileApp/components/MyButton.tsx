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
}

export const MyButton = ({ useSegmentedWidth = false, isLoading = false, isDisabled = false, onPressed, titleNormal, titleLoading }: IMyButtonProps) => {
  const styles: StyleProp<ViewStyle> = [globalStyles.button];
  const { buttonColor, title, subtitle } = colors.text;

  if (useSegmentedWidth) {
    const { segmentedControlWidth } = useDimensions();
    styles.push({ width: segmentedControlWidth });
  }

  const Title = () => {
    if (!isLoading) return <MyText text={titleNormal} style={{ color: buttonColor }} />;

    return (
      <View style={{ flexDirection: "row", gap: 20 }}>
        <ActivityIndicator color={title} />
        <MyText text={titleLoading} style={{ color: subtitle }} />
      </View>
    );
  };

  return <Button buttonStyle={styles} title={<Title />} disabled={isLoading || isDisabled} onPress={onPressed} />;
};
