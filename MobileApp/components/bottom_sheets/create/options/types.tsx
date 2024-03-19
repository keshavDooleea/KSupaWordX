import { Pressable, StyleSheet, View } from "react-native";
import { CONSTANTS, colors, globalStyles } from "../../../../utils";
import { EVocabType, IVocab } from "../../../../interfaces";
import { MyText } from "../../../MyText";

interface ICreateOptionProp {
  types: IVocab[];
  onPressed: (type: EVocabType) => void;
  selectedType: EVocabType;
}

export const OptionTypes = ({ types, onPressed, selectedType }: ICreateOptionProp) => {
  return (
    <View style={styles.typesContainer}>
      {types.map(({ type, name }, index) => (
        <Pressable
          key={type}
          onPress={() => onPressed(type)}
          style={({ pressed }) => [
            {
              opacity: pressed ? CONSTANTS.styles.opacity.low : CONSTANTS.styles.opacity.high,
            },
            styles.container,
            selectedType === type ? styles.isSelected : null,
            index === 0 ? styles.containerFirstChild : null,
            index === types.length - 1 ? styles.containerLastChild : null,
          ]}
        >
          <MyText style={[styles.typeText, selectedType === type ? styles.isSelected : null]} text={name} />
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  typesContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingLeft: CONSTANTS.styles.margin.m,
    paddingRight: CONSTANTS.styles.margin.m,
  },
  container: {
    flex: 1,
    ...globalStyles.border,
    backgroundColor: colors.background.secondary,
    alignItems: "center",
    paddingLeft: CONSTANTS.styles.margin.l,
    paddingRight: CONSTANTS.styles.margin.l,
    paddingTop: CONSTANTS.styles.margin.m,
    paddingBottom: CONSTANTS.styles.margin.m,
    borderRadius: 0,
  },
  containerFirstChild: {
    borderTopLeftRadius: CONSTANTS.styles.radius,
    borderBottomLeftRadius: CONSTANTS.styles.radius,
    borderRightWidth: 0,
  },
  containerLastChild: {
    borderTopRightRadius: CONSTANTS.styles.radius,
    borderBottomRightRadius: CONSTANTS.styles.radius,
    borderLeftWidth: 0,
  },
  isSelected: {
    backgroundColor: colors.background.accentPrimary,
    color: "white",
  },
  typeText: {
    color: "#8ea0bd",
    fontWeight: "bold",
  },
});
