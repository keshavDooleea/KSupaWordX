import { View } from "react-native";
import { EVocabType } from "../../../../../interfaces";
import { OptionUrlWordBody } from "./UrlWordBody";
import { memo } from "react";
import { OptionImageBody } from "./ImageBody";
import { useDimensions } from "../../../../../hooks";

interface IOptionBodyProp {
  selectedType: EVocabType;
  text: string;
  onTextChanged: (text: string) => void;
}

export const OptionBody = ({ selectedType, onTextChanged, text }: IOptionBodyProp) => {
  const { segmentedControlWidth } = useDimensions();

  const Body = memo(() => {
    switch (selectedType) {
      case EVocabType.url:
      case EVocabType.word:
        return <OptionUrlWordBody selectedType={selectedType} onTextChanged={onTextChanged} text={text} />;
      case EVocabType.image:
        return <OptionImageBody />;
    }
  });

  return (
    <View
      style={{
        width: segmentedControlWidth,
      }}
    >
      <Body />
    </View>
  );
};
