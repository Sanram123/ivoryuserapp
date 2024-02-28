import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
const Global = require('../Helper/Constants');


class CartProduct extends Component {
    constructor(props) {
        super(props)
    }

    showTest = testFor => (
        <View style={stylesheet.product}>
            <View style={stylesheet.productDetail}>
                <Text style={[stylesheet.lineSpacing, stylesheet.title]}>{this.props.prod.testDetail.test_name}</Text>
                <Text style={stylesheet.priceTitle}>${this.props.prod.testDetail.price}</Text>
            </View>
            <View>
                <View>
                    <Text>-----> {testFor}</Text>
                </View>
            </View>
        </View>
    );

    render() {
        let product = this.props.prod.testDetail.testFor.map(fam => this.showTest(fam.name))
        // for (let i = 0; i < this.props.prod.product_info.length; i++) {
        //     product.push(this.showTest(this.props.prod.product_info[i]))
        // }
        return (
            <View style={stylesheet.container}>
                <View>
                    {product}
                </View>
                <View style={stylesheet.horizontalLine} />
                <View style={stylesheet.productCenter}>
                    <View style={stylesheet.centerAssigned}>
                        <Text style={{ color: '#81878c' }}>Above orders will be fulfilled by</Text>
                        <Text style={{ color: '#2f363f', fontWeight: 'bold' }}>{this.props.prod.testDetail.center_name}</Text>
                    </View>
                    <View>
                        <Text style={{ color: '#5eaaa8', fontWeight: 'bold', fontSize: 15 }}>Change</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default CartProduct;

const stylesheet = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginVertical: 10
    },
    product: {
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 30
    },
    horizontalLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#cdcfd1'
    },
    productDetail: {
        flex: 3
    },
    lineSpacing: {
        marginVertical: 5
    },
    productCenter: {
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 30
    },
    centerAssigned: {
        flex: 3
    },
    title: {
        color: '#2f363f',
        fontWeight: 'bold'
    },
    priceTitle: {
        color: '#f7b500'
    }
});