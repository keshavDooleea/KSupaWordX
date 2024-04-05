import React, { PropsWithChildren, useCallback, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useBottomSheet, useBottomSheetBackAction } from "../../hooks";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { CONSTANTS } from "../../utils";

interface ICreateBottomSheet extends PropsWithChildren {
  shouldOpen: boolean;
  canClose?: boolean;
}

const BaseBottomSheet = ({ shouldOpen, canClose = true, children }: ICreateBottomSheet) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { closeAllBS } = useBottomSheet();
  useBottomSheetBackAction();

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) closeAllBS();
  }, []);

  const renderBackdrop = useCallback((props: BottomSheetDefaultBackdropProps) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior={canClose ? "close" : "none"} />, []);

  useEffect(() => {
    shouldOpen ? bottomSheetRef.current?.expand() : bottomSheetRef.current?.close();
  }, [shouldOpen]);

  return (
    <BottomSheet ref={bottomSheetRef} index={shouldOpen ? 0 : -1} onChange={handleSheetChanges} enablePanDownToClose={canClose} enableDynamicSizing={true} backdropComponent={renderBackdrop}>
      <BottomSheetScrollView>
        <View style={styles.contentContainer}>{children}</View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: CONSTANTS.styles.margin.l,
    paddingBottom: CONSTANTS.styles.margin.l,
  },
});

export default BaseBottomSheet;
