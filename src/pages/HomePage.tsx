import { Link } from 'react-router-dom'
import { navGroups } from '../data/navigation'

const sectionDescriptions: Record<string, string> = {
  '/chords': 'Look up chord diagrams and fingerings.',
  '/chord-families': 'Discover chords that sound great together.',
  '/capo-tool': 'Find the right capo position for any song.',
  '/fingering-practice': 'Drill chord shapes and transitions.',
  '/strumming-practice':
    'Learn common Sinhala and Hindi song strumming patterns.',
  '/strum-builder': 'Paste a chord sheet and build a strumming pattern for it.',
  '/songs': 'Play along with Sinhala songs, chords and tabs.',
}

const guitarGroup = navGroups.find((group) => group.label === 'Guitar')

function HomePage() {
  return (
    <>
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 py-24 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          Sinhala Guitar Academy
        </h1>
        <p className="max-w-xl text-lg text-gray-600 dark:text-gray-400">
          Learn guitar or keyboard through Sinhala songs — chords, chord
          families, scales, technique, and practice tools for two instruments in
          one place.
        </p>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-24">
        <h2 className="mb-6 text-center text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
          Choose your instrument
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Guitar track: brief intro plus a grid linking straight into
              every guitar section, same as the old single "Explore the
              app" grid used to. */}
          <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Guitar
            </h3>
            <p className="mt-1 mb-5 text-sm text-gray-600 dark:text-gray-400">
              Chords, chord families, capo usage, fingering, and strumming
              practice for Sinhala and Hindi songs.
            </p>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {guitarGroup?.items.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="block h-full rounded-lg border border-gray-200 p-4 transition-colors hover:border-indigo-400 hover:bg-indigo-50 dark:border-gray-800 dark:hover:border-indigo-500 dark:hover:bg-indigo-500/10"
                  >
                    <span className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-xs text-gray-600 dark:text-gray-400">
                      {sectionDescriptions[item.path]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Keyboard track: brief intro plus a single CTA into the
              Keyboard hub, which has its own "Explore the app" grid. */}
          <div className="flex flex-col rounded-xl border border-gray-200 p-6 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Keyboard
            </h3>
            <p className="mt-1 mb-5 text-sm text-gray-600 dark:text-gray-400">
              Lessons, chord library, chord families, scales, technique drills,
              and a Sinhala song library arranged for keyboard.
            </p>
            <Link
              to="/keyboard"
              className="mt-auto inline-flex w-fit items-center gap-2 rounded-lg border border-indigo-400 bg-indigo-50 px-4 py-2.5 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100 dark:border-indigo-500 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20"
            >
              Explore Keyboard
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
