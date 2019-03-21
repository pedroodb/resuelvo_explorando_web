import { 
  CURRENT_TASK_SET,
  CURRENT_TASK_CLEAR,
  CURRENT_TASK_TITLE_SET,
  CURRENT_TASK_DESCRIPTION_SET,
  CURRENT_TASK_TYPE_SET,
  CURRENT_TASK_PAYLOAD_SET,
} from '../constants'

export const setCurrentTask = (task) => ({
  type:CURRENT_TASK_SET,
  payload:task,
})

export const clearCurrentTask = () => ({
  type:CURRENT_TASK_CLEAR,
})

export const setCurrentTaskTitle = (title) => ({
  type:CURRENT_TASK_TITLE_SET,
  payload:title,
})

export const setCurrentTaskDescription = (description) => ({
  type:CURRENT_TASK_DESCRIPTION_SET,
  payload:description,
})

export const setCurrentTaskType = (type) => ({
  type:CURRENT_TASK_TYPE_SET,
  payload:type,
})

export const setCurrentTaskPayload = (payload) => ({
  type:CURRENT_TASK_PAYLOAD_SET,
  payload:payload,
})
