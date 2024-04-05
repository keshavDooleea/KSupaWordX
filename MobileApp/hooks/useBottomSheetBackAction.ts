import { useEffect, useRef } from "react";
import { BackHandler, NativeEventSubscription } from "react-native";
import { useBottomSheet } from "./useBottomSheet";

export const useBottomSheetBackAction = () => {
  const backHandlerSubscriptionRef = useRef<NativeEventSubscription | null>(null);
  const { isOpen, closeAllBS } = useBottomSheet();

  useEffect(() => {
    if (isOpen && !backHandlerSubscriptionRef.current) {
      backHandlerSubscriptionRef.current = BackHandler.addEventListener("hardwareBackPress", () => {
        closeAllBS();
        return true;
      });
    } else if (!isOpen) {
      backHandlerSubscriptionRef.current?.remove();
      backHandlerSubscriptionRef.current = null;
    }
  }, [isOpen]);
};
