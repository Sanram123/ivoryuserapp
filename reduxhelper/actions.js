import * as actions from './actionTypes'
const Global = require('../Helper/Constants')

export const testAdded = item => ({
  type: actions.TEST_ADDED,
  payload: {
    appointment_id: Global.editAppntId,
    address: item.address,
    timeSlot: item.timeSlot,
    dateSlot: item.dateSlot,
    slotId: item.slotId,
    testDetail: {
      test_name: item.test_name,
      test_id: item.test_id,
      test_type: item.test_type,
      center_id: item.center_id,
      center_name: item.center_name,
      price: item.price,
      count: item.count,
      testFor: item.family,
    },
  },
})

export const testUpdated = (item, family) => ({
  type: actions.TEST_UPDATED,
  payload: {
    item: {
      center_id: item.medical_center,
      test_id: item.id,
    },
    family,
  },
})

export const testRemoved = (item, testType) => ({
  type: actions.TEST_REMOVED,
  payload: {
    item: item,
    testType,
  },
})

export const profileSaved = profile => ({
  type: actions.PROFILE_SAVED,
  payload: {
    id: profile.id,
    phone: profile.phone,
    name: profile.name,
    gender: profile.gender,
    email: profile.email,
    dob: profile.dob,
  },
})

export const testUpdateSlot = slotInfo => ({
  type: actions.TEST_UPDATESLOT,
  payload: {
    timeSlot: slotInfo.timeSlot,
    dateSlot: slotInfo.dateSlot,
    slotId: slotInfo.slotId,
  },
})

export const dateGraph = dateVal => ({
  type: actions.DATE_GRAPH,
  payload: {
    dateVal,
  },
})

export const weekGraph = (fromDate, toDate) => ({
  type: actions.WEEK_GRAPH,
  payload: {
    fromDate,
    toDate,
  },
})

export const resetTest = () => ({
  type: actions.RESET_TESTS,
  payload: {},
})

export const communityInfo = communityInfo => ({
  type: actions.TEST_COMMUNITY_INFO,
  payload: {
    city: communityInfo.city,
    default_steps: communityInfo.default_steps,
    setup_type: communityInfo.setup_type[0],
    society: communityInfo.society,
    pincode: communityInfo.pincode,
  },
})
