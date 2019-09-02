import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Card = ({ children, style }) => {
  return (
    <View style={{...styles.card, ...style}}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 0 },
    shadowRadius: 3,
    shadowOpacity: 0.26,
    backgroundColor: 'white',
    elevation: 5,
    padding: 20,
    borderRadius: 10
  }
})

export default Card;
