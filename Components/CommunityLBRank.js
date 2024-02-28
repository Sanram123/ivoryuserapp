import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableWithoutFeedback, Image } from 'react-native';


class CommunityLBRank extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rankList: props.info
        }
    }

    renderItem = ({ item, index }) => (
        <TouchableWithoutFeedback>
            <View style={stylesheet.item}>
                <View style={stylesheet.rankViewStyle}>
                    <Text>{index + 1}</Text>
                </View>
                <View style={stylesheet.stepsView}>
                    <Text>{item.name}</Text>
                    <Text>ID: {item.community_id}</Text>
                </View>
                <View style={stylesheet.startStyle}>
                    <Text style={{color: '#2f363f'}}>{item.steps} Steps</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    render() {
        return (
            <View style={stylesheet.container}>
                <View>
                    <FlatList
                        data={this.state.rankList}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        );
    }
}

export default CommunityLBRank;

const stylesheet = StyleSheet.create({
    container: {
        padding: 20
    },
    item: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderColor: '#CDCFD1',
        borderWidth: 1,
        marginVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 4
    },
    stepsView: {
        flex: 1
    },
    startStyle: {
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#b3b9bd',
        borderRadius: 10,
        opacity: 0.5
    },
    rankViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    }
});