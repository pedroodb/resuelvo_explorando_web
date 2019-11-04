import {
  TASKS_REQUEST,
  TASKS_SUCCESS,
  TASKS_FAILURE,
  TASK_SAVE_REQUEST,
  TASK_SAVE_SUCCESS,
  TASK_SAVE_FAILURE,
  TASK_UPDATE_REQUEST,
  TASK_UPDATE_SUCCESS,
  TASK_UPDATE_FAILURE,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_DELETE_FAILURE,
} from '../constants/tasks'

import {
  getTasks as get,
  saveTask as save,
  updateTask as update,
  deleteTask as del,
} from '../backend/tasks'

import { 
} from '../backend/tasks'

export const getTasks = id => dispatch => {
  dispatch({type: TASKS_REQUEST})
  get(id).then(
    tasks => dispatch({
      type: TASKS_SUCCESS,
      payload: tasks,
    })
  ).catch(
    error => dispatch({
      type: TASKS_FAILURE,
      payload: error,
    })
  )
}

export const saveTask = (id,task) => dispatch => {
  dispatch({type: TASK_SAVE_REQUEST})
  save(id,task).then(
    task => dispatch({
      type: TASK_SAVE_SUCCESS,
      payload: task,
    })
  ).catch(
    error => dispatch({
      type: TASK_SAVE_FAILURE,
      payload: error,
    })
  )
}

export const updateTask = (id,fk,task) => dispatch => {
  dispatch({type: TASK_UPDATE_REQUEST})
  update(id,fk,task).then(
    task => dispatch({
      type: TASK_UPDATE_SUCCESS,
      payload: task,
    })
  ).catch(
    error => dispatch({
      type: TASK_UPDATE_FAILURE,
      payload: error,
    })
  )
}

export const deleteTask = (id,fk) => dispatch => {
  dispatch({type: TASK_DELETE_REQUEST})
  del(id,fk).then(
    ({count}) => dispatch({
      type: TASK_DELETE_SUCCESS,
      payload: count,
    })
  ).catch(
    error => dispatch({
      type: TASK_DELETE_FAILURE,
      payload: error,
    })
  )
}
