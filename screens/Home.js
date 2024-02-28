import React, {Component, useState} from 'react'
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
  Keyboard,
  BackHandler,
  Alert,
  TouchableOpacity,
} from 'react-native'
import {Searchbar, Button} from 'react-native-paper'
import LabTestView from '../Components/LabTestView'
import PackageListView from '../Components/PackageListView'
import MedicalCentreList from '../Components/MedicalCentreList'
// import axios from 'axios';
import Search from './TestSearch'
// import AddressCurLoc from '../Components/AddressCurLoc';
import DialogInput from 'react-native-dialog-input'
const Global = require('../Helper/Constants')
import api from '../Helper/api'
// import * as SecureStore from 'expo-secure-store';
import store from '../reduxhelper/store'
import * as actions from '../reduxhelper/actions'
import AsyncStorage from '@react-native-community/async-storage'
import {asyncPkceChallenge} from 'react-native-pkce-challenge'
import {profileInfo} from '../Helper/Constants'

class Home extends React.Component {
  // const[searchQuery, setSearchQuery] = useState('');

  constructor (props) {
    super(props)
    this.state = {
      searchQuery: '',
      medicalCenters: [],
      labtestinfo: [],
      updateProfile: false,
      profileInfo: {},
    }

    Global.editAppntId = ''
  }

  componentDidMount () {
    // this.setState({medicalCenters: this.getLabTest()})
    // this.getLabTest()
    console.log('inside did mount')
    this.getProfileInfo()
    // this.getCodeChallenge()
    this.setState({showInputAlert: false})
  }

  showAlert = (title, msg) => {
    Alert.alert(title, msg, [
      {
        text: 'Ok',
        onPress: () => this.onSignout(),
      },
      // { text: "OK", onPress: () => console.log("OK Pressed") }
    ])
  }

  onSignout = async () => {
    console.log('clicked sign out')
    try {
      await AsyncStorage.removeItem('auth_token').then(() => {
        this.props.navigation.replace('Login')
      })
    } catch (e) {
      console.log('error in deleting session')
    }
  }

  getCodeChallenge = async () => {
    try {
      await asyncPkceChallenge().then(challenge => {
        console.log(challenge)
      })
    } catch (e) {}
  }

  getProfileInfo = async () => {
    try {
      // await AsyncStorage.getItem('auth_token').then(token => {
      // console.log(token)
      api
        .postData('userInfo/getUserDetails/', {
          phone_no: Global.profileInfo['phone'],
        })
        .then(([statuCode, result]) => {
          console.log(statuCode)
          console.log(result)
          if (statuCode === 200) {
            if (result.data.length > 0) {
              store.dispatch(actions.profileSaved(result.data[0]))
              Global.profileInfo = result.data[0]
              this.setState({profileInfo: result.data[0]})
            }
          } else if (statuCode == 401) {
            this.showAlert('Session Expired!!', 'Please login again')
          }
        })
        .catch(err => {
          console.log(err)
        })
      // })
    } catch (e) {}
  }

  onChangeSearch = () => {
    // this.setState({ searchQuery: query });
    Global.tests = []
    // this.props.navigation.navigate('Search', {
    //   type: 'labtest',
    //   searchStr: ''
    // });
    this.props.navigation.navigate('ChooseAddress')
  }

  Item = ({title, color}) => (
    <View style={[stylesheet.item, {backgroundColor: color}]}>
      <View style={{borderColor: 'white', borderWidth: 2, padding: 10}}>
        <Text style={stylesheet.title}>{title}</Text>
      </View>
    </View>
  )

  renderItem = ({item}) => <Item title={item.title} color={item.color} />

  callSearch = (searchType, searchRes) => {
    Global.tests = []
    this.props.navigation.navigate('ChooseAddress')
  }

  onMenuClick = id => {
    console.log(id)
    if (id == 0) {
      Global.tests = []
      // this.setState({ isDialogVisible: true })

      this.props.navigation.navigate('ChooseAddress')
    }
  }

  sendInput = pincode => {
    console.log(pincode)
    this.setState({isDialogVisible: false})
  }

  showDialog = () => {
    this.setState({isDialogVisible: false})
  }

