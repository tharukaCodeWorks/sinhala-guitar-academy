import { beforeEach, describe, expect, it } from 'vitest'
import {
  accuracyPercent,
  appendSessionRecord,
  buildSessionRecord,
  clearSessionHistory,
  createSessionId,
  formatDuration,
  loadSessionHistory,
  nextChordIndex,
  progressFraction,
  repCount,
  type PracticeSessionRecord,
} from './keyboardPractice'

/**
 * `vite.config.ts` runs this suite under vitest's `node` environment, which
 * doesn't provide `localStorage`. Install a minimal in-memory stand-in
 * (matching the real Storage API surface this module actually uses) so the
 * persistence helpers below can be exercised the same way they run in a
 * browser.
 */
class MemoryStorage {
  private store = new Map<string, string>()

  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value)
  }

  removeItem(key: string): void {
    this.store.delete(key)
  }

  clear(): void {
    this.store.clear()
  }
}

beforeEach(() => {
  Object.defineProperty(globalThis, 'localStorage', {
    value: new MemoryStorage(),
    configurable: true,
    writable: true,
  })
})

describe('repCount / accuracyPercent', () => {
  it('sums correct and missed reps', () => {
    expect(repCount({ correctCount: 5, missedCount: 2 })).toBe(7)
  })

  it('computes rounded accuracy percentage', () => {
    expect(accuracyPercent({ correctCount: 2, missedCount: 1 })).toBe(67)
    expect(accuracyPercent({ correctCount: 3, missedCount: 0 })).toBe(100)
    expect(accuracyPercent({ correctCount: 0, missedCount: 3 })).toBe(0)
  })

  it('is 0, not NaN, when no reps were judged', () => {
    expect(accuracyPercent({ correctCount: 0, missedCount: 0 })).toBe(0)
  })
})

describe('formatDuration', () => {
  it('formats sub-minute durations', () => {
    expect(formatDuration(9)).toBe('0:09')
    expect(formatDuration(45)).toBe('0:45')
  })

  it('formats minutes and seconds', () => {
    expect(formatDuration(65)).toBe('1:05')
    expect(formatDuration(600)).toBe('10:00')
  })

  it('clamps negative input to zero', () => {
    expect(formatDuration(-5)).toBe('0:00')
  })
})

describe('nextChordIndex', () => {
  it('advances within bounds', () => {
    expect(nextChordIndex(0, 3)).toBe(1)
    expect(nextChordIndex(1, 3)).toBe(2)
  })

  it('wraps back to the start', () => {
    expect(nextChordIndex(2, 3)).toBe(0)
  })

  it('is 0 for an empty chord list', () => {
    expect(nextChordIndex(0, 0)).toBe(0)
  })
})

describe('progressFraction', () => {
  it('is 1 at the very start of an interval', () => {
    expect(progressFraction(4000, 4)).toBe(1)
  })

  it('is 0 once the interval has elapsed', () => {
    expect(progressFraction(0, 4)).toBe(0)
  })

  it('is proportional partway through', () => {
    expect(progressFraction(1000, 4)).toBeCloseTo(0.25)
  })

  it('clamps out-of-range values', () => {
    expect(progressFraction(-500, 4)).toBe(0)
    expect(progressFraction(9000, 4)).toBe(1)
  })
})

describe('createSessionId', () => {
  it('produces unique ids across calls', () => {
    const ids = new Set(Array.from({ length: 5 }, () => createSessionId()))
    expect(ids.size).toBe(5)
  })

  it('is prefixed distinctly from the guitar module (kb-session-)', () => {
    expect(createSessionId()).toMatch(/^kb-session-/)
  })
})

