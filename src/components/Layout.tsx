import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <header className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
        <span className="text-sm font-medium tracking-wide uppercase">
          Sinhala Guitar Academy
        </span>
      </header>
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
