import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';


class CommunityMemberList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: props.info,
        }
        console.log('calling')
    }

    chooseMember = item => {
        console.log('clicked')
        this.props.updateMem(item)
    }

    renderItem = ({ item, index }) => (
        // <TouchableWithoutFeedback>
            <View style={stylesheet.item}>
                <View style={stylesheet.imgViewStyle}>
                    <Image source={require('../Images/profile_side_icon.png')} style={stylesheet.imgStyle} />
                </View>
                <View style={stylesheet.infoView}>
                    <Text>{item.user.name}</Text>
                    <Text>{item.society.name}</Text>
                </View>
                <TouchableOpacity style={stylesheet.selectStyle} onPress={() => this.chooseMember(item)}>
                    <Text style={{ color: '#2f363f' }}>{this.props.existingList.findIndex(memId => memId == item.id) == -1 ? "Select" : "Deselect"}</Text>
                </TouchableOpacity>
            </View>
        // </TouchableWithoutFeedback>
    );

    render() {
        return (
            <View style={stylesheet.container}>
                <View>
                    <FlatList
                        data={this.state.userInfo}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        );
    }
}

export default CommunityMemberList;

const stylesheet = StyleSheet.create({
    container: {
        padding: 20
    },
    item: {
        flexDirection: 'row',
        paddingVertical: 5,
        borderColor: '#CDCFD1',
        borderWidth: 1,
        marginVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 4
    },
    imgStyle: {
        width:60,
        height: 60,
        borderRadius: 60/2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "black",

    },
    infoView: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 5
    },
    selectStyle: {
        padding: 10,
        alignSelf: 'center',
        backgroundColor: '#b3b9bd',
        borderRadius: 10,
        opacity: 0.5
    },
    imgViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    }
});