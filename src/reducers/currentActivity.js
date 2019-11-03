import {
  ACTIVITY_CLEAR,
  ACTIVITY_SET,
  FIELD_SET,
  TASK_ADD,
  TASK_REMOVE,
  TASK_EDIT,
} from '../constants/currentActivity'

import {
  ACTIVITY_SAVE_SUCCESS,
  ACTIVITY_UPDATE_SUCCESS,
} from '../constants/activities'

import {
  UNSET
} from '../constants/status'

const initialState = {
  title:UNSET,
  description:UNSET,
  id:UNSET,
  tasks:[],
}

const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVITY_CLEAR:
      return initialState
    case ACTIVITY_SET:
      return {
        ...state,
        ...action.payload,
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
        [field]:value,
      }
    case TASK_ADD:
      return {
        ...state,
        tasks:[...state.tasks, action.payload],
      }
    case TASK_EDIT:
      const taskIndex = state.tasks.findIndex(task => task.code === action.payload.code)
      return {
        ...state,
        tasks:[...state.tasks.slice(0,taskIndex),action.payload.task,...state.tasks.slice(taskIndex+1)],
      }
    case TASK_REMOVE:
      return {
        ...state,
        tasks:state.tasks.filter(task => task.code !== action.payload.code),
      }
    case ACTIVITY_SAVE_SUCCESS:
      return initialState
    case ACTIVITY_UPDATE_SUCCESS:
      return initialState
    default:
      return state 
  }
}

export default activityReducer