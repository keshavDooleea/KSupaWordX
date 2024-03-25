import BaseBottomSheet from "../base";
import { useBottomSheet } from "../../../hooks";
import { CreateForm } from "./CreateForm";

export const CreateBottomSheet = () => {
  const { shouldOpenCreateBS } = useBottomSheet();

  return (
    <BaseBottomSheet shouldOpen={shouldOpenCreateBS}>
      <CreateForm />
    </BaseBottomSheet>
  );
};
