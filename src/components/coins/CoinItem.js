import React from 'react';
import {Text, View, Image, StyleSheet, Pressable} from 'react-native';

import colors from '../../resources/colors';

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.zircon,
    borderBottomWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingRight: 24,
    paddingLeft: 24,
  },
  nameText: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 4,
  },
  symbolText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  currentPriceText: {
    color: colors.white,
    fontSize: 18,
  },
  variationContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  variationText: {
    color: colors.white,
    fontSize: 14,
  },
  arrowImage: {
    marginLeft: 8,
    height: 18,
    width: 18,
  },
});

function CoinItem({name, symbol, variation, currentPrice, handlePress, id}) {
  const imgArrow = () => {
    return variation > 0
      ? require('../../assets/arrow_up.png')
      : require('../../assets/arrow_down.png');
  };

  return (
    <Pressable onPress={() => handlePress(id)} style={styles.container}>
      <View>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.symbolText}>{symbol}</Text>
        <Text style={styles.currentPriceText}>{`$ ${Number(
          currentPrice,
        ).toFixed(2)} USD`}</Text>
      </View>
      <View style={styles.variationContainer}>
        <Text style={styles.variationText}>{`${variation} %`}</Text>
        <Image style={styles.arrowImage} source={imgArrow()} />
      </View>
    </Pressable>
  );
}

export default CoinItem;
