import { useEffect, useMemo, useRef, useState } from 'react'
import ChordDiagram from '../components/ChordDiagram'
import { chordLibrary, getChordById } from '../data/chords'
import type { Chord } from '../data/chords/types'
import {
  accuracyPercent,
  buildSessionRecord,
  appendSessionRecord,
  clearSessionHistory,
  DEFAULT_INTERVAL_SECONDS,
  formatDuration,
  loadSessionHistory,
  MIN_DRILL_CHORDS,
  nextChordIndex,
  PRACTICE_INTERVALS_SECONDS,
  progressFraction,
  repCount,
  type PracticeIntervalSeconds,
  type PracticeSessionRecord,
} from '../lib/fingeringPractice'

/** How often the countdown/progress bar re-renders while a drill is running. */
const TICK_MS = 100

type Phase = 'setup' | 'running' | 'summary'

/**
 * Chord-change ("fingering") practice drill: pick 2+ chords, pick a change
 * interval, then the app cycles through them at that interval, showing each
 * one large via `ChordDiagram` with a countdown to the next switch. Each rep
 * can be tapped correct/missed; finished sessions are saved to localStorage
 * and listed as history below the drill (no server persistence, per v1
 * scope).
 */
function FingeringPracticePage() {
  const [phase, setPhase] = useState<Phase>('setup')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [search, setSearch] = useState('')
  const [intervalSeconds, setIntervalSeconds] =
    useState<PracticeIntervalSeconds>(DEFAULT_INTERVAL_SECONDS)
  // Lazy initializer: read localStorage once on mount rather than via an
  // effect + extra render.
  const [history, setHistory] = useState<PracticeSessionRecord[]>(() =>
    loadSessionHistory(),
  )

  const [currentIndex, setCurrentIndex] = useState(0)
  const [remainingMs, setRemainingMs] = useState(0)
  const [judgedThisRep, setJudgedThisRep] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [missedCount, setMissedCount] = useState(0)
  const [lastSummary, setLastSummary] = useState<PracticeSessionRecord | null>(
    null,
  )

  // The chord order for the running session is snapshotted into state (not
  // just derived from the picker) so editing the picker - which is hidden
  // while running anyway - can never change a drill mid-flight.
  const [drillChords, setDrillChords] = useState<Chord[]>([])
  // The start timestamp is only ever read from event handlers/effects
  // (never during render), so a ref is fine and avoids an extra re-render.
  const sessionStartedAtRef = useRef(0)

  // Countdown tick: while running, count the current rep's remaining time
  // down toward 0. When it reaches 0, advance to the next chord and reset
  // the countdown + judged flag for the new rep, all from within the same
  // tick so it's a single state update driven by the external timer rather
  // than a second effect reacting to the first's output. A rep the user
  // never tapped correct/missed for simply isn't counted (no auto-penalty).
  useEffect(() => {
    if (phase !== 'running') return
    const timer = setInterval(() => {
      setRemainingMs((prev) => {
        const next = prev - TICK_MS
        if (next > 0) return next
        setCurrentIndex((index) => nextChordIndex(index, drillChords.length))
        setJudgedThisRep(false)
        return intervalSeconds * 1000
      })
    }, TICK_MS)
    return () => clearInterval(timer)
  }, [phase, intervalSeconds, drillChords.length])

  const filteredChords = useMemo(() => {
    const normalized = search.trim().toLowerCase()
    if (!normalized) return chordLibrary
    return chordLibrary.filter((chord) =>
      chord.name.toLowerCase().includes(normalized),
    )
  }, [search])

  const selectedChords = useMemo(
    () =>
      selectedIds
        .map((id) => getChordById(id))
        .filter((chord): chord is Chord => chord != null),
    [selectedIds],
  )

  function toggleChord(id: string) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((existing) => existing !== id)
        : [...current, id],
    )
  }

  function clearSelection() {
    setSelectedIds([])
  }

  function startSession() {
    if (selectedChords.length < MIN_DRILL_CHORDS) return
    setDrillChords(selectedChords)
    sessionStartedAtRef.current = Date.now()
    setCurrentIndex(0)
    setRemainingMs(intervalSeconds * 1000)
    setJudgedThisRep(false)
    setCorrectCount(0)
    setMissedCount(0)
    setLastSummary(null)
    setPhase('running')
  }

  function markRep(correct: boolean) {
    if (judgedThisRep) return
    setJudgedThisRep(true)
    if (correct) {
      setCorrectCount((count) => count + 1)
    } else {
      setMissedCount((count) => count + 1)
    }
  }

  function finishSession() {
    const durationSeconds = (Date.now() - sessionStartedAtRef.current) / 1000
    const record = buildSessionRecord({
      chordNames: drillChords.map((chord) => chord.name),
      intervalSeconds,
      correctCount,
      missedCount,
      durationSeconds,
    })
    setHistory(appendSessionRecord(record))
    setLastSummary(record)
    setPhase('summary')
  }

  function handleClearHistory() {
    setHistory(clearSessionHistory())
  }

  const currentChord = drillChords[currentIndex]
  const upcomingChord =
    drillChords[nextChordIndex(currentIndex, drillChords.length)]
  const remainingSecondsLabel = Math.ceil(remainingMs / 1000)

  return (
    <section className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 sm:text-3xl">
          Fingering Practice
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Drill chord-to-chord transitions: pick a few chords, set a change
          interval, and practice switching between them on the beat.
        </p>
      </div>

      {phase === 'setup' && (
        <SetupForm
          filteredChords={filteredChords}
          search={search}
          onSearchChange={setSearch}
          selectedChords={selectedChords}
          onToggleChord={toggleChord}
          onClearSelection={clearSelection}
          intervalSeconds={intervalSeconds}
          onIntervalChange={setIntervalSeconds}
          onStart={startSession}
        />
      )}

      {phase === 'running' && currentChord && (
        <RunningDrill
          currentChord={currentChord}
          upcomingChordName={upcomingChord?.name}
          intervalSeconds={intervalSeconds}
          remainingMs={remainingMs}
          remainingSecondsLabel={remainingSecondsLabel}
          judgedThisRep={judgedThisRep}
          correctCount={correctCount}
          missedCount={missedCount}
          onMark={markRep}
          onFinish={finishSession}
        />
      )}

      {phase === 'summary' && lastSummary && (
        <SessionSummary
          summary={lastSummary}
          onPracticeAgain={startSession}
          onChooseDifferentChords={() => setPhase('setup')}
        />
      )}

      {phase !== 'running' && (
        <SessionHistory history={history} onClear={handleClearHistory} />
      )}
    </section>
  )
}

