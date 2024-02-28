import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableWithoutFeedback, Alert, TouchableOpacity } from 'react-native';
var dateFormat = require("dateformat");
const Global = require('../Helper/Constants');
import moment from 'moment';
// import * as SecureStore from 'expo-secure-store';
import api from '../Helper/api';
import store from '../reduxhelper/store';
import * as action from '../reduxhelper/actions';
import * as handler from '../RequestFormatter/requesthandler';
import  AsyncStorage  from '@react-native-community/async-storage';

class SlotSelectScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datesList: [],
            slotsList: [],
            selectedDate: '',
            selectedSlot: '',
            // pincode: props.route.params.item.pincode,
            dateDispList: [],
            selectedDateIndex: 0,
            selectedTimeIndex: -1
        }
        this.getSlotDates()
    }

    showAlert = (title, msg, shouldNavigateHome) => {
        Alert.alert(
            title,
            msg,
            [
                {
                    text: "Ok",
                    onPress: shouldNavigateHome ? () => this.props.navigation.navigate('Dashboard') : () => console.log("OK Pressed"),
                    style: "cancel"
                },
                // { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }

    // proceedToPay = () => {
    //     console.log(Global.tests)
    //     for(var i=0; i<Global.tests.length; i++){
    //         Global.tests[i]['book_date'] = this.state.selectedDate
    //         Global.tests[i]['time_slot'] = this.state.selectedSlot
    //         Global.tests[i]['pincode'] = Global.profileInfo.searchPinCode
    //     }
    //     console.log(Global.tests)
    //     fetch(Global.BASE_URL + 'appointment/', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(Global.tests)
    //     })
    //         .then((response) => response.json())
    //         .then((json) => {
    //             console.log(json);
    //             // this.setState({ packageTest: json })
    //             if (json["status"]) {
    //                 this.showAlert('Success!!', json["msg"], true)
    //                 // this.getSlots(this.state.selectedDate)
    //             }
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    //     // this.formJson()
    //     console.log('clicked pay')
    // }

    
    proceedToChoose = () => {
        Global.profileInfo.searchPinCode = this.state.pincode
        // Global.tests = {...Global.tests, timeSlot: this.state.selectedSlot.slot}
        // Global.tests = {...Global.tests, dateSlot: this.state.selectedDate}
        // Global.tests = {...Global.tests, slotId: this.state.selectedSlot.id}
        // this.props.navigation.navigate('Search');
        store.dispatch(action.testUpdateSlot({timeSlot: this.state.selectedSlot.slot, dateSlot: this.state.selectedDate, slotId: this.state.selectedSlot.id}))
        this.props.navigation.navigate('Cart')
    }

    getSlotDates = async () => {
        try{
            await AsyncStorage.getItem('auth_token')
            .then((token) => {
                console.log(token)
                api.getData('slot/date/', '')
                    .then(([statuCode, data]) => {
                        console.log(data);
                        if (statuCode === 200) {
                            let datesList = data.filter(dateInfo => dateInfo.slot.length > 0).map(dates => dates.slot_date)
                            let dateToDisp = datesList.map(dateInfo => moment(dateInfo).format('MMM Do ddd'))
                            this.setState({ datesList: datesList, dateDispList: dateToDisp }, () => this.getTimeSlots(datesList[0]))
                        }
                    })
            })
        }catch(e){

        }
    }

    getTimeSlots = async (selectedDate) => {
        try{
            await AsyncStorage.getItem('auth_token')
            .then((token) => {
                console.log(token)
                api.getData('slot/time/?date=' + selectedDate + '&pincode=' + Global.chosenPincode, '')
                    .then(([statuCode, data]) => {
                        console.log(data);
                        if (statuCode === 200) {
                            this.setState({ slotsList: data})
                        }
                    })
            })
        }catch(e){

        }
        
    }

    

    // addDays = () => {
    //     const date = new Date();
    //     let datesCollection = []

    //     for (var i = 0; i < 12; i++) {
    //         const newDate = new Date(date.getTime() + i * 1000 * 60 * 60 * 24);
    //         datesCollection.push(dateFormat(newDate, "DDD,mmmm,d,yyyy"));
    //         //   datesCollection.push(`${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`);
    //     }
    //     console.log(datesCollection)
    //     let dateSplitHolder = []
    //     for (var i = 0; i < datesCollection.length; i++) {
    //         dateSplitHolder.push(datesCollection[i].split(','))

    //     }
    //     console.log(dateSplitHolder)
    //     return dateSplitHolder
    // }

    onClickDate = (selectedDate, index) => {
        this.setState({selectedDate: this.state.datesList[index], selectedDateIndex: index}, () => this.getTimeSlots(this.state.selectedDate))
    }

    onClickTimeSlot = (selectedTime, index) => {
        console.log(selectedTime)
        this.setState({selectedSlot: selectedTime, selectedTimeIndex: index})
        Global.profileInfo['selectedSlot'] = selectedTime.slot
    }

    renderItem = ({ item, index }) => (
        <TouchableWithoutFeedback onPress={() => this.onClickDate(item, index)}>
            <View style={[stylesheet.item]}>
                <View style={[stylesheet.dateSub_0, this.state.selectedDateIndex == index ? stylesheet.selected : stylesheet.deselected]}>
                    <Text style={{ color: '#81878c', fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>{item.split(' ')[1]}</Text>
                    <Text style={{ color: '#5eaaa8', fontSize: 16, fontWeight: 'normal' }}>{item.split(' ')[2]}</Text>
                </View>
                <View style={stylesheet.dateSub_1}>
                    <Text style={{ color: '#a2a5a8' }}>{item.split(' ')[0]}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    renderSlotTimeItem = ({ item, index }) => (
        <TouchableWithoutFeedback onPress={() => this.onClickTimeSlot(item, index)}>
            <View>
                <View style={[stylesheet.slotItem]}>
                    <Text style={this.state.selectedTimeIndex == index ? stylesheet.selectedTime : stylesheet.deselectedTime}>{item.slot}</Text>
                </View>
                <View style={stylesheet.divideLine} />
            </View>
        </TouchableWithoutFeedback>
    );

    render() {
        return (
            <View style={stylesheet.container}>
                {/* <View style={stylesheet.headerView}>
                    <View style={stylesheet.backArrowView}><Image source={require('../Images/back.png')} /></View>
                    <Text style={stylesheet.headertitle}>Schedule Slot</Text>
                </View> */}
                <View style={stylesheet.headerSubTitle}>
                    <Text style={{ color: '#5eaaa8' }}>Some test preperation message goes here second line</Text>
                </View>
                <View style={stylesheet.datesHolder}>
                    <FlatList
                        data={this.state.dateDispList}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                        horizontal={true}
                    />
                </View>
                <View style={stylesheet.slotsHolder}>
                    <FlatList
                        data={this.state.slotsList}
                        renderItem={this.renderSlotTimeItem}
                        keyExtractor={item => item.id}
                    />
                </View>
                <View style={stylesheet.cnfmView}>
                    <TouchableOpacity onPress={() => this.proceedToChoose()}>
                        <Text style={stylesheet.cnfmTitle}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


export default SlotSelectScreen;


const stylesheet = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8'
    },
    headerView: {
        flexDirection: 'row'
    },
    backArrowView: {
        marginLeft: 20,
        marginTop: 30
    },
    headertitle: {
        marginTop: 30,
        fontSize: 20,
        color: '#2f363f',
        marginLeft: 20
    },
    headerSubTitle: {
        marginTop: 20,
        marginHorizontal: 16
    },
    datesHolder: {
        height: 150,
    },
    item: {
        height: 110,
        width: 80,
        marginVertical: 20,
        marginHorizontal: 10
    },
    dateSub_0: {
        width: 80,
        height: 80,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dateSub_1: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    slotsHolder: {
        flex: 1,
        backgroundColor: 'white'
    },
    slotItem: {
        height: 50,
        justifyContent: 'center',
        paddingLeft: 50
    },
    divideLine: {
        backgroundColor: '#cdcfd1',
        height: 0.5,
        marginHorizontal: 20,
        marginBottom: 2
    },
    cnfmView: {
        backgroundColor: '#5eaaa8',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cnfmTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    selected: {
        borderColor: '#5eaaa8',
        borderWidth: 1
    },
    deselected: {
        borderWidth: 0
    },
    selectedTime: {
        fontWeight: 'bold',
        color: '#2f363f'
    },
    deselectedTime:{
        fontWeight: 'normal',
        color: '#a2a5a8'
    }
});