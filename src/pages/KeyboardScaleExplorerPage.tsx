import { useMemo, useState } from 'react'
import KeyboardDiagram from '../components/KeyboardDiagram'
import { getScale, listScaleRoots } from '../data/scales'
import type { NoteName, Scale, ScaleType } from '../data/scales/types'
import {
  scaleSteps,
  scaleToKeyboardVariant,
  type Hand,
} from '../lib/scaleFingering'

const SCALE_TYPE_LABELS: Record<ScaleType, string> = {
  major: 'Major',
  'natural-minor': 'Natural minor',
}

const HANDS: Hand[] = ['right', 'left']

const HAND_LABELS: Record<Hand, string> = {
  right: 'Right hand',
  left: 'Left hand',
}

/**
 * Lets a learner pick a root note and major/natural-minor, then shows that
 * scale's standard classical fingering (right hand and left hand,
 * thumb-under/thumb-crossing technique) rendered on `KeyboardDiagram`, plus
 * a plain-text ascending note+finger list as a fallback for anyone who
 * can't easily read the diagram. Route target for the "Scale Technique:
 * Thumb-Under Fingering" lesson's `/keyboard/scales` callout, and
 * structurally mirrors `KeyboardChordFamiliesPage`.
 */
function KeyboardScaleExplorerPage() {
  const roots = useMemo(() => listScaleRoots(), [])
  const [root, setRoot] = useState<NoteName>('C')
  const [type, setType] = useState<ScaleType>('major')

  const scale = getScale(root, type)

  return (
    <section className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 sm:text-3xl">
          Scale Explorer
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Pick a key to see its one-octave scale and the standard classical
          right-hand and left-hand fingering for playing it — including the
          thumb-under/finger-crossing points that differ from key to key.
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
                onClick={() => setType(option)}
                aria-pressed={option === type}
                className={`rounded border px-3 py-1.5 text-sm font-medium transition-colors ${
                  option === type
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
          Showing{' '}
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {root} {SCALE_TYPE_LABELS[type]}
          </span>
        </span>
      </div>

      {scale ? (
        <ScaleFingeringDisplay scale={scale} />
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No seeded scale for this key yet.
        </p>
      )}
    </section>
  )
}

interface ScaleFingeringDisplayProps {
  scale: Scale
}

/** Both hands' diagram + plain-text fallback for one scale. */
function ScaleFingeringDisplay({ scale }: ScaleFingeringDisplayProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {HANDS.map((hand) => (
        <HandFingeringCard key={hand} scale={scale} hand={hand} />
      ))}
    </div>
  )
}

interface HandFingeringCardProps {
  scale: Scale
  hand: Hand
}

/** One hand's diagram (highlighting the 8 scale-degree keys in finger order) plus its note/finger list. */
function HandFingeringCard({ scale, hand }: HandFingeringCardProps) {
  const variant = useMemo(
    () => scaleToKeyboardVariant(scale, hand),
    [scale, hand],
  )
  const steps = useMemo(() => scaleSteps(scale, hand), [scale, hand])

  return (
    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
      <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
        {HAND_LABELS[hand]}
      </h2>
      <div className="mb-4 flex justify-center">
        <KeyboardDiagram variant={variant} size="lg" />
      </div>
      <ol
        className="flex flex-wrap gap-2"
        aria-label={`${HAND_LABELS[hand]} note and finger order`}
      >
        {steps.map((step, index) => (
          <li
            key={`${step.note}-${index}`}
            className="flex flex-col items-center rounded border border-gray-200 px-2.5 py-1 dark:border-gray-800"
          >
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {step.note}
            </span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400">
              finger {step.finger}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default KeyboardScaleExplorerPage
