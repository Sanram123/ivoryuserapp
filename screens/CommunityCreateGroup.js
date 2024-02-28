import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


class CommunityCreateGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            group_name: ''
        }
    }

    saveGroupName = name => {
        this.setState({group_name: name})
    }

    callInviteMem = () => {
        this.props.navigation.navigate('CommunityInviteMemList', {
            groupInfo: this.state.group_name
        });
    }

    render() {
        return (
            <SafeAreaView style={stylesheet.container}>
                <KeyboardAwareScrollView style={stylesheet.container}>
                    {/* <View style={stylesheet.item}>
                        <Text style={stylesheet.titleColor}>Your Name</Text>
                        <TextInput placeholder='110096' style={stylesheet.inputStyle} />
                    </View> */}
                    <View style={stylesheet.item}>
                        <Text style={stylesheet.titleColor}>Group Name*</Text>
                        <TextInput placeholder='110096' style={stylesheet.inputStyle} onChangeText={(value) => this.saveGroupName(value)}/>
                    </View>
                    <View style={stylesheet.item}>
                        <Text style={stylesheet.titleColor}>Privacy Level</Text>
                        <TextInput placeholder='110096' style={stylesheet.inputStyle} />
                    </View>
                    {/* <View style={stylesheet.item}>
                        <Text style={stylesheet.titleColor}>Use Code for attach society</Text>
                        <TextInput placeholder='110096' style={stylesheet.inputStyle} />
                    </View> */}
                    {/* <View style={stylesheet.item}>
                        <Text style={[{ fontSize: 17, textAlign: 'center' }, stylesheet.titleColor]}>Or Choose Society if any!</Text>
                    </View>
                    <View style={stylesheet.item}>
                        <TextInput placeholder='110096' style={stylesheet.inputStyle} />
                    </View> */}
                </KeyboardAwareScrollView>

                <TouchableOpacity style={stylesheet.nextTitle} onPress={this.callInviteMem}>
                    <Text style={stylesheet.nextTitleProp}>Next for Invite Members</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

export default CommunityCreateGroup;

const stylesheet = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F8F8F8'
    },
    inputStyle: {
        height: 50,
        borderColor: '#CDCFD1',
        borderWidth: 1,
        marginVertical: 5,
        backgroundColor: 'white'
    },
    item: {
        marginVertical: 10,
    },
    nextTitle: {
        marginTop: 10,
        backgroundColor: '#5EAAA8',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
        margin: 20
    },
    nextTitleProp: {
        color: 'white',
        fontWeight: 'normal',
        fontSize: 18,
    },
    titleColor: {
        color: '#2f363f'
    }
});