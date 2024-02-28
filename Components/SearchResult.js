import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native'
import TestOverview from './TestOverview'
import CartStatus from './CartStatus'
// import CartModel from '../Model/CartModel';
import CartAddRemove from './CartAddRemove'
import AddToCart from './AddToCart'
const Global = require('../Helper/Constants')
import store from '../reduxhelper/store'

class SearchResult extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  checkTestExist = item => {
    let storeInfo = store.getState()
    console.log('*************************')
    console.log(storeInfo)
    console.log(item)
    let isTestExist = storeInfo.testInfo.filter(
      test =>
        test.testDetail.center_id === item.medical_center &&
        test.testDetail.test_id === item.id &&
        test.testDetail.test_type === this.props.testType,
    )
    console.log(isTestExist.length)
    return isTestExist.length > 0 ? false : true
  }

  onClickOverview = item => {
    this.props.onClickOverview(item)
  }

  resultItem = ({item}) => (
    <View style={stylesheet.rowContainer}>
      <View style={stylesheet.resBody}>
        <View style={stylesheet.profileImg}>
          <Image
            source={require('../Images/ivoryspcl.png')}
            style={{flex: 1, width: null, height: null, resizeMode: 'contain'}}
          />
        </View>
        <View style={stylesheet.infoView}>
          <Text
            style={[stylesheet.lineSpacing, {color: '#2f363f', fontSize: 14}]}>
            {item.test_name}
          </Text>
          <Text
            style={[stylesheet.lineSpacing, {color: '#81878c', fontSize: 13}]}>
            {item.mc_name} | {item.area_name}
          </Text>
          <Text
            style={[stylesheet.lineSpacing, {color: '#81878c', fontSize: 13}]}>
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
            ${item.test_sell_price}
          </Text>
        </View>
      </View>
      <View style={stylesheet.cartView}>
        <View style={stylesheet.deselected}>
          {this.checkTestExist(item) ? (
            <AddToCart data={item} navigateRef={this.props.navigateRef} />
          ) : (
            <CartAddRemove
              data={item}
              navigateRef={this.props.navigateRef}
              testType={this.props.testType}
            />
          )}
        </View>
        <TouchableOpacity onPress={() => this.onClickOverview(item)}>
          <View style={stylesheet.deselected}>
            <Text style={stylesheet.textGray}>View Details</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )

  render () {
    return (
      <View style={stylesheet.container}>
        <FlatList
          data={this.props.data}
          renderItem={this.resultItem}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }
}

export default SearchResult

const stylesheet = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
  },
  searchHolder: {
    flex: 2,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
  },

  resTitle: {
    color: '#2f363f',
    marginHorizontal: 20,
    marginTop: 20,
    fontSize: 18,
  },
  flatHolder: {
    height: 40,
    marginHorizontal: 20,
    marginTop: 20,
  },

  resBody: {
    marginTop: 15,
    flexDirection: 'row',
    height: 100,
    marginLeft: 20,
    marginRight: 10,
  },
  bodyTitle: {
    marginLeft: 25,
  },
  btnStyle: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#5eaaa8',
    marginRight: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#5eaaa8',
    marginBottom: 10,
  },
  profileImg: {
    flex: 2,
  },
  infoView: {
    flex: 4,
  },
  priceView: {
    flex: 2,
  },
  rowContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    marginVertical: 10,
  },
  cartView: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  selected: {
    backgroundColor: '#5eaaa8',
    // paddingHorizontal: 25,
    // paddingVertical: 15,
    width: 130,
    height: 50,
    marginLeft: 20,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWhite: {
    color: 'white',
  },
  textGray: {
    color: '#5eaaa8',
  },
  lineSpacing: {
    marginTop: 5,
    marginLeft: 10,
  },
  deselected: {
    // paddingHorizontal: 25,
    // paddingVertical: 15,
    width: 130,
    height: 50,
    marginLeft: 20,
    marginTop: 10,
    borderRadius: 5,
    borderColor: '#5eaaa8',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartStatus: {
    height: 70,
    marginBottom: 0,
    marginHorizontal: 0,
  },
})
