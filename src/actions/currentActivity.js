import {
  ACTIVITY_CLEAR,
  ACTIVITY_SET,
  ACTIVITY_SAVE_REQUEST,
  ACTIVITY_SAVE_SUCCESS,
  ACTIVITY_SAVE_FAILURE,
  FIELD_SET,
  TASK_ADD,
  TASK_REMOVE,
  TASK_EDIT,
} from '../constants/currentActivity'

import { saveActivity as saveActivityApi } from '../backend/activities'

export const clearActivity = () => ({
  type:ACTIVITY_CLEAR,
})

export const setActivity = activity => ({
  type:ACTIVITY_SET,
  payload:activity,
})

export const saveActivity = activity => dispatch => {
  dispatch({type: ACTIVITY_SAVE_REQUEST})
  saveActivityApi(activity).then(
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

export const setField = (field, value) => ({
  type:FIELD_SET,
  payload:{
    field,
    value,
  },
})

export const addTask = (task) => ({
  type:TASK_ADD,
  payload:task,
})

export const editTask = (task) => ({
  type:TASK_EDIT,
  payload:{
    task,
    code:task.code,
  }
})

export const removeTask = (task) => ({
  type:TASK_REMOVE,
  payload:task,
})