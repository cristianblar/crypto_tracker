import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  static instance = new Storage();

  store = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.log('Storage error...', error);
      return false;
    }
  };

  getAllKeys = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      return allKeys.length ? allKeys : null;
    } catch (error) {
      console.log('Storage error...', error);
      throw new Error(error.message);
    }
  };

  get = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.log('Storage error...', error);
      throw new Error(error.message);
    }
  };

  getAll = async () => {
    try {
      const allKeys = await this.getAllKeys();
      if (!allKeys) {
        return null;
      }
      const allValues = await AsyncStorage.multiGet(allKeys);
      return allValues.length
        ? allValues
            .filter(record1 => record1[0].startsWith('favorite'))
            .map(record2 => JSON.parse(record2[1]))
        : null;
    } catch (error) {
      console.log('Storage error...', error);
      throw new Error(error.message);
    }
  };

  remove = async key => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  };
}

export default Storage;
