import {
  ACTIVITIES_UPDATE,
} from '../constants'

<<<<<<< HEAD
export const updateActivities = (activities) => ({
  type:ACTIVITIES_UPDATE,
  payload:activities,
})
=======
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
>>>>>>> 806111b... Trae actividades desde la api + Separacion APIFunc
