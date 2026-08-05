/**
 * Pure logic + localStorage persistence helpers for the Fingering Practice
 * drill (chord-change practice). Kept framework-free so the trickier bits -
 * session-record shaping, duration/accuracy math, and safe localStorage
 * (de)serialization - are unit-testable without a component-testing setup.
 *
 * `pages/FingeringPracticePage.tsx` is the only consumer; it owns the
 * timer-driven UI state and calls into these helpers for anything that
 * doesn't need React.
 */

/** Fixed set of change intervals offered by the drill setup form. */
export const PRACTICE_INTERVALS_SECONDS = [2, 4, 8] as const
export type PracticeIntervalSeconds =
  (typeof PRACTICE_INTERVALS_SECONDS)[number]

export const DEFAULT_INTERVAL_SECONDS: PracticeIntervalSeconds = 4

/** Fewest chords a drill session can be started with. */
export const MIN_DRILL_CHORDS = 2

/** A single completed drill session, as persisted to localStorage. */
export interface PracticeSessionRecord {
  id: string
  /** Display names of the chords drilled, in drill order. */
  chordNames: string[]
  intervalSeconds: number
  correctCount: number
  missedCount: number
  /** ISO timestamp of when the session ended. */
  completedAt: string
  /** Wall-clock length of the session, in whole seconds. */
  durationSeconds: number
}

const STORAGE_KEY = 'sga.fingeringPractice.sessions.v1'
/** Cap history size so localStorage doesn't grow unbounded across many sessions. */
const MAX_HISTORY_ENTRIES = 25

function hasLocalStorage(): boolean {
  return typeof localStorage !== 'undefined'
}

/** Every judged rep in a session (a chord the user explicitly marked). */
export function repCount(
  record: Pick<PracticeSessionRecord, 'correctCount' | 'missedCount'>,
): number {
  return record.correctCount + record.missedCount
}

/**
 * Percentage of judged reps marked correct, 0-100 (0 for a session with no
 * judged reps, rather than NaN).
 */
export function accuracyPercent(
  record: Pick<PracticeSessionRecord, 'correctCount' | 'missedCount'>,
): number {
  const total = repCount(record)
  if (total === 0) return 0
  return Math.round((record.correctCount / total) * 100)
}

/** `m:ss` formatting for a duration given in whole seconds. */
export function formatDuration(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.round(totalSeconds))
  const minutes = Math.floor(safeSeconds / 60)
  const seconds = safeSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

/** Advances a drill's chord index by one rep, wrapping back to the start. */
export function nextChordIndex(
  currentIndex: number,
  chordCount: number,
): number {
  if (chordCount <= 0) return 0
  return (currentIndex + 1) % chordCount
}

/**
 * Fraction (0-1) of the current interval still remaining, clamped to a safe
 * range so a stray negative/over-long tick can't distort the progress bar.
 */
export function progressFraction(
  remainingMs: number,
  intervalSeconds: number,
): number {
  if (intervalSeconds <= 0) return 0
  const fraction = remainingMs / (intervalSeconds * 1000)
  return Math.min(1, Math.max(0, fraction))
}

let sessionIdCounter = 0

/**
 * Generates a monotonically-unique id for a new session record (timestamp
 * plus an in-process counter, so two sessions completed within the same
 * millisecond still get distinct ids).
 */
export function createSessionId(): string {
  sessionIdCounter += 1
  return `session-${Date.now()}-${sessionIdCounter}`
}

export interface BuildSessionRecordInput {
  chordNames: string[]
  intervalSeconds: number
  correctCount: number
  missedCount: number
  durationSeconds: number
  completedAt?: Date
}

/** Shapes a finished drill run into the record persisted to history. */
export function buildSessionRecord(
  input: BuildSessionRecordInput,
): PracticeSessionRecord {
  return {
    id: createSessionId(),
    chordNames: input.chordNames,
    intervalSeconds: input.intervalSeconds,
    correctCount: input.correctCount,
    missedCount: input.missedCount,
    durationSeconds: Math.max(0, Math.round(input.durationSeconds)),
    completedAt: (input.completedAt ?? new Date()).toISOString(),
  }
}

function isPracticeSessionRecord(
  value: unknown,
): value is PracticeSessionRecord {
  if (typeof value !== 'object' || value === null) return false
  const record = value as Record<string, unknown>
  return (
    typeof record.id === 'string' &&
    Array.isArray(record.chordNames) &&
    record.chordNames.every((name) => typeof name === 'string') &&
    typeof record.intervalSeconds === 'number' &&
    typeof record.correctCount === 'number' &&
    typeof record.missedCount === 'number' &&
    typeof record.completedAt === 'string' &&
    typeof record.durationSeconds === 'number'
  )
}

/**
 * Reads persisted session history, most-recent-first. Fails soft (returns
 * `[]`) for missing storage, malformed JSON, or unexpected shapes - this is
 * best-effort local history, not critical state.
 */
export function loadSessionHistory(): PracticeSessionRecord[] {
  if (!hasLocalStorage()) return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isPracticeSessionRecord)
  } catch {
    return []
  }
}

/** Overwrites the full persisted history. */
function saveSessionHistory(sessions: PracticeSessionRecord[]): void {
  if (!hasLocalStorage()) return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
  } catch {
    // Storage full/unavailable (e.g. private browsing) - session history is
    // best-effort, so silently drop the write rather than crash the drill.
  }
}

/**
 * Prepends a finished session to history (most-recent-first), trims to
 * `MAX_HISTORY_ENTRIES`, persists it, and returns the new list for the
 * caller to render immediately.
 */
export function appendSessionRecord(
  record: PracticeSessionRecord,
): PracticeSessionRecord[] {
  const next = [record, ...loadSessionHistory()].slice(0, MAX_HISTORY_ENTRIES)
  saveSessionHistory(next)
  return next
}

/** Clears all persisted session history. */
export function clearSessionHistory(): PracticeSessionRecord[] {
  saveSessionHistory([])
  return []
}
