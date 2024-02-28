import React, { Component } from 'react'
import { StyleSheet, View, Dimensions, Text } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

const screenWidth = Dimensions.get('window').width
const chartConfig = {
  backgroundGradientFrom: '#f2f4f3',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#f2f4f3',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(136, 128, 168, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
}

class CommunityWeekMonthYearLB extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
          {
            data: props.data,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
        legend: ['Steps'] // optional
      }
    }
  }

  render () {
      console.log('-------*********')
      console.log(this.props.data)
    return (
      <View style={stylesheet.container}>
        <LineChart
          data={{
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            datasets: [
              {
                data: this.props.data,
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
              }
            ],
            legend: ['Steps'] // optional
          }}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          segments={5}
        />
      </View>
    )
  }
}

export default CommunityWeekMonthYearLB

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
  },
  graphStyle: {
    // backgroundColor: 'red'
  }
})
