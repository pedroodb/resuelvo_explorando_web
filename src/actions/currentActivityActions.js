import { TITLE_SET, DESCRIPTION_SET, TASK_ADD, TASK_REMOVE, TASK_EDIT } from '../constants'

export const setTitle = (name) => ({
  type:TITLE_SET,
  payload:name,
})

export const setDescription = (description) => ({
  type:DESCRIPTION_SET,
  payload:description,
})

export const addTask = (task) => ({
  type:TASK_ADD,
  payload:task,
})

export const editTask = (task) => ({
  type:TASK_EDIT,
  payload:{ task, code:task.code }
})

export const removeTask = (task) => ({
  type:TASK_REMOVE,
  payload:task,
})