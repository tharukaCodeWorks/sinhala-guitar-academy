import { useEffect, useMemo, useState } from 'react'
import { strummingPatternFixtures } from '../data/strumming/fixtures'
import type { StrumStep, StrummingPattern } from '../data/strumming/types'
import { stepGlyph, stepLabel } from '../data/strumming/utils'
import {
  buildCustomPattern,
  createDefaultCustomSteps,
  createRestSteps,
  CUSTOM_STEP_COUNT_OPTIONS,
  type CustomStepCount,
  cycleStepAt,
  DEFAULT_CUSTOM_STEP_COUNT,
} from '../lib/customStrumPattern'

type PatternSource = 'fixture' | 'custom'

export interface PatternSourcePickerProps {
  /**
   * Called whenever the active pattern (or its identity key) changes.
   * Pass a stable function (e.g. the setter from `useState`, or a
   * `useCallback`-wrapped handler) — this fires from a `useEffect`, so an
   * unstable callback re-fires on every render.
   */
  onChange: (pattern: StrummingPattern, playerKey: string) => void
  /** Fixture id to start selected on; defaults to the first fixture. */
  initialFixtureId?: string
}

/**
 * Reusable "choose a fixture pattern, or build your own with the step
 * editor" picker — shared by the Strumming Practice page and the Strum
 * Builder tool so neither has to duplicate this ~150 lines of state/UI.
 * Owns its own source/fixture/custom-steps state; reports the resulting
 * `StrummingPattern` (plus a remount key suitable for `<StrummingPlayer
 * key={playerKey} .../>`) via `onChange` rather than rendering the player
 * itself, so callers can lay out whatever else they need around it.
 */
function PatternSourcePicker({
  onChange,
  initialFixtureId,
}: PatternSourcePickerProps) {
  const [source, setSource] = useState<PatternSource>('fixture')

  const [selectedFixtureId, setSelectedFixtureId] = useState(
    initialFixtureId ?? strummingPatternFixtures[0].id,
  )
  const selectedFixture =
    strummingPatternFixtures.find(
      (fixture) => fixture.id === selectedFixtureId,
    ) ?? strummingPatternFixtures[0]

  const [customTitle, setCustomTitle] = useState('')
  const [customSteps, setCustomSteps] = useState<StrumStep[]>(() =>
    createDefaultCustomSteps(DEFAULT_CUSTOM_STEP_COUNT),
  )

  const customPattern = useMemo(
    () => buildCustomPattern(customSteps, customTitle),
    [customSteps, customTitle],
  )

  function handleStepCountChange(count: CustomStepCount) {
    setCustomSteps((current) =>
      count <= current.length
        ? current.slice(0, count)
        : [...current, ...createRestSteps(count - current.length)],
    )
  }

  function handleStepClick(index: number) {
    setCustomSteps((current) => cycleStepAt(current, index))
  }

  function handleClearCustomSteps() {
    setCustomSteps(createRestSteps(customSteps.length))
  }

  function handleResetCustomSteps() {
    setCustomSteps(createDefaultCustomSteps(customSteps.length))
  }

  const activePattern: StrummingPattern =
    source === 'fixture' ? selectedFixture : customPattern

  // Switching which fixture is selected (or switching source entirely)
  // resets playback for a clean start on the new pattern. Editing custom
  // step *types* keeps the same key so playback/tempo aren't interrupted
  // mid-edit; changing the step *count* remounts, since that changes the
  // bar's length underneath the player.
  const playerKey =
    source === 'fixture' ? selectedFixture.id : `custom-${customSteps.length}`

  useEffect(() => {
    onChange(activePattern, playerKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `onChange` is expected to be stable per the prop doc; including it would re-fire this effect on every parent render for callers that pass an inline function.
  }, [activePattern, playerKey])

  return (
    <>
      <div
        className="mb-6 flex gap-2"
        role="tablist"
        aria-label="Pattern source"
      >
        <button
          type="button"
          role="tab"
          aria-selected={source === 'fixture'}
          onClick={() => setSource('fixture')}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            source === 'fixture'
              ? 'border-amber-500 bg-amber-500 text-white'
              : 'border-gray-300 text-gray-700 hover:border-amber-400 dark:border-gray-700 dark:text-gray-300 dark:hover:border-amber-500'
          }`}
        >
          Choose a pattern
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={source === 'custom'}
          onClick={() => setSource('custom')}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            source === 'custom'
              ? 'border-amber-500 bg-amber-500 text-white'
              : 'border-gray-300 text-gray-700 hover:border-amber-400 dark:border-gray-700 dark:text-gray-300 dark:hover:border-amber-500'
          }`}
        >
          Build your own
        </button>
      </div>

      {source === 'fixture' ? (
        <FixturePicker
          selectedFixtureId={selectedFixtureId}
          onSelect={setSelectedFixtureId}
        />
      ) : (
        <CustomPatternEditor
          title={customTitle}
          onTitleChange={setCustomTitle}
          steps={customSteps}
          onStepCountChange={handleStepCountChange}
          onStepClick={handleStepClick}
          onClear={handleClearCustomSteps}
          onReset={handleResetCustomSteps}
        />
      )}
    </>
  )
}

