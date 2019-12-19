import axios from 'axios'

export default axios.create({
  baseURL: 'https://192.168.10.154:3001/api',
})
