import React, { Component } from 'react';
import {StyleSheet, View, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import CommunityGroupMemStatus from '../Components/CommunityGroupMemStatus';
const Global = require('../Helper/Constants');
import api from '../Helper/api';
import  AsyncStorage  from '@react-native-community/async-storage';

class CommunityGroupStatusList extends Component{
    constructor(props){
        super(props);
        this.state = {
            updateHeader: true,
            groupId: props.route.params.groupInfo,
            statusType: 0,
            groupList: [],
            refrshGroupList: true
        }
        this.getGroupData()
    }

    onClickPending = () => {
        console.log('pending')
        this.setState({updateHeader: true, statusType: 0, refrshGroupList: true}, () => this.getGroupData())
    }

    onClickAccepted = () => {
        console.log('accepted')
        this.setState({updateHeader: false, statusType: 1, refrshGroupList: true}, () => this.getGroupData())
    }

    getGroupData = async () => {
        try {
          await AsyncStorage.getItem('auth_token').then(token => {
            api.getData('community/grpmemlist/?groupid='+this.state.groupId+'&status='+this.state.statusType, token).then(([statuCode, data]) => {
              console.log(data)
              if (statuCode === 200) {
                // if (data.length > 0) {
                  this.setState({
                    groupList: data,
                    refrshGroupList: true,
                  })
                // } else {
                // }
              }
            })
          })
        } catch (e) {}
      }

    render(){
        return(
            <SafeAreaView>
                <View style={style.headerView}>
                    <TouchableOpacity style={this.state.updateHeader ? style.underline : style.blankline} onPress={this.onClickPending}>
                        <Text>Pending</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={this.state.updateHeader ? style.blankline : style.underline} onPress={this.onClickAccepted}>
                        <Text>Accepted</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={style.bodyData}> */}
                    {this.state.refrshGroupList ? <CommunityGroupMemStatus userInfo={this.state.groupList}/> : <View/>}
                {/* </View> */}
            </SafeAreaView>
        );
    }
}

export default CommunityGroupStatusList;

const style = StyleSheet.create(
    {
        container: {
            flex: 1
        },
        headerView: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            // paddingVertical: 20
        },
        underline: {
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            flex: 1,
            alignItems: 'center',
            margin: 10,
            paddingVertical: 10
        },
        blankline: {
            borderBottomColor: 'clear',
            borderBottomWidth: 0,
            flex: 1,
            alignItems: 'center',
            margin: 10,
            paddingVertical: 10
        },
        bodyData: {
            flex: 1,
            backgroundColor: 'red'
        }
    }
);