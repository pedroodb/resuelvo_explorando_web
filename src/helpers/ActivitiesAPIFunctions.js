const API = 'http://localhost:3001/api'

export const getActivities = () => fetch(`${API}/Activities`).then(
  response => response.json())

export const getActivity = activity => fetch(`${API}/Activities/${activity}`).then(
  (response) => response.json())

export const saveActivity = activity => fetch(`${API}/Activities/`, {
  method:'POST',
  headers:{'Content-Type': 'application/json'},
  body: JSON.stringify({activity}),
})
  
export const updateActivity = activity => fetch(`${API}/Activities/${activity}`, {
  method:'PUT',
  headers:{'Content-Type': 'application/json'},
  body: JSON.stringify({activity}),
})

export default { saveActivity, getActivities, getActivity, updateActivity }