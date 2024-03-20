import { StyleSheet, Text, TextProps } from "react-native";
import { colors, globalStyles } from "../utils";

interface IMyTextProps extends TextProps {
  text: string | undefined;
}

export const MyText = ({ text, ...props }: IMyTextProps) => {
  return (
    <Text {...props} style={[styles.text, props.style]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    ...globalStyles.font,
    color: colors.text.subtitle,
  },
});
