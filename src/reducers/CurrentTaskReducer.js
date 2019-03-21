import {
  CURRENT_TASK_SET,
  CURRENT_TASK_CLEAR,
  CURRENT_TASK_FIELD_SET,
} from '../constants'

const initialState = {
  task:{
    title:'',
    description:'',
    code:'',
    type:'0',
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
        }
      }
    default:
      return state 
  }
}

export default taskReducer