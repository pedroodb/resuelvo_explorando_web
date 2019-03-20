import { TASK_SET, TASK_CLEAR } from '../constants'

export const setTask = (task) => ({
  type:TASK_SET,
  payload:task,
})

export const clearTask = () => ({
  type:TASK_CLEAR,
})