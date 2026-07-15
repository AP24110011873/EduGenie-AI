import { useContext } from 'react'
import { ActivityContext } from '../context/ActivityContext'

export function useActivity() {
  return useContext(ActivityContext)
}