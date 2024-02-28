import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Alert } from 'react-native';
import CartProduct from './CartProduct';
import store from '../reduxhelper/store';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Global = require('../Helper/Constants');
import * as handler from '../RequestFormatter/requesthandler';
import api from '../Helper/api';
// import * as SecureStore from 'expo-secure-store';
import  AsyncStorage  from '@react-native-community/async-storage';
import * as actions from '../reduxhelper/actions';


class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profileInfo: {},
            testInfo: []
        }
        // this.getStoreInfo()
    }


    getStoreInfo = () => {
        let storeInfo = store.getState()
        this.setState({profileInfo: storeInfo.profileInfo, testInfo: storeInfo.testInfo})
    }
    
    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.getStoreInfo()
        })
    }

    calculatePrice = () => {
        let storeInfo = store.getState()
        console.log('store------>', storeInfo)
        let totalTestPrice = storeInfo.testInfo.map(test => test.testDetail.price * test.testDetail.testFor.length)
        return totalTestPrice.reduce((partial_sum, val) => partial_sum + val, 0)
    }

    showAlert = (title, msg) => {
        Alert.alert(
            title,
            msg,
            [
                {
                    text: "Ok",
                    onPress: () => this.props.navigation.navigate('Dashboard')
                    ,
                    style: "cancel"
                },
                // { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }

    bookAppointment = async (reqParam) => {
        try{
            await AsyncStorage.getItem('auth_token')
          .then((token) => {
            console.log(token)
            console.log(Global.editAppntId)
            api.postData('appointment/apnt/save/', reqParam, token)
              .then(([statuCode, data]) => {
                console.log(data);
                if (statuCode === 200) {
                    store.dispatch(actions.resetTest())
                    Global.editAppntId = ''
                    // this.props.navigation.navigate('Dashboard')
                    this.showAlert('', 'Appointment booked successfully')
                }
              })
          })
        }catch(e){

        }
      }


    proceedToPay = () => {
        let storeInfo = store.getState()
        console.log('store========>', storeInfo)
        let reqParam = handler.createAppointmentReq(Global.tests)
        this.bookAppointment(reqParam)
    }

    

    
    render() {
        let cartProductList = this.state.testInfo.map(test => <CartProduct prod={test} />)
        return (
            <View style={stylesheet.holder}>
                <ScrollView style={stylesheet.container}>
                    <View style={stylesheet.container}>
                        {/* <View style={stylesheet.navBar}>
                            <View style={stylesheet.backArrowView}><Image source={require('../Images/back.png')} /></View>
                            <View style={stylesheet.navTitle}>
                                <Text style={stylesheet.title}>Cart</Text>
                            </View>
                        </View> */}
                        <View>
                            <View style={stylesheet.nameStyle}>
                                <Text>{this.state.profileInfo.name}</Text>
                            </View>
                            <View style={stylesheet.scheduleInfo}>
                                <View  style={stylesheet.addressinfo}>
                                    <View style={stylesheet.addressinfo}>
                                        <Text style={{color: '#5eaaa8', fontWeight: 'bold'}}>Address</Text>
                                    </View>
                                    <View>
                                        <Text style={{color: '#81878c', fontWeight: 'bold'}}>{Global.tests.addressInfo.title}</Text>
                                        <Text style={{color: '#b3b9bd', fontWeight: 'normal'}}>{Global.tests.addressInfo.address1}, {Global.tests.addressInfo.city}, {Global.tests.addressInfo.pincode}</Text>
                                    </View>
                                </View>
                                <View  style={stylesheet.addressinfo}>
                                    <View style={stylesheet.addressinfo}>
                                        <Text style={{color: '#5eaaa8', fontWeight: 'bold'}}>Time Slot</Text>
                                    </View>
                                    <View>
                                        <Text style={{color: '#81878c', fontWeight: 'bold'}}>{this.state.testInfo.length > 0 ? this.state.testInfo[0].timeSlot : ''}</Text>
                                        <Text style={{color: '#b3b9bd', fontWeight: 'normal'}}>{this.state.testInfo.length > 0 ? this.state.testInfo[0].dateSlot : ''}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {cartProductList}
                        <View style={stylesheet.totalContainer}>
                            <View style={[stylesheet.subTotalList, stylesheet.boldTitle]}>
                                <Text style={stylesheet.boldTitle}>Bill details</Text>
                            </View>
                            <View style={stylesheet.subTotalList}>
                                <Text style={[stylesheet.subTotalTitle, stylesheet.lightColor]}>Item total</Text>
                                <Text>${this.calculatePrice()}</Text>
                            </View>
                            <View style={stylesheet.subTotalList}>
                                <Text style={[stylesheet.subTotalTitle, stylesheet.lightColor]}>Convenience fee</Text>
                                <Text>$0</Text>
                            </View>
                            <View style={stylesheet.subTotalList}>
                                <Text style={[stylesheet.subTotalTitle, stylesheet.lightColor]}>Taxes and charges</Text>
                                <Text>$0</Text>
                            </View>
                            <View style={{ backgroundColor: '#cdcfd1', marginHorizontal: 20, height: 1 }} />
                            <View style={[stylesheet.subTotalList, stylesheet.boldTitle]}>
                                <Text style={[stylesheet.subTotalTitle, stylesheet.boldTitle]}>To pay</Text>
                                <Text>${this.calculatePrice()}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={() => { this.proceedToPay() }}>
                    <View style={stylesheet.payButton}>
                        <Text style={{ color: 'white', fontSize: 16 }}>Proceed to pay ${this.calculatePrice()}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Cart;

const stylesheet = StyleSheet.create({
    holder: {
        flex: 1
    },
    container: {
        flex: 1,
        marginBottom: 50,
        backgroundColor: '#f8f8f8'
    },
    subTotalList: {
        flexDirection: 'row',
        marginVertical: 10,
        paddingHorizontal: 20
    },
    subTotalTitle: {
        flex: 3
    },
    boldTitle: {
        color: '#2f363f',
        fontWeight: 'bold'
    },
    lightColor: {
        color: '#81878c'
    },
    totalContainer: {
        backgroundColor: 'white'
    },
    backArrowView: {
        flex: 1,
        marginLeft: 20,
        marginTop: 5
    },
    navBar: {
        height: 40,
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center'
    },
    navTitle: {
        flex: 6,
        justifyContent: 'center'
    },
    title: {
        color: '#2f363f',
        fontSize: 20
    },
    payButton: {
        position: 'relative',
        left: 0,
        right: 0,
        bottom: 0,
        height: 50,
        backgroundColor: '#5eaaa8',
        alignItems: 'center',
        justifyContent: 'center'
    },
    nameStyle: {
        paddingVertical: 30,
        paddingHorizontal: 20
    },
    scheduleInfo: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: 'white'
    },
    addressinfo: {
        paddingVertical: 10
    },
    timeinfo: {
        paddingVertical: 10
    },

});