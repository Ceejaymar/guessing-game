import React from 'react';
import { StyleSheeet, View, Text } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: '#f7287b'
  }
})

export default Header;
