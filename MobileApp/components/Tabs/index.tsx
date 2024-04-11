import { StyleSheet, View } from "react-native";
import { ETabType, ITab } from "../../interfaces";
import { useEffect, useMemo, useState } from "react";
import { CONSTANTS } from "../../utils";
import { SegmentedControl } from "../SegmentedControl";
import { useBottomSheet } from "../../hooks";

interface ITabProps {
  tabs: ITab[];
}

export const Tabs = ({ tabs }: ITabProps) => {
  const { webViewWord } = useBottomSheet();
  const [selectedTabType, setSelectedTabType] = useState<ETabType>(tabs[0].type);
  const [selectedTab, setSelectedTab] = useState<ITab>(tabs[0]);

  const tabTypes = useMemo(
    () =>
      tabs.map((tab) => ({
        name: tab.name,
        type: tab.type,
      })),
    []
  );

  const onTabPressed = (type: ETabType) => setSelectedTabType(type);

  useEffect(() => {
    const tabBody = tabs.find((tab) => tab.type === selectedTabType);

    if (tabBody) {
      setSelectedTab(tabBody);
    }
  }, [selectedTabType]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SegmentedControl types={tabTypes} onPressed={onTabPressed} selectedCategoryType={selectedTabType} />
      </View>
      <View>{selectedTab.component(webViewWord!)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    paddingTop: CONSTANTS.styles.margin.m,
    paddingBottom: CONSTANTS.styles.margin.m,
    gap: CONSTANTS.styles.margin.m,
    marginBottom: CONSTANTS.styles.margin.m,
  },
  headerTab: {
    flex: 1,
    alignItems: "center",
  },
});
