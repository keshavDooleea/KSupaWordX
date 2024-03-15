import { MediaTypeOptions, launchImageLibraryAsync } from "expo-image-picker";
import { useState } from "react";
import { useAlert } from "./useAlert";
import { supabase, CONSTANTS, ENV } from "../utils";
import { useAuth } from "./useAuth";

export const useImagePicker = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { showError } = useAlert();
  const { user } = useAuth();

  const uploadSnapshot = async () => {
    try {
      if (!user || !user.id) {
        return showError("No user!");
      }

      setIsUploading(true);

      const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        allowsEditing: true,
        quality: 1,
        exif: false,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return;
      }

      const image = result.assets[0];

      if (!image.uri) {
        return showError("No image uri!");
      }

      const arraybuffer = await fetch(image.uri).then((res) => res.arrayBuffer());

      if (arraybuffer.byteLength >= ENV.supabase.maxSize) {
        return showError(`File must not exceed ${ENV.supabase.maxSize / 1000} KB`);
      }

      const fileExt = image.uri?.split(".").pop()?.toLowerCase() ?? CONSTANTS.storage.defaultFileExtension;
      const path = `${user.id}/${Date.now()}.${fileExt}`;

      const { data, error: uploadError } = await supabase.storage.from(CONSTANTS.storage.bucketName).upload(path, arraybuffer, {
        contentType: image.mimeType ?? CONSTANTS.storage.defaultFileMimeType,
      });

      if (uploadError) {
        return showError(uploadError.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      } else {
        throw error;
      }
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadSnapshot,
    isUploading,
  };
};
