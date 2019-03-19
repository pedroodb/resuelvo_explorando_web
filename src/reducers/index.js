//Combina todos los reducers en uno antes de exportarlo
import { combineReducers } from 'redux'

import currentActivityReducer from './CurrentActivityReducer'
import currentTaskReducer from './CurrentTaskReducer'

const AppReducer = combineReducers({
  currentActivityReducer,
  currentTaskReducer,
})

export default AppReducer