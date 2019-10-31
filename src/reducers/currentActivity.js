import {
  ACTIVITY_CLEAR,
  ACTIVITY_SET,
  ACTIVITY_SAVE_REQUEST,
  ACTIVITY_SAVE_SUCCESS,
  ACTIVITY_SAVE_FAILURE,
  FIELD_SET,
  TASK_ADD,
  TASK_REMOVE,
  TASK_EDIT,
} from '../constants/currentActivity'

import {
  PENDING,
  SUCCESS,
  FAILURE,
  OUTDATED,
  UNSET,
} from '../constants/status'

const initialState = {
  activity:{
    title:'',
    description:'',
    tasks:[],
  },
  store_status:UNSET,
  store_error:UNSET,
}

const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVITY_CLEAR:
      return initialState
    case ACTIVITY_SET:
      return {
        ...state,
        ...action.payload,
        store_status:UNSET,
        store_error:UNSET,
      }
    case ACTIVITY_SAVE_REQUEST:
      return {
        ...state,
        store_status:PENDING,
        store_error:UNSET,
      }
    case ACTIVITY_SAVE_SUCCESS:
      return {
        ...state,
        store_status:SUCCESS,
        store_error:UNSET,
      }
    case ACTIVITY_SAVE_FAILURE:
      return {
        ...state,
        store_status:FAILURE,
        store_error:action.payload,
      }
    case FIELD_SET:
      const {
        payload:{
          field,
          value,
        }
      } = action
      return {
        ...state,
        activity:{
          ...state.activity,
          [field]:value,
        },
        store_status:OUTDATED,
      }
    case TASK_ADD:
      return {
        ...state,
        activity:{
          ...state.activity,
          tasks:[...state.tasks, action.payload],
        },
        store_status:OUTDATED,
      }
    case TASK_EDIT:
      const taskIndex = state.tasks.findIndex(
        task => task.code === action.payload.code)
      return {
        ...state,
        activity:{
          ...state.activity,
          tasks:[...state.tasks.slice(0,taskIndex),action.payload.task,...state.tasks.slice(taskIndex+1)],
        },
        store_status:OUTDATED,
      }
    case TASK_REMOVE:
      return {
        ...state,
        activity:{
          ...state.activity,
          tasks:state.tasks.filter(task => task.code !== action.payload.code),
        },
        store_status:OUTDATED,
      }
    default:
      return state 
  }
}

export default activityReducer