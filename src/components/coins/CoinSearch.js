import React from 'react';
import {TextInput, Platform, View, StyleSheet} from 'react-native';

import colors from '../../resources/colors';

const styles = StyleSheet.create({
  inputContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 18,
    height: 48,
    width: '80%',
  },
  queryInputAndroid: {
    backgroundColor: colors.charade,
    borderBottomWidth: 2,
    borderBottomColor: colors.zircon,
    color: colors.white,
    paddingHorizontal: 8,
    height: '100%',
    width: '100%',
  },
  queryInputIos: {
    backgroundColor: colors.zircon,
    borderRadius: 12,
    color: colors.charade,
    paddingHorizontal: 12,
    height: '100%',
    width: '100%',
  },
});

function CoinSearch({handleInput, query}) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={
          Platform.OS === 'ios'
            ? styles.queryInputIos
            : styles.queryInputAndroid
        }
        placeholder="Search currency..."
        placeholderTextColor={colors.charade}
        onChangeText={handleInput}
        value={query}
        clearButtonMode="while-editing"
      />
    </View>
  );
}

export default CoinSearch;
