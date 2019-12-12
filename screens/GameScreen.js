import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
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
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  // console.log(currentHigh);

  const nextGuessHandler = (direction) => {
    if ((direction === 'lower' && currentGuess < userChoice) || (direction === 'higher' && currentGuess > userChoice)) {
      Alert.alert('Not quite!', 'The number is in the other direction', [{ text: 'Sorry!', style: 'cancel'}]);
      return;
    }
    if(direction === 'lower') {
      currentHigh.current = currentGuess;
    }
    else if (direction === 'higher'){
      currentLow.current = currentGuess;
    }
    console.log('high', currentHigh);
    console.log('low', currentLow);
    const nextNumber = generateRandomBetween(currentLow.current + 1, currentHigh.current - 1, currentGuess);

    setCurrentGuess(nextNumber);
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.btnContainer}>
        <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
        <Button title="HIGHER" onPress={nextGuessHandler.bind(this, 'higher')} />
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
