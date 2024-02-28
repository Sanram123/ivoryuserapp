import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
const Global = require('../Helper/Constants');


class SearchMenuView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headerData: [{
                id: Global.labtest,
                name: 'Lab Tests',
            },
            {
                id: Global.package,
                name: 'Health Packages'
            }
            // {
            //     id: Global.medicalcenter,
            //     name: 'Medical Centers'
            // }
        ],
            menuItemChosen: Global.labtest
        }
        Global.tests  = {...Global.tests, test_type: this.state.menuItemChosen}
    }

    menuItemChosen = (item) => {
        this.setState({menuItemChosen: item.id}, () => {
            Global.tests  = {...Global.tests, test_type: this.state.menuItemChosen}
            this.props.onChangeMenu(item.id)
        }) 
    }

    renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.menuItemChosen(item)}>
            <View style={this.state.menuItemChosen === item.id ? stylesheet.itemHeaderSelected : stylesheet.itemHeaderdeselected}>
                <Text style={this.state.menuItemChosen === item.id ? stylesheet.headerTextSelected : stylesheet.headerTextdeselected}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    render() {
        return (
            <View>
                <View style={stylesheet.container}>
                    <FlatList
                        data={this.state.headerData}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                        horizontal
                    />
                </View>
            </View>
        );
    }
}

export default SearchMenuView;

const stylesheet = StyleSheet.create({
    container: {
    },
    itemHeaderSelected: {
        backgroundColor: '#2f363f',
        marginHorizontal: 5,
        padding: 12,
        borderColor: '#2f363f',
        borderWidth: 1
    },
    headerTextSelected: {
        alignItems: 'center',
        color: 'white'
    },
    itemHeaderdeselected: {
        backgroundColor: 'white',
        marginHorizontal: 5,
        padding: 12,
        borderColor: '#2f363f',
        borderWidth: 1
    },
    headerTextdeselected: {
        alignItems: 'center',
        color: '#2f363f'
    }
});