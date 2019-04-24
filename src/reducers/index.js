//Combina todos los reducers en uno antes de exportarlo
import { combineReducers } from 'redux'

import currentActivityReducer from './CurrentActivityReducer'
import currentTaskReducer from './CurrentTaskReducer'
import activitiesReducer from './ActivitiesReducer'

const AppReducer = combineReducers({
  activitiesReducer,
  currentActivityReducer,
  currentTaskReducer,
})

export default AppReducer