import React, { PropsWithChildren, useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useBottomSheet } from "../../hooks";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { CONSTANTS } from "../../utils";

interface ICreateBottomSheet extends PropsWithChildren {
  shouldOpen: boolean;
}

const BaseBottomSheet = ({ shouldOpen, children }: ICreateBottomSheet) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { closeAllBS } = useBottomSheet();

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) closeAllBS();
  }, []);

  const renderBackdrop = useCallback((props: BottomSheetDefaultBackdropProps) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />, []);

  return (
    <BottomSheet ref={bottomSheetRef} index={shouldOpen ? 0 : -1} onChange={handleSheetChanges} enableDynamicSizing={true} enablePanDownToClose={true} backdropComponent={renderBackdrop}>
      <BottomSheetScrollView>
        <View style={styles.contentContainer}>{children}</View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
    paddingTop: CONSTANTS.styles.margin.l,
    paddingBottom: CONSTANTS.styles.margin.l,
  },
});

export default BaseBottomSheet;
