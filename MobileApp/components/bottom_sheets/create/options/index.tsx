import { StyleSheet, View } from "react-native";
import { VOCAB_TYPES } from "../../../../utils";
import { useBottomSheet, useImagePicker } from "../../../../hooks";
import { OptionTypes } from "./types";
import { EVocabType, IVocab } from "../../../../interfaces";
import { useCallback, useEffect, useState } from "react";
import { MyText } from "../../../MyText";

const types = VOCAB_TYPES;

export const CreateOptions = () => {
  const { uploadSnapshot } = useImagePicker();
  const { closeAllBS } = useBottomSheet();
  const [selectedType, setSelectedType] = useState<EVocabType>(types[0].type);
  const [vocab, setVocab] = useState<IVocab>();

  const onPressed = useCallback((type: EVocabType) => {
    setSelectedType(type);
  }, []);

  useEffect(() => {
    setVocab(types.find((t) => t.type === selectedType));
  }, [selectedType]);

  const onImagePressed = async () => {
    const isSuccess = await uploadSnapshot();
    if (isSuccess) closeAllBS();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <OptionTypes types={types} onPressed={onPressed} selectedType={selectedType} />
        <MyText style={styles.descriptionText} text={vocab?.description} />
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
