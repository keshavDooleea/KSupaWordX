import { Tabs } from "expo-router";
import { HeaderSearchBar, MyText } from "../../../components";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../../utils";

export default () => {
  const commonTabOptions: unknown = {
    headerTitleAlign: "center",
    headerStyle: {
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowColor: "black",
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 10,
    },
    tabBarStyle: [
      {
        paddingHorizontal: 60,
        paddingVertical: 10,
      },
    ],
  };

  const getLabel = (isFocused: boolean, text: string) => <MyText text={text} style={{ color: isFocused ? colors.background.accentPrimary : colors.text.subtitle, fontSize: 11 }} />;
  const getIcon = (isFocused: boolean, iconName: string) => <AntDesign name={iconName as any} size={20} color={isFocused ? colors.background.accentPrimary : colors.text.subtitle} />;

  return (
    <Tabs screenOptions={{ tabBarStyle: { justifyContent: "center", paddingBottom: 0 } }}>
      <Tabs.Screen
        name="home/index"
        options={{
          ...commonTabOptions!,
          headerTitle: () => <HeaderSearchBar />,
          tabBarLabel: ({ focused }) => getLabel(focused, "My Words"),
          tabBarIcon: ({ focused }) => getIcon(focused, "home"),
        }}
      />
      <Tabs.Screen name="settings/index" options={{ ...commonTabOptions!, headerTitle: "Settings", tabBarLabel: ({ focused }) => getLabel(focused, "My Settings"), tabBarIcon: ({ focused }) => getIcon(focused, "setting") }} />
    </Tabs>
  );
};
