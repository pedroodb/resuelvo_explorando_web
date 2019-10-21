import {
  ACTIVITIES_REQUEST,
  ACTIVITIES_SUCCESS,
  ACTIVITIES_FAILURE,
} from '../constants/activitiesConstants'

import { 
  getActivities,
} from '../helpers/ActivitiesAPIFunctions'

export const updateActivities = () => dispatch => {
  dispatch({type: ACTIVITIES_REQUEST})
  getActivities().then(
    activities => dispatch({
      type: ACTIVITIES_SUCCESS,
      payload: activities,
    })
  ).catch(
    error => dispatch({
      type: ACTIVITIES_FAILURE,
      payload: error,
    })
  )
}
