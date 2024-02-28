import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Image } from 'react-native';


class CommunityProfile extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        // let sideIcon = '';
        // if (this.props.iconExist) {
        //     sideIcon = <Image source={require('../Images/right_arrow.png')} style={stylesheet.arrow_icon} />
        // }
        return (
            <View>
                <View>
                    <Text>{this.props.title}</Text>
                </View>
                <View>
                    <TextInput placeholder={this.props.placeholder} />
                    {/* {sideIcon} */}
                </View>
            </View>
        );
    }
}

export default CommunityProfile;

const stylesheet = StyleSheet.create({
    container: {
        flex: 1
    }
});