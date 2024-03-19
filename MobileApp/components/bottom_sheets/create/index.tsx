import BaseBottomSheet from "../base";
import { useBottomSheet } from "../../../hooks";
import { CreateOptions } from "./options";

export const CreateBottomSheet = () => {
  const { shouldOpenCreateBS } = useBottomSheet();

  return (
    <BaseBottomSheet shouldOpen={shouldOpenCreateBS}>
      <CreateOptions />
      {/* <BottomSheetTextInput placeholder="Enter a word or a URL" autoFocus={true} /> */}
    </BaseBottomSheet>
  );
};
