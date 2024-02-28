import React, {Component} from 'react'
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import store from '../reduxhelper/store'

const Global = require('../Helper/Constants')

class PackageListView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      packageTest: [],
    }
  }

  componentDidMount () {
    this.getPackageTest()
  }

  genereateColorCode = () => {
    return (
      'rgba(' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ', 0.6)'
    )
  }

  callSearch = (isSeeAll, pkgName) => {
    console.log('its clickeddddd')
    if (isSeeAll) {
      this.props.onClick('packagetest', '')
    } else {
      this.props.onClick('packagetest', pkgName)
    }
  }

  getPackageTest = () => {
    fetch(Global.BASE_URL + 'packages/info/', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        this.setState({packageTest: json})
      })
      .catch(error => {
        console.error(error)
      })
  }

  renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        this.callSearch(false, item.name)
      }}>
      <View style={stylesheet.item}>
        <ImageBackground
          source={require('../Images/ff.jpeg')}
          style={stylesheet.image}>
          <Text
            style={[
              stylesheet.textView,
              {backgroundColor: this.genereateColorCode()},
            ]}>
            {item.NAME}
          </Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  )

  render () {
    return (
      <View style={stylesheet.labsTestContainer}>
        <View style={stylesheet.labTestTitleBar}>
          <Text style={stylesheet.fontStyles}>Health Packages</Text>
          {/* <Button title={this.props.title} /> */}
          <TouchableWithoutFeedback
            onPress={() => {
              this.callSearch(true, '')
            }}>
            <Text style={{color: '#5eaaa8', fontSize: 16}}>
              {this.props.title}
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <View>
          <FlatList
            data={this.state.packageTest}
            renderItem={this.renderItem}
            keyExtractor={item => item.name}
            horizontal={true}
          />
        </View>
      </View>
    )
  }
}

export default PackageListView

const stylesheet = StyleSheet.create({
  fontStyles: {
    fontWeight: 'bold',
    fontSize: 22,
    fontStyle: 'normal',
  },
  labsTestContainer: {
    backgroundColor: 'white',
    marginVertical: 5,
  },
  packageContainer: {
    backgroundColor: 'white',
    marginVertical: 5,
  },
  labTestTitleBar: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    padding: 20,
  },
  item: {
    width: 150,
    height: 200,
    backgroundColor: 'red',
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    flex: 1,
    borderRadius: 20,
  },
  title: {
    fontSize: 16,
    color: 'white',
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: 200,
    borderRadius: 5,
    overflow: 'hidden',
  },
  textView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  fontStyles: {
    fontWeight: 'bold',
    fontSize: 18,
    fontStyle: 'normal',
    color: '#2f363f',
  },
})
