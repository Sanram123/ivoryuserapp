import React, {Component} from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  BackHandler,
} from 'react-native'
import CommunityPeriodHeader from '../Components/CommunityPeriodHeader'
import CommunityDayLB from '../Components/CommunityDayLB'
import CommunityWeekMonthYearLB from '../Components/CommunityWeekMonthYearLB'
import DailyChallenges from '../Components/DailyChallenges'
import CommunityLB from '../Components/CommunityLB'
import CommunityJoinedGroups from '../Components/CommunityJoinedGroups'
import CommunityDateView from '../Components/CommunityDateView'
const Global = require('../Helper/Constants')
import api from '../Helper/api'
import fitnessapi from '../Helper/fitnesshandler'
// import * as SecureStore from 'expo-secure-store'
import store from '../reduxhelper/store'
import * as actions from '../reduxhelper/actions'
import * as dateHandler from '../Helper/datehandler'
import AsyncStorage from '@react-native-community/async-storage'
import GoogleFit, {Scopes, BucketUnit} from 'react-native-google-fit'

class CommunityStepBoard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      updateGraph: Global.day,
      updateDayGraph: {},
      dayGraphVal: 0,
      shouldShowGraph: false,
      weekData: [],
      stepsDataToShoww: [],
      rankInfo: [],
      refreshRankBoard: false,
      groupList: [],
      refrshGroupList: false,
      storeInfo : store.getState()
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
    
    console.log(this.state.storeInfo['communityInfo']['setup_type'])
    if (this.state.storeInfo['communityInfo']['setup_type'] == 1) {
      this.getFitbitStepsData(new Date().toISOString().split('T')[0])
    } else if (this.state.storeInfo['communityInfo']['setup_type'] == 3) {
      this.getGoogleFitData(new Date().toISOString())
    }

    store.subscribe(this.storeUpdated)
  }

  componentDidMount () {
    this.getGroupData()
  }

  componentWillMount () {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    )
  }

  componentWillUnmount () {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    )
  }

  handleBackButtonClick () {
    this.props.navigation.popToTop()
    return true
  }

  storeUpdated = () => {
    console.log('store updated')
  }

  getFitbitStepsData = async date_info => {
    fitnessapi.getfitbitsteps(date_info).then(([statuCode, data]) => {
      fitnessapi.saveFitbitSteps(data, date_info).then(([statuCode, data]) => {
        if (statuCode === 200) {
          this.getRankData()
          this.getStepsForDay(date_info)
        } else {
        }
      })
    })
  }

  getGoogleFitData = async date_info => {
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
        if (authResult.success) {
          GoogleFit.getDailySteps(date_info)
            .then(([statuCode, data]) => {
              console.log('Daily steps >>> ', data)
              fitnessapi.saveGoogleFitSteps(data['steps'][0], date_info.split('T')[0]).then((data) => {
                console.log(data)
                // console.log(statuCode)
                // if (statuCode == 200) {
                  this.getRankData()
                  this.getStepsForDay(date_info.split('T')[0])
                // } else {
                // }
              })
            })
            .catch(err => {
              console.warn(err)
            })
        }
      })
      .catch(() => {})
  }

  refreshGraph = type => {
    console.log('-----------')
    console.log(type)
    if (type == 0) {
      this.setState(
        {
          updateGraph: type,
        },
        () =>
          store.dispatch(
            actions.dateGraph(new Date().toISOString().split('T')[0]),
          ),
      )
    } else if (type == 1) {
      var curr = new Date()
      var fromDate = new Date(curr.setDate(curr.getDate() - curr.getDay()))
        .toISOString()
        .split('T')[0]
      var toDate = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6))
        .toISOString()
        .split('T')[0]
      store.dispatch(actions.weekGraph(fromDate, toDate))
      console.log(dateHandler.getDaysArray(fromDate, toDate))
      this.getStepsForWeek(type, fromDate, toDate)
    }
  }

  callLeaderboard = type => {
    this.props.navigation.navigate('LeaderboardDetails', {
      categoryType: type,
    })
  }

  callCreateGroup = () => {
    this.props.navigation.navigate('CommunityCreateGroup')
  }

  updateDateGraph = dateStr => {
    console.log(dateStr)
    // this.getStepsForDay(dateStr)
    if (this.state.storeInfo['communityInfo']['setup_type'] == 1) {
      this.getFitbitStepsData(dateStr)
    } else if (this.state.storeInfo['communityInfo']['setup_type'] == 3) {
      this.getGoogleFitData(dateStr)
    }
  }

  getStepsForDay = async dateStr => {
    console.log('inside getstepsforday')
    console.log(dateStr)
    try {
      await AsyncStorage.getItem('auth_token').then(token => {
        api
          .getData('community/steps/?date=' + dateStr, token)
          .then(([statuCode, data]) => {
            console.log(data)
            if (statuCode === 200) {
              if (data.length > 0) {
                this.setState({
                  updateDayGraph: data[0],
                  shouldShowGraph: true,
                  dayGraphVal:
                    data[0]['completed_steps'] / data[0]['target_steps'],
                })
              } else {
                this.setState({updateDayGraph: {}, shouldShowGraph: false})
              }
            }
          })
      })
    } catch (e) {}
  }

  getRankData = async () => {
    try {
      await AsyncStorage.getItem('auth_token').then(token => {
        api.getData('community/rank/', token).then(([statuCode, data]) => {
          console.log(data)
          if (statuCode === 200) {
            if (data.length > 0) {
              this.setState({
                rankInfo: data,
                refreshRankBoard: true,
              })
            } else {
            }
          }
        })
      })
    } catch (e) {}
  }

  getGroupData = async () => {
    try {
      await AsyncStorage.getItem('auth_token').then(token => {
        api.getData('community/mygroup/', token).then(([statuCode, data]) => {
          console.log(data)
          if (statuCode === 200) {
            if (data.length > 0) {
              this.setState({
                groupList: data,
                refrshGroupList: true,
              })
            } else {
            }
          }
        })
      })
    } catch (e) {}
  }

  getStepsForWeek = async (type, from, to) => {
    try {
      await AsyncStorage.getItem('auth_token').then(token => {
        api
          .getData('community/steps/week/?from=' + from + '&to=' + to, token)
          .then(([statuCode, data]) => {
            let stepsDataToShow = []
            if (statuCode === 200) {
              if (data.length > 0) {
                let dateData = data.map(stepInfo => stepInfo.activity_date)
                let stepsData = data.map(stepInfo => stepInfo.completed_steps)
                let weekInfo = store.getState().weekGraph
                let dayList = dateHandler.getDaysArray(
                  weekInfo.fromDate,
                  weekInfo.toDate,
                )
                console.log(dayList)
                console.log(dateData)
                for (let day of dayList) {
                  console.log(day)
                  if (dateData.includes(day)) {
                    stepsDataToShow.push(
                      stepsData[
                        dateData.findIndex(dayToCheck => day == dayToCheck)
                      ],
                    )
                  } else {
                    stepsDataToShow.push(0)
                  }
                }
              } else {
                stepsDataToShow = [0, 0, 0, 0, 0, 0, 0]
              }
              this.setState(
                {updateGraph: type, stepsDataToShoww: stepsDataToShow},
                () => console.log(this.state.stepsDataToShoww),
              )
            }
          })
      })
    } catch (e) {}
  }

  openGroupMem = item => {
    this.props.navigation.navigate('CommunityGroupStatusList', {
      groupInfo: item['group_info']['id'],
    })
  }

  render () {
    return (
      <SafeAreaView style={stylesheet.container}>
        <ScrollView>
          <View style={stylesheet.headerView}>
            <CommunityPeriodHeader updateGraph={this.refreshGraph} />
          </View>
          <View>
            <CommunityDateView
              onChangeDate={this.updateDateGraph}
              type={this.state.updateGraph}
            />
          </View>
          <View style={stylesheet.graphView}>
            {this.state.updateGraph == 0 ? (
              this.state.shouldShowGraph ? (
                <CommunityDayLB
                  data={this.state.updateDayGraph}
                  val={this.state.dayGraphVal}
                />
              ) : (
                <View />
              )
            ) : (
              <CommunityWeekMonthYearLB data={this.state.stepsDataToShoww} />
            )}
          </View>
          <View>
            <DailyChallenges />
          </View>
          <View>
            {this.state.refreshRankBoard ? (
              <CommunityLB
                callLeaderboard={this.callLeaderboard}
                info={this.state.rankInfo}
              />
            ) : (
              <View />
            )}
          </View>
          <View>
            {this.state.refrshGroupList ? (
              <CommunityJoinedGroups
                createGroup={this.callCreateGroup}
                info={this.state.groupList}
                openGroup={this.openGroupMem}
              />
            ) : (
              <View />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default CommunityStepBoard

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  headerView: {
    // flex: 0.1,
  },
  graphView: {
    marginTop: 20,
  },
  dateView: {
    flexDirection: 'row',
  },
})