interface SetupFormProps {
  filteredChords: Chord[]
  search: string
  onSearchChange: (value: string) => void
  selectedChords: Chord[]
  onToggleChord: (id: string) => void
  onClearSelection: () => void
  intervalSeconds: PracticeIntervalSeconds
  onIntervalChange: (value: PracticeIntervalSeconds) => void
  onStart: () => void
}

/** Chord picker + interval picker + start button, shown before a drill begins. */
function SetupForm({
  filteredChords,
  search,
  onSearchChange,
  selectedChords,
  onToggleChord,
  onClearSelection,
  intervalSeconds,
  onIntervalChange,
  onStart,
}: SetupFormProps) {
  const selectedIdSet = useMemo(
    () => new Set(selectedChords.map((chord) => chord.id)),
    [selectedChords],
  )
  const canStart = selectedChords.length >= MIN_DRILL_CHORDS

  return (
    <div className="mb-12 flex flex-col gap-8">
      <div>
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2 className="text-sm font-semibold tracking-wide text-gray-700 uppercase dark:text-gray-300">
            1. Pick chords
          </h2>
          {selectedChords.length > 0 && (
            <button
              type="button"
              onClick={onClearSelection}
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              Clear selection
            </button>
          )}
        </div>

        {selectedChords.length > 0 && (
          <ul className="mb-3 flex flex-wrap gap-2">
            {selectedChords.map((chord, index) => (
              <li key={chord.id}>
                <button
                  type="button"
                  onClick={() => onToggleChord(chord.id)}
                  className="flex items-center gap-1.5 rounded-full bg-indigo-600 px-3 py-1 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  <span className="text-xs text-indigo-200">{index + 1}</span>
                  {chord.name}
                  <span aria-hidden="true">✕</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search chords, e.g. C, Am, B7"
          className="mb-3 w-full max-w-xs rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-900"
        />

        <ul className="flex max-h-64 flex-wrap gap-2 overflow-y-auto rounded-lg border border-gray-200 p-3 dark:border-gray-800">
          {filteredChords.map((chord) => {
            const isSelected = selectedIdSet.has(chord.id)
            return (
              <li key={chord.id}>
                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onToggleChord(chord.id)}
                  className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-gray-300 text-gray-700 hover:border-indigo-400 hover:bg-indigo-50 dark:border-gray-700 dark:text-gray-300 dark:hover:border-indigo-500 dark:hover:bg-indigo-500/10'
                  }`}
                >
                  {chord.name}
                </button>
              </li>
            )
          })}
          {filteredChords.length === 0 && (
            <li className="py-4 text-sm text-gray-500 dark:text-gray-400">
              No chords match your search.
            </li>
          )}
        </ul>

        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {selectedChords.length === 0
            ? `Select at least ${MIN_DRILL_CHORDS} chords to start a drill.`
            : selectedChords.length < MIN_DRILL_CHORDS
              ? `Select at least ${MIN_DRILL_CHORDS} chords (${selectedChords.length} selected).`
              : `${selectedChords.length} chords selected, drilled in the order picked.`}
        </p>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-gray-700 uppercase dark:text-gray-300">
          2. Set the change interval
        </h2>
        <div className="flex gap-2">
          {PRACTICE_INTERVALS_SECONDS.map((seconds) => (
            <button
              key={seconds}
              type="button"
              aria-pressed={intervalSeconds === seconds}
              onClick={() => onIntervalChange(seconds)}
              className={`rounded border px-4 py-2 text-sm font-medium transition-colors ${
                intervalSeconds === seconds
                  ? 'border-indigo-600 bg-indigo-600 text-white'
                  : 'border-gray-300 text-gray-700 hover:border-indigo-400 dark:border-gray-700 dark:text-gray-300 dark:hover:border-indigo-500'
              }`}
            >
              Every {seconds}s
            </button>
          ))}
        </div>
      </div>

      <div>
        <button
          type="button"
          disabled={!canStart}
          onClick={onStart}
          className="rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-800 dark:disabled:text-gray-500"
        >
          Start drill
        </button>
      </div>
    </div>
  )
}

interface RunningDrillProps {
  currentChord: Chord
  upcomingChordName: string | undefined
  intervalSeconds: number
  remainingMs: number
  remainingSecondsLabel: number
  judgedThisRep: boolean
  correctCount: number
  missedCount: number
  onMark: (correct: boolean) => void
  onFinish: () => void
}

/** Active drill screen: big target chord, countdown/progress bar, mark buttons. */
function RunningDrill({
  currentChord,
  upcomingChordName,
  intervalSeconds,
  remainingMs,
  remainingSecondsLabel,
  judgedThisRep,
  correctCount,
  missedCount,
  onMark,
  onFinish,
}: RunningDrillProps) {
  const progressPercent = progressFraction(remainingMs, intervalSeconds) * 100

  return (
    <div className="mb-12 flex flex-col items-center gap-6">
      <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
        <span>
          Correct: <strong className="text-emerald-600">{correctCount}</strong>
        </span>
        <span>
          Missed: <strong className="text-rose-600">{missedCount}</strong>
        </span>
      </div>

      <ChordDiagram
        variant={currentChord.variants[0]}
        name={currentChord.name}
        size="lg"
      />

      <div className="w-full max-w-xs">
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
          <div
            className="h-2 rounded-full bg-indigo-600 transition-[width] duration-100 ease-linear"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p
          className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400"
          aria-live="polite"
        >
          Next chord in {remainingSecondsLabel}s
          {upcomingChordName ? ` · up next: ${upcomingChordName}` : ''}
        </p>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => onMark(true)}
          disabled={judgedThisRep}
          className="rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Correct
        </button>
        <button
          type="button"
          onClick={() => onMark(false)}
          disabled={judgedThisRep}
          className="rounded-lg bg-rose-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Missed
        </button>
      </div>

      <button
        type="button"
        onClick={onFinish}
        className="text-sm text-gray-500 underline-offset-2 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-gray-100"
      >
        Finish drill
      </button>
    </div>
  )
}

interface SessionSummaryProps {
  summary: PracticeSessionRecord
  onPracticeAgain: () => void
  onChooseDifferentChords: () => void
}

/** Post-drill results screen, shown once a running session is finished. */
function SessionSummary({
  summary,
  onPracticeAgain,
  onChooseDifferentChords,
}: SessionSummaryProps) {
  return (
    <div className="mb-12 flex flex-col items-center gap-4 rounded-lg border border-gray-200 p-8 text-center dark:border-gray-800">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Session complete
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {summary.chordNames.join(' → ')} · every {summary.intervalSeconds}s
      </p>
      <div className="flex gap-6 text-sm">
        <span>
          Correct:{' '}
          <strong className="text-emerald-600">{summary.correctCount}</strong>
        </span>
        <span>
          Missed:{' '}
          <strong className="text-rose-600">{summary.missedCount}</strong>
        </span>
        <span>
          Accuracy: <strong>{accuracyPercent(summary)}%</strong>
        </span>
        <span>
          Duration: <strong>{formatDuration(summary.durationSeconds)}</strong>
        </span>
      </div>
      <div className="mt-2 flex gap-3">
        <button
          type="button"
          onClick={onPracticeAgain}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Practice again
        </button>
        <button
          type="button"
          onClick={onChooseDifferentChords}
          className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Choose different chords
        </button>
      </div>
    </div>
  )
}

interface SessionHistoryProps {
  history: PracticeSessionRecord[]
  onClear: () => void
}

/** Basic local history of past drill sessions, most recent first. */
function SessionHistory({ history, onClear }: SessionHistoryProps) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 className="text-sm font-semibold tracking-wide text-gray-700 uppercase dark:text-gray-300">
          Session history
        </h2>
        {history.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            Clear history
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No sessions yet — finish a drill above to see it here. History is
          saved to this browser only.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {history.map((session) => (
            <li
              key={session.id}
              className="rounded-lg border border-gray-200 p-3 text-sm dark:border-gray-800"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {session.chordNames.join(' → ')}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(session.completedAt).toLocaleString()}
                </span>
              </div>
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 dark:text-gray-400">
                <span>Every {session.intervalSeconds}s</span>
                <span>
                  {repCount(session)} rep{repCount(session) === 1 ? '' : 's'}
                </span>
                <span className="text-emerald-600">
                  {session.correctCount} correct
                </span>
                <span className="text-rose-600">
                  {session.missedCount} missed
                </span>
                <span>{accuracyPercent(session)}% accuracy</span>
                <span>{formatDuration(session.durationSeconds)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FingeringPracticePage
