import React, {Component} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import GoogleFit, {Scopes, BucketUnit} from 'react-native-google-fit'

class GoogleFitIntegration extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    // GoogleFit.checkIsAuthorized().then(() => {
      // console.log(GoogleFit.isAuthorized) // Then you can simply refer to `GoogleFit.isAuthorized` boolean.
      const options = {
        scopes: [
          Scopes.FITNESS_ACTIVITY_READ,
          Scopes.FITNESS_ACTIVITY_WRITE,
          Scopes.FITNESS_BODY_READ,
          Scopes.FITNESS_BODY_WRITE,
        ],
      }
      GoogleFit.authorize(options)
        .then(authResult => {
          console.log(authResult)
          if (authResult.success) {
            // const opt = {
            //   startDate: "2022-04-07T00:00:00-04:00", // required ISO8601Timestamp
            //   endDate: new Date().toISOString(), // required ISO8601Timestamp
            //   bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
            //   bucketInterval: 1, // optional - default 1. 
            // };
            
            // GoogleFit.getDailyStepCountSamples(opt)
            //  .then((res) => {
            //      console.log('Daily steps >>> ', res)
            //  })
            //  .catch((err) => {console.warn(err)});
            // GoogleFit.getDailySteps(new Date().toISOString())
            // .then(res => {
            //   console.log('Daily steps >>> ', res)
            // })
            // .catch((err) => {console.warn(err)});
            this.props.navigation.navigate('CommunityProfile',
            {
              device_type: this.props.route.params.device_type,
              user_id: ''
            });
            
            
          } else {
          }
        })
        .catch(() => {
        })
    // })
    
      
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Welcome to Google Fit Integration</Text>
      </View>
    )
  }
}

export default GoogleFitIntegration

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
