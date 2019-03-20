import { TASK_SET, TASK_CLEAR } from '../constants'

export function setTask(task) {
  return {
    type:TASK_SET,
    payload:task,
  } 
}

export const clearTask = () => ({
  type:TASK_CLEAR
})