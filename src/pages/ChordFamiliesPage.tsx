import { useMemo, useState } from 'react'
import ChordDiagram from '../components/ChordDiagram'
import { listRoots } from '../data/chords'
import type { NoteName } from '../data/chords/types'
import {
  buildChordFamily,
  resolveProgressionsForFamily,
  type FamilyDegree,
  type ScaleType,
} from '../lib/chordFamily'

const SCALE_TYPE_LABELS: Record<ScaleType, string> = {
  major: 'Major',
  minor: 'Minor',
}

/**
 * Lets a learner pick a key (root + major/minor) and explore that key's
 * diatonic "family" — the 7 chords built on each scale degree, resolved to
 * real chord shapes via `lib/chordFamily.ts` — plus a handful of common
 * chord progressions built from those same 7 chords.
 */
function ChordFamiliesPage() {
  const roots = useMemo(() => listRoots(), [])
  const [root, setRoot] = useState<NoteName>('C')
  const [scaleType, setScaleType] = useState<ScaleType>('major')

  const family = useMemo(
    () => buildChordFamily(root, scaleType),
    [root, scaleType],
  )
  const progressions = useMemo(
    () => resolveProgressionsForFamily(family),
    [family],
  )

  return (
    <section className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 sm:text-3xl">
          Chord Families
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Every key has its own set of 7 chords that naturally sound good
          together. Pick a key to see its family and some progressions built
          from it.
        </p>
      </div>

      {/* Key picker */}
      <div className="mb-10 flex flex-wrap items-end gap-6">
        <fieldset className="flex flex-col gap-1">
          <legend className="mb-1 text-sm text-gray-700 dark:text-gray-300">
            Root note
          </legend>
          <div className="flex flex-wrap gap-1.5">
            {roots.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setRoot(option)}
                aria-pressed={option === root}
                className={`min-w-9 rounded border px-2.5 py-1.5 text-sm font-medium transition-colors ${
                  option === root
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : 'border-gray-300 text-gray-700 hover:border-indigo-400 hover:bg-indigo-50 dark:border-gray-700 dark:text-gray-300 dark:hover:border-indigo-500 dark:hover:bg-indigo-500/10'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-1">
          <legend className="mb-1 text-sm text-gray-700 dark:text-gray-300">
            Scale
          </legend>
          <div className="flex gap-1.5">
            {(Object.keys(SCALE_TYPE_LABELS) as ScaleType[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setScaleType(option)}
                aria-pressed={option === scaleType}
                className={`rounded border px-3 py-1.5 text-sm font-medium transition-colors ${
                  option === scaleType
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : 'border-gray-300 text-gray-700 hover:border-indigo-400 hover:bg-indigo-50 dark:border-gray-700 dark:text-gray-300 dark:hover:border-indigo-500 dark:hover:bg-indigo-500/10'
                }`}
              >
                {SCALE_TYPE_LABELS[option]}
              </button>
            ))}
          </div>
        </fieldset>

        <span className="text-sm text-gray-500 dark:text-gray-400">
          Showing the{' '}
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {root} {SCALE_TYPE_LABELS[scaleType]}
          </span>{' '}
          family
        </span>
      </div>

      {/* Family chords */}
      <div className="mb-12">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          The 7 family chords
        </h2>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {family.degrees.map((degree) => (
            <li key={degree.degree}>
              <FamilyDegreeCard degree={degree} />
            </li>
          ))}
        </ul>
      </div>

      {/* Progressions */}
      <div>
        <h2 className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Common progressions in this key
        </h2>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          These progressions are the same everywhere in scale-degree terms —
          only the actual chords change from key to key.
        </p>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {progressions.map((progression) => (
            <li
              key={progression.id}
              className="rounded-lg border border-gray-200 p-4 dark:border-gray-800"
            >
              <div className="mb-1 flex flex-wrap items-baseline gap-x-2">
                <span className="font-mono text-sm font-semibold text-gray-500 dark:text-gray-400">
                  {progression.name}
                </span>
              </div>
              <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">
                {progression.description}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {progression.steps.map((step, index) => (
                  <span
                    key={`${progression.id}-${index}`}
                    className="flex items-center gap-2"
                  >
                    {index > 0 && (
                      <span
                        className="text-gray-400 dark:text-gray-600"
                        aria-hidden="true"
                      >
                        &rarr;
                      </span>
                    )}
                    <span className="flex flex-col items-center rounded border border-gray-200 px-2.5 py-1 dark:border-gray-800">
                      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {step.chordName ?? `${step.romanNumeral} (n/a)`}
                      </span>
                      <span className="text-[10px] text-gray-500 dark:text-gray-400">
                        {step.romanNumeral}
                      </span>
                    </span>
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

interface FamilyDegreeCardProps {
  degree: FamilyDegree
}

/** One family-chord card: the diagram (when a shape exists) plus its roman-numeral label. */
function FamilyDegreeCard({ degree }: FamilyDegreeCardProps) {
  const { chord } = degree
  const displayName =
    chord?.name ??
    `${degree.root}${degree.quality === 'diminished' ? '°' : 'm'}`

  return (
    <div className="flex h-full flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 text-center dark:border-gray-800">
      <span className="text-xs font-semibold tracking-wide text-indigo-600 uppercase dark:text-indigo-400">
        {degree.romanNumeral}
      </span>
      {chord ? (
        <ChordDiagram variant={chord.variants[0]} name={chord.name} size="sm" />
      ) : (
        <div className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded border border-dashed border-gray-300 text-gray-400 dark:border-gray-700 dark:text-gray-600">
          <span className="text-sm font-medium">{displayName}</span>
          <span className="text-[10px]">No shape yet</span>
        </div>
      )}
      <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
        {degree.quality}
      </span>
    </div>
  )
}

export default ChordFamiliesPage
