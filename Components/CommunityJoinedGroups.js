import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableWithoutFeedback, Image } from 'react-native';


class CommunityJoinedGroups extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    callCreateGroup = () => {
        this.props.createGroup();
    }

    callOpenGroup = item => {
        this.props.openGroup(item)
    }

    renderItem = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => this.callOpenGroup(item)}>
            <View style={stylesheet.item}>
                <View style={stylesheet.stepsView}>
                    <Text>{item.group_info.name}</Text>
                    <Text>{item.members} Members</Text>
                </View>
                <View style={stylesheet.startStyle}>
                    <Text>Open</Text>
                    <Image source={require('../Images/right_arrow.png')} style={{ flex: 1, width: null, height: null, resizeMode: 'center' }} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    render() {
        return (
            <View style={stylesheet.container}>
                <View style={stylesheet.headerStyle}>
                    <Text>Daily Challenges</Text>
                    <TouchableWithoutFeedback onPress={() => this.callCreateGroup()}>
                        <Text>Create Group</Text>
                    </TouchableWithoutFeedback>
                </View>
                <View>
                    <FlatList
                        data={this.props.info}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        );
    }
}

export default CommunityJoinedGroups;

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
    },
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});