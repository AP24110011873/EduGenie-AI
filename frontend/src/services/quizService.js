import { api } from './api'

export async function generateQuiz(payload) {
  const { data } = await api.post('/quiz/generate', payload)
  return data
}