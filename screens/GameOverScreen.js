import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';

import Colors from '../constants/colors';

const GameOverScreen = ({ userNumber, numOfRounds, reset }) => {
  return (
    <View style={styles.screen}>
      <TitleText style={styles.gameOver}>Game is over!</TitleText>
      <View style={styles.imgContainer}>
        <Image
          style={styles.image}
          source={require('../assets/success.png')}
          // for network images
          // source={{uri: 'https://img.freepik.com/free-vector/background-mountains-sunset_23-2147598746.jpg?size=338&ext=jpg'}}
          resizeMode="cover"
          // Only for first load
          // fadeDuration={2000}
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed
          <BodyText style={styles.imporantText}> {numOfRounds} </BodyText>
          rounds to guess the number
          <BodyText style={styles.imporantText}> {userNumber} </BodyText>
        </BodyText>
      </View>
      <MainButton onPress={reset}>Start new game</MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  gameOver: {
    fontSize: 25,
    marginVertical: 10,
  },
  resultContainer: {
    marginHorizontal: 30,
  },
  resultText: {
    textAlign: 'center',
    fontSize: 15,
  },
  imporantText: {
    fontSize: 20,
    color: Colors.secondary,
    fontFamily: 'open-sans-bold'
  },
  imgContainer: {
    width: 300,
    height: 300,
    borderWidth: 3,
    borderColor: Colors.primary,
    borderRadius: 150,
    overflow: 'hidden',
    marginVertical: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  }
})

export default GameOverScreen;
2
