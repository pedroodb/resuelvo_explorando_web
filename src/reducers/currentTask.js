import {
  CURRENT_TASK_SET,
  CURRENT_TASK_CLEAR,
  CURRENT_TASK_FIELD_SET,
  CURRENT_TASK_TYPE_SET,
  MC_TASK_OPTION_ADD,
  MC_TASK_OPTION_UPDATE,
} from '../constants'

const initialState = {
  task:{
    title:'',
    description:'',
    code:'',
    type:null,
    payload:null,
  },
  editing:false,
}

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_TASK_SET:
      return {
        ...state,
        task:{
          ...(action.payload),
        },
        editing:true,
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
        task:{
          ...state.task,
          [field]:value,
        },
      }
    case CURRENT_TASK_TYPE_SET:
      return {
        ...state,
        task:{
          ...state.task,
          type:action.payload.type,
          payload:action.payload.taskPayload
        },
      }
    //Case especificos de tareas Multiple Choice
    case MC_TASK_OPTION_ADD:
      return {
        ...state,
        task:{
          ...state.task,
          payload:{
            ...state.task.payload,
            options:[...state.task.payload.options, action.payload],
          }
        },
      }
    case MC_TASK_OPTION_UPDATE:
      return {
        ...state,
        task:{
          ...state.task,
          payload:{
            ...state.task.payload,
            options:state.task.payload.options.map((option,index) => (index===action.payload.index) ? action.payload.option : option),
          }
        },
      }
    default:
      return state 
  }
}

export default taskReducer