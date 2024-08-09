import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';
import useMedia from '../../hooks/useMedia';
import useCamera from '../../hooks/useCamera';

function ImagePicker({ onTakeImage }) {
  const [pickedImage, setPickedImage] = useState(null);

  const { takeCameraImg } = useCamera();
  const { takeMediaImg } = useMedia();

  async function takeMediaImgHandler() {
    const result = await takeMediaImg();
    result && setPickedImage(result.assets[0].uri);
  }
  async function takeCameraImgHandler() {
    const result = await takeCameraImg();
    result && setPickedImage(result.assets[0].uri);
  }

  useEffect(() => {
    if (!pickedImage) return;
    onTakeImage(pickedImage);
  }, [pickedImage]);

  return (
    <View>
      {/* review img */}
      <View style={styles.imagePreview}>
        {pickedImage ? (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        ) : (
          <Text>No image taken yet.</Text>
        )}
      </View>

      {/* pick img */}
      <View style={styles.buttonsConatiner}>
        <OutlinedButton icon="camera" onPress={takeCameraImgHandler}>
          Camera Image
        </OutlinedButton>
        <OutlinedButton icon="folder" onPress={takeMediaImgHandler}>
          Media Image
        </OutlinedButton>
      </View>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonsConatiner: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-around',
  },
});
