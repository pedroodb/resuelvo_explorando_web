import {
  ACTIVITIES_REQUEST,
  ACTIVITIES_SUCCESS,
  ACTIVITIES_FAILURE,
  ACTIVITY_GET_REQUEST,
  ACTIVITY_GET_SUCCESS,
  ACTIVITY_GET_FAILURE,
  ACTIVITY_GET_RESET,
  ACTIVITY_SAVE_REQUEST,
  ACTIVITY_SAVE_SUCCESS,
  ACTIVITY_SAVE_FAILURE,
  ACTIVITY_SAVE_CLEAR,
  ACTIVITY_UPDATE_REQUEST,
  ACTIVITY_UPDATE_SUCCESS,
  ACTIVITY_UPDATE_FAILURE,
  ACTIVITY_DELETE_REQUEST,
  ACTIVITY_DELETE_SUCCESS,
  ACTIVITY_DELETE_FAILURE,
  ACTIVITY_WORKFLOW_SET_SUCCESS,
  FIELD_SET,
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
  get:{
    activity:{
      title:'',
      description:'',
      tasks:[],
      finishedTasks:[],
    },
    status:UNSET,
    error:UNSET,
  },
  save:{
    status:SUCCESS,
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
    case ACTIVITY_GET_REQUEST:
      return {
        ...state,
        get:{
          ...state.get,
          status:PENDING,
        }
      }
    case ACTIVITY_GET_SUCCESS:
      return {
        ...state,
        get:{
          ...state.get,
          status:SUCCESS,
          activity:action.payload,
        }
      }
    case ACTIVITY_GET_FAILURE:
      return {
        ...state,
        get:{
          ...state.get,
          status:FAILURE,
          error:action.payload,
        }
      }
    case ACTIVITY_GET_RESET:
      return {
        ...state,
        get:initialState.get,
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
    case ACTIVITY_SAVE_CLEAR:
      return {
        ...state,
        save:initialState.save,
      }
    case ACTIVITY_UPDATE_REQUEST:
      return {
        ...state,
        update:{
          ...state.update,
          status:PENDING,
        }
      }
    case ACTIVITY_UPDATE_SUCCESS:
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
    case ACTIVITY_UPDATE_FAILURE:
      return {
        ...state,
        update:{
          ...state.update,
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
    case FIELD_SET:
      return {
        ...state,
        get:{
          ...state.get,
          activity:{
            ...state.get.activity,
            [action.payload.field]:action.payload.value,
          }
        }
      }
    case ACTIVITY_WORKFLOW_SET_SUCCESS:
      return {
        ...state,
        get:{
          ...state.get,
          status:OUTDATED,
        }
      }
    default:
      return state 
  }
}

export default activityReducer