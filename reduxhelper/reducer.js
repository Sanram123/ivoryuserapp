import * as actions from './actionTypes'
const Global = require('../Helper/Constants')

// const initialState = () => ({
//     profileInfo: {},
//     testInfo: []
// })

export default function reducer (
  state = {profileInfo: {}, testInfo: [], communityInfo: {}},
  action,
) {
  switch (action.type) {
    case actions.PROFILE_SAVED:
      return {
        ...state,
        profileInfo: {
          ...state.profileInfo,
          id: action.payload.id,
          name: action.payload.name,
          phone: action.payload.phone,
          gender: action.payload.gender,
          email: action.payload.email,
          dob: action.payload.dob,
        },
      }
    case actions.TEST_ADDED:
      console.log(action.payload)
      return {
        ...state,

        testInfo: [
          ...state.testInfo,
          {
            appointment_id: Global.editAppntId,
            address: action.payload.address,
            timeSlot: action.payload.timeSlot,
            dateSlot: action.payload.dateSlot,
            slotId: action.payload.slotId,
            testDetail: {
              test_name: action.payload.testDetail.test_name,
              test_id: action.payload.testDetail.test_id,
              test_type: action.payload.testDetail.test_type,
              center_id: action.payload.testDetail.center_id,
              center_name: action.payload.testDetail.center_name,
              price: action.payload.testDetail.price,
              count: action.payload.testDetail.count,
              testFor: action.payload.testDetail.testFor,
            },
          },
        ],
      }
    case actions.TEST_UPDATED:
      return {
        ...state,
        testInfo: [
          ...state.testInfo.filter(test =>
            test.testDetail.center_id === action.payload.item.center_id &&
            test.testDetail.test_id === action.payload.item.test_id
              ? (test.testDetail.testFor = action.payload.family)
              : test,
          ),
        ],
      }
    case actions.TEST_REMOVED:
      return {
        ...state,
        testInfo: [
          ...state.testInfo.filter(
            test =>
              test.testDetail.center_id != action.payload.item.medical_center ||
              test.testDetail.test_id != action.payload.item.id ||
              test.testDetail.test_type != action.payload.testType,
          ),
        ],
      }

    case actions.TEST_UPDATESLOT:
      return {
        ...state,
        testInfo: [
          ...state.testInfo.map(test => ({
            ...test,
            dateSlot: action.payload.dateSlot,
            timeSlot: action.payload.timeSlot,
            slotId: action.payload.slotId,
          })),
        ],
      }

    case actions.DATE_GRAPH:
      return {
        ...state,
        dateGraph: {
          dateVal: action.payload.dateVal,
        },
      }

    case actions.WEEK_GRAPH:
      return {
        ...state,
        weekGraph: {
          fromDate: action.payload.fromDate,
          toDate: action.payload.toDate,
        },
      }

    case actions.RESET_TESTS:
      return {
        ...state,
        testInfo: [],
      }

    case actions.TEST_COMMUNITY_INFO:
      return {
        ...state,
        communityInfo: {
          city: action.payload.city,
          default_steps: action.payload.default_steps,
          setup_type: action.payload.setup_type,
          society: action.payload.society,
          pincode: action.payload.pincode,
        },
      }

    default:
      return state
  }
}