  render () {
    let showInputAlert
    if (this.state.isDialogVisible) {
      showInputAlert = (
        <DialogInput
          isDialogVisible={this.state.isDialogVisible}
          title={'Alert!!'}
          message={
            'Booking for location ' +
            Global.profileInfo.searchPinCode +
            '.To check other location, please enter pincode to check service availability'
          }
          hintInput={'pincode'}
          submitInput={inputText => {
            this.sendInput(inputText)
          }}
          closeDialog={() => {
            this.showDialog(false)
          }}
          textInputProps={{
            autoCorrect: true,
            keyboardType: 'number-pad',
            maxLength: 6,
          }}></DialogInput>
      )
    }

    return (
      <ScrollView style={stylesheet.container}>
        <View style={stylesheet.headerView}>
          <View style={stylesheet.locationView}>
            <View style={stylesheet.locationView}>
              {/* <Text style={[stylesheet.locationTitle, stylesheet.fontStyles, { marginLeft: 30 }]}>Home</Text>
              <Text style={[stylesheet.locationTitle, stylesheet.fontStyles, { marginHorizontal: 5 }]}>Bangalore</Text> */}
              {/* <View style={stylesheet.addressCurLoc}><AddressCurLoc /></View> */}
              <Image
                source={require('../Images/edit_loc.png')}
                style={{resizeMode: 'center'}}
              />
            </View>
            <Image
              source={require('../Images/setting_icon.png')}
              style={[
                stylesheet.locationTitle,
                {marginRight: 20, resizeMode: 'center'},
              ]}
            />
          </View>
          <View style={stylesheet.horizontalLine} />
          <View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'stretch',
                justifyContent: 'space-between',
              }}>
              <View>
                <View style={stylesheet.nameView}>
                  <Text style={[stylesheet.nameTitle, stylesheet.fontStyles]}>
                    Hello
                  </Text>
                  <Text
                    style={[
                      stylesheet.nameStyle,
                      stylesheet.fontStyles,
                      {color: '#5eaaa8'},
                    ]}>
                    {this.state.profileInfo.name},
                  </Text>
                </View>
                <View>
                  <Text style={[stylesheet.nameTitle, stylesheet.fontStyles]}>
                    How can we help you?
                  </Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: 'transparent',
                  width: '40%',
                  marginTop: 20,
                  height: 120,
                }}>
                <Image
                  source={require('../Images/profile_side_icon.png')}
                  style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: 'stretch',
                  }}
                />
              </View>
            </View>
            <TouchableOpacity
              style={stylesheet.searchView}
              onPress={this.onChangeSearch}>
              <Searchbar
                placeholder='Eg: Blood Search'
                // onTouchStart={this.onChangeSearch}
                value={this.state.searchQuery}
                editable={false}
              />
            </TouchableOpacity>
          </View>
        </View>

        <LabTestView title='see all' onClick={this.onMenuClick} />

        <PackageListView title='see all' onClick={this.callSearch} />

        <View style={stylesheet.ivoryOfferStyle}>
          <View style={stylesheet.ivorySub1}>
            <Text style={stylesheet.ivorytitle}>Ivory Specials</Text>
            <Text style={stylesheet.ivoryDesc}>
              Get discounted health packages curated by trusted medical experts
              and centres.
            </Text>
            <View style={stylesheet.ivoryPkg}>
              <Text style={stylesheet.ivoryPkgTitle}>View packages</Text>
            </View>
          </View>
          <View style={stylesheet.ivorySub2}>
            <Image
              source={require('../Images/ivoryspcl.png')}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>

        <MedicalCentreList title='see all' />
        {showInputAlert}
      </ScrollView>
    )
  }
}

export default Home

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  headerView: {
    marginTop: 30,
    backgroundColor: '#f8f8f8',
  },
  addressCurLoc: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationTitle: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalLine: {
    width: '100%',
    height: 0.4,
    backgroundColor: '#979797',
  },
  secHeader: {},
  nameView: {
    flexDirection: 'row',
    width: '100%',
    paddingBottom: 10,
    paddingTop: 30,
  },
  nameTitle: {
    marginLeft: 30,
    paddingTop: 5,
  },
  nameStyle: {
    paddingLeft: 10,
    paddingTop: 5,
    color: 'gray',
  },
  searchView: {
    marginHorizontal: 30,
    marginBottom: 30,
  },
  fontStyles: {
    fontWeight: 'bold',
    fontSize: 18,
    fontStyle: 'normal',
    color: '#2f363f',
  },
  ivoryOfferStyle: {
    marginHorizontal: 10,
    marginVertical: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  ivorySub1: {
    flex: 4,
  },
  ivorySub2: {
    flex: 2,
  },
  ivorytitle: {
    marginVertical: 5,
    marginHorizontal: 10,
    fontSize: 15,
    color: '#2f363f',
  },
  ivoryDesc: {
    marginVertical: 5,
    marginHorizontal: 10,
    fontSize: 13,
    color: '#535b62',
  },
  ivoryPkg: {
    marginLeft: 10,
    marginVertical: 10,
    backgroundColor: '#5eaaa8',
    paddingHorizontal: 15,
    paddingVertical: 13,
    alignSelf: 'flex-start',
    borderRadius: 5,
  },
  ivoryPkgTitle: {
    fontSize: 16,
    alignSelf: 'flex-start',
    color: 'white',
  },
})
