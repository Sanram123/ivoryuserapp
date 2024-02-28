import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  Image
} from 'react-native'
import * as datehandler from '../Helper/datehandler';
import store from '../reduxhelper/store'
import * as actions from '../reduxhelper/actions';


class CommunityDateView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dateVal: '',
      fromDate: '',
      toDate: ''
    }
    this.updatDate(new Date())
    console.log(store.getState())
  }

  updatDate = dateVal => {
    store.dispatch(actions.dateGraph(new Date(dateVal).toISOString().split('T')[0]))
  }

  backArrow = () => {
    console.log('backarrow')
    if (this.props.type == 0) {
      let preDate = datehandler.showDay(true, store.getState().dateGraph.dateVal)
      this.updatDate(preDate)
      this.props.onChangeDate(preDate)
    }else if(this.props.type == 1){
      let preWeek = datehandler.showWeek()
    }
  }

  frontArrow = () => {
    console.log('frontarrow')
    if (this.props.type == 0) {
      let nextDate = datehandler.showDay(false, store.getState().dateGraph.dateVal)
      this.updatDate(nextDate)
      this.props.onChangeDate(nextDate)
    }else if(this.props.type == 1){
      let nextWeek = datehandler.showWeek()
    }
  }

  

  render () {
    return (
      <View style={stylesheet.container}>
        <View style={stylesheet.subView}>
          <TouchableWithoutFeedback onPress={this.backArrow} style={stylesheet.arrowStyle}>
            <Image
              source={require('../Images/backarrow.png')}
              style={stylesheet.arrowStyle}
            />
          </TouchableWithoutFeedback>
          <Text style={{ flex: 1, textAlign: 'center' }}>
            {this.props.type == 0 ? store.getState().dateGraph.dateVal : store.getState().weekGraph.fromDate+' to '+store.getState().weekGraph.toDate}
          </Text>
          <TouchableWithoutFeedback onPress={this.frontArrow} style={stylesheet.arrowStyle}>
            <Image
              source={require('../Images/frontarrow.png')}
              style={stylesheet.arrowStyle}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}

export default CommunityDateView

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: 'white',
    padding: 10
  },
  arrowStyle: {
    resizeMode: 'center'
  },
  subView: {
    flexDirection: 'row'
  },
  arrowStyle: {
    padding: 10
  }
})
