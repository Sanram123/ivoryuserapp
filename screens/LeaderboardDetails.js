import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image, Dimensions } from 'react-native';
import { Searchbar } from 'react-native-paper';
import CommunityLBRank from '../Components/CommunityLBRank';
const screenWidth = Dimensions.get("window").width;
import AsyncStorage from '@react-native-community/async-storage'
const Global = require('../Helper/Constants')
import api from '../Helper/api'

class LeaderboardDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchQuery: '',
            userList: [],
            rank: '',
            categoryType: props.route.params.categoryType
        }
    }

    componentDidMount(){
        this.getLBDetails()
        
    }

    onChangeSearch = query => {
        this.setState({ searchQuery: query })
    }

    getLBDetails = async type => {
        try{
          await AsyncStorage.getItem('auth_token').then(token => {
            api
              .getData('community/leaderboard/?type=' + this.state.categoryType, token)
              .then(([statuCode, data]) => {
                console.log(data)
                if (statuCode === 200) {
                  if (data['data'].length > 0) {
                    this.setState({
                      userList: data['data'],
                      rank: data['rank'],
                      updateView: true
                    })
                  } else {
                    this.setState({ userList: [], updateView: false, rank: '' })
                  }
                }
              })
          })
        }catch(e){
    
        }
        
      }

    render() {
        return (
            <SafeAreaView style={stylesheet.container}>
                <View style={stylesheet.searchMenu}>
                    <Searchbar placeholder="Search Societies/Person" onChangeText={this.onChangeSearch} value={this.state.searchQuery} autoCorrect={false} />
                </View>
                <View style={stylesheet.imgHolder}>
                    <Image source={require('../Images/profile_side_icon.png')} style={stylesheet.imgStyle} />
                    <Image source={require('../Images/profile_side_icon.png')} style={stylesheet.imgStyle} />
                    <Image source={require('../Images/profile_side_icon.png')} style={stylesheet.imgStyle} />
                </View>
                <View>
                    {this.state.updateView ? <CommunityLBRank info={this.state.userList}/> : <View/>}
                </View>
            </SafeAreaView>
        );
    }
}

export default LeaderboardDetails;


const stylesheet = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F8F8F8'
    },
    searchMenu: {
        marginHorizontal: 20,
        marginVertical: 10
    },
    imgStyle: {
        width: (screenWidth/3)-20,
        height: (screenWidth/3)-20,
        borderRadius: ((screenWidth/3)/2),
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "white",
        margin: 10

    },
    imgHolder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});