import CameraRoll from '@react-native-camera-roll/camera-roll';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const devices = useCameraDevices();
  const device = devices.back;

  // ✅ Ask for permissions on mount
  useEffect(() => {
    const requestPermissions = async () => {
      const cameraStatus = await Camera.requestCameraPermission();
      const mediaStatus =
        Platform.OS === 'android'
          ? await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES)
          : RESULTS.GRANTED;

      setHasPermission(
        cameraStatus === 'authorized' && mediaStatus === RESULTS.GRANTED,
      );
    };

    requestPermissions();
  }, []);

  const takePhoto = async () => {
    if (!cameraRef) return;

    try {
      const photo = await cameraRef.takePhoto({
        flash: 'off',
      });

      await CameraRoll.save(photo.path, { type: 'photo' });
      Alert.alert('Saved', 'Photo saved to gallery!');
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Could not take photo.');
    }
  };

  if (!device || !hasPermission) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>Loading camera...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={setCameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
      <TouchableOpacity style={styles.snapButton} onPress={takePhoto}>
        <Text style={styles.snapText}>📸 Snap</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  snapButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 30,
  },
  snapText: {
    color: '#fff',
    fontSize: 18,
  },
});
