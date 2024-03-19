import { StyleSheet, Text, TextProps } from "react-native";

interface IMyTextProps extends TextProps {
  text: string | undefined;
}

export const MyText = ({ text, ...props }: IMyTextProps) => {
  return (
    <Text {...props} style={[props.style, styles.text]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "IBM",
  },
});
