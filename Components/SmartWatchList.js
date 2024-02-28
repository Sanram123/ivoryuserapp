import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image } from 'react-native';


class SmartWatchList extends Component {
    constructor(props) {
        super(props)
    }

    onClickWatch = (item) => {
        this.props.onClick(item);
    }

    renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => { this.onClickWatch(item) }}>
            <View style={stylesheet.item}>
                <View>
                    <Image source={require('../Images/right_arrow.png')} style={stylesheet.arrow_icon}/>
                </View>
                <View style={{flex: 1}}>
                    <Text style={{textAlign: 'left', marginLeft: 5}}>{item.name}</Text>
                </View>
                <View>
                    <Text>Connect</Text>
                </View>
                <View>
                    <Image source={require('../Images/right_arrow.png')} style={stylesheet.arrow_icon}/>
                </View>
            </View>
        </TouchableOpacity>
    );

    render() {
        return (
            <View style={stylesheet.container}>
                <FlatList
                    data={this.props.data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.name}
                />
            </View>
        );
    }
}

export default SmartWatchList;


const stylesheet = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20
    },
    item: {
        flexDirection: 'row',
        height: 60,
        margin: 10,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    arrow_icon: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    }
});