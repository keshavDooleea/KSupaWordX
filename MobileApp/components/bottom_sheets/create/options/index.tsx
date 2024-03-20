import { StyleSheet, View } from "react-native";
import { LANGUAGES, VOCAB_TYPES } from "../../../../utils";
import { ELanguageType, EVocabType, IVocab } from "../../../../interfaces";
import { useCallback, useEffect, useState } from "react";
import { OptionBody } from "./body";
import { SegmentedControl } from "../../../SegmentedControl";
import { Title } from "../../../Title";
import { LanguageSegmentedControl } from "../../../SegmentedControl/LanguageSegmentedControl";

const types = VOCAB_TYPES;

export const CreateOptions = () => {
  const [vocab, setVocab] = useState<IVocab>();
  const [selectedType, setSelectedType] = useState<EVocabType>(types[0].type);
  const [selectedLanguageType, setSelectedLanguageType] = useState<ELanguageType>(LANGUAGES[0].type);

  const onVocabTypePressed = useCallback((type: EVocabType) => setSelectedType(type), []);
  useEffect(() => setVocab(types.find((t) => t.type === selectedType)), [selectedType]);

  const onLanguagePressed = useCallback((type: ELanguageType) => setSelectedLanguageType(type), []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View>
          <Title text="Select a vocab type" />
          <SegmentedControl types={types} onPressed={onVocabTypePressed} selectedType={selectedType} />
        </View>

        <View>
          <Title text="Select a language category" />
          <LanguageSegmentedControl onPressed={onLanguagePressed} selectedLanguageType={selectedLanguageType} />
        </View>

        <View>
          <Title text={vocab?.description} />
          <OptionBody selectedType={selectedType} />
        </View>
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
