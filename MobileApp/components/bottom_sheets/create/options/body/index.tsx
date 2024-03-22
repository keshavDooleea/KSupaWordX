import { View } from "react-native";
import { ECategoryType } from "../../../../../interfaces";
import { OptionUrlWordBody } from "./UrlWordBody";
import { memo } from "react";
import { OptionImageBody } from "./ImageBody";
import { useDimensions } from "../../../../../hooks";

interface IOptionBodyProp {
  selectedCategoryType: ECategoryType;
  text: string;
  onTextChanged: (text: string) => void;
}

export const OptionBody = ({ selectedCategoryType, onTextChanged, text }: IOptionBodyProp) => {
  const { segmentedControlWidth } = useDimensions();

  const Body = memo(() => {
    switch (selectedCategoryType) {
      case ECategoryType.url:
      case ECategoryType.word:
        return <OptionUrlWordBody selectedCategoryType={selectedCategoryType} onTextChanged={onTextChanged} text={text} />;
      case ECategoryType.image:
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
