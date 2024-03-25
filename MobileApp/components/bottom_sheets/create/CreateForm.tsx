import { StyleSheet, View } from "react-native";
import { ELanguageType } from "../../../interfaces";
import { useCallback, useState } from "react";
import { Title } from "../../Title";
import { LanguageSegmentedControl } from "../../SegmentedControl/LanguageSegmentedControl";
import { MyButton } from "../../MyButton";
import { useAuth, useBottomSheet, useSupabase } from "../../../hooks";
import { BulletList } from "../../BulletList";
import { Language, SupabaseDB } from "../../../utils";
import { SegmentedControlWidth } from "../../SegmentedControl/SegmentedControlWidth";
import { MyInput } from "../../MyInput";

export const CreateForm = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const { closeAllBS } = useBottomSheet();
  const { user } = useAuth();
  const { languages, dictionaryUrls } = useSupabase();

  const [selectedLanguageType, setSelectedLanguageType] = useState<ELanguageType>(languages[0].type);
  const onLanguagePressed = useCallback((type: ELanguageType) => setSelectedLanguageType(type), []);

  const [wordText, setWordText] = useState<string>("");
  const onTextChanged = useCallback((text: string) => setWordText(text), []);

  const [customUrl, setCustomUrl] = useState<string>("");
  const onCustomUrlChanged = useCallback((url: string) => setCustomUrl(url), []);

  const onConfirmClicked = async () => {
    setIsCreating(true);
    const isSuccess = await SupabaseDB.createUserWord(user?.id, selectedLanguageType, wordText, customUrl);
    setIsCreating(false);

    if (isSuccess) {
      closeAllBS();
      setSelectedLanguageType(languages[0].type);
      setWordText("");
      setCustomUrl("");
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View>
          <Title text="Select a Language category" />
          <LanguageSegmentedControl languages={languages} onPressed={onLanguagePressed} selectedLanguageType={selectedLanguageType} />
        </View>

        <View>
          <Title text={`Available ${Language.getName(selectedLanguageType)} Dictionaries`} />
          <View>
            {dictionaryUrls
              .filter((url) => url.lang === selectedLanguageType)
              .map((url) => (
                <BulletList key={url.id} text={url.dict_name} />
              ))}
          </View>
        </View>

        <View>
          <Title text="Enter a Word to save *" />
          <SegmentedControlWidth>
            <MyInput onChange={onTextChanged} text={wordText} placeholder="Word.." type="default" />
          </SegmentedControlWidth>
        </View>

        <View>
          <Title text="Enter a custom Dictionary URL (optional)" />
          <SegmentedControlWidth>
            <MyInput onChange={onCustomUrlChanged} text={wordText} placeholder="Custom URL.." type="web-search" />
          </SegmentedControlWidth>
        </View>

        <MyButton useSegmentedWidth={true} titleNormal="Confirm" titleLoading="Creating..." onPressed={onConfirmClicked} isLoading={isCreating} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    width: "100%",
  },
  container: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    gap: 30,
  },
});
