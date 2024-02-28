import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';


class Walkthrough_1 extends React.Component {
    constructor(props) {
        super(props);
    }

    callWalkthorough2 = () => {
        console.log('its clicked')
        this.props.navigation.navigate('Walkthrough_2')
    }

    render() {
        return (
            <View style={stylesheet.container}>
                <View style={stylesheet.headerView}>
                    <Text style={stylesheet.skipTitle}>Skip</Text>
                </View>
                <View style={stylesheet.bodyView}>
                    <Image source={require('../Images/wt_1.png')} style={stylesheet.imgStyle} />
                    <Text style={stylesheet.title}>Lab tests at home</Text>
                    <Text style={stylesheet.body}>Worry to go the hospital in these times? Book a nurse for medical tests at home anytime</Text>
                </View>
                <View style={stylesheet.footerView}>
                    <TouchableOpacity onPress={this.callWalkthorough2}>
                        <View style={stylesheet.nextView}>
                            <Text style={stylesheet.skipTitle}>Next</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


export default Walkthrough_1;


const stylesheet = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    headerView: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    bodyView: {
        flex: 7,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    footerView: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    skipTitle: {
        textAlign: 'right',
        color: '#81878c',
        fontSize: 18,
        marginRight: 10,
        marginTop: 20
    },
    imgStyle: {
        resizeMode: 'contain',
        aspectRatio: 0.8
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
    nextView: {
        width: 100,
    }
});