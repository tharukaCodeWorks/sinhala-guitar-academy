import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center gap-4 px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
        Page not found
      </h1>
      <p className="max-w-xl text-base text-gray-600 dark:text-gray-400">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
      >
        Back to Home
      </Link>
    </section>
  )
}

export default NotFoundPage
