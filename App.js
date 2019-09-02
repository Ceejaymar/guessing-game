import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import GameScreen from './screens/StartGameScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <Header title="Guessing Game" />
      <GameScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
