import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableWithoutFeedback, Image } from 'react-native';


class DailyChallenges extends Component {
    constructor(props) {
        super(props)
        this.state = {
            steps: [5000, 10000]
        }
    }

    renderItem = ({ item }) => (
        <TouchableWithoutFeedback>
            <View style={stylesheet.item}>
                <View style = {stylesheet.stepsView}>
                    <Text>{item} Steps</Text>
                    <Text>Achieve Daily Step Run</Text>
                </View>
                <View style={stylesheet.startStyle}>
                    <Text>Start</Text>
                    <Image source={require('../Images/right_arrow.png')} style={{ flex: 1, width: null, height: null, resizeMode: 'center' }} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    render() {
        return (
            <View style={stylesheet.container}>
                <Text>Daily Challenges</Text>
                <View>
                    <FlatList
                        data={this.state.steps}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        );
    }
}

export default DailyChallenges;

const stylesheet = StyleSheet.create({
    container: {
        padding: 20,
    },
    item: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderColor: 'red',
        borderWidth: 1,
        marginVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'space-around'
    },
    stepsView: {
        // flex: 1
    },
    startStyle: {
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});