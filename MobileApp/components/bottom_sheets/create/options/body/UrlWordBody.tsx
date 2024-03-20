import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { View } from "react-native";
import { EVocabType } from "../../../../../interfaces";

interface IOptionUrlWordBodyProp {
  selectedType: EVocabType;
}

export const OptionUrlWordBody = ({ selectedType }: IOptionUrlWordBodyProp) => {
  return (
    <View>
      <BottomSheetTextInput placeholder={selectedType === EVocabType.url ? "Enter a URL" : "Enter a Word"} />
    </View>
  );
};
