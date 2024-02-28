import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableWithoutFeedback, Image } from 'react-native';


class CommunityLB extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rankInfo: this.props.info
        }
    }


    onClickLB = (item) => {
        type = ''
        if(item.type == 'pincode'){
            type = 0
        }else if(item.type == 'city'){
            type = 1
        }else if(item.type == 'society'){
            type = 2
        }else if(item.type == 'country'){
            type = 3
        }
        this.props.callLeaderboard(type);
    }

    renderItem = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => this.onClickLB(item)}>
            <View style={stylesheet.item}>
                <View style={stylesheet.stepsView}>
                    <Text>{item.type}</Text>
                    <Text>{item.val}</Text>
                </View>
                <View style={stylesheet.startStyle}>
                    <Text>{item.rank}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    render() {
        return (
            <View style={stylesheet.container}>
                <Text>Leaderboard</Text>
                <View>
                    <FlatList
                        data={this.state.rankInfo}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        );
    }
}

export default CommunityLB;

const stylesheet = StyleSheet.create({
    container: {
        padding: 20
    },
    item: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderColor: 'red',
        borderWidth: 1,
        marginVertical: 10,
        paddingHorizontal: 10
    },
    stepsView: {
        flex: 1
    },
    startStyle: {
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});