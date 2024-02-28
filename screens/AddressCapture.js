import React from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view';



class ProfileCompleteAddess extends React.Component {
    constructor(props) {
        super(props)
    }

    callDashboard = () => {
        this.props.navigation.navigate('Dashboard');
    }

    render() {
        return (
            <View style={stylesheet.container}>
                {/* <View style={stylesheet.backArrowView}><Image source={require('../Images/back.png')} /></View>
                <Text style={stylesheet.headerTitle}>Complete your profile</Text> */}
                {/* <ScrollView contentContainerStyle={{flexGrow: 1}}> */}
                    {/* <KeyboardAwareView animated={true}> */}
                        <Text style={stylesheet.textStyle}>Address for sample collection</Text>
                        <View style={[stylesheet.inputView, stylesheet.dobView]}>
                            <View style={stylesheet.dobInput}>
                                <TextInput style={stylesheet.inputField} placeholder='Location' placeholderTextColor='#b3b9bd' />
                            </View>
                            <View style={stylesheet.locImg}>
                                <Image source={require('../Images/location.png')} style={{ resizeMode: 'center' }} />
                            </View>
                        </View>
                        <Text style={stylesheet.textStyle}>Full Address</Text>
                        <View style={stylesheet.inputView}>
                            <TextInput style={stylesheet.inputField} placeholder='House Number and Building' placeholderTextColor='#b3b9bd' />
                        </View>
                        <View style={stylesheet.inputView}>
                            <TextInput style={stylesheet.inputField} placeholder='Street Name and landmark' placeholderTextColor='#b3b9bd' />
                        </View>
                    {/* </KeyboardAwareView> */}
                {/* </ScrollView> */}
                <View style={stylesheet.doneView}>
                    <TouchableOpacity onPress={this.callDashboard}>
                        <View style={stylesheet.doneButton}>
                            <Text style={stylesheet.doneTitle}>Done</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


export default ProfileCompleteAddess;


const stylesheet = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    inputView: {
        height: 60,
        marginHorizontal: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#40535b62'
    },
    dobView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textStyle: {
        marginHorizontal: 20,
        marginBottom: 20,
        marginTop: 20,
        color: '#2f363f',
        fontSize: 16,
        fontWeight: 'bold'
    },
    backArrowView: {
        marginLeft: 20,
        marginTop: 30
    },
    headerTitle: {
        marginHorizontal: 20,
        marginVertical: 20,
        color: '#2f363f',
        fontSize: 20,
        fontWeight: 'bold'
    },
    inputField: {
        flex: 1,
        marginLeft: 20
    },
    doneView: {
        flex: 3,
        justifyContent: 'flex-end',
        marginBottom: 20
    },
    doneButton: {
        marginHorizontal: 30,
        backgroundColor: '#5eaaa8',
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    doneTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
});