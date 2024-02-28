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
import api from '../Helper/api'
const Global = require('../Helper/Constants')

class SignupMobile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isValid: false,
      ph_number: '',
    }
  }

  callSignupOTP = ph_number => {
    // this.props.navigation.navigate('SignupEnterOTP');
    this.setState({ph_number: ph_number})
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

  checkMobileNumber = () => {
    if (
      !isNaN(this.state.ph_number) &&
      this.state.ph_number !== '' &&
      this.state.ph_number.length == 10
    ) {
        console.log(this.state.ph_number)
        api.getData('userInfo/checkMobExist/'+this.state.ph_number)
        .then(([statusCode, res]) => {
          console.log(res)
          if (res['status'] == 'success') {
            // this.proceedToOtp()
            Global.profileInfo["phone"] = this.state.ph_number;
            this.props.navigation.navigate('SignupEnterOTP')
          } else {
            this.showAlert('Sorry!!', res['msg'])
          }
        })
        .catch(error => {
          console.error(error)
        })
    } else {
      this.showAlert('Alert!!!', 'Please enter valid mobile number 0-9')
    }
  }

  proceedToOtp = () => {
    Global.profileInfo['phone'] = this.state.ph_number
    // this.props.navigation.navigate('SignupEnterOTP');

    fetch(Global.BASE_URL + 'accounts/validate_phone/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({phone: this.state.ph_number}),
    })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if (json['status']) {
          this.showAlert('Alert!!!', json['detail'])
          this.props.navigation.navigate('SignupEnterOTP', {
            otp_session: json['otp_session'],
          })
        } else {
          this.showAlert('Sorry!!!', json['detail'])
          this.props.navigation.goBack()
        }
      })
      .catch(error => {
        console.error(error)
      })

    console.log('clicked pay')
  }

  dismissKeyboard = () => {
    Keyboard.dismiss()
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
              <Text style={stylesheet.signuptitle}>Sign Up</Text>
              <Text style={stylesheet.titleDesc}>
                Enter your phone number to receive verification code.
              </Text>
              <View style={stylesheet.inputView}>
                <TextInput
                  style={stylesheet.inputField}
                  placeholder='Enter 10 digit number'
                  placeholderTextColor='#b3b9bd'
                  maxLength={10}
                  keyboardType='number-pad'
                  onChangeText={value => this.callSignupOTP(value)}
                />
              </View>
            </View>

            <View style={stylesheet.footer}>
              <View style={stylesheet.otpView}>
                <TouchableOpacity onPress={this.checkMobileNumber}>
                  <View style={stylesheet.otpButton}>
                    <Text style={stylesheet.otpTitle}>Send OTP</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={stylesheet.footerTC}>
                <Text style={stylesheet.tcDesc}>
                  By creating an account, I accept the Ivory
                </Text>
                <View>
                  <Text style={[stylesheet.tcDesc, stylesheet.tcUnderline]}>
                    Terms and Conditions
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

export default SignupMobile

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
    height: 60,
    marginHorizontal: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#40535b62',
  },
  inputField: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
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
})
