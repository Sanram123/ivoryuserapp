import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
const Global = require('../Helper/Constants');


class CommunityPeriodHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0
        }
    }

    onClickHeader = (headerId) => {
        console.log(headerId)
        this.setState({ selectedIndex: headerId }, () => this.props.updateGraph(headerId))
    }

    render() {
        return (
            <View style={stylesheet.container}>
                <TouchableOpacity onPress={() => this.onClickHeader(Global.day)}>
                    <View style={this.state.selectedIndex == 0 ? stylesheet.selected : stylesheet.deselected}>
                        <Text>Day</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onClickHeader(Global.week)}>
                    <View style={this.state.selectedIndex == 1 ? stylesheet.selected : stylesheet.deselected}>
                        <Text>Week</Text>
                    </View>
                </TouchableOpacity >
                <TouchableOpacity onPress={() => this.onClickHeader(Global.month)}>
                    <View style={this.state.selectedIndex == 2 ? stylesheet.selected : stylesheet.deselected}>
                        <Text>Month</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onClickHeader(Global.year)}>
                    <View style={this.state.selectedIndex == 3 ? stylesheet.selected : stylesheet.deselected}>
                        <Text>
                            Year
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default CommunityPeriodHeader;

const stylesheet = StyleSheet.create({
    container: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    selected: {
        borderBottomColor: '#B3B9BD',
        borderBottomWidth: 2,
        paddingBottom: 5
    },
    deselected: {
        borderBottomWidth: 0
    }
});