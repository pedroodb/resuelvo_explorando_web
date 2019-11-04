import { combineReducers } from 'redux'

import activities from './activities'
import tasks from './tasks'

const AppReducer = combineReducers({
  activities,
  tasks,
})

export default AppReducer