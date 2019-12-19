import {
  LANGUAGE_SET,
} from '../constants/configuration'

const initialState = {
  language: 'es-ES',
}

const configurationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LANGUAGE_SET:
      return {
        ...state,
        language: action.payload,
      }
    default:
      return state
  }
}

export default configurationReducer