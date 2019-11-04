import { combineReducers } from 'redux'

import currentTask from './currentTask'
import activities from './activities'
import tasks from './tasks'

const AppReducer = combineReducers({
  activities,
  tasks,
  currentTask,
})

export default AppReducer