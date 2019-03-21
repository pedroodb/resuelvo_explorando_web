import { CURRENT_TASK_SET, CURRENT_TASK_CLEAR, CURRENT_TASK_FIELD_SET } from '../constants'

export const setCurrentTask = (task) => ({
  type:CURRENT_TASK_SET,
  payload:task,
})

export const clearCurrentTask = () => ({
  type:CURRENT_TASK_CLEAR,
})

export const setCurrentTaskField = (field,value) => ({
  type:CURRENT_TASK_FIELD_SET,
  payload:{
    field,
    value,
  },
})
