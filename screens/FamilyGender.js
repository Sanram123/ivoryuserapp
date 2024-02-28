import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
const Global = require('../Helper/Constants');


class FamilyGender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            male: false,
            female: false,
            others: false
        }
    }

    callFamilyOtp = () => {
        this.props.navigation.navigate('FamilyOtp');
        console.log(Global.familyInfo)
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


    

    selectedGender = (gender) => {
        console.log(gender)
        Global.familyInfo["gender"] = gender
        switch (gender) {
            case "0":
                this.updateGenderState(true, false, false);
                break;
            case "1":
                this.updateGenderState(false, true, false);
                break;
            case "2":
                this.updateGenderState(false, false, true);
                break;
            default:
                console.log('no option')
        }
    }

    updateGenderState = (male, female, others) => {
        this.setState({ male: male, female: female, others: others })
    }

    render() {
        let maleImg, femaleImg, otherImg;
        maleImg = this.state.male ? require('../Images/radioCheck.png') : require('../Images/radioUncheck.png');
        femaleImg = this.state.female ? require('../Images/radioCheck.png') : require('../Images/radioUncheck.png');
        otherImg = this.state.others ? require('../Images/radioCheck.png') : require('../Images/radioUncheck.png');

        return (
            <View style={stylesheet.container}>
                <View style={stylesheet.headerView}>
                    <View style={stylesheet.backArrowView}><Image source={require('../Images/back.png')} /></View>
                    <Text style={stylesheet.signuptitle}>Complete your profile</Text>
                    <Text style={stylesheet.signuptitle}>Select Gender</Text>
                    <TouchableWithoutFeedback onPress={this.selectedGender.bind(this, "0")}>
                        <View style={stylesheet.inputView}>
                            <View style={stylesheet.selectImgView}>
                                <Image source={maleImg} style={stylesheet.selectImg} />
                            </View>
                            <View style={stylesheet.genderTextView}>
                                <Text style={stylesheet.genderText}>Male</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.selectedGender.bind(this, "1")}>
                        <View style={stylesheet.inputView}>
                            <View style={stylesheet.selectImgView}>
                                <Image source={femaleImg} style={stylesheet.selectImg} />
                            </View>
                            <View style={stylesheet.genderTextView}>
                                <Text style={stylesheet.genderText}>Female</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.selectedGender.bind(this, "2")}>
                        <View style={stylesheet.inputView}>
                            <View style={stylesheet.selectImgView}>
                                <Image source={otherImg} style={stylesheet.selectImg} />
                            </View>
                            <View style={stylesheet.genderTextView}>
                                <Text style={stylesheet.genderText}>Other</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>


                <View style={stylesheet.footer}>
                    <View style={stylesheet.continueView}>
                        <TouchableOpacity onPress={this.callFamilyOtp}>
                            <View style={stylesheet.continueButton}>
                                <Text style={stylesheet.continueTitle}>Continue</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default FamilyGender;


const stylesheet = StyleSheet.create({
    container: {
        flex: 1
    },
    headerView: {
        flex: 4,
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
        height: 60,
        marginHorizontal: 20,
        marginTop: 20,
    },
    continueView: {
        flex: 3,
        justifyContent: 'flex-end',
        marginBottom: 20
    },
    continueButton: {
        marginHorizontal: 30,
        backgroundColor: '#5eaaa8',
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    continueTitle: {
        color: 'white'
    },
    footerTC: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tcUnderline: {
        textDecorationLine: 'underline'
    },
    selectImgView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    genderTextView: {
        flex: 6,
        justifyContent: 'center',
    },
    genderText: {
        marginLeft: 20,
        color: '#81878c',
        fontSize: 18
    },
    selectImg: {
        resizeMode: 'contain'
    }
});