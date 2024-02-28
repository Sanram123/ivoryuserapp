import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
const Global = require('../Helper/Constants');
import store from '../reduxhelper/store';


class CartStatus extends Component {
    constructor(props) {
        super(props)
    }

    callCart = () => {
        this.props.onCallCart()
        console.log('clicked')
    }

    calculateTotalTest = () => {
        let storeInfo = store.getState()
        return storeInfo.testInfo.map(test => test.testDetail.testFor.length).reduce((temp, val) => temp + val, 0)
    }

    render() {
        return (
            <View style={stylesheet.container}>
                <View style={stylesheet.cartCount}><Text style={stylesheet.cartCountText}>{this.calculateTotalTest()} items added</Text></View>
                <TouchableOpacity onPress={() => {this.callCart()}}>
                    <View style={stylesheet.seeCart}><Text style={stylesheet.viewCartText}>Proceed</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default CartStatus;


const stylesheet = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#5eaaa8',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cartCount: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    seeCart: {
        backgroundColor: 'white',
        marginHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    viewCartText: {
        alignSelf: 'center',
    },
    cartCountText: {
        color: 'white',
        fontSize: 17
    }
});