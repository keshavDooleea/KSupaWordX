import { StyleSheet, View } from "react-native";
import { VOCAB_TYPES } from "../../../../utils";
import { EVocabType, IVocab } from "../../../../interfaces";
import { useCallback, useEffect, useState } from "react";
import { MyText } from "../../../MyText";
import { OptionBody } from "./body";
import { SegmentedControl } from "../../../SegmentedControl";

const types = VOCAB_TYPES;

export const CreateOptions = () => {
  const [vocab, setVocab] = useState<IVocab>();
  const [selectedType, setSelectedType] = useState<EVocabType>(types[0].type);

  const onVocabTypePressed = useCallback((type: EVocabType) => setSelectedType(type), []);
  useEffect(() => setVocab(types.find((t) => t.type === selectedType)), [selectedType]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <SegmentedControl types={types} onPressed={onVocabTypePressed} selectedType={selectedType} />
        <MyText style={styles.descriptionText} text={vocab?.description} />
        <OptionBody selectedType={selectedType} />
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
    gap: 20,
  },
  descriptionText: {
    textAlign: "center",
    width: "60%",
    color: "#8ea0bd",
  },
});
