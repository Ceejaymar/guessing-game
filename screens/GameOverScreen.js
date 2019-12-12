import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const GameOverScreen = ({ userNumber, numOfRounds, reset }) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.gameOver}>Game is over!</Text>
      <Text>The number was <Text style={styles.imporantText}>{userNumber}</Text>! </Text>
      <Text>This game lasted <Text style={styles.imporantText}>{numOfRounds}</Text> rounds! </Text>
      <Button title="Start new game" onPress={reset} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gameOver: {
    fontSize: 25,
    marginVertical: 10,
  },
  imporantText: {
    fontSize: 20,
  }
})

export default GameOverScreen;
2
