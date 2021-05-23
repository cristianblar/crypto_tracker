/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  SectionList,
  StyleSheet,
} from 'react-native';

import CoinMarketsList from './CoinMarketsList';

import Http from '../../lib/http';
import colors from '../../resources/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
  header: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomColor: colors.zircon,
    borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  loaderContainer: {
    backgroundColor: colors.charade,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  currencyImage: {
    marginRight: 12,
    height: 25,
    width: 25,
  },
  sectionContainer: {
    maxHeight: 440,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    paddingVertical: 8,
    textAlign: 'center',
  },
  sectionContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: colors.zircon,
    fontSize: 16,
    padding: 6,
    textAlign: 'center',
  },
  negativeChange: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    fontSize: 16,
    padding: 6,
    textAlign: 'center',
    color: '#fa6060',
  },
  positiveChange: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    fontSize: 16,
    padding: 6,
    textAlign: 'center',
    color: '#3cd484',
  },
});

function CoinDetailScreen({
  route: {
    params: {coinDetail},
  },
  navigation,
}) {
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState([]);
  const [markets, setMarkets] = useState([]);

  const getSections = () => {
    // Each object will be a section:
    const data = [
      {
        title: 'Current rank',
        data: [coinDetail.rank],
      },
      {
        title: 'Current price',
        data: [`$ ${Number(coinDetail.price_usd).toFixed(2)} USD`],
      },
      {
        title: 'Market cap',
        data: [`$ ${Number(coinDetail.market_cap_usd).toFixed(2)} USD`],
      },
      {
        title: 'Volume 24h',
        data: [Number(coinDetail.volume24).toFixed(2)],
      },
      {
        title: 'Change - 24h',
        data: [`${coinDetail.percent_change_24h} %`],
      },
      {
        title: 'Change - 7d',
        data: [`${coinDetail.percent_change_7d} %`],
      },
    ];
    setSections(data);
  };

  const getMarkets = async coinId => {
    const marketUrl = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    try {
      const marketsList = await Http.instance.get(marketUrl);
      setMarkets(marketsList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navigation.setOptions({title: coinDetail.symbol});
    getSections();
    getMarkets(coinDetail.id)
      .then(() => setLoading(false))
      .catch(console.log);
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator color="white" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.currencyImage}
          source={{
            uri: `https://c1.coinlore.com/img/25x25/${coinDetail.nameid}.png`,
          }}
        />
        <Text style={styles.title}>{coinDetail.name}</Text>
      </View>
      <SectionList
        style={styles.sectionContainer}
        sections={sections}
        keyExtractor={(item, index) => item + index}
        renderItem={({item, section}) => (
          <Text
            style={
              section.title.startsWith('Change')
                ? (Number(item.split(' ')[1]) > 0 && styles.positiveChange) ||
                  styles.negativeChange
                : styles.sectionContent
            }>
            {item}
          </Text>
        )}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
      />
      <CoinMarketsList markets={markets} />
    </View>
  );
}

export default CoinDetailScreen;
