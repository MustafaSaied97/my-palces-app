import {
  useMediaLibraryPermissions,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from 'expo-image-picker';

export default function useMedia() {
  const [mediaPermission, requestMediaPermission] = useMediaLibraryPermissions();
  async function verifyMediaPermissions() {
    if (!mediaPermission?.granted) {
      const permissionResponse = await requestMediaPermission();
      return permissionResponse.granted;
    }
    return true;
  }
  async function takeMediaImg() {
    const hasPermission = await verifyMediaPermissions();
    if (!hasPermission) return;

    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) return;
    return result;
  }
  return {
    takeMediaImg,
  };
}
