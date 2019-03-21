import { TITLE_SET, DESCRIPTION_SET, TASK_ADD, TASK_REMOVE, TASK_EDIT } from '../constants'

const initialState = {
  title:'',
  description:'',
  tasks:[],
}

const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    case TITLE_SET:
      return {
        ...state,
        title:action.payload,
      }
    case DESCRIPTION_SET:
      return {
        ...state,
        description:action.payload,
      }
    case TASK_ADD:
      return {
        ...state,
        tasks:[...state.tasks, action.payload],
      }
    case TASK_EDIT:
      const taskIndex = state.tasks.findIndex((task) => task.code == action.payload.code)
      return {
        ...state,
        tasks:[...state.tasks.slice(0,taskIndex),action.payload.task,...state.tasks.slice(taskIndex+1)],
      }
    case TASK_REMOVE:
      return {
        ...state,
        tasks:state.tasks.filter((task) => task.code !== action.payload.code)
      }
    default:
      return state 
  }
}

export default activityReducer