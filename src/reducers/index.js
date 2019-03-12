//Combina todos los reducers en uno antes de exportarlo
import { combineReducers } from 'redux'

import currentActivityReducer from './CurrentActivityReducer'

const AppReducer = combineReducers({
  currentActivityReducer,
})

export default AppReducer