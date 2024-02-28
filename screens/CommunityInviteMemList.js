import React, {Component} from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native'
import CommunityMemberList from '../Components/CommunityMemberList'
import {Searchbar} from 'react-native-paper'
const Global = require('../Helper/Constants')
import api from '../Helper/api'
import AsyncStorage from '@react-native-community/async-storage'

class CommunityInviteMemList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      usersList: [],
      updateList: false,
      groupList: [],
      groupInfo: props.route.params.groupInfo,
    }
    this.getSocietyUsersByCode()
  }

  showAlert = (title, msg) => {
    Alert.alert(title, msg, [
      {
        text: 'Ok',
        onPress: () => this.props.navigation.navigate('CommunityStepBoard'),
        style: 'cancel',
      },
      // { text: "OK", onPress: () => console.log("OK Pressed") }
    ])
  }

  getSocietyUsersByCode = async code => {
    try {
      await AsyncStorage.getItem('auth_token').then(token => {
        console.log(token)
        api
          .getData('community/societyuser/', token)
          .then(([statuCode, data]) => {
            console.log(data)
            if (statuCode === 200) {
              this.setState({usersList: data, updateList: true})
            }
          })
      })
    } catch (e) {}
  }

  updateGroupList = member => {
    memList = this.state.groupList
    if (memList.findIndex(memId => memId == member.id) == -1) {
      memList.push(member.id)
    } else {
      memList = memList.filter(memId => memId !== member.id)
    }
    console.log(memList)
    this.setState({groupList: memList})
  }

  callInviteMem = async () => {
    console.log(this.state.groupList)
    console.log(this.state.groupInfo)
    try {
      await AsyncStorage.getItem('auth_token').then(token => {
        api
          .postData(
            'community/group/create/',
            {
              group_name: this.state.groupInfo,
              mem_list: this.state.groupList,
            },
            token,
          )
          .then(([statuCode, data]) => {
            console.log(data)
            if (statuCode === 200) {
              this.showAlert('', 'Group members invited')
            } else {
            }
          })
      })
    } catch (e) {}
  }

  render () {
    return (
      <SafeAreaView style={stylesheet.container}>
        <View style={stylesheet.searchMenu}>
          <Searchbar
            placeholder='Search Societies/Person'
            onChangeText={this.onChangeSearch}
            value={this.state.searchQuery}
            autoCorrect={false}
          />
        </View>
        <View style={stylesheet.listView}>
          {this.state.updateList ? (
            <CommunityMemberList
              info={this.state.usersList}
              updateMem={this.updateGroupList}
              existingList={this.state.groupList}
            />
          ) : (
            <View />
          )}
        </View>
        <TouchableOpacity
          style={stylesheet.nextTitle}
          onPress={this.callInviteMem}>
          <Text style={stylesheet.nextTitleProp}>Send Invitation</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

export default CommunityInviteMemList

const stylesheet = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  searchMenu: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderColor: 'red',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  listView: {
    flex: 1,
  },
  startStyle: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextTitle: {
    position: 'absolute',
    backgroundColor: '#5EAAA8',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    bottom: 0,
    left: 0,
    right: 0,
  },
  nextTitleProp: {
    color: 'white',
    fontWeight: 'normal',
    fontSize: 18,
  },
  titleColor: {
    color: '#2f363f',
  },
})
