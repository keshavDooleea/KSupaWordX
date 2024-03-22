import { Alert } from "react-native";

export const useAlert = () => {
  const showError = (errorMessage: string) => {
    Alert.alert("Error", errorMessage);
  };

  const showSuccess = (message: string) => {
    Alert.alert("Success", message);
  };

  return {
    showError,
    showSuccess,
  };
};
