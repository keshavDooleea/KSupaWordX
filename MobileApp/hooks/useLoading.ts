import { useState } from "react";

export const useLoading = (cb: Function) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    setIsLoading(true);
    await cb();
    setIsLoading(false);
  };

  return {
    isLoading,
    onSubmit,
  };
};
