import { combineReducers } from 'redux'

import activities from './activities'
import tasks from './tasks'
import configuration from './configuration'

const AppReducer = combineReducers({
  activities,
  tasks,
  configuration,
})

export default AppReducer