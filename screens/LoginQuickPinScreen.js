import React, {useRef} from 'react'
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
} from 'react-native'
const Global = require('../Helper/Constants')
import api from '../Helper/api'
// import * as SecureStore from 'expo-secure-store';
// import OtpAutocomplete from 'react-native-otp-autocomplete'
// import RNOtpVerify from 'react-native-otp-verify';
import AsyncStorage from '@react-native-community/async-storage'

class LoginQuickPinScreen extends React.Component {
  constructor (props) {
    super(props)
    this.firstTextInput = null
    this.secondTextInput = null
    this.thirdTextInput = null
    this.fourthTextInput = null
    this.state = {
      text: '',
      fTxtLimit: 4,
      otpList: '',
      firstNum: '',
      secNum: '',
      thirdNum: '',
      fourthNum: '',
      phone: props.route.params.phone,
      indicator: false,
    }
  }

  showAlert = (title, msg) => {
    Alert.alert(title, msg, [
      {
        text: 'Ok',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      // { text: "OK", onPress: () => console.log("OK Pressed") }
    ])
  }

  saveAuthToken = async (key, value) => {
    try {
      console.log(key)
      console.log(value)
      await AsyncStorage.setItem(key, value)
      console.log('inside save auth')
      this.props.navigation.navigate('Dashboard')
      // .then(() => { this.props.navigation.navigate('Dashboard'); })
    } catch (e) {
      console.log(e)
    }
  }

  onLogin = async () => {
    if (
      this.state.firstNum == '' ||
      this.state.secNum == '' ||
      this.state.thirdNum == '' ||
      this.state.fourthNum == ''
    ) {
      this.showAlert('Alert!!', 'Please enter valid pin')
    } else {
      this.setState(
        {
          passcode:
            this.state.firstNum +
            this.state.secNum +
            this.state.thirdNum +
            this.state.fourthNum,
          indicator: true,
        },
        () => {
          api
            .postData('userInfo/login/', {
              phone: this.state.phone,
              password: this.state.passcode,
            })
            .then(([statusCode, result]) => {
              console.log(result)
              if (statusCode === 200) {
                try {
                  // this.saveAuthToken('auth_token', "Token "+data['token']);
                  Global.profileInfo["phone"] = this.state.phone;
                  this.props.navigation.navigate('Dashboard')
                } catch (e) {
                  console.log(e)
                }
              } else {
                this.setState({indicator: false})
                // this.showAlert('Sorry!!!', data['detail'][0])
              }
            })
            .catch(err => {
              console.log(err)
            })
        },
      )
    }
  }

  // onLogin = () => {
  //     console.log('login')

  //     if (this.state.firstNum == '' || this.state.secNum == '' || this.state.thirdNum == '' || this.state.fourthNum == '') {
  //         this.showAlert('Alert!!', 'Please enter valid pin')
  //     } else {
  //         this.setState({ passcode: this.state.firstNum + this.state.secNum + this.state.thirdNum + this.state.fourthNum, indicator: true }, () => {
  //             fetch(Global.BASE_URL + 'accounts/login/', {
  //                 method: 'POST',
  //                 headers: {
  //                     Accept: 'application/json',
  //                     'Content-Type': 'application/json'
  //                 },
  //                 body: JSON.stringify({ 'phone': this.state.phone, 'password': this.state.passcode })
  //             })
  //                 .then(response => {
  //                     const statusCode = response.status;
  //                     const data = response.json();
  //                     return Promise.all([statusCode, data]);
  //                 })
  //                 .then(([res, data]) => {
  //                     console.log(data);
  //                     this.setState({ indicator: false })
  //                     if (res == 200) {
  //                         // this.showAlert('Alert!!!', json["detail"])
  //                         Global.profileInfo['phone'] = this.state.phone
  //                         Global.token = "Token " + data['token']
  //                         // this.props.navigation.navigate('Dashboard');
  //                         this.saveAuthToken('auth_token', "Token " + data['token']);
  //                     } else {
  //                         this.showAlert('Sorry!!!', data["detail"][0])
  //                     }
  //                 })
  //                 .catch((error) => {
  //                     console.error(error);
  //                 });
  //         })
  //     }
  // }

  dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  onChangeFirstText = val => {
    console.log(val)
    this.setState({firstNum: val}, () => {
      this.state.firstNum == ''
        ? this.firstTextInput.focus()
        : this.secTextInput.focus()
    })
  }

  onChangeSecText = val => {
    this.setState({secNum: val}, () => {
      this.state.secNum == ''
        ? this.secTextInput.focus()
        : this.thirdTextInput.focus()
    })
  }

  onChangeThirdText = val => {
    this.setState({thirdNum: val}, () => {
      this.state.thirdNum == ''
        ? this.thirdTextInput.focus()
        : this.fourthTextInput.focus()
    })
  }

  onChangeFourthText = val => {
    this.setState({fourthNum: val})
  }

  render () {
    let indictorOverlay
    if (this.state.indicator) {
      indictorOverlay = (
        <View style={stylesheet.indictorOverlayStyle}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
    return (
      <View style={stylesheet.container}>
        <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
          <View style={stylesheet.container}>
            <View style={stylesheet.headerView}>
              {/* <View style={stylesheet.backArrowView}><Image source={require('../Images/back.png')} /></View> */}
              <Text style={stylesheet.signuptitle}>Sign In</Text>
              <Text style={stylesheet.titleDesc}>
                Enter your 4 digit quick access pin.
              </Text>
              <View style={stylesheet.inputView}>
                <TextInput
                  style={stylesheet.inputField}
                  keyboardType='number-pad'
                  maxLength={1}
                  onChangeText={val => this.onChangeFirstText(val)}
                  value={this.state.firstNum}
                  textContentType='oneTimeCode'
                  ref={input => {
                    this.firstTextInput = input
                  }}
                />
                <TextInput
                  style={stylesheet.inputField}
                  keyboardType='number-pad'
                  maxLength={1}
                  onChangeText={val => this.onChangeSecText(val)}
                  value={this.state.secNum}
                  textContentType='oneTimeCode'
                  ref={input => {
                    this.secTextInput = input
                  }}
                />
                <TextInput
                  style={stylesheet.inputField}
                  keyboardType='number-pad'
                  maxLength={1}
                  onChangeText={val => this.onChangeThirdText(val)}
                  value={this.state.thirdNum}
                  textContentType='oneTimeCode'
                  ref={input => {
                    this.thirdTextInput = input
                  }}
                />
                <TextInput
                  style={stylesheet.inputField}
                  keyboardType='number-pad'
                  maxLength={1}
                  onChangeText={val => this.onChangeFourthText(val)}
                  value={this.state.fourthNum}
                  textContentType='oneTimeCode'
                  ref={input => {
                    this.fourthTextInput = input
                  }}
                />
              </View>
            </View>

            <View style={stylesheet.footer}>
              <View style={stylesheet.otpView}>
                <TouchableOpacity onPress={this.onLogin}>
                  <View style={stylesheet.otpButton}>
                    <Text style={stylesheet.otpTitle}>Login</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={stylesheet.footerTC}>
                <Text style={stylesheet.tcDesc}>Forgot 4 digit pin</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {indictorOverlay}
      </View>
    )
  }
}

export default LoginQuickPinScreen

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerView: {
    flex: 1,
  },
  footer: {
    flex: 1,
  },
  backArrowView: {
    marginLeft: 20,
    marginTop: 30,
  },
  signuptitle: {
    marginTop: 30,
    fontSize: 20,
    color: '#2f363f',
    marginLeft: 20,
  },
  titleDesc: {
    fontSize: 16,
    marginVertical: 20,
    color: '#81878c',
    marginLeft: 20,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 60,
    marginHorizontal: 20,
    marginTop: 10,
  },
  inputField: {
    height: '100%',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff1f4',
    textAlign: 'center',
  },
  otpView: {
    flex: 3,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  otpButton: {
    marginHorizontal: 30,
    backgroundColor: '#5eaaa8',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  otpTitle: {
    color: 'white',
  },
  footerTC: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tcDesc: {
    color: '#81878c',
    fontSize: 16,
  },
  tcUnderline: {
    textDecorationLine: 'underline',
  },
  resendCodeView: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resndCodeTitle: {
    fontSize: 30,
    color: '#2f363f',
    fontWeight: 'bold',
  },
  indictorOverlayStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
})
