import {
  CURRENT_TASK_SET,
  CURRENT_TASK_INIT,
  CURRENT_TASK_CLEAR,
  CURRENT_TASK_FIELD_SET,
  CURRENT_TASK_TYPE_SET,
  MC_TASK_OPTION_ADD,
  MC_TASK_OPTION_UPDATE,
} from '../constants/currentTask'
import {
  TASK_SAVE_SUCCESS,
  TASK_UPDATE_SUCCESS,
  TASK_DELETE_SUCCESS,
} from '../constants/tasks'
import {
  UNSET,
} from '../constants/status'

const initialState = {
  title:UNSET,
  description:UNSET,
  code:UNSET,
  type:UNSET,
  payload:UNSET,
}

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_TASK_SET:
      return {
        ...state,
        ...action.payload,
      }
    case CURRENT_TASK_INIT:
      return {
        ...initialState,
        title:'',
        description:'',
      }
    case CURRENT_TASK_CLEAR:
      return {
        ...initialState,
      }
    case CURRENT_TASK_FIELD_SET:
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
    case CURRENT_TASK_TYPE_SET:
      return {
        ...state,
        type:action.payload.type,
        payload:action.payload.taskPayload,
      }
    case TASK_SAVE_SUCCESS:
      return {
        ...initialState,
      }
    case TASK_UPDATE_SUCCESS:
      return {
        ...initialState,
      }
    case TASK_DELETE_SUCCESS:
      return {
        ...initialState,
      }
    //Case especificos de tareas Multiple Choice
    case MC_TASK_OPTION_ADD:
      return {
        ...state,
        payload:{
          ...state.payload,
          options:[...state.payload.options, action.payload],
        },
      }
    case MC_TASK_OPTION_UPDATE:
      return {
        ...state,
        payload:{
          ...state.payload,
          options:state.payload.options.map((option,index) => (index===action.payload.index) ? action.payload.option : option),
        },
      }
    default:
      return state 
  }
}

export default taskReducer