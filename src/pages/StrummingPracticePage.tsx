import { useMemo, useState } from 'react'
import StrummingPlayer from '../components/StrummingPlayer'
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

/**
 * Strumming Practice page: pick one of the example patterns from the fixture
 * library, or build a custom one with a simple step editor, then practice it
 * with the embedded `StrummingPlayer` (which owns its own tempo, play/pause,
 * and practice-loop controls). Fully standalone — no song is selected here;
 * song-specific patterns get wired up separately once the song catalog
 * exists.
 */
function StrummingPracticePage() {
  const [source, setSource] = useState<PatternSource>('fixture')

  const [selectedFixtureId, setSelectedFixtureId] = useState(
    strummingPatternFixtures[0].id,
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

  // Editing which fixture is selected (or switching source entirely) resets
  // the player's tempo/playback for a clean start on the new pattern.
  // Editing custom step *types* keeps the same key so playback/tempo aren't
  // interrupted mid-edit; changing the step *count* remounts, since that
  // changes the bar's length underneath the player.
  const playerKey =
    source === 'fixture' ? selectedFixture.id : `custom-${customSteps.length}`

  return (
    <section className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 sm:text-3xl">
          Strumming Practice
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Pick a common strumming pattern, or build your own, and practice it
          with the player below — tap play, adjust the tempo, and toggle the
          loop to repeat the bar for continuous practice.
        </p>
      </div>

      <StrummingPatternGuide />

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

      <div className="mt-8 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
        <StrummingPlayer key={playerKey} pattern={activePattern} />
      </div>
    </section>
  )
}

/**
 * Reference guide: how to translate what a real chord/tab site (e.g.
 * Ultimate Guitar-style chord sheets) shows into a choice of pattern here,
 * plus general strumming know-how. Collapsed by default via `<details>` so
 * it doesn't crowd out the interactive picker/player for anyone who
 * already knows what they're looking for.
 */
function StrummingPatternGuide() {
  return (
    <details className="mb-6 rounded-lg border border-gray-200 bg-gray-50 open:pb-4 dark:border-gray-800 dark:bg-gray-900/40">
      <summary className="cursor-pointer list-none rounded-lg px-4 py-3 text-sm font-medium text-gray-900 select-none dark:text-gray-100">
        How do I pick the right pattern? (strumming notation guide)
      </summary>

      <div className="flex flex-col gap-6 px-4 text-sm text-gray-700 dark:text-gray-300">
        <div>
          <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
            Reading a chord/tab site's strumming line
          </h3>
          <ul className="ml-4 list-disc space-y-1.5">
            <li>
              Most chord/tab sites print an explicit strumming line right under
              the chords, as letters (
              <code className="rounded bg-gray-200 px-1 py-0.5 font-mono text-xs dark:bg-gray-800">
                D DU UDU
              </code>
              ) or arrows (
              <code className="rounded bg-gray-200 px-1 py-0.5 font-mono text-xs dark:bg-gray-800">
                ↓ ↓↑ ↑↓↑
              </code>
              ). Match each symbol to a step: <strong>D / ↓</strong> down,{' '}
              <strong>U / ↑</strong> up, <strong>X / x</strong> muted chuck, a
              dash or blank space rest. Build that exact sequence with the
              "Build your own" step editor above.
            </li>
            <li>
              Check the <strong>time signature</strong> printed at the top of
              the chart (4/4, 3/4, 6/8). Most pop, rock, and Bollywood songs are
              4/4 — the 8-step patterns here cover that. A 6/8 feel (common in
              baila and some folk songs) needs a 6-step bar — try{' '}
              <em>Baila 6/8 Shuffle</em>, or set the step editor to 6 steps.
            </li>
            <li>
              No pattern given? Use the <strong>genre or mood tag</strong> (or a
              high capo fret, which often signals a mellower cover) as a hint —
              "ballad" or "slow" points to a sparser strum like{' '}
              <em>Ballad Downstrokes</em> or <em>Bollywood Ballad (D-U-X-U)</em>
              ; "pop", "upbeat", or "dance" points to a fuller, faster one like{' '}
              <em>Pop-Folk (D-D-U-U-D-U)</em> or <em>Dance-Pop Upstrokes</em>.
            </li>
            <li>
              If a <strong>BPM/tempo number</strong> is given, dial the player's
              tempo control to match it — a pattern's shape and its tempo are
              independent, so you can always borrow a pattern's rhythm and set
              your own speed.
            </li>
            <li>
              Truly nothing specified? Start with{' '}
              <em>Pop-Folk (D-D-U-U-D-U)</em> — it's the most commonly taught
              pattern and fits the majority of pop/folk songs.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
            Strum notation legend
          </h3>
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
            <dt className="font-mono font-semibold">D / ↓</dt>
            <dd>Downstroke</dd>
            <dt className="font-mono font-semibold">U / ↑</dt>
            <dd>Upstroke</dd>
            <dt className="font-mono font-semibold">X / x</dt>
            <dd>Muted/percussive chuck — stop the strings from ringing</dd>
            <dt className="font-mono font-semibold">- / blank</dt>
            <dd>Rest — keep the hand moving, don't strike the strings</dd>
            <dt className="font-mono font-semibold">bold / &gt;</dt>
            <dd>Accent — strike a little harder on that step</dd>
          </dl>
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
            Good to know
          </h3>
          <ul className="ml-4 list-disc space-y-1.5">
            <li>
              Keep your strumming hand moving in a steady down-up motion even
              through rests, just without touching the strings — a "ghost
              strum". Stopping the hand between strikes is the most common cause
              of losing time.
            </li>
            <li>
              A capo changes which chord shapes you play and what pitch they
              sound at, but it never changes the strumming pattern itself — the
              rhythm stays exactly the same regardless of capo position.
            </li>
            <li>
              These patterns are all built from 8th-note steps (or 6 for a 6/8
              feel), which covers almost every pop, folk, ballad, and
              Bollywood/baila groove. Faster, busier 16th-note feels aren't
              modeled step-by-step here — approximate them by adding mutes on
              the off-beats of an 8-step pattern.
            </li>
            <li>
              Two songs can share the exact same chords but feel completely
              different depending on the strumming pattern — always match the
              strum to the song's actual groove, not just its chord progression.
            </li>
          </ul>
        </div>
      </div>
    </details>
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

export default StrummingPracticePage
