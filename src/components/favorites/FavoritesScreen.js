import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

import CoinsList from '../coins/CoinsList';

import Storage from '../../lib/storage';
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

function FavoritesScreen({navigation}) {
  const [loading, setLoading] = useState(true);
  const [favoritesList, setFavoritesList] = useState([]);

  const getFavorites = async () => {
    setLoading(true);
    const allFavorites = await Storage.instance.getAll();
    allFavorites ? setFavoritesList(allFavorites) : setFavoritesList([]);
    setLoading(false);
  };

  useEffect(() => {
    getFavorites().catch(console.log);
    navigation.addListener('focus', getFavorites);
    return () => {
      navigation.removeListener('focus', getFavorites);
    };
  }, []);

  const handlePress = id => {
    navigation.navigate('CoinDetail', {
      coinDetail: favoritesList.filter(coin => coin.id === id)[0],
    });
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator color="white" size="large" />
      </View>
    );
  }

  if (!loading && !favoritesList.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>No favorites yet 😢</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CoinsList coins={favoritesList} handlePress={handlePress} />
    </View>
  );
}

export default FavoritesScreen;
