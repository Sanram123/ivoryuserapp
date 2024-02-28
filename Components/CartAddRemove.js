import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import store from '../reduxhelper/store';


class CartAddRemove extends Component {
    constructor(props) {
        super(props)

    }

    updateCount = () => {
        let storeInfo = store.getState()
        let isTestExist = storeInfo.testInfo.filter(test => test.testDetail.center_id === this.props.data.medical_center && test.testDetail.test_id === this.props.data.id && test.testDetail.test_type === this.props.testType)
        return isTestExist[0].testDetail.testFor.length
    }

    onAddItem = () => {
        console.log('on add')
        this.props.navigateRef.navigate('FamilyList', {
            item: this.props.data,
            isNewItem: false,
            shouldAdd: true,
            testType: this.props.testType
        })
    }

    onRemoveItem = () => {
        console.log('on remove')
        this.props.navigateRef.navigate('FamilyList', {
            item: this.props.data,
            isNewItem: false,
            shouldAdd: false,
            testType: this.props.testType
        })
    }

    render() {
        return (
            <View style={stylesheet.container}>

                <View style={stylesheet.addminusCount1}>
                    <TouchableOpacity style={stylesheet.touch} onPress={() => { this.onRemoveItem() }}>
                        <Text style={stylesheet.textColor}>-</Text>
                    </TouchableOpacity>
                </View>
                <View style={stylesheet.addminusCount2}>
                    <Text style={stylesheet.textColor}>{this, this.updateCount()}</Text>
                </View>
                <View style={stylesheet.addminusCount3}>
                    <TouchableOpacity style={stylesheet.touch} onPress={() => { this.onAddItem() }}>
                        <Text style={stylesheet.textColor}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default CartAddRemove;

const stylesheet = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderColor: '#5eaaa8',
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: '#5eaaa8'
    },
    addminusCount1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addminusCount2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addminusCount3: {
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