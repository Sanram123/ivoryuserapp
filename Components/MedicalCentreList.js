import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, Button, ImageBackground, Image } from 'react-native';

const Global = require('../Helper/Constants');


class MedicalCentreList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            medicalcenter: []
        } 
    }

    componentDidMount() {
        this.getMedicalCenter()
    }

    getMedicalCenter = () => {
        fetch(Global.BASE_URL+'medical/center/', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                this.setState({ medicalcenter: json })
            })
            .catch((error) => {
                console.error(error);
            });
    }


    renderItem = ({ item }) => (
        <View style={stylesheet.item}>
            <View style={{ flex: 2 }}>
                <Image source={require('../Images/ff.jpeg')} style={stylesheet.image} />
            </View>
            <View style={{ flex: 3 }}>
                <View>
                    <Text style={{ marginBottom: 10, marginTop: 10, fontSize: 20, fontWeight: 'bold', marginLeft: 10, color: '#2f363f' }}>{item.name}</Text>
                    <Text style={{ marginBottom: 10, marginTop: 10, fontSize: 16, marginLeft: 10, color: '#81878c' }}>Arekere | 2.5kms</Text>
                    <Text style={{ marginBottom: 10, marginTop: 10, fontSize: 14, fontWeight: 'bold', marginLeft: 10, color: '#81878c' }}>30mins</Text>
                </View>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#b3b9bd' }}>4.1 *</Text>
            </View>
        </View>
    );


    render() {


        return (
            <View style={stylesheet.labsTestContainer}>
                <View>
                    <View style={stylesheet.labTestTitleBar}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <Text style={[stylesheet.fontStyles, { fontSize: 18 }]}>Browse by medical centres</Text>
                            <Text style={[stylesheet.fontStyles, { fontSize: 15, color: '#b3b9bd' }]}>Explore services near you</Text>
                        </View>
                        <View>
                            <Image source={require('../Images/filter_icon.png')} />
                        </View>
                    </View>
                </View>

                <View>
                    <FlatList
                        data={this.state.medicalcenter}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.name}
                        scrollEnabled={false}
                    />
                </View>
            </View>
        )
    }
}

export default MedicalCentreList;

const stylesheet = StyleSheet.create({
    
    labsTestContainer: {
        backgroundColor: 'white',
        marginVertical: 5
    },
    packageContainer: {
        backgroundColor: 'white',
        marginVertical: 5
    },
    labTestTitleBar: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        padding: 20
    },
    item: {
        height: 140,
        flexDirection: 'row',
        flex: 1,
        borderRadius: 20,
        marginHorizontal: 10,
        marginVertical: 10
    },
    title: {
        fontSize: 16,
        color: 'white',

    },



    image: {
        alignSelf: 'center',
        height: '100%',
        width: '100%',
        overflow: "hidden"

    },
    text: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
        textAlign: 'center',
        backgroundColor: 'rgba(231,204,159,0.6)',
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        height: '30%',

    },
    fontStyles: {
        fontWeight: 'bold',
        fontSize: 18,
        fontStyle: 'normal',
        color: '#2f363f',
    }
}); 