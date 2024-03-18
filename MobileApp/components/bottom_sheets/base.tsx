import React, { PropsWithChildren, useCallback, useEffect, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useBottomSheet } from "../../hooks";

interface ICreateBottomSheet extends PropsWithChildren {
  shouldOpen: boolean;
  snapPoints: string[];
}

const BaseBottomSheet = ({ shouldOpen, snapPoints, children }: ICreateBottomSheet) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPointsMemoized = useMemo(() => snapPoints, []);
  const { closeAllBS } = useBottomSheet();

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) closeAllBS();
  }, []);

  useEffect(() => {
    if (!bottomSheetRef.current) return;
    shouldOpen ? bottomSheetRef.current.expand() : bottomSheetRef.current.close();
  }, [shouldOpen]);

  return (
    <BottomSheet ref={bottomSheetRef} onChange={handleSheetChanges} snapPoints={snapPointsMemoized} enablePanDownToClose={true}>
      <BottomSheetView style={styles.contentContainer}>{children}</BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default BaseBottomSheet;
