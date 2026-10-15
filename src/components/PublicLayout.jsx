import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

export default function PublicLayout() {
  return (
    <div className="min-h-svh flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
