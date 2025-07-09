import CameraRoll from '@react-native-camera-roll/camera-roll';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RNCamera } from 'react-native-camera';

const App: React.FC = () => {
  const cameraRef = useRef<RNCamera>(null);
  const [hasPermissions, setHasPermissions] = useState(false);
  const [capturedUri, setCapturedUri] = useState<string | null>(null);

  // ✅ Request runtime permissions for camera and media
  const requestPermissions = async () => {
    try {
      if (Platform.OS === 'android') {
        const grantedCamera = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );

        const grantedMedia = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        );

        setHasPermissions(
          grantedCamera === PermissionsAndroid.RESULTS.GRANTED &&
            grantedMedia === PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        // iOS permissions handled via Info.plist
        setHasPermissions(true);
      }
    } catch (err) {
      console.warn('Permission error:', err);
      setHasPermissions(false);
    }
  };

  // 🔄 Request permissions on component mount
  useEffect(() => {
    requestPermissions();
  }, []);

  // 📸 Take a picture and save to gallery
  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });

        console.log('Captured image:', data.uri);
        setCapturedUri(data.uri);

        // Save to gallery
        await CameraRoll.save(data.uri, { type: 'photo' });

        Alert.alert('Saved', 'Photo saved to gallery!');
      } catch (error) {
        console.error('Capture error:', error);
        Alert.alert('Error', 'Failed to take photo.');
      }
    }
  };

  if (!hasPermissions) {
    return (
      <View style={styles.centered}>
        <Text>Requesting permissions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
      />

      <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
        <Text style={styles.captureText}>📸 Snap</Text>
      </TouchableOpacity>

      {capturedUri && (
        <View style={styles.preview}>
          <Text style={styles.previewLabel}>Last Captured Image:</Text>
          <Image source={{ uri: capturedUri }} style={styles.previewImage} />
        </View>
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#222',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  captureText: {
    color: '#fff',
    fontSize: 18,
  },
  preview: {
    position: 'absolute',
    top: 40,
    left: 10,
    right: 10,
    alignItems: 'center',
    backgroundColor: '#000000aa',
    padding: 10,
    borderRadius: 10,
  },
  previewLabel: {
    color: '#fff',
    marginBottom: 6,
    fontWeight: 'bold',
  },
  previewImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
});
