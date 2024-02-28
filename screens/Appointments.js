import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import LiveAppointments from '../Components/LiveAppointment';
import ScheduledAppointment from '../Components/ScheduledApoointment';
import PastAppointment from '../Components/PastAppointment';
import SyncStorage from 'sync-storage';
// import * as SecureStore from 'expo-secure-store';
import api from '../Helper/api';
import * as handler from '../RequestFormatter/requesthandler';
import  AsyncStorage  from '@react-native-community/async-storage';
const Global = require('../Helper/Constants');


const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];



class Appointments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            live: false,
            scheduled: true,
            past: false,
            appointmentList: []
        }
        this.getAppointment("1")
    }



    onLive = () => {
        console.log('clicked live')
        this.updateAppointmentStatus("1")
    }

    onScheduled = () => {
        console.log('clicked scheduled')
        this.updateAppointmentStatus("0")
    }

    onPast = () => {
        console.log('clicked past')
        this.updateAppointmentStatus("2")
    }

    updateAppointmentStatus = (status) => {
        switch (status) {
            case "0":
                this.getAppointmentOnUpdate(false, true, false)
                break;
            case "1":
                this.getAppointmentOnUpdate(true, false, false)
                break;
            case "2":
                this.getAppointmentOnUpdate(false, false, true)
                break;

            default:
                console.log("no option")
        }
    }

    editAppointment = (item) => {
        console.log('edit clicked')
        console.log(item)
        Global.editAppntId = item.appointment_id
        console.log(Global.editAppntId)
        handler.prepareStoreEditAppointment(item)
        // Global.chosenPincode = item.address_detail.pincode
        this.props.navigation.navigate('ChooseAddress')
        // .then(() => )
    }

    getAppointmentOnUpdate = (live, scheduled, past) => {
        let status = live ? "0" : scheduled ? "1" : "2"
        this.setState({ live: live, scheduled: scheduled, past: past }, () => this.getAppointment(status))
    }

    getAppointment = async (status) => {
        try{
            await AsyncStorage.getItem('auth_token')
            .then((token) => {
                console.log(token)
                api.getData('appointment/apnt/?status='+status, token)
                    .then(([statuCode, data]) => {
                        console.log(data);
                        if (statuCode === 200) {
                            this.setState({appointmentList: data})
                        }
                    })
            })
        }catch(e){

        }
        
    }

    render() {

        let appointment;
        if (this.state.live) {
            appointment = <LiveAppointments data={this.state.appointmentList} />
        } else if (this.state.scheduled) {
            appointment = <ScheduledAppointment data={this.state.appointmentList} onEdit={this.editAppointment}/>
        } else if (this.state.past) {
            appointment = <PastAppointment data={this.state.appointmentList} />
        }


        return (
            <View style={stylesheet.container}>
                {/* <View style={stylesheet.headerView}>
                    <Text style={stylesheet.forYouTitle}>For You</Text>
                    <Image source={require('../Images/setting_icon.png')} style={stylesheet.settingImg} />
                </View> */}
                <View style={stylesheet.appointmentBody}>
                    <View style={stylesheet.appointmentHeader}>
                        <Text style={stylesheet.forYouTitle}>Appointments</Text>
                        <Image source={require('../Images/add.png')} style={stylesheet.settingImg} />
                    </View>
                    <View style={stylesheet.appointmentStatus}>
                        <View style={[stylesheet.liveView, this.state.live ? stylesheet.selection : stylesheet.deselection]}>
                            <TouchableOpacity onPress={this.onLive}>
                                <Text style={this.state.live ? stylesheet.selection : stylesheet.deselection}>Live</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[stylesheet.scheduleView, this.state.scheduled ? stylesheet.selection : stylesheet.deselection]}>
                            <TouchableOpacity onPress={this.onScheduled}>
                                <Text style={this.state.scheduled ? stylesheet.selection : stylesheet.deselection}>Scheduled</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[stylesheet.pastView, this.state.past ? stylesheet.selection : stylesheet.deselection]}>
                            <TouchableOpacity onPress={this.onPast}>
                                <Text style={this.state.past ? stylesheet.selection : stylesheet.deselection}>Past</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                <View style={stylesheet.listStyle}>
                    {appointment}
                </View>
            </View >
        );
    }
}


export default Appointments;

const stylesheet = StyleSheet.create({
    container: {
        flex: 1
    },
    headerView: {
        flex: 1,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    appointmentBody: {
        flex: 2,
    },
    settingImg: {
        resizeMode: 'center',
        marginRight: 10
    },
    forYouTitle: {
        marginLeft: 10,
        color: '#2f363f',
        fontSize: 18,
        fontWeight: 'bold'
    },
    appointmentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    appointmentStatus: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 20
    },
    liveView: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 5
    },
    scheduleView: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 5
    },
    pastView: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10
    },
    selection: {
        color: '#5eaaa8',
        borderBottomColor: '#5eaaa8',
        borderBottomWidth: 2,
    },
    deselection: {
        color: '#2f363f',
        borderBottomColor: 'white',
        borderBottomWidth: 0
    },
    listStyle: {
        flex: 8
    }
});