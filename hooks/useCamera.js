import { useCameraPermissions, launchCameraAsync } from 'expo-image-picker';

export default function useCamera() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  async function verifyCameraPermissions() {
    if (!cameraPermission?.granted) {
      const permissionResponse = await requestCameraPermission();
      return permissionResponse.granted;
    }
    return true;
  }
  async function takeCameraImg() {
    const hasPermission = await verifyCameraPermissions();
    if (!hasPermission) return;

    const result = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (result.canceled) return;
    return result;
  }
  return {
    takeCameraImg,
  };
}
