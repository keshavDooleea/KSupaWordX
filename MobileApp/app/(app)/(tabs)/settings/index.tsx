import { StyleSheet, View } from "react-native";
import { globalStyles } from "../../../../utils";
import { MyButton } from "../../../../components";
import { useAuth } from "../../../../hooks";

export default () => {
  const { signOut } = useAuth();

  return (
    <View style={[globalStyles.tabLayout, styles.container]}>
      <MyButton isLoading={false} titleNormal="Log Out" titleLoading="" onPressed={signOut} useSegmentedWidth={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
