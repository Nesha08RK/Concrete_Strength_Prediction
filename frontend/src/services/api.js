import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  timeout: 30000,
})

export const predictConcrete = async (payload) => {
  const response = await api.post('/api/predict', payload)
  return response.data
}
