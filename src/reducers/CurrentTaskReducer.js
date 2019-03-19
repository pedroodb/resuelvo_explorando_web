import { TASK_SET } from '../constants'

const initialState = {
  title:'',
  description:'',
  type:0,
  code:'',
  payload:null,
}

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASK_SET:
      return {
        ...state,
        ...(action.payload),
      }
    default:
      return state 
  }
}

export default taskReducer