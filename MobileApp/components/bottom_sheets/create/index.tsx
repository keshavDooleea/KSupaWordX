import BaseBottomSheet from "../base";
import { useBottomSheet } from "../../../hooks";
import { CreateOptions } from "./options";

export const CreateBottomSheet = () => {
  const { shouldOpenCreateBS } = useBottomSheet();

  return (
    <BaseBottomSheet shouldOpen={shouldOpenCreateBS}>
      <CreateOptions />
    </BaseBottomSheet>
  );
};
