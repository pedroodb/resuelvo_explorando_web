import {
  ACTIVITIES_REQUEST,
  ACTIVITIES_SUCCESS,
  ACTIVITIES_FAILURE,
} from '../constants/activitiesConstants'

import {
  UNSET,
  PENDING,
  SUCCESS,
  FAILURE,
} from '../constants/status'

const initialState = {
  status:UNSET,
  error:UNSET,
  activities:[],
}

const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVITIES_REQUEST:
      return {
        ...state,
        status:PENDING,
      }
    case ACTIVITIES_SUCCESS:
      return {
        ...state,
        status:SUCCESS,
        activities:action.payload,
      }
    case ACTIVITIES_FAILURE:
      return {
        ...state,
        status:FAILURE,
        error:action.payload,
      }
    default:
      return state 
  }
}

export default activityReducer