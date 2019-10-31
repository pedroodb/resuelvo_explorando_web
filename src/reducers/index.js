//Combina todos los reducers en uno antes de exportarlo
import { combineReducers } from 'redux'

import currentActivity from './currentActivity'
import currentTask from './currentTask'
import activities from './activities'

const AppReducer = combineReducers({
  activities,
  currentActivity,
  currentTask,
})

export default AppReducer