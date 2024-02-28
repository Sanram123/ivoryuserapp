import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';


class Walkthrough_3 extends React.Component {
    constructor(props) {
        super(props);
    }

    callSignupMobile = () => {
        this.props.navigation.navigate('SignUpMobile')
    }

    render() {
        return (
            <View style={stylesheet.container}>
                <View style={stylesheet.headerView}>
                    <Text style={stylesheet.headerTitle}>IVORY</Text>
                </View>
                <View style={stylesheet.bodyView}>
                    <Image source={require('../Images/wt_3.png')} style={stylesheet.imgStyle} />
                    <Text style={stylesheet.title}>Health above all</Text>
                    <Text style={stylesheet.body}>Partnered with India’s most trusted medical centres, expect only the finest service</Text>
                </View>
                <View style={stylesheet.footerView}>
                    <TouchableOpacity onPress={this.callSignupMobile}>
                        <View style={stylesheet.footerInnerView}>
                            <Text style={stylesheet.signupTitle}>Sign Up</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={[stylesheet.footerInnerView, stylesheet.haveaccountView]}>
                        <Text style={stylesheet.haveaccountTitle}>Already have an account?</Text>
                    </View>
                </View>
            </View >
        );
    }
}


export default Walkthrough_3;


const stylesheet = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    headerView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bodyView: {
        flex: 7,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    footerView: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    headerTitle: {
        textAlign: 'center',
        color: '#535b62',
        fontSize: 18,
        marginTop: 20
    },
    imgStyle: {
        resizeMode: 'contain',
        aspectRatio: 0.6
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 10,
        color: '#2f363f'
    },
    body: {
        fontSize: 16,
        marginHorizontal: 10,
        fontSize: 15,
        color: '#81878c'
    },
    footerInnerView: {
        marginHorizontal: 30,
        backgroundColor: '#5eaaa8',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    signupTitle: {
        padding: 20,
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    haveaccountView: {
        marginBottom: 10,
        backgroundColor: 'transparent'
    },
    haveaccountTitle: {
        padding: 10,
        color: '#81878c'
    }
});