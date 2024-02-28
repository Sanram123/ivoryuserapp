import React, { Component } from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import qs from 'qs';
import config from '../config.js';
import  AsyncStorage  from '@react-native-community/async-storage';


// saveAuthToken = async (key, value) => {
//   await SecureStore.setItemAsync(key, value)
//       // .then(() => { this.props.navigation.navigate('Dashboard'); })
// }



class FitbitIntegration extends Component {

componentDidMount() {

    this.OAuth(config.client_id, this.getData);
    
 }



 OAuth = async (client_id, cb) => {
  Linking.addEventListener('url', handleUrl);
  function handleUrl(event) {
   console.log(event.url);
   Linking.removeEventListener('url', handleUrl);
   const [, query_string] = event.url.match(/\#(.*)/);
   console.log(query_string);
   const query = qs.parse(query_string);
   
   console.log(`query: ${JSON.stringify(query)}`);
   cb(query);
 }
 const oauthurl = `https://www.fitbit.com/oauth2/authorize?${qs.stringify({
  client_id,
  response_type: 'token',
  scope: 'heartrate activity activity profile sleep',
  redirect_uri: 'medility://FitbitIntegration',
  expires_in: '31536000',
 })}`;
 console.log(oauthurl);
 Linking.openURL(oauthurl).catch(err => console.error('Error processing linking', err));
 }

 getData = async info => {
  try{
     this.saveAuthToken('fitbit_token', info.token_type+' '+info.access_token)
  }
  catch(e){
    console.log(e)
  }

  fetch('https://api.fitbit.com/1.2/user/-/sleep/date/2017-06-27.json', {
  method: 'GET',
  headers: {
   Authorization: `Bearer ${info.access_token}`,
  }, 
  // body: `root=auto&path=${Math.random()}`
  })
  .then(res => res.json())
  .then(res => {
  console.log(`res: ${JSON.stringify(res)}`);
  this.props.navigation.navigate('CommunityProfile',
  {
    device_type: this.props.route.params.device_type,
    user_id: info.user_id
  });
  })
  .catch(err => {
    console.error('Error: ', err);
  });
  }

 saveAuthToken = async (key, value) => {
  try{
      console.log(key)
      console.log(value)
      await AsyncStorage.setItem(key, value)
      console.log('inside save auth')
      
      // .then(() => { this.props.navigation.navigate('Dashboard'); })
  }catch(e){
      console.log(e)
  }
}
 
 render() {
  return (
  <View style={styles.container}>
    <Text style={styles.welcome}>
     Welcome to Fitbit Integration
    </Text>
  </View>
  );
 }
}

export default FitbitIntegration;

const styles = StyleSheet.create({
container: {
 flex: 1,
 justifyContent: 'center',
 alignItems: 'center',
 backgroundColor: '#00a8b5',
},
welcome: {
 fontSize: 25,
 textAlign: 'center',
 color: '#fff',
 margin: 10,
},
});
