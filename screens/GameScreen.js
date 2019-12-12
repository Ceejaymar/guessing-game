import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(100);
  const randomNum = Math.floor(Math.random() * (max - min) + min);

  if(randomNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  else {
    return randomNum;
  }
}

const GameScreen = ({ userChoice }) => {
  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, userChoice));

  return (
    <View style={styles.screen}>
      <Text>Opponent's guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.btnContainer}>
        <Button title="LOWER" onPress={() => {}} />
        <Button title="HIGHER" onPress={() => {}} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '100%'
  }
});

export default GameScreen;
