import {
  TASKS_REQUEST,
  TASKS_SUCCESS,
  TASKS_FAILURE,
  TASK_SAVE_REQUEST,
  TASK_SAVE_SUCCESS,
  TASK_SAVE_FAILURE,
  TASK_UPDATE_REQUEST,
  TASK_UPDATE_SUCCESS,
  TASK_UPDATE_FAILURE,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_DELETE_FAILURE,
} from '../constants/tasks'

import {
  UNSET,
  PENDING,
  SUCCESS,
  FAILURE,
  OUTDATED,
} from '../constants/status'

const initialState = {
  index:{
    tasks:[],
    status:UNSET,
    error:UNSET,
  },
  save:{
    status:UNSET,
    error:UNSET,
    last:UNSET,
  },
  update:{
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

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASKS_REQUEST:
      return {
        ...state,
        index:{
          ...state.index,
          status:PENDING,
        }
      }
    case TASKS_SUCCESS:
      return {
        ...state,
        index:{
          status:SUCCESS,
          tasks:action.payload,
        }
      }
    case TASKS_FAILURE:
      return {
        ...state,
        index:{
          ...state.index,
          status:FAILURE,
          error:action.payload,
        }
      }
    case TASK_SAVE_REQUEST:
      return {
        ...state,
        save:{
          ...state.save,
          status:PENDING,
        }
      }
    case TASK_SAVE_SUCCESS:
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
    case TASK_SAVE_FAILURE:
      return {
        ...state,
        save:{
          ...state.save,
          status:FAILURE,
          error:action.payload,
        }
      }
    case TASK_UPDATE_REQUEST:
      return {
        ...state,
        update:{
          ...state.update,
          status:PENDING,
        }
      }
    case TASK_UPDATE_SUCCESS:
      return {
        ...state,
        index:{
          ...state.index,
          status:OUTDATED,
        },
        update:{
          ...state.update,
          status:SUCCESS,
          last:action.payload,
        }
      }
    case TASK_UPDATE_FAILURE:
      return {
        ...state,
        update:{
          ...state.update,
          status:FAILURE,
          error:action.payload,
        }
      }
    case TASK_DELETE_REQUEST:
      return {
        ...state,
        del:{
          ...state.del,
          status:PENDING,
        }
      }
    case TASK_DELETE_SUCCESS:
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
    case TASK_DELETE_FAILURE:
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

export default taskReducer