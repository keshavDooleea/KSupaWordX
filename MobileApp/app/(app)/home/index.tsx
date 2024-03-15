import { useEffect } from "react";
import { View } from "react-native";
import { useAuth } from "../../../hooks";

export default function Home() {
  const { session } = useAuth();

  useEffect(() => {
    if (session) getSnapshots();
  }, [session]);

  async function getSnapshots() {}

  return <View></View>;
}
