import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  title: {
    alignSelf: 'center',
    color: 'white',
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
});

function CoinsScreen({navigation}) {
  const handlePress = () => navigation.navigate('CoinDetail');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Testing from Coins' Screen!</Text>
      <Pressable style={styles.btn} onPress={handlePress}>
        <Text style={styles.btnText}>Ir a Coin Detail</Text>
      </Pressable>
    </View>
  );
}

export default CoinsScreen;
