import axios from './axios'

export const getActivities = () => axios.get('Activities').then(
  response => response.data
)

export const getActivity = activity => axios.get(`Activities/${activity}`).then(
  response => response.data
)

export const saveActivity = activity => axios.post('Activities/', {
  ...activity,
}, {
  headers: {
    'Content-Type': 'application/json'
  },
}).then(
  response => response.data
)
  
export const updateActivity = (id,activity) => axios.put(`Activities/${id}`, {
  ...activity,
}, {
  headers: {
    'Content-Type': 'application/json'
  },
}).then(
  response => response.data
)

export const deleteActivity = id => axios.delete(`Activities/${id}`)
  

export default {
  saveActivity,
  getActivities,
  getActivity,
  updateActivity,
  deleteActivity,
}
