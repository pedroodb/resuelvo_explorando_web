import axios from './axios'

export const getTasks = id => axios.get(`Activities/${id}/tasks`).then(
  response => response.data
)

export const getTask = (id,fk) => axios.get(`Activities/${id}/tasks/${fk}`).then(
  response => response.data
)

export const saveTask = (id,task) => axios.post(`Activities/${id}/tasks`, {
  ...task,
}, {
  headers: {
    'Content-Type': 'application/json'
  },
}).then(
  response => response.data
)
  
export const updateTask = (id,fk,task) => axios.put(`Activities/${id}/tasks/${fk}`, {
  ...task,
}, {
  headers: {
    'Content-Type': 'application/json'
  },
}).then(
  response => response.data
)

export const deleteTask = (id,fk) => axios.delete(`Activities/${id}/tasks/${fk}`)
  

export default {
  getTasks,
  getTask,
  saveTask,
  updateTask,
  deleteTask,
}
