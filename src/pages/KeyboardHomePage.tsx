import { Link } from 'react-router-dom'
import { navGroups } from '../data/navigation'

const sectionDescriptions: Record<string, string> = {
  '/keyboard/lessons': 'Follow structured keyboard lessons from the basics up.',
  '/keyboard/chords': 'Look up keyboard chord diagrams and voicings.',
  '/keyboard/chord-families':
    'Discover chords that sound great together on keyboard.',
  '/keyboard/scales': 'Explore scales and how they map onto the keys.',
  '/keyboard/technique':
    'Drill technique exercises to build finger independence.',
  '/keyboard/songs': 'Play along with Sinhala songs arranged for keyboard.',
}

const keyboardGroup = navGroups.find((group) => group.label === 'Keyboard')

/**
 * Landing/hub page for the Keyboard track, mirroring HomePage's
 * "Explore the app" grid but scoped to the Keyboard nav group's pages.
 */
function KeyboardHomePage() {
  return (
    <>
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 py-24 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          Keyboard
        </h1>
        <p className="max-w-xl text-lg text-gray-600 dark:text-gray-400">
          Learn keyboard through Sinhala songs — lessons, chords, chord
          families, scales, and technique drills, all in one place.
        </p>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-24">
        <h2 className="mb-6 text-center text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
          Explore the keyboard track
        </h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {keyboardGroup?.items.map((item) => (
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

export default KeyboardHomePage
