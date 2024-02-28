import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, Button, TouchableWithoutFeedback, Image } from 'react-native';

const Global = require('../Helper/Constants');

class LabTestView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      labtest: [{
        id: 0,
        title: 'Book an appointment',
      },

      {
        id: 1,
        title: 'Book a vaccine',
      }],
      isLoaded: true
    }

  }

  componentDidMount() {
    console.log("lab")
    // this.getLabTest()
    // this.getLabTest()
  }

  onClickOption = (id) => {
    console.log(id)
    this.props.onClick(id)
  }

  getLabTest = () => {
    console.log('getlab')
    fetch(Global.BASE_URL + 'lab/test/', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({ labtest: json, isLoaded: true })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  genereateColorCode = () => {
    return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

  }

  renderItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => this.onClickOption(item.id)}>
      <View style={[stylesheet.item]}>

        <View style={stylesheet.labInnerView}>
          <Image source={require('../Images/ivoryspcl.png')} style={{ flex: 1, width: 25, height: 25, resizeMode: 'center' }} />
        </View>
        <Text style={stylesheet.title} numberOfLines={2}>{item.title}</Text>

      </View>
    </TouchableWithoutFeedback>
  );

  callSearch = () => {
    console.log('its clickeddddd')
    this.props.onClick('labtest')
  }

  render() {
    console.log('renderer')
    if (this.state.isLoaded) {
      return (
        <View style={stylesheet.labsTestContainer}>
          <View style={stylesheet.labTestTitleBar}>
            <Text style={stylesheet.fontStyles}>Get Started</Text>
            {/* <Button title={this.props.title} /> */}
            {/* <TouchableWithoutFeedback onPress={this.callSearch}>
              <Text style={{ color: '#5eaaa8', fontSize: 16, flex: 2, height: 15 }}>{this.props.title}</Text>
            </TouchableWithoutFeedback> */}
          </View>
          <View>
            <FlatList
              data={this.state.labtest}
              renderItem={this.renderItem}
              keyExtractor={item => item.id}
              horizontal={true}
            />
          </View>
        </View>
      )
    }
    else {
      return (<View></View>);
    }
  }
}

export default LabTestView;


const stylesheet = StyleSheet.create({
  fontStyles: {
    fontWeight: 'bold',
    fontSize: 22,
    fontStyle: 'normal'
  },
  labsTestContainer: {
    backgroundColor: 'white',
    marginVertical: 5
  },
  packageContainer: {
    backgroundColor: 'white',
    marginVertical: 5
  },
  labTestTitleBar: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    padding: 20
  },
  item: {
    width: 120,
    height: 170,
    marginVertical: 8,
    marginHorizontal: 14,
    flexDirection: 'column',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 14,
    color: '#2f363f',
    height: 40,

  },
  fontStyles: {
    fontWeight: 'bold',
    fontSize: 20,
    fontStyle: 'normal',
    color: '#2f363f'
  },
  labInnerView: {
    backgroundColor: '#81878c',
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 5
  }
}); 