import { Alert } from "react-native";

export const useAlert = () => {
  const showError = (errorMessage: string) => {
    Alert.alert(errorMessage);
  };

  return {
    showError,
  };
};
