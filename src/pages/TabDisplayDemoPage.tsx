import { useState } from 'react'
import TabDisplay from '../components/TabDisplay'
import { tabFixtures } from '../data/tabs/fixtures'
import { countTabPositions } from '../data/tabs/utils'

/**
 * Standalone demo/test route for the `TabDisplay` component. There is no
 * song content yet, so this page exercises the component against a couple
 * of example tab fixtures and provides simple manual controls to move the
 * playback cursor prop, so rendering can be visually verified.
 */
function TabDisplayDemoPage() {
  const [fixtureIndex, setFixtureIndex] = useState(0)
  const [currentPositionIndex, setCurrentPositionIndex] = useState<
    number | undefined
  >(0)

  const tab = tabFixtures[fixtureIndex]
  const totalPositions = countTabPositions(tab)

  // Reset the cursor whenever the selected fixture changes so it never
  // points past the end of a shorter tab.
  function handleFixtureChange(index: number) {
    setFixtureIndex(index)
    setCurrentPositionIndex(0)
  }

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-16">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Tab Display Demo
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Internal test route for the <code>TabDisplay</code> component. Not
          linked from site navigation.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          Fixture:
          <select
            className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-900"
            value={fixtureIndex}
            onChange={(event) =>
              handleFixtureChange(Number(event.target.value))
            }
          >
            {tabFixtures.map((fixture, index) => (
              <option key={fixture.title} value={index}>
                {fixture.title}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <button
            type="button"
            className="rounded border border-gray-300 px-2 py-1 hover:bg-gray-100 disabled:opacity-40 dark:border-gray-700 dark:hover:bg-gray-800"
            onClick={() =>
              setCurrentPositionIndex((index) => Math.max(0, (index ?? 0) - 1))
            }
            disabled={
              currentPositionIndex === undefined || currentPositionIndex <= 0
            }
          >
            ← Prev
          </button>
          <span>
            Cursor: {currentPositionIndex ?? 'none'} / {totalPositions - 1}
          </span>
          <button
            type="button"
            className="rounded border border-gray-300 px-2 py-1 hover:bg-gray-100 disabled:opacity-40 dark:border-gray-700 dark:hover:bg-gray-800"
            onClick={() =>
              setCurrentPositionIndex((index) =>
                Math.min(totalPositions - 1, (index ?? 0) + 1),
              )
            }
            disabled={
              currentPositionIndex === undefined ||
              currentPositionIndex >= totalPositions - 1
            }
          >
            Next →
          </button>
          <button
            type="button"
            className="rounded border border-gray-300 px-2 py-1 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
            onClick={() =>
              setCurrentPositionIndex((index) =>
                index === undefined ? 0 : undefined,
              )
            }
          >
            {currentPositionIndex === undefined ? 'Show cursor' : 'Hide cursor'}
          </button>
        </div>
      </div>

      <TabDisplay tab={tab} currentPositionIndex={currentPositionIndex} />

      <div>
        <h2 className="mb-3 text-sm font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
          All fixtures (no cursor)
        </h2>
        <div className="flex flex-col gap-8">
          {tabFixtures.map((fixture) => (
            <div key={fixture.title}>
              <TabDisplay tab={fixture} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TabDisplayDemoPage
