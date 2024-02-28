import React, { Component } from 'react'
import { StyleSheet, View, Dimensions, Text } from 'react-native'
import { ProgressChart } from 'react-native-chart-kit'


const screenWidth = Dimensions.get('window').width
const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#ffffff',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
  barRadius: 50
}

class CommunityDayLB extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View>
        <ProgressChart
          data={[this.props.val,]}
          width={screenWidth}
          height={220}
          strokeWidth={12}
          radius={100}
          chartConfig={chartConfig}
          hideLegend={true}
        />
        <View style={stylesheet.graphInfo}>
          <Text>Steps</Text>
          <Text>{this.props.data['completed_steps']}</Text>
          <Text>Goal: {this.props.data['target_steps']}</Text>
        </View>
      </View>
    )
  }
}

export default CommunityDayLB

const stylesheet = StyleSheet.create({
  container: {
    flex: 1
  },
  graphInfo: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
