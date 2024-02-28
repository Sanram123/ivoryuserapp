import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, KeyboardAvoidingView } from 'react-native';
const Global = require('../Helper/Constants');



class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isValid: false,
            ph_number: ''
        }
    }

    saveMobNum = (ph_number) => {
        // this.props.navigation.navigate('SignupEnterOTP');
        this.setState({ ph_number: ph_number })
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

    callQuickPin = () => {
        if (this.state.ph_number == '') {
            this.showAlert('Alert!!', 'Please provide valid input')
        } else {
            this.props.navigation.navigate('LoginQuickPinScreen', {
                phone: this.state.ph_number
            });
        }
    }

    callSignup = () => {
        this.props.navigation.navigate('SignUpMobile')
    }

    dismissKeyboard = () => {
        Keyboard.dismiss();
    }

    render() {
        return (
            <View style={stylesheet.container}>
                <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
                    <View style={stylesheet.container}>
                        <View style={stylesheet.headerView}>
                            {/* <View style={stylesheet.backArrowView}><Image source={require('../Images/back.png')} /></View> */}
                            {/* <Text style={stylesheet.signuptitle}>Sign In</Text> */}
                            <Text style={stylesheet.titleDesc}>Enter your phone number.</Text>
                            <KeyboardAvoidingView style={stylesheet.inputView} >
                                <TextInput style={stylesheet.inputField} placeholder='Enter mobile number' placeholderTextColor='#b3b9bd' maxLength={10} keyboardType='number-pad' onChangeText={(value) => this.saveMobNum(value)} />
                            </KeyboardAvoidingView>
                        </View>


                        <View style={stylesheet.footer}>
                            <View style={stylesheet.otpView}>
                                <TouchableOpacity onPress={this.callQuickPin}>
                                    <View style={stylesheet.otpButton}>
                                        <Text style={stylesheet.otpTitle}>Continue</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.callSignup}>
                                    <View style={stylesheet.signup}>
                                        <Text>Already have an account? Sign up</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

export default Login;


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
    signup: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});