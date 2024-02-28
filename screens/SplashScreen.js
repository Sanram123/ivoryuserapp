import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import SyncStorage from 'sync-storage';
const Global = require('../Helper/Constants');
// import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-community/async-storage';


class SplashScreen extends Component{
    constructor(props){
        super(props)
        // this.props.navigation.navigate('Login');

        // this._retrieveData()
    }
 
    componentDidMount(){
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.checkIsLoggedIn()
        })
    }


    checkIsLoggedIn = async () => {
        try{
            await AsyncStorage.getItem('auth_token')
        .then((token) => {
            if(token){
                this.props.navigation.navigate('Dashboard');
            }else{
                this.props.navigation.navigate('Login');
            }
        })
        }catch(e){

        }
    }


    

    // checkMobileNumber = (ph_num) => {
    //     // if (!isNaN(this.state.ph_number) && this.state.ph_number !== '') {
    //         console.log(Global.BASE_URL + 'accounts/check_phonenumber/?phone=' + ph_num)
    //         fetch(Global.BASE_URL + 'accounts/check_phonenumber/?phone=' + ph_num.replace(/['"]+/g, ''), {
    //             method: 'GET'
    //         })
    //             .then((response) => response.json())
    //             .then((json) => {
    //                 console.log(json);
    //                 if (!json["status"]) {
    //                     // this.proceedToOtp()
    //                     this.props.navigation.navigate('Dashboard');

    //                 } else {
    //                     // this.showAlert('Sorry!!', json["detail"])
    //                     this.props.navigation.navigate('Walkthrough_1');

    //                 }
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //             });
    //     // } else {
    //     //     this.showAlert('Alert!!!', 'Please enter valid mobile number 0-9')
    //     // }
    // }

    render(){
        return(
            <View style={stylesheet.container}>
                <Text style={stylesheet.textStyle}>Welcome to Medility</Text>
            </View>
        );
    }
}

export default SplashScreen;

const stylesheet = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 30,
        fontWeight: 'bold'
    }
});