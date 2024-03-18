import { Text } from "react-native-elements";
import BaseBottomSheet from "./base";
import { useBottomSheet } from "../../hooks";

export const CreateBottomSheet = () => {
  const { shouldOpenCreateBS } = useBottomSheet();

  return (
    <BaseBottomSheet shouldOpen={shouldOpenCreateBS}>
      <Text>Hello</Text>
      <Text>aaa</Text>
      <Text>Hello</Text>
      <Text>Hello</Text>
    </BaseBottomSheet>
  );
};
