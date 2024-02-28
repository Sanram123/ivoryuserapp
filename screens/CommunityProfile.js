import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, KeyboardAvoidingView, View, TextInput, Text, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import CommunityProfileSetup from '../Components/CommunityProfileSetup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import * as SecureStore from 'expo-secure-store';
const Global = require('../Helper/Constants');
import api from '../Helper/api';
import  AsyncStorage  from '@react-native-community/async-storage';
import { token } from '../Helper/Constants';


class CommunityProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            societyInfo: [],
            societyCode: '',
            societyName: '',
            societyPincode: '',
            societyCity: '',
            societyState: '',
            societyCountry: '',
            stepsCount: '',
            device_type: props.route.params.device_type,
            user_id: props.route.params.user_id
        }
        console.log(props.route.params.device_type)
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

    onChangeInfo = (val, id) => {
        switch(id){
            case 0:
                this.setState({societyName: val})
                break;
            case 1:
                this.setState({societyCode: val})
                console.log(val)
                this.getSocietyByCode(val)
                break;
            case 2:
                this.setState({societyPincode: val})
                break;
            case 3:
                this.setState({societyCity: val})
                break;
            case 4:
                this.setState({societyState: val})
                break;
            case 5:
                this.setState({societyCountry: val})
                break;
            case 6:
                this.setState({stepsCount: val})
                break;
            default:
                console.log('no choice')
        }
    }

    callCommunityStepBoard = () => {
        this.props.navigation.navigate('CommunityStepBoard')
    }

    societyCode = (val) => {
        console.log(val)
        this.getSocietyByCode(val)
    }

    getSocietyByCode = async (code) => {
        try{
            await AsyncStorage.getItem('auth_token')
        .then(token => {
			console.log(token);
			api.getData('community/society/?societycode='+code, '').then(([statuCode, data]) => {
				console.log(data);
				if (statuCode === 200) {
					this.setState({societyInfo: data, societyCode: data[0]['society_code'], societyName: data[0]['name'], societyPincode: data[0]['pincode']+'' });
				}
			});
		});
        }catch(e){

        }
		
	};

    onSubmit = async () => {
        if (this.state.societyCode == '' || this.state.societyName == '' || this.state.societyPincode == '' || this.state.societyCity == '' || this.state.societyState == '' || this.state.societyCountry == '' || this.state.stepsCount == '') {
            this.showAlert('Alert!!', 'Please fill * fields')
        } else {
            this.setState({indicator: true }, () => {
                try{
                     AsyncStorage.getItem('auth_token')
                    .then(token => {
                        api.postData('community/profile/', { is_setup: true, setup_type: [this.state.device_type], society: this.state.societyInfo[0].id, city: this.state.societyCity, state: this.state.societyState, pincode: this.state.societyPincode, country: this.state.societyCountry, default_steps: this.state.stepsCount, device_user_id: this.state.user_id}, token)
                    .then(([statuCode, data]) => {
                        console.log(data);
                        if (statuCode === 200) {
                            this.props.navigation.navigate('CommunityStepBoard');
                        }else {
                            this.setState({indicator: false})
                            this.showAlert('Sorry!!!', data["detail"][0])
                        }
                    })
                    })
                }catch(e){

                }
                
            })
        }
    }

    render() {
        let indictorOverlay;
            if (this.state.indicator) {
                indictorOverlay = <View style={stylesheet.indictorOverlayStyle}><ActivityIndicator size="large" /></View>;
            }
        return (
            <SafeAreaView style={stylesheet.container}>
                <KeyboardAwareScrollView style={stylesheet.container}>
                    <View>
                        <Text style={[{fontSize: 20}, stylesheet.titleColor]}>Setup your basic profile.</Text>
                    </View>
                    <View style={stylesheet.item}>
                        <Text style={stylesheet.titleColor}>What should be your targeted steps for the day?</Text>
                        <View>
                            <TextInput placeholder='5,000' style={stylesheet.inputStyle} onChangeText={(val) => this.onChangeInfo(val, 6)}/>
                            <View>
                                <Image source={require('../Images/top_arrow.png')} style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }} />
                                <Image source={require('../Images/down_arrow.png')} style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }} />
                            </View>
                        </View>
                        <Text>Tips: 10,000 steps is approximately 8 kms.</Text>
                    </View>
                    
                    <View style={stylesheet.item}>
                        <Text style={stylesheet.titleColor}>Enter Society Code</Text>
                        <View>
                            <TextInput placeholder='Type here code... or scan' style={stylesheet.inputStyle} onChangeText={(val) => this.onChangeInfo(val, 1)}/>
                            <View>
                                <Image source={require('../Images/ivoryspcl.png')} style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }} />
                            </View>
                        </View>
                        <Text>You get this from your society office</Text>
                    </View>
                    <View style={stylesheet.item}>
                        <Text style={stylesheet.titleColor}>Walk along with your friends & neighbors</Text>
                        <View>
                            <TextInput placeholder='Select your Society…' style={stylesheet.inputStyle} value={this.state.societyName} onChangeText={(val) => this.onChangeInfo(val, 0)}/>
                            <View>
                                <Image source={require('../Images/ivoryspcl.png')} style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }} />
                            </View>
                        </View>
                    </View>
                    <View style={stylesheet.item}>
                        <Text style={stylesheet.titleColor}>Your location pin code*</Text>
                        <TextInput placeholder='110096' style={stylesheet.inputStyle} value={this.state.societyPincode} onChangeText={(val) => this.onChangeInfo(val, 2)}/>
                    </View>
                    <View style={stylesheet.item}>
                        <Text style={stylesheet.titleColor}>City*</Text>
                        <TextInput placeholder='Ex. bangalore' style={stylesheet.inputStyle} value={this.state.societyCity} onChangeText={(val) => this.onChangeInfo(val, 3)}/>
                    </View>
                    <View style={stylesheet.item}>
                        <Text style={stylesheet.titleColor}>State*</Text>
                        <TextInput placeholder='Ex. karnataka' style={stylesheet.inputStyle} value={this.state.societyState} onChangeText={(val) => this.onChangeInfo(val, 4)}/>
                    </View>
                    <View style={stylesheet.item}>
                        <Text style={stylesheet.titleColor}>Country*</Text>
                        <TextInput placeholder='Ex. India' style={stylesheet.inputStyle} value={this.state.societyCountry} onChangeText={(val) => this.onChangeInfo(val, 5)}/>
                    </View>
                    <View style={stylesheet.item}>
                        <Text style={[{fontSize: 17, textAlign: 'center'} ,stylesheet.titleColor]}>Or enter building or Block No / Name</Text>
                    </View>
                    <View style={stylesheet.item}>
                        <TextInput placeholder='Aparna Tower 4' style={stylesheet.inputStyle}/>
                    </View>
                    <View style={stylesheet.item}>
                        <Text style={stylesheet.titleColor}>Enter Flat No:</Text>
                        <TextInput placeholder='D 1447' style={stylesheet.inputStyle}/>
                    </View>
                </KeyboardAwareScrollView>
                <TouchableOpacity style={stylesheet.nextTitle} onPress={this.onSubmit}>
                    <Text style={stylesheet.nextTitleProp}>Finish</Text>
                </TouchableOpacity>
                {indictorOverlay}
            </SafeAreaView>
        );
    }
}

export default CommunityProfile;

const stylesheet = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F8F8F8'
    },
    item: {
        marginVertical: 10
    },
    inputStyle: {
        height: 50,
        borderColor: '#CDCFD1',
        borderWidth: 1,
        marginVertical: 5,
        backgroundColor: 'white'
    },

    nextTitle: {
        marginTop: 10,
        backgroundColor: '#5EAAA8',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
        margin: 20
    },
    nextTitleProp: {
        color: 'white',
        fontWeight: 'normal',
        fontSize: 18,
    },
    titleColor: {
        color: '#2f363f',
        
    },
    indictorOverlayStyle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    }
});