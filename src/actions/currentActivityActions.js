import { TITLE_SET, DESCRIPTION_SET, TASK_ADD, TASK_REMOVE } from '../constants'

export function setTitle(name) {
  return {
    type:TITLE_SET,
    payload:name,
  }
}

export function setDescription(description) {
  return {
    type:DESCRIPTION_SET,
    payload:description,
  }
}

export function addTask(task) {
  return {
    type:TASK_ADD,
    payload:task,
  }
}

export function removeTask(task) {
  return {
    type:TASK_REMOVE,
    payload:task,
  }
}