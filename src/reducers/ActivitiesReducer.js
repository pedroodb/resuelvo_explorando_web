import {
  ACTIVITIES_UPDATE
} from '../constants'

const initialState = {
  activities:[],
}

const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVITIES_UPDATE:
      return {
        ...state,
        activities:action.payload,
      }
    default:
      return state 
  }
}

export default activityReducer