import { useState } from 'react'
import StrummingPlayer from '../components/StrummingPlayer'
import { strummingPatternFixtures } from '../data/strumming/fixtures'

/**
 * Standalone demo/test route for the `StrummingPlayer` component. There is
 * no song content yet, so this page exercises the component against the
 * example strumming-pattern fixtures to verify visual + audio playback.
 */
function StrummingPlayerDemoPage() {
  const [fixtureIndex, setFixtureIndex] = useState(0)
  const pattern = strummingPatternFixtures[fixtureIndex]

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-16">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Strumming Player Demo
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Internal test route for the <code>StrummingPlayer</code> component.
          Not linked from site navigation.
        </p>
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
        Fixture:
        <select
          className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-900"
          value={fixtureIndex}
          onChange={(event) => setFixtureIndex(Number(event.target.value))}
        >
          {strummingPatternFixtures.map((fixture, index) => (
            <option key={fixture.id} value={index}>
              {fixture.title}
            </option>
          ))}
        </select>
      </label>

      {/* `key` forces a remount (resetting tempo/playback state) when the
          selected fixture changes; see the note on `StrummingPlayerProps`. */}
      <StrummingPlayer key={pattern.id} pattern={pattern} />

      <div>
        <h2 className="mb-3 text-sm font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
          All fixtures
        </h2>
        <div className="flex flex-col gap-8">
          {strummingPatternFixtures.map((fixture) => (
            <div key={fixture.id}>
              <StrummingPlayer pattern={fixture} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StrummingPlayerDemoPage
