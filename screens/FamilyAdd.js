import React from 'react'
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Picker,
  Alert,
} from 'react-native'
// import DateTimePicker from '@react-native-community/datetimepicker';
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import DatePicker from 'react-native-datepicker'
import DropDownPicker from 'react-native-dropdown-picker'
const Global = require('../Helper/Constants')
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker'

class FamilyAdd extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      //     date: new Date(1598051730000),
      // mode: 'date',
      show: false,
      date: '',
      name: '',
      phone: '',
      gender: '',
    }
  }

  callProfileCompleteGender = () => {
    Global.familyInfo['name'] = this.state.name
    Global.familyInfo['phone'] = this.state.phone
    Global.familyInfo['dob'] = this.state.date
    this.checkMobileNumber()
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
    if (!isNaN(this.state.phone) && this.state.phone !== '') {
      fetch(
        Global.BASE_URL +
          'accounts/check_phonenumber/?phone=' +
          this.state.phone,
        {
          method: 'GET',
        },
      )
        .then(response => response.json())
        .then(json => {
          console.log(json)
          if (json['status']) {
            this.proceedToOtp()
          } else {
            this.showAlert('Sorry!!', json['detail'])
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
    Global.familyInfo['phone'] = this.state.phone
    // this.props.navigation.navigate('SignupEnterOTP');

    fetch(Global.BASE_URL + 'accounts/validate_phone/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({phone: this.state.phone}),
    })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if (json['status']) {
          this.showAlert('Alert!!!', json['detail'])
          this.props.navigation.navigate('FamilyGender')
        } else {
          this.showAlert('Sorry!!!', json['detail'])
        }
      })
      .catch(error => {
        console.error(error)
      })

    console.log('clicked pay')
  }

  showCalendar = () => {
    // this.showMode('date');
    this.setState({show: true})
    console.log('calendar')
  }

  selectedGender = gender => {
    console.log(gender)
    this.setState({gender: gender})
  }

  onChange = (event, selectedDate) => {
    console.log(selectedDate)
    this.setState({show: false, date: selectedDate + ''})
  }

  render () {
    let calendar
    if (this.state.show) {
      // <calendar = <Calendar onDayPress={(day) => this.onDateSelect(day)}/>
      calendar = DateTimePickerAndroid.open({
        value: new Date(),
        onChange: this.onChange,
        mode: 'date',
        is24Hour: true,
      })
    }

    return (
      <View style={stylesheet.container}>
        <View style={stylesheet.headerView}>
          {/* <View style={stylesheet.backArrowView}><Image source={require('../Images/back.png')} /></View> */}
          <Text style={stylesheet.signuptitle}>Complete your profile</Text>
          <View style={stylesheet.inputView}>
            <TextInput
              style={stylesheet.inputField}
              placeholder='Name'
              placeholderTextColor='#b3b9bd'
              onChangeText={val => this.setState({name: val})}
            />
          </View>
          <View style={stylesheet.inputView}>
            <TextInput
              style={stylesheet.inputField}
              placeholder='Mobile Number'
              placeholderTextColor='#b3b9bd'
              onChangeText={val => this.setState({phone: val})}
            />
          </View>
          <View style={[stylesheet.inputView]}>
            <TouchableWithoutFeedback onPress={this.showCalendar}>
              <View style={[{flex: 1}, stylesheet.dobView]}>
                <View style={stylesheet.dobInput}>
                  <TextInput
                    style={stylesheet.inputField}
                    placeholder='Date of birth'
                    placeholderTextColor='#b3b9bd'
                    editable={false}
                    value={this.state.date}
                  />
                </View>
                <View style={stylesheet.dobImg}>
                  <Image
                    source={require('../Images/calendar.png')}
                    style={{resizeMode: 'center'}}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>

          {calendar}
        </View>

        <View style={stylesheet.footer}>
          <View style={stylesheet.continueView}>
            <TouchableOpacity onPress={this.callProfileCompleteGender}>
              <View style={stylesheet.continueButton}>
                <Text style={stylesheet.continueTitle}>Continue</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

export default FamilyAdd

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerView: {
    flex: 6,
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
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#40535b62',
  },
  inputField: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  continueView: {
    flex: 3,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  continueButton: {
    marginHorizontal: 30,
    backgroundColor: '#5eaaa8',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  continueTitle: {
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
  dobImg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dobInput: {
    flex: 6,
  },
  dobView: {
    flexDirection: 'row',
  },
  inputView1: {
    // height: 100,
    // marginHorizontal: 0,
    width: '100%',
    flex: 1,
    margin: 0,
    borderWidth: 1,
    borderColor: '#40535b62',
    backgroundColor: 'green',
  },
})
