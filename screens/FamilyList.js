import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
const Global = require('../Helper/Constants');
import DialogInput from 'react-native-dialog-input';
import api from '../Helper/api';
// import * as SecureStore from 'expo-secure-store';
import store from '../reduxhelper/store';
import * as actions from '../reduxhelper/actions';
import AsyncStorage  from '@react-native-community/async-storage';

class FamilyList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            familyList: [],
            // selectedFamilyPhone: '',
            // selectedFamilyName: '',
            testInfo: props.route.params.item,
            isNewItem: props.route.params.isNewItem,
            selectedFamilyList: [],
            testType: this.props.route.params.testType,
            selectedFamilyMem: ''
        }
    }

    getFamilySelected = () => {
        let storeInfo = store.getState()
        console.log(this.state.testType)
        let isTestExist = storeInfo.testInfo.filter(test => test.testDetail.center_id === this.state.testInfo.medical_center && test.testDetail.test_id === this.state.testInfo.id && test.testDetail.test_type === this.state.testType)
        console.log('get family')
        this.setState({selectedFamilyList: isTestExist.length > 0 ? isTestExist[0].testDetail.testFor : []}, () => console.log(this.state.selectedFamilyList))
    }

    selectedFamilyMem = (item) => {
        let isFamilyMemExist = this.state.selectedFamilyList.filter(family => family.mobNum === item.phone)
        let updatedFamilyList = []
        if(isFamilyMemExist.length > 0)
            updatedFamilyList = this.state.selectedFamilyList.filter(family => family.mobNum !== item.phone)
        else
            updatedFamilyList = [...this.state.selectedFamilyList, {name: item.name, mobNum: item.phone}]
        this.setState({selectedFamilyList: updatedFamilyList, selectedFamilyMem: item}, () => console.log(this.state.selectedFamilyList))
        
    }

    onClickContinue = () => {
        if(this.state.selectedFamilyList.length > 0){
            this.state.isNewItem ? this.newItemAdded() : this.itemUpdated()
        }else{
            this.itemRemoved()
        }
        
        this.props.navigation.goBack();
    }

    addEditAddress = () => {
        this.props.navigation.navigate('FamilyAdd', {
        //   address_id: '',
        })
      }

    newItemAdded = () => {
        let test = this.state.testInfo
        Global.tests = {...Global.tests, test_name: test.name, test_id: test.id, center_id: test.medical_center, center_name: test.medical_center_name, price: test.price, count: 1, family: this.state.selectedFamilyList }
        store.dispatch(actions.testAdded(Global.tests))
    }

    itemUpdated = () => {
        let test = this.state.testInfo
        store.dispatch(actions.testUpdated(test, this.state.selectedFamilyList))
        console.log(store.getState())
    }

    itemRemoved = () => {
        store.dispatch(actions.testRemoved(this.state.testInfo, this.state.testType))
        console.log(store.getState())
    }
   
    componentDidMount(){
        // this.getAddressList()

        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.getFamilyList()
            if(!this.state.isNewItem){
                this.getFamilySelected()
            }
        })
    }

    showAlert = (title, msg, id) => {
        Alert.alert(
            title,
            msg,
            [
                {
                    text: "Ok",
                    onPress: () => this.removeAddress(id)
                    ,
                    style: "cancel"
                },
                // { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }

    getFamilyList = async () => {
        try{
            await AsyncStorage.getItem('auth_token')
          .then((token) => {
            console.log(token)
            api.getData('accounts/family/', token)
              .then(([statuCode, data]) => {
                console.log(data);
                if (statuCode === 200) {
                  this.setState({familyList: data['family']})
                }
              })
          })
        }catch(e){

        }
        
      }

    renderItem = ({ item }) => (
        <View style={stylesheet.addressItem}>
            <View style={stylesheet.header}>
                <TouchableOpacity onPress={() => this.selectedFamilyMem(item)}>
                    <View style={stylesheet.img}>
                        {this.state.selectedFamilyList.some(mem => mem.name === item.name)  ? <Image source={require('../Images/checked.png')} /> : <Image source={require('../Images/unchecked.png')} />}
                    </View>
                </TouchableOpacity>
                <View>
                    <Text>{item.name}</Text>
                    <Text>{item.dob}</Text>
                </View>
            </View>
            <View style={stylesheet.footer}>

                <View style={stylesheet.removeView}>
                    <TouchableOpacity>
                        <Text style={{ color: '#5eaaa8' }}>Remove</Text>
                    </TouchableOpacity>
                </View>


                <View style={stylesheet.editView}>
                    <TouchableOpacity>
                        <Text style={{ color: '#81878c' }}>Edit</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );

    
    render() {
        return (
            <View style={stylesheet.container}>
                {/* <View style={stylesheet.navBar}>
                    <View style={stylesheet.backArrowView}><Image source={require('../Images/back.png')} /></View>
                    <View style={stylesheet.navTitle}>
                        <Text style={stylesheet.title}>Select Patients</Text>
                    </View>
                </View> */}
                <View style={stylesheet.addAddressTitleHolder}>
                    <Text style={[stylesheet.titleColor, { fontWeight: 'bold', fontSize: 16 }]}>Add a new patient</Text>
                    <View><TouchableOpacity onPress={this.addEditAddress}><Image source={require('../Images/add.png')} style={stylesheet.addIcon}/></TouchableOpacity></View>
                </View>

                <View style={stylesheet.addressList}>
                    <FlatList
                        data={this.state.familyList}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
                <TouchableOpacity onPress={() => this.onClickContinue()}>
                    <View style={stylesheet.continueView}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>Continue</Text>
                    </View>
                </TouchableOpacity>
                {/* {showInputAlert} */}
            </View>
        )
    }
}

export default FamilyList;


const stylesheet = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8'
    },
    backArrowView: {
        flex: 1,
        marginLeft: 20,
        marginTop: 5
    },
    navBar: {
        height: 40,
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center'
    },
    navTitle: {
        flex: 6,
        justifyContent: 'center'
    },
    title: {
        color: '#2f363f',
        fontSize: 20
    },
    addAddressTitleHolder: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 20
    },
    addressInput: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20,
        borderWidth: 1,
        borderColor: '#40535b62',
        padding: 15
    },
    currentLoc: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addIcon: {
        resizeMode: 'center'
    },
    titleColor: {
        color: '#b3b9bd'
    },
    addressItem: {
        marginBottom: 2
    },
    header: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 20
    },
    footer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: 2
    },
    removeView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: 20,
        borderRightWidth: 2,
        borderRightColor: '#f8f8f8'
    },
    editView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: 20,
    },
    img: {
        alignItems: 'center',
        paddingHorizontal: 20
    },
    savedaddrs: {
        paddingHorizontal: 20
    },
    continueView: {
        marginBottom: 0,
        backgroundColor: '#5eaaa8',
        paddingVertical: 20,
        alignItems: 'center'
    },
    addressList: {
        flex: 1
    }

}
);



