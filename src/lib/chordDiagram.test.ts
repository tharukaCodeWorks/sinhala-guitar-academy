import { describe, expect, it } from 'vitest'
import { getChordById } from '../data/chords'
import type { ChordVariant } from '../data/chords/types'
import {
  barredStringIndices,
  findBarreSegments,
  fretRow,
  highestFret,
  isNutPosition,
  MIN_VISIBLE_FRETS,
  visibleFretCount,
} from './chordDiagram'

const cMajorOpen = getChordById('c-major')!.variants[0]
const fMajorBarre = getChordById('f-major')!.variants[0]
const bMinorBarre = getChordById('b-minor')!.variants[0]
const eMinorOpen = getChordById('e-minor')!.variants[0]

describe('highestFret', () => {
  it('finds the highest fretted note in an open shape', () => {
    // C major: muted, 3, 2, open, 1, open
    expect(highestFret(cMajorOpen)).toBe(3)
  })

  it('is 0 for an all-open/muted variant', () => {
    const allOpen: ChordVariant = {
      id: 'test',
      label: 'Open',
      baseFret: 1,
      strings: ['open', 'open', 'open', 'open', 'open', 'open'],
      fingering: [null, null, null, null, null, null],
      difficulty: 'beginner',
    }
    expect(highestFret(allOpen)).toBe(0)
  })
})

describe('visibleFretCount', () => {
  it('floors at MIN_VISIBLE_FRETS for shapes with a small span', () => {
    // E minor: open,2,2,open,open,open -> span is only 2 frets
    expect(visibleFretCount(eMinorOpen)).toBe(MIN_VISIBLE_FRETS)
  })

  it('grows to cover the full span when it exceeds the minimum', () => {
    const wideSpan: ChordVariant = {
      id: 'test',
      label: 'Test',
      baseFret: 1,
      strings: [1, 2, 3, 4, 5, 6],
      fingering: [1, 1, 2, 2, 3, 4],
      difficulty: 'advanced',
    }
    expect(visibleFretCount(wideSpan)).toBe(6)
  })
})

describe('isNutPosition', () => {
  it('is true for baseFret 1 (open-position shapes)', () => {
    expect(isNutPosition(cMajorOpen)).toBe(true)
  })

  it('is false for shapes that start above the nut', () => {
    expect(isNutPosition(bMinorBarre)).toBe(false)
    expect(bMinorBarre.baseFret).toBeGreaterThan(1)
  })
})

describe('fretRow', () => {
  it('returns null for open and muted positions', () => {
    expect(fretRow(cMajorOpen, 'open')).toBeNull()
    expect(fretRow(cMajorOpen, 'muted')).toBeNull()
  })

  it('returns the 0-indexed row relative to baseFret', () => {
    expect(fretRow(cMajorOpen, 1)).toBe(0)
    expect(fretRow(cMajorOpen, 3)).toBe(2)
  })

  it('accounts for baseFret on shapes above the open position', () => {
    // F# major barre sits at baseFret 2 with strings up to fret 4
    const fSharpMajor = getChordById('f-sharp-major')!.variants[0]
    expect(fSharpMajor.baseFret).toBe(2)
    expect(fretRow(fSharpMajor, 2)).toBe(0)
    expect(fretRow(fSharpMajor, 4)).toBe(2)
  })
})

describe('findBarreSegments', () => {
  it('finds no barre in a plain open shape', () => {
    expect(findBarreSegments(cMajorOpen)).toEqual([])
  })

  it('finds the 2-string index-finger barre in the F major shape', () => {
    // F major: strings [1,3,3,2,1,1], fingering [1,3,4,2,1,1]
    // finger 1 covers string index 0 alone (fret 1), then a contiguous
    // run across indices 4-5 (also fret 1) -> one 2-string barre segment.
    expect(fMajorBarre.strings).toEqual([1, 3, 3, 2, 1, 1])
    const segments = findBarreSegments(fMajorBarre)
    expect(segments).toEqual([
      { fret: 1, finger: 1, fromStringIndex: 4, toStringIndex: 5 },
    ])
  })

  it('finds a wider barre in the B minor A-shape', () => {
    // B minor: muted, 2, 4, 4, 3, 2 fingering: null, 1, 3, 4, 2, 1
    // finger 1 only touches non-adjacent strings (index 1 and index 5) so
    // there's no contiguous run -> no barre segment, just two solo dots.
    expect(bMinorBarre.strings).toEqual(['muted', 2, 4, 4, 3, 2])
    expect(findBarreSegments(bMinorBarre)).toEqual([])
  })

  it('finds a full 6-string barre when every string shares the same finger+fret', () => {
    const fullBarre: ChordVariant = {
      id: 'test',
      label: 'Barre',
      baseFret: 3,
      strings: [3, 3, 3, 3, 3, 3],
      fingering: [1, 1, 1, 1, 1, 1],
      difficulty: 'advanced',
    }
    expect(findBarreSegments(fullBarre)).toEqual([
      { fret: 3, finger: 1, fromStringIndex: 0, toStringIndex: 5 },
    ])
  })

  it('does not merge adjacent strings with the same fret but different fingers', () => {
    const noBarre: ChordVariant = {
      id: 'test',
      label: 'Test',
      baseFret: 1,
      strings: [1, 1, 'open', 'open', 'open', 'open'],
      fingering: [1, 2, null, null, null, null],
      difficulty: 'beginner',
    }
    expect(findBarreSegments(noBarre)).toEqual([])
  })
})

describe('barredStringIndices', () => {
  it('expands segments into the set of covered string indices', () => {
    const segments = findBarreSegments(fMajorBarre)
    expect(barredStringIndices(segments)).toEqual(new Set([4, 5]))
  })

  it('is empty when there are no barre segments', () => {
    expect(barredStringIndices([])).toEqual(new Set())
  })
})
