import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';


class TermsNConditions extends React.Component {
    constructor(props) {
        super(props)
    }

    callProfileComplete = () => {
        this.props.navigation.navigate('ProfileComplete');
    }

    render() {
        return (
            <View style={stylesheet.container}>
                <View style={stylesheet.headerView}>
                    <View style={stylesheet.backArrowView}><Image source={require('../Images/back.png')} /></View>
                    <Text style={stylesheet.signuptitle}>Terms & Conditions</Text>
                </View>
                <View style={stylesheet.bodyView}>
                    <ScrollView>
                        <Text style={stylesheet.agreementScroller}>Your agreement</Text>
                        <Text style={[stylesheet.agreementScroller, stylesheet.content]}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Text>
                    </ScrollView>
                </View>
                <View style={stylesheet.footer}>
                    <TouchableOpacity onPress={this.callProfileComplete}>
                        <View style={stylesheet.agreeButton}>
                            <Text style={stylesheet.agreeTitle}>Agree and Continue</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


export default TermsNConditions;

const stylesheet = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerView: {
        flex: 1.5,
    },
    bodyView: {
        flex: 5,
    },
    footer: {
        flex: 1,
        marginTop: 10
    },
    backArrowView: {
        marginLeft: 20,
        marginTop: 30
    },
    signuptitle: {
        marginTop: 30,
        fontSize: 20,
        color: '#2f363f',
        marginLeft: 20
    },
    agreeButton: {
        marginHorizontal: 30,
        backgroundColor: '#5eaaa8',
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10
    },
    agreeTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    agreementScroller: {
        color: '#2f363f',
        fontSize: 18,
        marginTop: 20,
        marginHorizontal: 20,
        lineHeight: 20
    },
    content: {
        color: '#81878c',
        fontSize: 16
    }
});