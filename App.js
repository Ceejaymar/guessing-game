import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
}

export default function App() {
  const [dataLoaded, setDataLoaded ] = useState(false);
  const [userNumber, setUserNumber ] = useState();
  const [guessRounds, setGuessRounds ] = useState(0);

  if(!dataLoaded) {
    return (
            <AppLoading
              startAsync={fetchFonts}
              onFinish={() => setDataLoaded(true)}
              onError={(err => console.log(err))}
            />
    )
  }

  const newGameHandler = () => {
    setUserNumber(null);
    setGuessRounds(0);
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  }

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if(userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  } else if (guessRounds > 0) {
    content = <GameOverScreen
                userNumber={userNumber}
                numOfRounds={guessRounds}
                reset={newGameHandler}
              />;
  }

  return (
    <View style={styles.container}>
      <Header title="Guessing Game" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
