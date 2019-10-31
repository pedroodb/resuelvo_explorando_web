//Combina todos los reducers en uno antes de exportarlo
import { combineReducers } from 'redux'

import currentActivityReducer from './currentActivity'
import currentTaskReducer from './currentTask'
import activitiesReducer from './activities'

const AppReducer = combineReducers({
  activitiesReducer,
  currentActivityReducer,
  currentTaskReducer,
})

export default AppReducer