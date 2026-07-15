import { createContext, useEffect, useMemo, useState } from 'react'
import { createId, getStoredActivities, setStoredActivities } from '../utils/storage'

export const ActivityContext = createContext(null)

export function ActivityProvider({ children }) {
  const [activities, setActivities] = useState(() => getStoredActivities())

  useEffect(() => {
    setStoredActivities(activities)
  }, [activities])

  const recordActivity = ({ type, title, description, meta = {} }) => {
    const activity = {
      id: createId(),
      type,
      title,
      description,
      meta,
      timestamp: new Date().toISOString(),
    }

    setActivities((currentActivities) => [activity, ...currentActivities].slice(0, 50))
    return activity
  }

  const clearActivities = () => setActivities([])

  const stats = useMemo(() => {
    const countByType = (type) => activities.filter((activity) => activity.type === type).length

    return {
      chats: countByType('chat'),
      pdfs: countByType('pdf'),
      quizzes: countByType('quiz'),
      total: activities.length,
    }
  }, [activities])

  const value = useMemo(
    () => ({
      activities,
      recentActivity: activities.slice(0, 6),
      stats,
      recordActivity,
      clearActivities,
    }),
    [activities, stats],
  )

  return <ActivityContext.Provider value={value}>{children}</ActivityContext.Provider>
}