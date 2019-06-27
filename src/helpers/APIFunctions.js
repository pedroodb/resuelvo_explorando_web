const API = 'http://localhost:3001'

export const getActivities = () => fetch(`${API}/activities/`).then(
  response => response.json())

export const getActivity = activity => fetch(`${API}/activities/${activity}`).then(
  (response) => response.json())

export const saveActivity = activity => fetch(`${API}/activities/`, {
  method:'POST',
  headers:{'Content-Type': 'application/json'},
  body: JSON.stringify({activity}),
})
  
export const updateActivity = activity => fetch(`${API}/activities/${activity}`, {
  method:'PUT',
  headers:{'Content-Type': 'application/json'},
  body: JSON.stringify({activity}),
})

export default { saveActivity, getActivities, getActivity, updateActivity }