interface FixturePickerProps {
  selectedFixtureId: string
  onSelect: (id: string) => void
}

/** Lists the example strumming patterns from the fixture library as selectable cards. */
function FixturePicker({ selectedFixtureId, onSelect }: FixturePickerProps) {
  return (
    <ul
      className="flex flex-col gap-3"
      role="listbox"
      aria-label="Example strumming patterns"
    >
      {strummingPatternFixtures.map((fixture) => {
        const isSelected = fixture.id === selectedFixtureId
        return (
          <li key={fixture.id}>
            <button
              type="button"
              role="option"
              aria-selected={isSelected}
              onClick={() => onSelect(fixture.id)}
              className={`w-full rounded-lg border p-4 text-left transition-colors ${
                isSelected
                  ? 'border-amber-500 bg-amber-50 dark:border-amber-400 dark:bg-amber-400/10'
                  : 'border-gray-200 hover:border-amber-300 dark:border-gray-800 dark:hover:border-amber-500/60'
              }`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {fixture.title}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {fixture.tempoBpm} BPM
                </span>
              </div>
              {fixture.description && (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {fixture.description}
                </p>
              )}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

interface CustomPatternEditorProps {
  title: string
  onTitleChange: (value: string) => void
  steps: StrumStep[]
  onStepCountChange: (count: CustomStepCount) => void
  onStepClick: (index: number) => void
  onClear: () => void
  onReset: () => void
}

/**
 * Simple step editor: click a step to cycle it through
 * down -> up -> mute -> rest, pick how many steps the bar has, and give it
 * an optional title.
 */
function CustomPatternEditor({
  title,
  onTitleChange,
  steps,
  onStepCountChange,
  onStepClick,
  onClear,
  onReset,
}: CustomPatternEditorProps) {
  return (
    <div className="flex flex-col gap-5">
      <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
        Pattern name (optional)
        <input
          type="text"
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="Custom Pattern"
          className="w-full max-w-xs rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-900"
        />
      </label>

      <div>
        <span className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Steps in the bar
        </span>
        <div className="flex gap-2">
          {CUSTOM_STEP_COUNT_OPTIONS.map((count) => (
            <button
              key={count}
              type="button"
              aria-pressed={steps.length === count}
              onClick={() => onStepCountChange(count)}
              className={`rounded border px-3 py-1 text-sm font-medium transition-colors ${
                steps.length === count
                  ? 'border-amber-500 bg-amber-500 text-white'
                  : 'border-gray-300 text-gray-700 hover:border-amber-400 dark:border-gray-700 dark:text-gray-300 dark:hover:border-amber-500'
              }`}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Tap a step to cycle down / up / mute / rest
          </span>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onReset}
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={onClear}
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              Clear all
            </button>
          </div>
        </div>

        <div
          className="flex flex-wrap gap-2 rounded-lg border border-gray-300 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-900"
          role="list"
          aria-label="Custom pattern steps"
        >
          {steps.map((step, index) => (
            <button
              key={index}
              type="button"
              role="listitem"
              onClick={() => onStepClick(index)}
              aria-label={`Step ${index + 1}: ${stepLabel(step.type)}. Tap to change.`}
              className={`flex h-11 w-11 items-center justify-center rounded-md border text-lg font-semibold transition-colors ${
                step.type === 'rest'
                  ? 'border-gray-300 bg-white text-gray-400 opacity-60 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500'
                  : 'border-amber-400 bg-white text-gray-800 hover:border-amber-500 dark:border-amber-500/70 dark:bg-gray-800 dark:text-gray-200'
              }`}
            >
              {stepGlyph(step.type)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PatternSourcePicker
