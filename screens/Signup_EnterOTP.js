import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
const Global = require('../Helper/Constants');
// import OtpAutocomplete from 'react-native-otp-autocomplete'
// import RNOtpVerify from 'react-native-otp-verify';


class SignupEnterOTP extends React.Component {
    constructor(props) {
        super(props);
        this.firstTextInput = null
        this.secondTextInput = null
        this.thirdTextInput = null
        this.fourthTextInput = null
        this.state = {
            text: '',
            fTxtLimit: 4,
            otpList: ''
        };
    }

    // componentDidMount() {
    //     RNOtpVerify.getOtp()
    //         .then(p => RNOtpVerify.addListener(this.otpHandler))
    //         .catch(p => console.log(p));
    // }

    // otpHandler = (message: string) => {
    //     console.log('SMS :: ', message)
    // }

    // onChangeText = (value) => {
    //     this.setState({
    //         text: value
    //     })
    // }

    //  getHash = () =>
    //     OtpAutocomplete.getHash()
    //         .then(console.log)
    //         .catch(console.log);

    //  startListeningForOtp = () =>
    //     OtpAutocomplete.getOtp()
    //         .then(p => OtpAutocomplete.addListener(otpHandler))
    //         .catch(p => console.log(p));

    //  otpHandler = (message: string) => {
    //     const otp = /(\d{4})/g.exec(message)[1];
    //     this.setState({ otp });
    //     OtpAutocomplete.removeListener();
    //     Keyboard.dismiss();
    // }

    getEnteredOtp = () => {
        return this.state.firstNum + this.state.secNum + this.state.thirdNum + this.state.fourthNum
    }

    showAlert = (title, msg) => {
        Alert.alert(
            title,
            msg,
            [
                {
                    text: "Ok",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                // { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }



    verifyOtp = () => {
        // this.props.navigation.navigate('SetAccessPin');
        console.log(this.getEnteredOtp())
        if(this.state.firstNum !== '' && this.state.secNum !== '' && this.state.thirdNum !== '' && this.state.fourthNum){
        fetch(Global.BASE_URL + 'userInfo/verifyOtp/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'mob_num': Global.profileInfo["phone"], 'otp': this.getEnteredOtp() })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                if (json["status"]) {
                    // this.showAlert('Alert!!!', json["detail"])
                    this.props.navigation.navigate('SetAccessPin');
                } else {
                    this.showAlert('Sorry!!!', json["detail"])
                }
            })
            .catch((error) => {
                console.error(error);
            });
        }else{
            this.showAlert('Alert!!', 'Please enter otp')
        }
    }

    dismissKeyboard = () => {
        Keyboard.dismiss();
    }

    onChangeFirstText = (val) => {
        console.log(val)
        // if(val.length === 4){
        //     console.log("inside loopeee", val.split(''))
        //     // let otpArr = val.split('')
        //     this.setState({otpList: val})
        //     this.setState({firstNum: val.split('')[0], fTxtLimit: 1})
        //     this.setState({secNum: val.split('')[1]})
        //     this.setState({thirdNum: val.split('')[2]})
        //     this.setState({fourthNum: val.split('')[3]})
        //     this.verifyOtp()
        //     console.log(this.state.otpList)
        // }
        this.setState({firstNum: val}, () => { this.state.firstNum == '' ? this.firstTextInput.focus() : this.secondTextInput.focus() })
        
    }

    onChangeSecText = (val) => {
        this.setState({secNum: val}, () => { this.state.secNum == '' ? this.secondTextInput.focus() : this.thirdTextInput.focus() })
    }

    onChangeThirdText = (val) => {
        this.setState({thirdNum: val}, () => { this.state.thirdNum == '' ? this.thirdTextInput.focus() : this.fourthTextInput.focus() })
    }

    onChangeFourthText = (val) => {
        this.setState({fourthNum: val})
    }

    render() {
        return (
            <View style={stylesheet.container}>
                <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
                    <View style={stylesheet.container}>
                        <View style={stylesheet.headerView}>
                            <View style={stylesheet.backArrowView}><Image source={require('../Images/back.png')} /></View>
                            <Text style={stylesheet.signuptitle}>Sign Up</Text>
                            <Text style={stylesheet.titleDesc}>Enter received verification code to your phone number.</Text>
                            <View style={stylesheet.inputView}>
                                <TextInput style={stylesheet.inputField} keyboardType='number-pad' maxLength={1} onChangeText={(val) => this.onChangeFirstText(val)} value={this.state.firstNum} textContentType="oneTimeCode" ref={(input) => { this.firstTextInput = input }}/>
                                <TextInput style={stylesheet.inputField} keyboardType='number-pad' maxLength={1} onChangeText={(val) => this.onChangeSecText(val)} value={this.state.secNum} textContentType="oneTimeCode" ref={(input) => { this.secondTextInput = input }}/>
                                <TextInput style={stylesheet.inputField} keyboardType='number-pad' maxLength={1} onChangeText={(val) => this.onChangeThirdText(val)} value={this.state.thirdNum} textContentType="oneTimeCode" ref={(input) => { this.thirdTextInput = input }}/>
                                <TextInput style={stylesheet.inputField} keyboardType='number-pad' maxLength={1} onChangeText={(val) => this.onChangeFourthText(val)} value={this.state.fourthNum} textContentType="oneTimeCode" ref={(input) => { this.fourthTextInput = input }}/>
                            </View>
                        </View>


                        <View style={stylesheet.footer}>
                            <View style={stylesheet.otpView}>
                                <View style={stylesheet.resendCodeView}>
                                    <Text>Resend Code?</Text>
                                </View>
                                <TouchableOpacity onPress={this.verifyOtp}>
                                    <View style={stylesheet.otpButton}>
                                        <Text style={stylesheet.otpTitle}>Verify</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={stylesheet.footerTC}>
                                <Text style={stylesheet.tcDesc}>By creating an account, I accept the Ivory</Text>
                                <View>
                                    <Text style={[stylesheet.tcDesc, stylesheet.tcUnderline]}>Terms and Conditions</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

export default SignupEnterOTP;


const stylesheet = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerView: {
        flex: 1,
    },
    footer: {
        flex: 1,
    },
    backArrowView: {
        marginLeft: 20,
        marginTop: 30
    },
    signuptitle: {
        marginTop: 30,
        fontSize: 20,
        color: '#2f363f',
        marginLeft: 20
    },
    titleDesc: {
        fontSize: 16,
        marginVertical: 20,
        color: '#81878c',
        marginLeft: 20
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
        textAlign: 'center'
    },
    otpView: {
        flex: 3,
        justifyContent: 'flex-end',
        marginBottom: 20
    },
    otpButton: {
        marginHorizontal: 30,
        backgroundColor: '#5eaaa8',
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    otpTitle: {
        color: 'white'
    },
    footerTC: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tcDesc: {
        color: '#81878c',
        fontSize: 16
    },
    tcUnderline: {
        textDecorationLine: 'underline'
    },
    resendCodeView: {
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    resndCodeTitle: {
        fontSize: 30,
        color: '#2f363f',
        fontWeight: 'bold'
    }
});