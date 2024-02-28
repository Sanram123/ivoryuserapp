import React from 'react'
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
} from 'react-native'
const Global = require('../Helper/Constants')
// import OtpAutocomplete from 'react-native-otp-autocomplete'
// import RNOtpVerify from 'react-native-otp-verify';

class SetAccessPin extends React.Component {
  constructor (props) {
    super(props)
    this.firstTextInput = null
    this.secondTextInput = null
    this.thirdTextInput = null
    this.fourthTextInput = null
    this.rfirstTextInput = null
    this.rsecondTextInput = null
    this.rthirdTextInput = null
    this.rfourthTextInput = null
    this.state = {
      text: '',
      fTxtLimit: 4,
      otpList: '',
    }
  }

  getEnteredOtp = () => {
    return (
      this.state.firstNum +
      this.state.secNum +
      this.state.thirdNum +
      this.state.fourthNum
    )
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

  verifyOtp = () => {
    // this.props.navigation.navigate('TermsNConditions');
    let originalPin =
      this.state.firstNum +
      this.state.secNum +
      this.state.thirdNum +
      this.state.fourthNum
    let confirmPin =
      this.state.rfirstNum +
      this.state.rsecNum +
      this.state.rthirdNum +
      this.state.rfourthNum
    console.log(originalPin)
    console.log(confirmPin)
    if (
      originalPin !== '' &&
      confirmPin !== '' &&
      originalPin.length == 4 &&
      confirmPin.length == 4
    ) {
      if (originalPin !== confirmPin) {
        this.showAlert('Alert!!', 'Original and confirm pin must be same')
      } else {
        Global.profileInfo['password'] = originalPin
        this.props.navigation.navigate('TermsNConditions')
      }
    } else {
      this.showAlert('Alert!!', 'Please enter valid pin')
    }
  }

  dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  onChangeFirstText = val => {
    console.log(val)
    this.setState({firstNum: val}, () => {
      this.state.firstNum == ''
        ? this.firstTextInput.focus()
        : this.secondTextInput.focus()
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

  onChangeRFirstText = val => {
    console.log(val)
    this.setState({rfirstNum: val}, () => {
        this.state.rfirstNum == ''
          ? this.rfirstTextInput.focus()
          : this.rsecondTextInput.focus()
      })
  }

  onChangeRSecText = val => {
    this.setState({rsecNum: val}, () => {
        this.state.rsecNum == ''
          ? this.rsecondTextInput.focus()
          : this.rthirdTextInput.focus()
      })
  }

  onChangeRThirdText = val => {
    this.setState({rthirdNum: val}, () => {
        this.state.rthirdNum == ''
          ? this.rthirdTextInput.focus()
          : this.rfourthTextInput.focus()
      })
  }

  onChangeRFourthText = val => {
    this.setState({rfourthNum: val})
  }

  render () {
    return (
      <View style={stylesheet.container}>
        <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
          <View style={stylesheet.container}>
            <View style={stylesheet.headerView}>
              <View style={stylesheet.backArrowView}>
                <Image source={require('../Images/back.png')} />
              </View>
              <Text style={stylesheet.signuptitle}>Set quick access pin</Text>
              <Text style={stylesheet.titleDesc}>
                Please enter your 4 digit quick access pin
              </Text>
              <View style={stylesheet.inputView}>
                <TextInput
                  style={stylesheet.inputField}
                  keyboardType='number-pad'
                  maxLength={1}
                  onChangeText={val => this.onChangeFirstText(val)}
                  value={this.state.firstNum}
                  ref={(input) => { this.firstTextInput = input }}
                />
                <TextInput
                  style={stylesheet.inputField}
                  keyboardType='number-pad'
                  maxLength={1}
                  onChangeText={val => this.onChangeSecText(val)}
                  value={this.state.secNum}
                  ref={(input) => { this.secondTextInput = input }}
                />
                <TextInput
                  style={stylesheet.inputField}
                  keyboardType='number-pad'
                  maxLength={1}
                  onChangeText={val => this.onChangeThirdText(val)}
                  value={this.state.thirdNum}
                  ref={(input) => { this.thirdTextInput = input }}
                />
                <TextInput
                  style={stylesheet.inputField}
                  keyboardType='number-pad'
                  maxLength={1}
                  onChangeText={val => this.onChangeFourthText(val)}
                  value={this.state.fourthNum}
                  ref={(input) => { this.fourthTextInput = input }}
                />
              </View>
              <Text style={stylesheet.titleDesc}>
                Re-enter 4 digit quick access pin{' '}
              </Text>
              <View style={stylesheet.inputView}>
                <TextInput
                  style={stylesheet.inputField}
                  keyboardType='number-pad'
                  maxLength={1}
                  onChangeText={val => this.onChangeRFirstText(val)}
                  value={this.state.rfirstNum}
                  ref={(input) => { this.rfirstTextInput = input }}
                />
                <TextInput
                  style={stylesheet.inputField}
                  keyboardType='number-pad'
                  maxLength={1}
                  onChangeText={val => this.onChangeRSecText(val)}
                  value={this.state.rsecNum}
                  ref={(input) => { this.rsecondTextInput = input }}
                />
                <TextInput
                  style={stylesheet.inputField}
                  keyboardType='number-pad'
                  maxLength={1}
                  onChangeText={val => this.onChangeRThirdText(val)}
                  value={this.state.rthirdNum}
                  ref={(input) => { this.rthirdTextInput = input }}
                />
                <TextInput
                  style={stylesheet.inputField}
                  keyboardType='number-pad'
                  maxLength={1}
                  onChangeText={val => this.onChangeRFourthText(val)}
                  value={this.state.rfourthNum}
                  ref={(input) => { this.rfourthTextInput = input }}
                />
              </View>
            </View>

            <View style={stylesheet.footer}>
              <View style={stylesheet.otpView}>
                <TouchableOpacity onPress={this.verifyOtp}>
                  <View style={stylesheet.otpButton}>
                    <Text style={stylesheet.otpTitle}>Continue</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

export default SetAccessPin

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
    // backgroundColor: 'red',
    // position: 'absolute',
    // bottom: 20,
    // width: '50%',
    // justifyContent: 'center'
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
})
