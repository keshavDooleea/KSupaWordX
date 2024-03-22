import { StyleSheet, View } from "react-native";
import { LANGUAGES, CATEGORY_TYPES, globalStyles, wordManager } from "../../../../utils";
import { ELanguageType, ECategoryType, ICategory } from "../../../../interfaces";
import { useCallback, useEffect, useState } from "react";
import { OptionBody } from "./body";
import { SegmentedControl } from "../../../SegmentedControl";
import { Title } from "../../../Title";
import { LanguageSegmentedControl } from "../../../SegmentedControl/LanguageSegmentedControl";
import { Button } from "react-native-elements";
import { useDimensions } from "../../../../hooks";

const types = CATEGORY_TYPES;

export const CreateOptions = () => {
  const { segmentedControlWidth } = useDimensions();
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const [category, setCategory] = useState<ICategory>();
  const [selectedCategoryType, setSelectedCategoryType] = useState<ECategoryType>(types[0].type);
  const onVocabTypePressed = useCallback((type: ECategoryType) => setSelectedCategoryType(type), []);
  useEffect(() => setCategory(types.find((t) => t.type === selectedCategoryType)), [selectedCategoryType]);

  const [selectedLanguageType, setSelectedLanguageType] = useState<ELanguageType>(LANGUAGES[0].type);
  const onLanguagePressed = useCallback((type: ELanguageType) => setSelectedLanguageType(type), []);

  const [wordText, setWordText] = useState<string>("");
  const onTextChanged = useCallback((text: string) => setWordText(text), []);

  const onConfirmClicked = async () => {
    setIsCreating(true);
    await wordManager.createWord(selectedCategoryType, selectedLanguageType, wordText);
    setIsCreating(false);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View>
          <Title text="Select a vocab type" />
          <SegmentedControl types={types} onPressed={onVocabTypePressed} selectedCategoryType={selectedCategoryType} />
        </View>

        <View>
          <Title text="Select a language category" />
          <LanguageSegmentedControl onPressed={onLanguagePressed} selectedLanguageType={selectedLanguageType} />
        </View>

        <View>
          <Title text={category?.description} />
          <OptionBody selectedCategoryType={selectedCategoryType} onTextChanged={onTextChanged} text={wordText} />
        </View>

        <Button buttonStyle={[globalStyles.button, { width: segmentedControlWidth }]} title="Confirm" disabled={isCreating} onPress={onConfirmClicked} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    width: "100%",
  },
  container: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    gap: 30,
  },
});
