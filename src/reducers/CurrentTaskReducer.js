import { TASK_SET, TASK_CLEAR } from '../constants'

const initialState = {
  title:'',
  description:'',
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
    case TASK_CLEAR:
      return {
        ...initialState
      }
    default:
      return state 
  }
}

export default taskReducer