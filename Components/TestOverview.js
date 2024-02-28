import React, {Component} from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'

class TestOverview extends Component {
  constructor (props) {
    super(props)
    console.log(props.data.name)
  }

  removeOverview = () => {
    this.props.onClickRemoveView()
    console.log('removing')
  }

  render () {
    return (
      <View style={stylesheet.container}>
        <View style={stylesheet.informationContainer}>
          <View style={stylesheet.resBody}>
            <View style={stylesheet.profileImg}>
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
            <View style={stylesheet.infoView}>
              <Text
                style={[
                  stylesheet.lineSpacing,
                  {color: '#2f363f', fontSize: 14},
                ]}>
                {this.props.data.test_name}
              </Text>
              <Text
                style={[
                  stylesheet.lineSpacing,
                  {color: '#81878c', fontSize: 13},
                ]}>
                {this.props.data.mc_name} | {this.props.data.area_name}
              </Text>
              <Text
                style={[
                  stylesheet.lineSpacing,
                  {color: '#81878c', fontSize: 13},
                ]}>
                2.5 km | 29 mins
              </Text>
            </View>
            <View style={stylesheet.priceView}>
              <Text
                style={{
                  color: '#f7b500',
                  fontSize: 14,
                  marginTop: 20,
                  textAlign: 'right',
                  marginRight: 20,
                }}>
                ${this.props.data.test_sell_price}
              </Text>
            </View>
          </View>
          <View style={stylesheet.overview}>
            <Text style={stylesheet.title}>Overview:</Text>
            <Text style={stylesheet.desc}>{this.props.data.overview}</Text>
          </View>
          <View style={stylesheet.overview}>
            <Text style={stylesheet.title}>Instructions for the test:</Text>
            <Text style={stylesheet.desc}>{this.props.data.instructions}</Text>
          </View>
          <View style={stylesheet.cartView}>
            {/* <TouchableOpacity onPress={() => this.onClick(item)}> */}
            <View style={stylesheet.selected}>
              <Text style={stylesheet.textWhite}>Add to cart</Text>
            </View>
            {/* </TouchableOpacity> */}
            <TouchableOpacity onPress={() => this.removeOverview()}>
              <View style={stylesheet.selected}>
                <Text style={stylesheet.textWhite}>Go Back</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

export default TestOverview

const stylesheet = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(00, 00, 00, 0.8)',
  },
  informationContainer: {
    marginTop: 200,
    height: 500,
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  resBody: {
    marginTop: 15,
    flexDirection: 'row',
    height: 100,
    marginLeft: 20,
    marginRight: 10,
  },
  profileImg: {
    flex: 2,
  },
  infoView: {
    flex: 4,
    marginHorizontal: 15,
  },
  priceView: {
    flex: 2,
    marginTop: 5,
  },
  cartView: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#5eaaa8',
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginTop: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWhite: {
    color: 'white',
  },
  lineSpacing: {
    marginTop: 5,
  },
  overview: {
    marginHorizontal: 15,
  },
  title: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2f363f',
  },
  desc: {
    color: '#81878c',
  },
})
