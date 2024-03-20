import { View, useWindowDimensions } from "react-native";
import { EVocabType } from "../../../../../interfaces";
import { OptionUrlWordBody } from "./UrlWordBody";
import { memo, useCallback } from "react";
import { OptionImageBody } from "./ImageBody";
import { CONSTANTS } from "../../../../../utils";

interface IOptionBodyProp {
  selectedType: EVocabType;
}

export const OptionBody = ({ selectedType }: IOptionBodyProp) => {
  const { width: windowWidth } = useWindowDimensions();
  const segmentedControlWidth = windowWidth - CONSTANTS.styles.margin.m * 2;

  const onTextChanged = useCallback(
    (text: string, type: EVocabType) => {
      console.log({ text, type });
    },
    [selectedType]
  );

  const Body = memo(() => {
    switch (selectedType) {
      case EVocabType.url:
      case EVocabType.word:
        return <OptionUrlWordBody selectedType={selectedType} onTextChanged={onTextChanged} />;
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
