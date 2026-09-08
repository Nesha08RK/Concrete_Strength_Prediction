import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'

export async function fetchExplainabilityData(payload = {}) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/explainability`, {
      timeout: 30000,
      params: payload,
    })

    return response.data
  } catch (error) {
    if (error.response?.status === 404) {
      return null
    }

    throw error
  }
}
