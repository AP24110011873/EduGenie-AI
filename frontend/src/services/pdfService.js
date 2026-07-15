import { api } from './api'

export async function summarizePdf(file, onUploadProgress) {
  const formData = new FormData()
  formData.append('file', file)

  const { data } = await api.post('/pdf/summarize', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  })

  return data
}