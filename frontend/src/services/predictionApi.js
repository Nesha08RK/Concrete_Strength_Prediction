const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'

export async function predictConcreteMix(payload) {
  const response = await fetch(`${API_BASE_URL}/api/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const contentType = response.headers.get('content-type') || ''
  const data = contentType.includes('application/json') ? await response.json() : await response.text()

  if (!response.ok) {
    throw new Error(typeof data === 'string' ? data : data.error || 'Prediction request failed')
  }

  return data
}
