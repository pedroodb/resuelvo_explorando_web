import {
  ACTIVITIES_REQUEST,
  ACTIVITIES_SUCCESS,
  ACTIVITIES_FAILURE,
  ACTIVITY_SAVE_REQUEST,
  ACTIVITY_SAVE_SUCCESS,
  ACTIVITY_SAVE_FAILURE,
  ACTIVITY_DELETE_REQUEST,
  ACTIVITY_DELETE_SUCCESS,
  ACTIVITY_DELETE_FAILURE,
} from '../constants/activities'

import {
  UNSET,
  PENDING,
  SUCCESS,
  FAILURE,
  OUTDATED,
} from '../constants/status'

const initialState = {
  index:{
    activities:[],
    status:UNSET,
    error:UNSET,
  },
  save:{
    status:UNSET,
    error:UNSET,
    last:UNSET,
  },
  del:{
    status:UNSET,
    error:UNSET,
    last:UNSET,
  }
}

const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVITIES_REQUEST:
      return {
        ...state,
        index:{
          ...state.index,
          status:PENDING,
        }
      }
    case ACTIVITIES_SUCCESS:
      return {
        ...state,
        index:{
          status:SUCCESS,
          activities:action.payload,
        }
      }
    case ACTIVITIES_FAILURE:
      return {
        ...state,
        index:{
          ...state.index,
          status:FAILURE,
          error:action.payload,
        }
      }
    case ACTIVITY_SAVE_REQUEST:
      return {
        ...state,
        save:{
          ...state.save,
          status:PENDING,
        }
      }
    case ACTIVITY_SAVE_SUCCESS:
      return {
        ...state,
        index:{
          ...state.index,
          status:OUTDATED,
        },
        save:{
          ...state.save,
          status:SUCCESS,
          last:action.payload,
        }
      }
    case ACTIVITY_SAVE_FAILURE:
      return {
        ...state,
        save:{
          ...state.save,
          status:FAILURE,
          error:action.payload,
        }
      }
    case ACTIVITY_DELETE_REQUEST:
      return {
        ...state,
        del:{
          ...state.del,
          status:PENDING,
        }
      }
    case ACTIVITY_DELETE_SUCCESS:
      return {
        ...state,
        index:{
          ...state.index,
          status:OUTDATED,
        },
        del:{
          ...state.del,
          status:SUCCESS,
        }
      }
    case ACTIVITY_DELETE_FAILURE:
      return {
        ...state,
        del:{
          ...state.del,
          status:FAILURE,
          error:action.payload,
        }
      }
    default:
      return state 
  }
}

export default activityReducer