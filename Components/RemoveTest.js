import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
const Global = require('../Helper/Constants')


class RemoveTest extends Component {
    constructor(props) {
        super(props);
    }

    onPressRemove = (item, clickedPos) => {
        console.log('remove')
        console.log(clickedPos)
        this.props.onRemove(item, clickedPos)
    }

    renderItem = ({ item, index }) => (
        <View style={stylesheet.itemStyle}>
            <Text>{this.props.data.test_name}</Text>
            <Text>--------</Text>
            <Text>{this.props.data.center_name}</Text>
            <Text>--------</Text>
            <Text>{item}</Text>
            <TouchableOpacity onPress={() => this.onPressRemove(item, index)}>
                <Text>X</Text>
            </TouchableOpacity>
        </View>
    );

    render() {
        return (
            <View style={stylesheet.container}>
                <View style={stylesheet.informationContainer}>
                    <View style={stylesheet.header}><Text>Test List</Text></View>
                    <View style={stylesheet.body}>
                        <FlatList
                            data={Global.tests[this.props.parentid].product_info[this.props.childid].testforname}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>

            </View>
        );
    }
}

export default RemoveTest;


const stylesheet = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(00, 00, 00, 0.8)',

    },
    informationContainer: {
        position: 'absolute',
        height: 300,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    header: {
        alignItems: 'center',
        height: 30,
        justifyContent: 'center'
    },
    body: {
        flex: 1
    },
    itemStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 10
    }
});