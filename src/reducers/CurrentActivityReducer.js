import { TITLE_SET, DESCRIPTION_SET, TASK_ADD } from '../constants'

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
      const tasks = state.tasks
      tasks.push(action.payload)
      return {
        ...state,
        tasks:tasks,
      }
    default:
      return state 
  }
}

export default activityReducer