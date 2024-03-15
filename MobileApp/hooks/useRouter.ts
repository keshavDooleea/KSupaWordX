import { router } from "expo-router";

export const useRouter = () => {
  const goToHomePage = () => router.replace("/home");
  const goToAuthPage = () => router.replace("/");

  return {
    goToAuthPage,
    goToHomePage,
  };
};
