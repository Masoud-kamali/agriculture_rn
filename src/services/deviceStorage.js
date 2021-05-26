import { AsyncStorage } from 'react-native';

const deviceStorage = {

  async saveItem (key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  async loadToken() {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        return {
          token : value,
          isLoading : false
        };
      } else {
        return {
          token : '',
          isLoading : false
        };
      }
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  async deleteToken() {
    try{
      await AsyncStorage.removeItem('token')
        .then(
          () => {
            return {
              token: ''
            }
          }
        );
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  }

};

export default deviceStorage;
