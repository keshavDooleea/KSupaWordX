import { StyleSheet, View } from "react-native";
import { CONSTANTS, globalStyles } from "../../../../utils";
import { MyButton } from "../../../../components";
import { useAuth, useLoading } from "../../../../hooks";

export default () => {
  const { signOut } = useAuth();
  const { onSubmit, isLoading: isSigningOut } = useLoading(signOut);

  return (
    <View style={[globalStyles.tabLayout, styles.container]}>
      <View></View>
      <MyButton isLoading={isSigningOut} titleNormal="Log Out" titleLoading="Logging Out" onPressed={onSubmit} useSegmentedWidth={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: CONSTANTS.styles.margin.m,
  },
});
