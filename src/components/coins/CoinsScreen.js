import React, {useState} from 'react';
import {Text, View, ActivityIndicator, StyleSheet} from 'react-native';
import useCoins from '../../hooks/useCoins';

import CoinSearch from './CoinSearch';
import CoinsList from './CoinsList';

import colors from '../../resources/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.charade,
    flex: 1,
  },
  loaderContainer: {
    backgroundColor: colors.charade,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  notFound: {
    alignSelf: 'center',
    color: colors.white,
    fontSize: 20,
    fontWeight: '600',
    marginTop: 60,
  },
});

function CoinsScreen({navigation}) {
  const {coins: coinsList, loading} = useCoins();
  const [query, setQuery] = useState('');
  const [filteredCoins, setFilteredCoins] = useState([]);

  const handlePress = id => {
    navigation.navigate('CoinDetail', {
      coinDetail: coinsList.filter(coin => coin.id === id)[0],
    });
  };

  const handleInput = queryText => {
    setQuery(queryText);
    setFilteredCoins(
      coinsList.filter(
        coin =>
          coin.name
            .trim()
            .toLowerCase()
            .includes(queryText.trim().toLowerCase()) ||
          coin.symbol
            .trim()
            .toLowerCase()
            .includes(queryText.trim().toLowerCase()),
      ),
    );
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
      <CoinSearch handleInput={handleInput} query={query} />
      {!query ? (
        <CoinsList coins={coinsList} handlePress={handlePress} />
      ) : filteredCoins.length ? (
        <CoinsList coins={filteredCoins} handlePress={handlePress} />
      ) : (
        <Text style={styles.notFound}>No crypto currencies found 😢</Text>
      )}
    </View>
  );
}

export default CoinsScreen;
