import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, Button, TouchableWithoutFeedback, Image } from 'react-native';
const Global = require('../Helper/Constants');


class SearchList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            labtest: []
        }

    }

   



    // getLabTest = () => {
    //     console.log('getlab')
    //     fetch(Global.BASE_URL+this.props.type+'/', {
    //         method: 'GET'
    //     })
    //         .then((response) => response.json())
    //         .then((json) => {
    //             console.log(json);
    //             this.setState({ labtest: json, isLoaded: true })
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }

    genereateColorCode = () => {
        return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

    }

    renderItem = ({ item }) => (
        <View style={stylesheet.item}>
            <View style={stylesheet.subItem}>
                <Text style={stylesheet.testTitle}>{item.name}</Text>
                <Image source={require('../Images/plus.png')} style={stylesheet.imgStyle} />
            </View>
            <View style={{ height: 1, backgroundColor: '#cdcfd1'}}/>
        </View>
    );

    callSearch = () => {
        console.log('its clickeddddd')
        this.props.onClick()
    }

    render() {
        console.log('renderer')
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.props.dataSet}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.name}
                />
            </View>
        )

    }
}

export default SearchList;


const stylesheet = StyleSheet.create({
    fontStyles: {
        fontWeight: 'bold',
        fontSize: 22,
        fontStyle: 'normal'
    },
    labsTestContainer: {
        backgroundColor: 'white',
        marginVertical: 5
    },
    packageContainer: {
        backgroundColor: 'white',
        marginVertical: 5
    },
    labTestTitleBar: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        padding: 20
    },
    item: {
        height: 60,
        marginHorizontal: 20
    },
    subItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        color: 'white'
    },
    fontStyles: {
        fontWeight: 'bold',
        fontSize: 20,
        fontStyle: 'normal',
        color: '#2f363f'
    },
    testTitle: {
        color: '#2f363f'
    },
    imgStyle: {
        resizeMode: 'center'
    }
}); 