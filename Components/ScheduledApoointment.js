import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';


class ScheduledAppointment extends Component {
    constructor(props) {
        super(props)
    }

    editAppointment = (item) => {
        this.props.onEdit(item);
    }

    renderItem = ({ item }) => (
        <View style={stylesheet.container}>
            <View style={stylesheet.testHeader}>
                <Text style={{ color: '#2f363f', fontWeight: 'bold' }}>
                    {item.appointment[0].test_type == 0 ? item.appointment[0].labtest_detail.name : item.appointment[0].package_detail.name}{item.appointment.length > 1 ? `+${item.appointment.length - 1}` : ''}
                </Text>
                <View style={stylesheet.atHome}>
                    <Image source={require('../Images/setting_icon.png')} style={stylesheet.settingImg} />
                    <Text>At Home</Text>
                </View>
            </View>
            {/* <View style={stylesheet.centerInfo}>
                <Text style={{color: '#b3b9bd'}}>Apollo Hospital  |  Arekere</Text>
            </View> */}
            <View style={stylesheet.nurseStatus}>
                <Text style={{ color: '#f7b500' }}>{item['date_slot']} {item['time_slot']}</Text>
            </View>
            <View>
                <TouchableOpacity style={stylesheet.editView} onPress={() => this.editAppointment(item)}>
                    <Text style={{ color: 'white' }}>Edit Appointment</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    render() {

        return (
            <View>
                <FlatList
                    data={this.props.data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        );
    }
}

export default ScheduledAppointment;

const stylesheet = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        borderColor: '#66979797',
        borderWidth: 1,
        marginHorizontal: 10,
        marginVertical: 15,
        paddingVertical: 10
    },
    testHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    centerInfo: {
        flex: 1
    },
    nurseStatus: {
        flex: 1,
        marginVertical: 5
    },
    atHome: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5
    },
    settingImg: {
        resizeMode: 'center',
        marginRight: 5
    },
    editView: {
        backgroundColor: '#5eaaa8',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        alignSelf: 'flex-start'
    }
});