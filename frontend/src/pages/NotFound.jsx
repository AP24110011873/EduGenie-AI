import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { usePageTitle } from '../hooks/usePageTitle'

export default function NotFound() {
  usePageTitle('404')

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <Card className="w-full max-w-xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Page not found</p>
        <h1 className="mt-4 text-5xl font-black text-white">404</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-300">
          The page you are looking for does not exist or has moved. Return to the dashboard or home screen.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/dashboard">
            <Button icon={<FiArrowLeft />}>Back to dashboard</Button>
          </Link>
          <Link to="/">
            <Button variant="secondary">Go home</Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}