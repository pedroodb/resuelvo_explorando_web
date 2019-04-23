import {
  ACTIVITY_CLEAR,
  FIELD_SET,
  TASK_ADD,
  TASK_REMOVE,
  TASK_EDIT,
} from '../constants'

export const clearActivity = () => ({
  type:ACTIVITY_CLEAR,
})

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