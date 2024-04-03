import { View } from "react-native";
import { globalStyles } from "../../../../utils";
import { HomeDashboard } from "./dashboard";

export default function Home() {
  return (
    <View style={[globalStyles.tabLayout]}>
      <HomeDashboard />
    </View>
  );
}
