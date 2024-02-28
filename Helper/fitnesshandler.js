import AsyncStorage from '@react-native-community/async-storage'
import api from '../Helper/api'
import store from '../reduxhelper/store';
import GoogleFit, {Scopes, BucketUnit} from 'react-native-google-fit'

export default {
  getfitbitsteps: async date_info => {
    try {
      await AsyncStorage.getItem('fitbit_token').then(token => {
        console.log('fitbit token ')
        console.log(token)
        api
          .getFitbitData(
            'https://api.fitbit.com/1/user/-/activities/date/' +
              date_info +
              '.json',
            token,
          )
          .then(([statuCode, data]) => {
            // console.log(data)
            //   if (statuCode === 200) {
            //     this.saveFitbitSteps(data, date_info)
            //   }
            // const statusCode = response.status
            // const data = response.json()
            return Promise.all([statuCode, data])
          })
      })
    } catch (e) {}
  },

  saveFitbitSteps: async (fitbit_data, dateInfo) => {
    try {
      AsyncStorage.getItem('auth_token').then(token => {
        api
          .postData(
            'community/activity/create/',
            {
              target_steps: fitbit_data['goals']['steps'],
              completed_steps: fitbit_data['summary']['steps'],
              activity_date: dateInfo,
            },
            token,
          )
          .then(([statuCode, data]) => {
            console.log(data)
            return Promise.all([statuCode, data])
          })
      })
    } catch (e) {}
  },
  getGoogleFitSteps: async date_info => {
    console.log(date_info)
    
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
          const opt = {
              startDate: '2022-04-07', // required ISO8601Timestamp
              endDate: date_info, // required ISO8601Timestamp
              bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
              bucketInterval: 1, // optional - default 1. 
            };
          GoogleFit.getDailySteps(new Date(date_info).toISOString())
            .then(([statuCode, data]) => {
              console.log('Daily steps >>> ', data)
              return Promise.all([statuCode, data])
            })
            .catch(err => {
              console.warn(err)
            })
        } else {
        }
      })
      .then(([statuCode, data]) => {
        return Promise([statuCode, data])
      })
      .catch(() => {})
  },
  saveGoogleFitSteps: async (googlefit_data, dateInfo) => {
    let storeInfo = store.getState()
    try {
      AsyncStorage.getItem('auth_token').then(token => {
        api
          .postData(
            'community/activity/create/',
            {
              target_steps: storeInfo['communityInfo']['default_steps'],
              completed_steps: googlefit_data['value'],
              activity_date: dateInfo,
            },
            token,
          )
          .then(([statuCode, data]) => {
            console.log('--------------')
            console.log(data)
            console.log(statuCode)
            return data
          })
      })
    } catch (e) {
      console.log(e)
    }
  }
}
