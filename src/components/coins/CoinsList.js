import React from 'react';
import {FlatList} from 'react-native';

import CoinItem from './CoinItem';

function CoinsList({coins, handlePress}) {
  return (
    <FlatList
      data={coins}
      renderItem={({item}) => (
        <CoinItem
          key={item.id}
          id={item.id}
          name={item.name}
          symbol={item.symbol}
          variation={item.percent_change_1h}
          currentPrice={item.price_usd}
          handlePress={handlePress}
        />
      )}
    />
  );
}

export default CoinsList;
