import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';

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

const GameScreen = ({ userChoice, onGameOver }) => {
  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, userChoice));
  const [rounds, setRounds] = useState(0);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if(currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, rounds]);

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

    const nextNumber = generateRandomBetween(currentLow.current + 1, currentHigh.current - 1, currentGuess);

    setRounds(rounds + 1);
    setCurrentGuess(nextNumber);
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.btnContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name="ios-arrow-round-down" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
          <Ionicons name="ios-arrow-round-up" size={24} color="white" />
        </MainButton>
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
