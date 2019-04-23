const API = 'http://localhost:3001'

export const saveActivity = (activity) => fetch(`${API}/activities/`, {
  method:'POST',
  headers:{
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({activity:activity, id:activity.title}),
})

export const getActivities = () => fetch(`${API}/activities/all/`).then(
  (response) => response.json())

export default { saveActivity, getActivities }