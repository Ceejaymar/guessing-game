import { StyleSheet, View, Text, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import React, { useState } from 'react';

import colors from '../constants/colors';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';

const StartGameScreen = ({ onStartGame }) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [userConfirmed, setUserConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numInputHandler = (enteredNum) => {
    // Replace anything that is not a number with an empty string, set enteredValue
    setEnteredValue(enteredNum.replace(/[^0-9]/, ''));
  }

  const resetInputHandler = () => {
    setEnteredValue('');
    setUserConfirmed(false);
  }

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);

    if(isNaN(chosenNumber) || chosenNumber <= 0) {
      Alert.alert(
        'Invalid number',
        'Number has to be between 1 - 99',
        [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]);
      return;
    }

    setUserConfirmed(true);
    // safe to use enteredValue after resetting it. because of how react renders these.
    setEnteredValue('');
    setSelectedNumber(parseInt(enteredValue));
    Keyboard.dismiss();
  }

  let confirmedOutput;

  if (userConfirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected:</Text>
        <NumberContainer>
          {selectedNumber}
        </NumberContainer>
        <Button title="START GAME" onPress={() => onStartGame(selectedNumber)} />
      </Card>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a new game</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a number</Text>
          <Input
            value={enteredValue}
            style={styles.input}
            blurOnSubmit
            keyboardType='number-pad'
            maxLength={2}
            onChangeText={numInputHandler}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title='reset'
                color={colors.secondary}
                onPress={resetInputHandler}
              />
            </View>
            <View style={styles.button}>
              <Button
                title='confirm'
                color={colors.primary}
                onPress={confirmInputHandler}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  input: {
    width: 50,
    fontSize: 30,
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  button: {
    width: 100
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center'
  }
})

export default StartGameScreen;
