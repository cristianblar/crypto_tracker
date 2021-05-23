import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import useCoins from '../../hooks/useCoins';

import CoinsList from './CoinsList';

import colors from '../../resources/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.charade,
  },
  loaderContainer: {
    backgroundColor: colors.charade,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

function CoinsScreen({navigation}) {
  const {coins: coinsList, loading} = useCoins();

  const handlePress = id => {
    navigation.navigate('CoinDetail', {
      coinDetail: coinsList.filter(coin => coin.id === id)[0],
    });
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator color="white" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CoinsList coins={coinsList} handlePress={handlePress} />
    </View>
  );
}

export default CoinsScreen;
