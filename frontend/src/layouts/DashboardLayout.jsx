import { useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/layout/Sidebar'
import { Navbar } from '../components/layout/Navbar'
import { useActivity } from '../hooks/useActivity'

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { recentActivity } = useActivity()

  const notificationCount = useMemo(() => recentActivity.length, [recentActivity.length])

  return (
    <div className="min-h-screen lg:flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-h-screen flex-1 flex-col">
        <Navbar onMenuToggle={() => setSidebarOpen(true)} notifications={notificationCount} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}