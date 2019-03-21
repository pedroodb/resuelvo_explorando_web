import {
  CURRENT_TASK_SET,
  CURRENT_TASK_CLEAR,
  CURRENT_TASK_TITLE_SET,
  CURRENT_TASK_DESCRIPTION_SET,
  CURRENT_TASK_TYPE_SET,
  CURRENT_TASK_PAYLOAD_SET,
} from '../constants'

const initialState = {
  current:{
    title:'',
    description:'',
    code:'',
    type:'0',
    payload:null,
  },
  fields:{
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
        current:{
          ...(action.payload),
        },
        fields:{
          ...(action.payload),
        },
        editing:true,
      }
    case CURRENT_TASK_CLEAR:
      return {
        ...initialState,
      }
    case CURRENT_TASK_TITLE_SET:
      return {
        ...state,
        fields:{
          ...state.fields,
          title:action.payload,
          code:action.payload,
        }
      }
    case CURRENT_TASK_DESCRIPTION_SET:
        return {
          ...state,
          fields:{
            ...state.fields,
            description:action.payload,
          }
        }
    case CURRENT_TASK_TYPE_SET:
        return {
          ...state,
          fields:{
            ...state.fields,
            type:action.payload,
          }
        }
    case CURRENT_TASK_PAYLOAD_SET:
        return {
          ...state,
          fields:{
            ...state.fields,
            payload:action.payload,
          }
        }
    default:
      return state 
  }
}

export default taskReducer