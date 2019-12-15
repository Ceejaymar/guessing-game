import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

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

const ListItem = (guess, numOfRound) => (
  <View key={guess} style={styles.listItem}>
    <BodyText>Round {numOfRound}</BodyText>
    <BodyText>{guess}</BodyText>
  </View>
);

const GameScreen = ({ userChoice, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if(currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, pastGuesses]);

  const nextGuessHandler = (direction) => {
    if ((direction === 'lower' && currentGuess < userChoice) || (direction === 'higher' && currentGuess > userChoice)) {
      Alert.alert('Not quite!', 'The number is in the other direction', [{ text: 'Sorry!', style: 'cancel'}]);
      return;
    }
    if(direction === 'lower') {
      currentHigh.current = currentGuess;
    }
    else if (direction === 'higher'){
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);

    setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
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
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => ListItem(guess, pastGuesses.length - index) )}
        </ScrollView>
      </View>
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
  },
  listContainer: {
    flex: 1,
    width: '80%'
  },
  list: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listItem: {
    borderColor: '#efefef',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%'
  },
});

export default GameScreen;
