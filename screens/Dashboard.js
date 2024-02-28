import * as React from 'react'
import {Text, View, BackHandler, Alert} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import Home from '../screens/Home'
import Book from '../screens/Book'
import Report from '../screens/Reports'
import More from '../screens/More'
import Appointments from '../screens/Appointments'
import ChooseAddress from '../screens/ChooseAddress'
import Login from '../screens/Login'
import FamilyList from '../screens/FamilyList'
import FamilyAdd from '../screens/FamilyAdd'
import SignupMobile from '../screens/Signup_MobileNum'
import Community from '../screens/Community'
import SyncStorage from 'sync-storage'
const Global = require('../Helper/Constants')
// import * as SecureStore from 'expo-secure-store';
import {AsyncStorage} from '@react-native-community/async-storage'

async function save (key, value) {
  try {
    await AsyncStorage.setItem(key, value).then(() => {
      this.props.navigation.navigate('Dashboard')
    })
  } catch (e) {}
}

async function getValueFor (key) {
  try {
    let result = await AsyncStorage.getItem(key)
    if (result) {
      //   alert("🔐 Here's your value 🔐 \n" + result);
    } else {
      //   alert('No values stored under that key.');
    }
  } catch (e) {}
}

const Tab = createMaterialBottomTabNavigator()

class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    // SyncStorage.set("phone", Global.profileInfo["phone"])
    // this._storeData()
    save('phone', Global.profileInfo['phone'])
    // const ph = SyncStorage.get("phone")
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
    const ph = getValueFor('phone')
    console.log('mob num', ph)
  }

  

  handleBackButton = () => {
    // if (this.props.isFocused) {
    Alert.alert(
      'Exit App',
      'Exiting the application?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      },
    )
    return true
    // }
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('phone', Global.profileInfo['phone'])
    } catch (error) {
      // Error saving data
    }
  }

  render () {
    return (
      <Tab.Navigator
        initialRouteName='Home'
        activeColor='#D3D3D3'
        labelStyle={{fontSize: 12}}
        barStyle={{backgroundColor: 'white'}}>
        <Tab.Screen
          name='Home'
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name='home' color={color} size={26} />
            ),
          }}
          listeners={{
            focus: () =>
              BackHandler.addEventListener(
                'hardwareBackPress',
                this.handleBackButton,
              ),
            blur: () =>
              BackHandler.removeEventListener(
                'hardwareBackPress',
                this.handleBackButton,
              ),
          }}
        />
        <Tab.Screen
          name='Appointments'
          component={Appointments}
          options={{
            tabBarLabel: 'Updates',
            tabBarIcon: ({color}) => (
              <AntDesign name='plus' size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name='Community'
          component={Community}
          options={{
            tabBarLabel: 'Community',
            tabBarIcon: ({color}) => (
              <Entypo name='text-document' size={26} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name='More'
          component={More}
          options={{
            tabBarLabel: 'More',
            tabBarIcon: ({color}) => (
              <Feather name='more-vertical' size={26} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    )
  }
}

export default Dashboard
