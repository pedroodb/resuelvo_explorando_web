import {
  ACTIVITIES_REQUEST,
  ACTIVITIES_SUCCESS,
  ACTIVITIES_FAILURE,
  ACTIVITY_GET_REQUEST,
  ACTIVITY_GET_SUCCESS,
  ACTIVITY_GET_FAILURE,
  ACTIVITY_SAVE_REQUEST,
  ACTIVITY_SAVE_SUCCESS,
  ACTIVITY_SAVE_FAILURE,
  ACTIVITY_SAVE_CLEAR,
  ACTIVITY_UPDATE_REQUEST,
  ACTIVITY_UPDATE_SUCCESS,
  ACTIVITY_UPDATE_FAILURE,
  ACTIVITY_DELETE_REQUEST,
  ACTIVITY_DELETE_SUCCESS,
  ACTIVITY_DELETE_FAILURE,
  ACTIVITY_WORKFLOW_SET_REQUEST,
  ACTIVITY_WORKFLOW_SET_SUCCESS,
  ACTIVITY_WORKFLOW_SET_FAILURE,
  FIELD_SET,
} from '../constants/activities'

import {
  getActivities as index,
  getActivity as get,
  saveActivity as save,
  updateActivity as update,
  deleteActivity as del,
  saveRequiredTask as saveReq,
} from '../backend/activities'
import { dispatch } from 'rxjs/internal/observable/range';

export const getActivities = () => dispatch => {
  dispatch({type: ACTIVITIES_REQUEST})
  index().then(
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

export const getActivity = id => dispatch => {
  dispatch({type: ACTIVITY_GET_REQUEST})
  get(id).then(
    activity => dispatch({
      type: ACTIVITY_GET_SUCCESS,
      payload: activity,
    })
  ).catch(
    error => dispatch({
      type: ACTIVITY_GET_FAILURE,
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

export const clearSaveActivity = () => ({
  type: ACTIVITY_SAVE_CLEAR,
})

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

export const setField = (field, value) => ({
  type:FIELD_SET,
  payload:{
    field,
    value,
  },
})

export const setWorkflow = edges => dispatch => {
  dispatch({type: ACTIVITY_WORKFLOW_SET_REQUEST})
  promises = edges.array.map(edge => saveReq(edge.target.id, edge.source.id));
  try {
    promises.forEach(promise => {
      await promise
    })
    dispatch({type: ACTIVITY_WORKFLOW_SET_SUCCESS})
  } catch(err) {
    dispatch({type: ACTIVITY_WORKFLOW_SET_FAILURE})
  }
}
