import {
  ACTIVITIES_REQUEST,
  ACTIVITIES_SUCCESS,
  ACTIVITIES_FAILURE,
  ACTIVITY_SAVE_REQUEST,
  ACTIVITY_SAVE_SUCCESS,
  ACTIVITY_SAVE_FAILURE,
  ACTIVITY_UPDATE_REQUEST,
  ACTIVITY_UPDATE_SUCCESS,
  ACTIVITY_UPDATE_FAILURE,
  ACTIVITY_DELETE_REQUEST,
  ACTIVITY_DELETE_SUCCESS,
  ACTIVITY_DELETE_FAILURE,
} from '../constants/activities'

import {
  getActivities as get,
  saveActivity as save,
  updateActivity as update,
  deleteActivity as del,
} from '../backend/activities'

import { 
} from '../backend/activities'

export const getActivities = () => dispatch => {
  dispatch({type: ACTIVITIES_REQUEST})
  get().then(
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

export const saveActivity = activity => dispatch => {
  dispatch({type: ACTIVITY_SAVE_REQUEST})
  save(activity).then(
    activity => dispatch({
      type: ACTIVITY_SAVE_SUCCESS,
      payload: activity,
    })
  ).catch(
    error => dispatch({
      type: ACTIVITY_SAVE_FAILURE,
      payload: error,
    })
  )
}

export const updateActivity = (id,activity) => dispatch => {
  dispatch({type: ACTIVITY_UPDATE_REQUEST})
  update(id,activity).then(
    activity => dispatch({
      type: ACTIVITY_UPDATE_SUCCESS,
      payload: activity,
    })
  ).catch(
    error => dispatch({
      type: ACTIVITY_UPDATE_FAILURE,
      payload: error,
    })
  )
}

export const deleteActivity = id => dispatch => {
  dispatch({type: ACTIVITY_DELETE_REQUEST})
  del(id).then(
    ({count}) => dispatch({
      type: ACTIVITY_DELETE_SUCCESS,
      payload: count,
    })
  ).catch(
    error => dispatch({
      type: ACTIVITY_DELETE_FAILURE,
      payload: error,
    })
  )
}
