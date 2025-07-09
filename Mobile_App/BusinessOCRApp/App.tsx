// App.tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import CameraScreen from './src/screens/CameraScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CameraScreen />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
