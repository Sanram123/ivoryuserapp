import React, {Component} from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import SmartWatchList from '../Components/SmartWatchList'
// import * as SecureStore from 'expo-secure-store';
import store from '../reduxhelper/store';
import * as actions from '../reduxhelper/actions';
const Global = require('../Helper/Constants')
import api from '../Helper/api'
import AsyncStorage from '@react-native-community/async-storage'

class Community extends Component {
  constructor (props) {
    super(props)
    this.state = {
      deviceList: [],
    }
  }

  callCommunityProfile = () => {
    this.props.navigation.navigate('CommunityProfile')
  }

  initWatchSetup = type => {
    console.log('init setup')
    console.log(type)
    switch (type.id) {
      case 1:
        this.props.navigation.navigate('FitbitIntegration', {
          device_type: type['id'],
        })
      case 3:
        this.props.navigation.navigate('GoogleFitIntegration', {
          device_type: type['id'],
        })
    }
  }

  componentDidMount () {
    this.setState({deviceList: []})
    this.checkUserConfigured()
  }

  saveAuthToken = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
      this.props.navigation.replace('CommunityStepBoard')
    } catch (e) {
      console.log(e)
    }
  }

  checkUserConfigured = async () => {
    try {
      await AsyncStorage.getItem('auth_token').then(token => {
        console.log(token)
        api.getData('community/checkuser/', token).then(([statuCode, data]) => {
          console.log(data)
          if (statuCode === 200 && data['status'] == 'success') {
            try {
              store.dispatch(actions.communityInfo(data['community_info']))
              this.saveAuthToken('community_id', data['community_id'] + '')
              let storeInfo = store.getState()
              console.log(storeInfo)
            } catch (e) {
              console.log(e)
            }
          } else {
            this.getDeviceList()
          }
        })
      })
    } catch (e) {
      console.log(e)
    }
  }

  getDeviceList = async () => {
    try {
      await AsyncStorage.getItem('auth_token').then(token => {
        console.log(token)
        api.getData('community/device/', '').then(([statuCode, data]) => {
          console.log(data)
          if (statuCode === 200) {
            this.setState({deviceList: data})
          }
        })
      })
    } catch (e) {
      console.log(e)
    }
  }

  render () {
    return (
      <SafeAreaView style={stylesheet.container}>
        <View style={stylesheet.titleStyle}>
          <Text style={{color: '#2f363f'}}>Connect your smart watch</Text>
        </View>
        <View style={stylesheet.watchList}>
          <SmartWatchList
            data={this.state.deviceList}
            onClick={this.initWatchSetup}
          />
        </View>
        <View style={stylesheet.newConnectSW}>
          <Text style={{color: '#2f363f', fontSize: 18}}>
            Don’t have a smart watch?
          </Text>
          <Text style={{color: '#b3b9bd'}}>
            No worries. Connect your health kits from your smart phone.
          </Text>
          <Text style={{color: '#b3b9bd'}}>
            Ex: Android, Apple Health, Samsung Health etc
          </Text>
        </View>
        <TouchableOpacity
          style={stylesheet.nextTitle}
          onPress={this.callCommunityProfile}>
          <Text style={stylesheet.nextTitleProp}>Next</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

export default Community

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#F8F8F8',
  },
  titleStyle: {
    paddingVertical: 15,
  },
  watchList: {
    flex: 1,
  },
  newConnectSW: {
    justifyContent: 'space-evenly',
    borderColor: '#5eaaa8',
    borderWidth: 1,
    padding: 10,
  },
  nextTitle: {
    marginTop: 10,
    backgroundColor: '#5EAAA8',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  nextTitleProp: {
    color: 'white',
    fontWeight: 'normal',
    fontSize: 18,
  },
})
