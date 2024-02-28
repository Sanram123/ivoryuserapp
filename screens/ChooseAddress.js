import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native'
const Global = require('../Helper/Constants')
import DialogInput from 'react-native-dialog-input'
import api from '../Helper/api'
// import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-community/async-storage'
import store from '../reduxhelper/store'

class ChooseAddress extends Component {
  constructor (props) {
    super(props)
    this.state = {
      addressList: [],
      address: {},
    }
  }

  selectedAddress = item => {
    console.log(item.pincode)
    Global.testsInfo.address = item.id
    this.setState({address: item, refreshList: true})
  }

  onClickContinue = () => {
    console.log(this.state.address)
    Global.tests = {
      ...Global.tests,
      address: this.state.address.id,
      addressInfo: this.state.address,
    }
    // this.props.navigation.navigate('SlotSelectScreen', {
    //     item: this.state.address,
    // });
    Global.chosenPincode = this.state.address.pincode
    this.props.navigation.navigate('Search')
  }

  componentDidMount () {
    // this.getAddressList()

    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getAddressList()
    })
  }

  showAlert = (title, msg, id) => {
    Alert.alert(title, msg, [
      {
        text: 'Ok',
        onPress: () => this.removeAddress(id),
        style: 'cancel',
      },
      // { text: "OK", onPress: () => console.log("OK Pressed") }
    ])
  }

  // sendInput = (pincode) => {
  //     console.log(pincode)
  //     this.setState({ isDialogVisible: false })
  // }

  // showDialog = () => {
  //     this.setState({ isDialogVisible: false })
  // }

  renderItem = ({item}) => (
    <View style={stylesheet.addressItem}>
      <View style={stylesheet.header}>
        <TouchableOpacity onPress={() => this.selectedAddress(item)}>
          <View style={stylesheet.img}>
            {this.state.address.title == item.title ? (
              <Image source={require('../Images/checked.png')} />
            ) : (
              <Image source={require('../Images/unchecked.png')} />
            )}
          </View>
        </TouchableOpacity>
        <View>
          <Text>{item.title}</Text>
          <Text>
            {item.address}, {item.city}, {item.pincode}
          </Text>
        </View>
      </View>
      <View style={stylesheet.footer}>
        <View style={stylesheet.removeView}>
          <TouchableOpacity onPress={() => this.deleteAddress(item)}>
            <Text style={{color: '#5eaaa8'}}>Remove</Text>
          </TouchableOpacity>
        </View>

        <View style={stylesheet.editView}>
          <TouchableOpacity onPress={() => this.editAddress(item)}>
            <Text style={{color: '#81878c'}}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  getAddressList = async () => {
    try {
      // await AsyncStorage.getItem('auth_token').then(token => {
      // console.log(token)
      const storeInfo = store.getState();
      console.log(storeInfo);
      api
        .postData('userInfo/getUserAddress/', {
          id: storeInfo.profileInfo.id,
        })
        .then(([statuCode, data]) => {
          console.log(data)
          if (statuCode === 200) {
            this.setState({addressList: data['address_list']})
          }
        })
      // })
    } catch (e) {}
  }

  // getAddressList = () => {
  //     console.log(Global.BASE_URL + 'accounts/address/?username=' + Global.profileInfo.phone)
  //     fetch(Global.BASE_URL + 'accounts/address/?username=' + Global.profileInfo.phone, {
  //         method: 'GET',
  //         headers: {
  //             Accept: 'application/json',
  //             'Content-Type': 'application/json',
  //             'Authorization': Global.token
  //         }
  //     })
  //         .then((response) => response.json())
  //         .then((json) => {
  //             console.log(json);
  //             this.setState({ addressList: json['address'] })
  //         })
  //         .catch((error) => {
  //             console.error(error);
  //         });
  // }

  removeAddress = async id => {
    console.log(
      Global.BASE_URL +
        'accounts/address/?username=' +
        Global.profileInfo.phone +
        '&id=' +
        id,
    )
    try {
      await AsyncStorage.getItem('auth_token').then(token => {
        fetch(Global.BASE_URL + 'accounts/address/?&id=' + id, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token,
          },
        })
          .then(response => response.json())
          .then(json => {
            console.log(json)
            this.setState({addressList: json['address']}, () =>
              this.getAddressList(),
            )
          })
          .catch(error => {
            console.error(error)
          })
      })
    } catch (e) {
      console.log(e)
    }
  }

  editAddress = item => {
    console.log(item.id)
    Global.editLoc = [
      item.address1,
      item.area,
      item.city,
      item.pincode.toString(),
      item.title,
    ]
    console.log(Global.currentLoc)
    this.props.navigation.navigate('AddEditAddress', {
      address_id: item.id,
    })
  }

  deleteAddress = item => {
    console.log(item.id)
    this.showAlert('Alert!!', 'Do you want to delete?', item.id)
  }

  addEditAddress = () => {
    this.props.navigation.navigate('AddEditAddress', {
      address_id: '',
    })
  }

  render () {
    // let showInputAlert;
    // if (this.state.isDialogVisible) {
    //     showInputAlert = <DialogInput isDialogVisible={this.state.isDialogVisible}
    //         title={"Alert!!"}
    //         message={"Booking for location " + Global.profileInfo.searchPinCode + ".To check other location, please enter pincode to check service availability"}
    //         hintInput={"pincode"}
    //         submitInput={(inputText) => { this.sendInput(inputText) }}
    //         closeDialog={() => { this.showDialog(false) }}
    //         textInputProps={{ autoCorrect: true, keyboardType: 'number-pad', maxLength: 6 }}

    //     >

    //     </DialogInput>
    // }

    return (
      <View style={stylesheet.container}>
        {/* <View style={stylesheet.navBar}>
                    <View style={stylesheet.backArrowView}><Image source={require('../Images/back.png')} /></View>
                    <View style={stylesheet.navTitle}>
                        <Text style={stylesheet.title}>Choose Address</Text>
                    </View>
                </View> */}
        <View style={stylesheet.addAddressTitleHolder}>
          <Text
            style={[stylesheet.titleColor, {fontWeight: 'bold', fontSize: 16}]}>
            Saved Addresses
          </Text>
          <View>
            <TouchableOpacity onPress={this.addEditAddress}>
              <Image
                source={require('../Images/add.png')}
                style={stylesheet.addIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={stylesheet.addressList}>
          <FlatList
            data={this.state.addressList}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
          />
        </View>
        <TouchableOpacity onPress={() => this.onClickContinue()}>
          <View style={stylesheet.continueView}>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: 'white'}}>
              Continue
            </Text>
          </View>
        </TouchableOpacity>
        {/* {showInputAlert} */}
      </View>
    )
  }
}

export default ChooseAddress

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
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
  addAddressTitleHolder: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  addressInput: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#40535b62',
    padding: 15,
  },
  currentLoc: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addIcon: {
    resizeMode: 'center',
  },
  titleColor: {
    color: '#b3b9bd',
  },
  addressItem: {
    marginBottom: 2,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 2,
  },
  removeView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
    borderRightWidth: 2,
    borderRightColor: '#f8f8f8',
  },
  editView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  img: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  savedaddrs: {
    paddingHorizontal: 20,
  },
  continueView: {
    marginBottom: 0,
    backgroundColor: '#5eaaa8',
    paddingVertical: 20,
    alignItems: 'center',
  },
  addressList: {
    flex: 1,
  },
})
