import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
const Global = require('../Helper/Constants');
import store from '../reduxhelper/store';
import * as actions from '../reduxhelper/actions';

class AddToCart extends Component {
    constructor(props) {
        super(props)
    }

    onClick = () => {
        console.log('on add to cart')
        Global.changeCartView = false
        this.props.navigateRef.navigate('FamilyList', {
            item: this.props.data,
            isNewItem: true,
            testType: 0
        })
    }

    render() {
        return (
            <View style={stylesheet.container}>

                <View style={stylesheet.addToCart}>
                    <TouchableOpacity style={stylesheet.touch} onPress={() => { this.onClick() }}>
                        <Text style={stylesheet.textColor}>Add to cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default AddToCart;

const stylesheet = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderColor: '#5eaaa8',
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: '#5eaaa8'
    },
    addToCart: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textColor: {
        color: 'white',

    },
    touch: {
        flex: 1,
        justifyContent: 'center'
    }
});