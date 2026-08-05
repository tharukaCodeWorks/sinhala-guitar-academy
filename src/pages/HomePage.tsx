import { Link } from 'react-router-dom'
import { navItems } from '../data/navigation'

const sectionDescriptions: Record<string, string> = {
  '/chords': 'Look up chord diagrams and fingerings.',
  '/chord-families': 'Discover chords that sound great together.',
  '/capo-tool': 'Find the right capo position for any song.',
  '/fingering-practice': 'Drill chord shapes and transitions.',
  '/strumming-practice': 'Learn common Sinhala song strumming patterns.',
  '/songs': 'Play along with Sinhala songs, chords and tabs.',
}

const sections = navItems.filter((item) => item.path !== '/')

function HomePage() {
  return (
    <>
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 py-24 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          Sinhala Guitar Academy
        </h1>
        <p className="max-w-xl text-lg text-gray-600 dark:text-gray-400">
          Learn guitar through Sinhala songs — chords, chord families, capo
          usage, fingering practice, tabbing, and strumming patterns.
        </p>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-24">
        <h2 className="mb-6 text-center text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
          Explore the app
        </h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="block h-full rounded-lg border border-gray-200 p-5 transition-colors hover:border-indigo-400 hover:bg-indigo-50 dark:border-gray-800 dark:hover:border-indigo-500 dark:hover:bg-indigo-500/10"
              >
                <span className="block text-base font-medium text-gray-900 dark:text-gray-100">
                  {item.label}
                </span>
                <span className="mt-1 block text-sm text-gray-600 dark:text-gray-400">
                  {sectionDescriptions[item.path]}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default HomePage
