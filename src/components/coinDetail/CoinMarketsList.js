import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

import colors from '../../resources/colors';

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderBottomColor: colors.zircon,
    borderBottomWidth: 2,
  },
  listTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    padding: 12,
    textAlign: 'center',
  },
  listContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  marketContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    padding: 12,
  },
  marketName: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  marketPrice: {
    color: colors.zircon,
  },
});

function CoinMarketsList({markets}) {
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.listTitle}>Markets</Text>
      </View>
      <FlatList
        style={styles.listContainer}
        keyExtractor={(item, index) => item.base + item.name + index}
        data={markets}
        renderItem={({item}) => (
          <View style={styles.marketContainer}>
            <Text style={styles.marketName}>{item.name}</Text>
            <Text style={styles.marketPrice}>{`$ ${Number(
              item.price_usd,
            ).toFixed(2)} USD`}</Text>
          </View>
        )}
        horizontal
      />
    </View>
  );
}

export default CoinMarketsList;
