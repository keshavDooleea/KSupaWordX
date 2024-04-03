import { View } from "react-native";
import { globalStyles } from "../../../../utils";
import { MyText } from "../../../../components";

export default function Home() {
  return (
    <View style={globalStyles.tabLayout}>
      <MyText text="Settings" />
    </View>
  );
}
