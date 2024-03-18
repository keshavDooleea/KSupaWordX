import { Text } from "react-native-elements";
import BaseBottomSheet from "./base";
import { useBottomSheet } from "../../hooks";

export const CreateBottomSheet = () => {
  const { shouldOpenCreateBS } = useBottomSheet();
  const snapPoints = ["50%"];

  return (
    <BaseBottomSheet shouldOpen={shouldOpenCreateBS} snapPoints={snapPoints}>
      <Text>Hello</Text>
      <Text>aaa</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
    </BaseBottomSheet>
  );
};
