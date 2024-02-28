import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
const Global = require('../Helper/Constants')
import AsyncStorage from '@react-native-community/async-storage'
import {token} from '../Helper/Constants'

class AddEditAddress extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: Global.editLoc[4] == '' ? '' : Global.editLoc[4],
      address: Global.editLoc[0] == '' ? '' : Global.editLoc[0],
      area: Global.editLoc[1] == '' ? '' : Global.editLoc[1],
      city: Global.editLoc[2] == '' ? '' : Global.editLoc[2],
      pincode: Global.editLoc[3] == '' ? '' : Global.editLoc[3],
      address_id: props.route.params.address_id,
      behavior: 'position',
    }
    Global.editLoc = []
  }

  showAlert = (title, msg) => {
    Alert.alert(title, msg, [
      {
        text: 'Ok',
        onPress: () => this.props.navigation.goBack(),
        style: 'cancel',
      },
      // { text: "OK", onPress: () => console.log("OK Pressed") }
    ])
  }

  saveAddress = async () => {
    try {
      await AsyncStorage.getItem('auth_token').then(token => {
        let address_url_method
        if (this.state.address_id == '') {
          address_url_method = 'POST'
        } else {
          address_url_method = 'PUT'
        }
        console.log(Global.BASE_URL + 'accounts/address/')
        fetch(Global.BASE_URL + 'accounts/address/', {
          method: address_url_method,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token
          },
          body: JSON.stringify({
            title: this.state.title,
            city: this.state.city,
            country: 'India',
            area: this.state.area,
            address1: this.state.address,
            pincode: this.state.pincode,
            username: Global.profileInfo.phone,
            id: this.state.address_id,
          }),
        })
          .then(response => response.json())
          .then(json => {
            console.log(json)
            Global.currentLoc = []
            this.showAlert('', json['message'])
          })
          .catch(error => {
            console.error(error)
          })
      })
    } catch (e) {}
  }

  setCurrentLoc = () => {
    console.log('curr loc')
    this.setState({
      address: Global.currentLoc[0],
      area: Global.currentLoc[1],
      city: Global.currentLoc[2],
      pincode: Global.currentLoc[3],
      title: Global.currentLoc[4],
    })
  }

  onTitle = val => {
    this.setState({title: val})
  }

  onAddress = val => {
    this.setState({address: val})
  }

  onArea = val => {
    this.setState({area: val})
  }

  onCity = val => {
    this.setState({city: val})
  }

  onPincode = val => {
    this.setState({pincode: val})
  }

  render () {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={stylesheet.container}>
        {/* <View style={stylesheet.navBar}>
                    <View style={stylesheet.backArrowView}><Image source={require('../Images/back.png')} /></View>
                    <View style={stylesheet.navTitle}>
                        <Text style={stylesheet.title}>Address</Text>
                    </View>
                </View> */}
        <View style={stylesheet.addressInput}>
          <View>
            <TouchableOpacity
              style={stylesheet.currentLoc}
              onPress={() => this.setCurrentLoc()}>
              <Image
                source={require('../Images/location.png')}
                style={stylesheet.locationIcon}
              />
              <Text style={{color: '#40535b62'}}>Use current location</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={stylesheet.orViewHolder}>
          <View style={stylesheet.lineStyle} />
          <Text style={{color: '#40535b62', fontWeight: 'bold'}}>OR</Text>
          <View style={stylesheet.lineStyle} />
        </View>
        <ScrollView>
          <View style={stylesheet.inputView}>
            <TextInput
              style={stylesheet.inputField}
              placeholder='Title'
              placeholderTextColor='#b3b9bd'
              onChangeText={value => this.onTitle(value)}
              value={this.state.title}
            />
          </View>
          <View style={stylesheet.inputView}>
            <TextInput
              style={stylesheet.inputField}
              placeholder='Address'
              placeholderTextColor='#b3b9bd'
              onChangeText={value => this.onAddress(value)}
              value={this.state.address}
            />
          </View>
          <View style={stylesheet.inputView}>
            <TextInput
              style={stylesheet.inputField}
              placeholder='Area'
              placeholderTextColor='#b3b9bd'
              onChangeText={value => this.onArea(value)}
              value={this.state.area}
            />
          </View>
          <View style={stylesheet.inputView}>
            <TextInput
              style={stylesheet.inputField}
              placeholder='City'
              placeholderTextColor='#b3b9bd'
              onChangeText={value => this.onCity(value)}
              value={this.state.city}
            />
          </View>
          <View style={stylesheet.inputView}>
            {/* <KeyboardAvoidingView behavior={this.state.behavior}> */}
            <TextInput
              style={stylesheet.inputField}
              placeholder='Pincode'
              placeholderTextColor='#b3b9bd'
              keyboardType='number-pad'
              onChangeText={value => this.onPincode(value)}
              value={this.state.pincode}
            />
            {/* </KeyboardAvoidingView> */}
          </View>
        </ScrollView>
        <TouchableOpacity
          style={stylesheet.saveView}
          onPress={() => this.saveAddress()}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
                textAlignVertical: 'center',
              }}>
              Save
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

export default AddEditAddress

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
  },
  backArrowView: {
    flex: 1,
    marginLeft: 20,
    marginTop: 5,
  },
  navBar: {
    height: 40,
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  navTitle: {
    flex: 6,
    justifyContent: 'center',
  },
  title: {
    color: '#2f363f',
    fontSize: 20,
  },
  inputView: {
    height: 60,
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#40535b62',
  },
  inputField: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  currentLoc: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressInput: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  locationIcon: {
    resizeMode: 'center',
  },
  orViewHolder: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  lineStyle: {
    height: 1,
    backgroundColor: '#40535b62',
    marginHorizontal: 10,
    flex: 1,
  },
  saveView: {
    height: 50,
    alignItems: 'center',
    backgroundColor: '#5eaaa8',
  },
})