describe('buildSessionRecord', () => {
  it('shapes a finished session with a rounded duration and ISO timestamp', () => {
    const completedAt = new Date('2026-01-01T00:00:00.000Z')
    const record = buildSessionRecord({
      chordNames: ['C', 'G', 'Am'],
      intervalSeconds: 4,
      correctCount: 6,
      missedCount: 2,
      durationSeconds: 32.6,
      completedAt,
    })

    expect(record.id).toMatch(/^kb-session-/)
    expect(record.chordNames).toEqual(['C', 'G', 'Am'])
    expect(record.intervalSeconds).toBe(4)
    expect(record.correctCount).toBe(6)
    expect(record.missedCount).toBe(2)
    expect(record.durationSeconds).toBe(33)
    expect(record.completedAt).toBe(completedAt.toISOString())
  })
})

describe('session history persistence', () => {
  it('is empty when nothing has been saved yet', () => {
    expect(loadSessionHistory()).toEqual([])
  })

  it('round-trips a saved session through localStorage', () => {
    const record = buildSessionRecord({
      chordNames: ['C', 'G'],
      intervalSeconds: 2,
      correctCount: 4,
      missedCount: 1,
      durationSeconds: 10,
    })

    const history = appendSessionRecord(record)
    expect(history).toEqual([record])
    expect(loadSessionHistory()).toEqual([record])
  })

  it('prepends new sessions so the most recent is first', () => {
    const first = buildSessionRecord({
      chordNames: ['C'],
      intervalSeconds: 2,
      correctCount: 1,
      missedCount: 0,
      durationSeconds: 5,
    })
    const second = buildSessionRecord({
      chordNames: ['G'],
      intervalSeconds: 2,
      correctCount: 2,
      missedCount: 0,
      durationSeconds: 5,
    })

    appendSessionRecord(first)
    const history = appendSessionRecord(second)

    expect(history).toEqual([second, first])
  })

  it('caps history length so storage does not grow unbounded', () => {
    for (let i = 0; i < 30; i += 1) {
      appendSessionRecord(
        buildSessionRecord({
          chordNames: ['C'],
          intervalSeconds: 2,
          correctCount: 1,
          missedCount: 0,
          durationSeconds: 5,
        }),
      )
    }

    expect(loadSessionHistory().length).toBeLessThanOrEqual(25)
  })

  it('clears all history', () => {
    appendSessionRecord(
      buildSessionRecord({
        chordNames: ['C'],
        intervalSeconds: 2,
        correctCount: 1,
        missedCount: 0,
        durationSeconds: 5,
      }),
    )
    expect(loadSessionHistory()).toHaveLength(1)

    const cleared = clearSessionHistory()
    expect(cleared).toEqual([])
    expect(loadSessionHistory()).toEqual([])
  })

  it('fails soft on malformed JSON instead of throwing', () => {
    localStorage.setItem('sga.keyboardTechnique.sessions.v1', '{not json')
    expect(loadSessionHistory()).toEqual([])
  })

  it('filters out entries that do not match the expected shape', () => {
    localStorage.setItem(
      'sga.keyboardTechnique.sessions.v1',
      JSON.stringify([{ bogus: true }, 'not-an-object']),
    )
    expect(loadSessionHistory()).toEqual([])
  })

  it('ignores a non-array root value', () => {
    localStorage.setItem(
      'sga.keyboardTechnique.sessions.v1',
      JSON.stringify({ not: 'an array' }),
    )
    expect(loadSessionHistory()).toEqual([])
  })

  it('is stored under a key distinct from the guitar drill module', () => {
    appendSessionRecord(
      buildSessionRecord({
        chordNames: ['C'],
        intervalSeconds: 2,
        correctCount: 1,
        missedCount: 0,
        durationSeconds: 5,
      }),
    )
    expect(localStorage.getItem('sga.fingeringPractice.sessions.v1')).toBeNull()
    expect(
      localStorage.getItem('sga.keyboardTechnique.sessions.v1'),
    ).not.toBeNull()
  })
})

// Sanity check that the module's own public type is what tests above rely on.
const _typeCheck: PracticeSessionRecord = {
  id: 'x',
  chordNames: [],
  intervalSeconds: 2,
  correctCount: 0,
  missedCount: 0,
  completedAt: new Date().toISOString(),
  durationSeconds: 0,
}
void _typeCheck
