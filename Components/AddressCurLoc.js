// import React, { useState, useEffect } from 'react';
// import { Platform, Text, View, StyleSheet, Alert } from 'react-native';
// // import Constants from 'expo-constants';
// import * as Location from 'expo-location';
// const Global = require('../Helper/Constants');


// export default function AddressCurLoc() {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
//   const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
//     'Wait, we are fetching you location...'
//   );

//   React.useEffect(() => {
//     CheckIfLocationEnabled()
//     setCurrentLocation();

//   }, []);

//   const CheckIfLocationEnabled = async () => {
//     let enabled = await Location.hasServicesEnabledAsync();

//     if (!enabled) {
//       Alert.alert(
//         'Location Service not enabled',
//         'Please enable your location services to continue',
//         [{ text: 'OK' }],
//         { cancelable: false }
//       );
//     } else {
//       setLocationServiceEnabled(enabled);
//     }
//   };

//   const setCurrentLocation = async () => {
//     let { status } = await Location.requestPermissionsAsync();
//     if (status !== 'granted') {
//       setErrorMsg('Permission to access location was denied');
//       return;
//     }
//     let {coords} = await Location.getCurrentPositionAsync({});
//     setLocation(coords);
//     console.log(JSON.stringify(coords))
//     if (coords) {
//         const { latitude, longitude } = coords;
//         let response = await Location.reverseGeocodeAsync({
//           latitude,
//           longitude
//         });
//         console.log(response)
//         for (let item of response) {
//           let address = `${item.street}, ${item.district}, ${item.city}, ${item.postalCode}`;
//           Global.profileInfo.searchPinCode = `${item.postalCode}`;
//           Global.currentLoc = [item.street, item.district, item.city, item.postalCode, '']
//           setDisplayCurrentAddress(address);
//         }
//       }
//   };


// //   let text = 'Waiting..';
// //   if (errorMsg) {
// //     text = errorMsg;
// //   } else if (location) {
// //     text = JSON.stringify(location);
// //   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.paragraph} numberOfLines={2}>{displayCurrentAddress}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 10,
//   },
//   paragraph: {
//     fontSize: 12,
//     textAlign: 'center',
    
//   },
// });