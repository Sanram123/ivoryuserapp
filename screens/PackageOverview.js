import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Image,
  Text,
} from 'react-native'
import api from '../Helper/api'
// import * as SecureStore from 'expo-secure-store';
import {AsyncStorage} from '@react-native-community/async-storage'

class PackageOverview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: props.route.params.itemInfo,
      testList: [],
    }
    console.log(this.state.item);
    // this.getPackageDetail()
  }

  getPackageDetail = async () => {
    try {
      await AsyncStorage.getItem('auth_token').then(token => {
        console.log(token)
        api
          .getData('package/pkg/' + this.state.item.id, '')
          .then(([statuCode, data]) => {
            console.log(data)
            if (statuCode === 200) {
              this.setState({testList: data['package']})
            }
          })
      })
    } catch (e) {}
  }

  render() {
    return (
      <SafeAreaView style={stylesheet.container}>
        <View style={stylesheet.navBar}>
          <View style={stylesheet.backArrowView}>
            <Image source={require('../Images/back.png')} />
          </View>
          <View style={stylesheet.navTitle}>
            <Text style={stylesheet.title}>
              {this.state.item.test_name} overview
            </Text>
          </View>
        </View>
        <ScrollView
          style={{
            position: 'absolute',
            bottom: 50,
            top: 80,
            left: 0,
            right: 0,
          }}>
          <View style={stylesheet.imgSec}>
            <Image
              source={require('../Images/ivoryspcl.png')}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
              }}
            />
          </View>
          <View style={stylesheet.titleSec}>
            <View style={stylesheet.titleSecSub1}>
              <Text
                style={[
                  stylesheet.linespacing,
                  stylesheet.texBold,
                  {fontSize: 17},
                ]}>
                {this.state.item.name}
              </Text>
              <Text style={(stylesheet.linespacing, stylesheet.bodyColor)}>
                {this.state.item.mc_name}
              </Text>
              <Text style={(stylesheet.linespacing, stylesheet.bodyColor)}>
                2.5 km | 29 mins
              </Text>
            </View>
            <View style={stylesheet.titleSecSub2}>
              <Text style={{color: '#f7b500'}}>${this.state.item.price}</Text>
            </View>
          </View>
          <View style={stylesheet.overviewSec}>
            <View style={stylesheet.overviewSub1}>
              <Text
                style={[
                  stylesheet.overviewSub1Text,
                  stylesheet.texBold,
                  stylesheet.textSize,
                ]}>
                Overview
              </Text>
              <Text
                style={[
                  stylesheet.overviewSub1Text,
                  stylesheet.texBold,
                  stylesheet.textSize,
                ]}>
                Report TAT
              </Text>
            </View>
            <View style={[stylesheet.overviewSub2, stylesheet.bodyColor]}>
              <Text style={stylesheet.bodyColor}>
                {this.state.item.overview}
              </Text>
            </View>
          </View>
          <View style={stylesheet.testSec}>
            <Text
              style={[
                stylesheet.linespacing,
                stylesheet.texBold,
                stylesheet.textSize,
              ]}>
              List of tests included
            </Text>
            <Text style={stylesheet.bodyColor}>
              A list of all the tests included will be added here.
            </Text>
            {this.state.testList.map(test => (
              <Text style={stylesheet.bodyColor}>->{test.name}</Text>
            ))}
          </View>
          <View style={stylesheet.instructionSec}>
            <Text
              style={[
                stylesheet.linespacing,
                stylesheet.texBold,
                stylesheet.textSize,
              ]}>
              Preparation for the test
            </Text>
            <Text style={stylesheet.bodyColor}>
              {this.state.item.instruction}
            </Text>
          </View>
        </ScrollView>
        <View style={stylesheet.bookTest}>
          <Text style={{color: 'white', fontSize: 14}}>Book Test</Text>
        </View>
      </SafeAreaView>
    )
  }
}

export default PackageOverview

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  imgSec: {
    height: 200,
    marginVertical: 10,
  },
  titleSec: {
    flexDirection: 'row',
  },
  titleSecSub1: {
    flex: 3,
    marginLeft: 20,
  },
  titleSecSub2: {
    flex: 1,
    alignItems: 'flex-end',
    marginTop: 5,
    marginRight: 20,
  },
  overviewSec: {
    marginVertical: 15,
  },
  overviewSub1: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 5,
  },
  overviewSub1Text: {
    marginRight: 15,
  },
  overviewSub2: {
    margin: 20,
  },
  testSec: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  instructionSec: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  linespacing: {
    marginVertical: 5,
  },
  texBold: {
    fontWeight: 'bold',
  },
  bookTest: {
    backgroundColor: '#5eaaa8',
    height: 50,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyColor: {
    color: '#81878c',
  },
  textSize: {
    fontSize: 16,
  },
  backArrowView: {
    flex: 1,
    marginLeft: 20,
    marginTop: 5,
  },
  navBar: {
    height: 40,
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  navTitle: {
    flex: 6,
    justifyContent: 'center',
  },
  title: {
    color: '#2f363f',
    fontSize: 20,
  },
})
