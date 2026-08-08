import { describe, expect, it } from 'vitest'
import {
  findChordByName,
  findChordsByQuality,
  findChordsByRoot,
  getChordById,
  getChordVariant,
  keyboardChordLibrary,
  listQualities,
  listRoots,
} from './index'
import type { ChordQuality, KeyPress, NoteName } from './types'

const ALL_ROOTS: NoteName[] = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
]

const ALL_QUALITIES: ChordQuality[] = [
  'major',
  'minor',
  '7th',
  'maj7',
  'min7',
  'sus2',
  'sus4',
  'diminished',
]

/**
 * Independently-defined semitone intervals (root, 3rd, 5th, [7th]), used to
 * verify the seeded voicings against music theory rather than against the
 * library's own generator internals.
 */
const EXPECTED_INTERVALS: Record<ChordQuality, number[]> = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  '7th': [0, 4, 7, 10],
  maj7: [0, 4, 7, 11],
  min7: [0, 3, 7, 10],
  sus2: [0, 2, 7],
  sus4: [0, 5, 7],
  diminished: [0, 3, 6],
}

const QUALITIES_WITH_FIRST_INVERSION: ChordQuality[] = ['major', 'minor']

/** The absolute pitch (semitones above a fixed C anchor) of a key press. */
function pitchOf(key: KeyPress): number {
  return key.octaveOffset * 12 + ALL_ROOTS.indexOf(key.note)
}

describe('library coverage', () => {
  it('has all 96 root x quality combinations (12 roots x 8 qualities)', () => {
    expect(keyboardChordLibrary).toHaveLength(96)
  })

  it.each(ALL_QUALITIES)('has all 12 roots for %s chords', (quality) => {
    const chords = findChordsByQuality(quality)
    const roots = chords.map((chord) => chord.root).sort()
    expect(roots).toEqual([...ALL_ROOTS].sort())
  })

  it('every chord id is unique', () => {
    const ids = keyboardChordLibrary.map((chord) => chord.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every chord has at least one variant', () => {
    for (const chord of keyboardChordLibrary) {
      expect(chord.variants.length).toBeGreaterThan(0)
    }
  })

  it('every variant id is unique within its chord', () => {
    for (const chord of keyboardChordLibrary) {
      const ids = chord.variants.map((variant) => variant.id)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it('major and minor chords have root position + 1st inversion variants', () => {
    for (const quality of QUALITIES_WITH_FIRST_INVERSION) {
      for (const chord of findChordsByQuality(quality)) {
        expect(chord.variants.map((v) => v.inversion).sort()).toEqual([
          'first',
          'root',
        ])
      }
    }
  })

  it('every other quality has at least a root position variant', () => {
    const other = ALL_QUALITIES.filter(
      (q) => !QUALITIES_WITH_FIRST_INVERSION.includes(q),
    )
    for (const quality of other) {
      for (const chord of findChordsByQuality(quality)) {
        expect(chord.variants.some((v) => v.inversion === 'root')).toBe(true)
      }
    }
  })

  it('every variant has the note count implied by its chord quality (3 for triads, 4 for 7ths)', () => {
    for (const chord of keyboardChordLibrary) {
      const expectedCount = EXPECTED_INTERVALS[chord.quality].length
      for (const variant of chord.variants) {
        expect(variant.keys).toHaveLength(expectedCount)
      }
    }
  })

  it('every variant orders keys from lowest to highest pitch', () => {
    for (const chord of keyboardChordLibrary) {
      for (const variant of chord.variants) {
        const pitches = variant.keys.map(pitchOf)
        const sorted = [...pitches].sort((a, b) => a - b)
        expect(pitches).toEqual(sorted)
        // strictly ascending, no duplicate/unison notes within one voicing
        for (let i = 1; i < pitches.length; i++) {
          expect(pitches[i]).toBeGreaterThan(pitches[i - 1])
        }
      }
    }
  })

  it('every key has a finger assignment in range 1-5', () => {
    for (const chord of keyboardChordLibrary) {
      for (const variant of chord.variants) {
        for (const key of variant.keys) {
          expect(key.finger).not.toBeNull()
          expect(key.finger).toBeGreaterThanOrEqual(1)
          expect(key.finger).toBeLessThanOrEqual(5)
        }
      }
    }
  })
})

describe('musical correctness: root position voicings', () => {
  it('every root-position voicing matches its quality intervals above the root, and starts on the root', () => {
    for (const chord of keyboardChordLibrary) {
      const rootVariant = chord.variants.find((v) => v.inversion === 'root')
      expect(rootVariant).toBeDefined()
      if (!rootVariant) continue

      const rootIndex = ALL_ROOTS.indexOf(chord.root)
      const expectedIntervals = EXPECTED_INTERVALS[chord.quality]

      // Lowest key is always the root itself, at octaveOffset 0.
      expect(rootVariant.keys[0].note).toBe(chord.root)
      expect(rootVariant.keys[0].octaveOffset).toBe(0)

      const actualIntervals = rootVariant.keys
        .map((key) => pitchOf(key) - rootIndex)
        .sort((a, b) => a - b)
      expect(actualIntervals).toEqual(
        [...expectedIntervals].sort((a, b) => a - b),
      )
    }
  })
})

describe('musical correctness: spot checks', () => {
  it('C major root position is C-E-G', () => {
    const chord = getChordById('c-major')
    const variant = getChordVariant('c-major', 'c-major-root')
    expect(chord?.name).toBe('C')
    expect(variant?.keys).toEqual([
      { note: 'C', octaveOffset: 0, finger: 1 },
      { note: 'E', octaveOffset: 0, finger: 3 },
      { note: 'G', octaveOffset: 0, finger: 5 },
    ])
  })

  it('C major 1st inversion is E-G-C(up an octave)', () => {
    const variant = getChordVariant('c-major', 'c-major-first')
    expect(variant?.keys).toEqual([
      { note: 'E', octaveOffset: 0, finger: 1 },
      { note: 'G', octaveOffset: 0, finger: 2 },
      { note: 'C', octaveOffset: 1, finger: 5 },
    ])
  })

  it('A major root position is A-C#-E, all in the octave above the root', () => {
    const variant = getChordVariant('a-major', 'a-major-root')
    expect(variant?.keys).toEqual([
      { note: 'A', octaveOffset: 0, finger: 1 },
      { note: 'C#', octaveOffset: 1, finger: 3 },
      { note: 'E', octaveOffset: 1, finger: 5 },
    ])
  })

  it('A minor 1st inversion is C-E-A(up an octave from root position)', () => {
    // A minor root position is A(off0)-C(off1)-E(off1) (C and E already sit
    // in the octave above the root); 1st inversion moves the root up
    // another octave, so every note ends up at octaveOffset 1.
    const variant = getChordVariant('a-minor', 'a-minor-first')
    expect(variant?.keys).toEqual([
      { note: 'C', octaveOffset: 1, finger: 1 },
      { note: 'E', octaveOffset: 1, finger: 2 },
      { note: 'A', octaveOffset: 1, finger: 5 },
    ])
  })

  it('C7 root position is C-E-G-Bb(A#)', () => {
    const chord = getChordById('c-7th')
    const variant = getChordVariant('c-7th', 'c-7th-root')
    expect(chord?.name).toBe('C7')
    expect(variant?.keys.map((k) => k.note)).toEqual(['C', 'E', 'G', 'A#'])
  })

  it('Cmaj7 root position is C-E-G-B', () => {
    const variant = getChordVariant('c-maj7', 'c-maj7-root')
    expect(variant?.keys.map((k) => k.note)).toEqual(['C', 'E', 'G', 'B'])
    expect(getChordById('c-maj7')?.name).toBe('Cmaj7')
  })

  it('Cm7 root position is C-Eb(D#)-G-Bb(A#)', () => {
    const variant = getChordVariant('c-min7', 'c-min7-root')
    expect(variant?.keys.map((k) => k.note)).toEqual(['C', 'D#', 'G', 'A#'])
    expect(getChordById('c-min7')?.name).toBe('Cm7')
  })

  it('Csus2 root position is C-D-G', () => {
    const variant = getChordVariant('c-sus2', 'c-sus2-root')
    expect(variant?.keys.map((k) => k.note)).toEqual(['C', 'D', 'G'])
  })

  it('Csus4 root position is C-F-G', () => {
    const variant = getChordVariant('c-sus4', 'c-sus4-root')
    expect(variant?.keys.map((k) => k.note)).toEqual(['C', 'F', 'G'])
  })

  it('C diminished root position is C-Eb(D#)-Gb(F#)', () => {
    const chord = getChordById('c-diminished')
    const variant = getChordVariant('c-diminished', 'c-diminished-root')
    expect(chord?.name).toBe('Cdim')
    expect(variant?.keys.map((k) => k.note)).toEqual(['C', 'D#', 'F#'])
  })

  it('B diminished (the vii° of C major) is B-D-F', () => {
    const variant = getChordVariant('b-diminished', 'b-diminished-root')
    expect(variant?.keys.map((k) => k.note)).toEqual(['B', 'D', 'F'])
  })

  it('F# diminished (the vii° of G major) is F#-A-C', () => {
    const variant = getChordVariant(
      'f-sharp-diminished',
      'f-sharp-diminished-root',
    )
    expect(variant?.keys.map((k) => k.note)).toEqual(['F#', 'A', 'C'])
  })

  it('E diminished (the vii° of F major) is E-G-Bb(A#)', () => {
    const variant = getChordVariant('e-diminished', 'e-diminished-root')
    expect(variant?.keys.map((k) => k.note)).toEqual(['E', 'G', 'A#'])
  })
})

describe('accessors', () => {
  it('getChordById finds a known chord', () => {
    const chord = getChordById('c-major')
    expect(chord?.name).toBe('C')
    expect(chord?.quality).toBe('major')
  })

  it('getChordById returns undefined for unknown id', () => {
    expect(getChordById('not-a-real-chord')).toBeUndefined()
  })

  it('findChordsByRoot returns every quality seeded for that root', () => {
    const aChords = findChordsByRoot('A')
    const qualities = aChords.map((chord) => chord.quality).sort()
    expect(qualities).toEqual([...ALL_QUALITIES].sort())
  })

  it('findChordByName is case-insensitive', () => {
    expect(findChordByName('am')?.id).toBe('a-minor')
    expect(findChordByName('B7')?.id).toBe('b-7th')
    expect(findChordByName('cdim')?.id).toBe('c-diminished')
  })

  it('getChordVariant finds a specific voicing', () => {
    const variant = getChordVariant('e-major', 'e-major-root')
    expect(variant?.label).toBe('Root position')
    expect(variant?.keys.map((k) => k.note)).toEqual(['E', 'G#', 'B'])
  })

  it('getChordVariant returns undefined for an unknown variant id', () => {
    expect(getChordVariant('c-major', 'not-a-real-variant')).toBeUndefined()
  })

  it('listRoots returns all 12 roots in chromatic order', () => {
    expect(listRoots()).toEqual(ALL_ROOTS)
  })

  it('listQualities includes all 8 seeded qualities, including diminished', () => {
    const qualities = listQualities()
    for (const quality of ALL_QUALITIES) {
      expect(qualities).toContain(quality)
    }
  })
})

describe('closes the guitar library gap: every diatonic degree resolves, including diminished', () => {
  /** Roman-numeral-style diatonic degree qualities, mirroring src/lib/chordFamily.ts. */
  function resolvesTo(root: NoteName, quality: ChordQuality): boolean {
    return findChordsByRoot(root).some((chord) => chord.quality === quality)
  }

  it('every degree of C major resolves, including the vii° (B diminished)', () => {
    const degrees: [NoteName, ChordQuality][] = [
      ['C', 'major'],
      ['D', 'minor'],
      ['E', 'minor'],
      ['F', 'major'],
      ['G', 'major'],
      ['A', 'minor'],
      ['B', 'diminished'],
    ]
    for (const [root, quality] of degrees) {
      expect(resolvesTo(root, quality)).toBe(true)
    }
  })

  it('every degree of G major resolves, including the vii° (F# diminished)', () => {
    const degrees: [NoteName, ChordQuality][] = [
      ['G', 'major'],
      ['A', 'minor'],
      ['B', 'minor'],
      ['C', 'major'],
      ['D', 'major'],
      ['E', 'minor'],
      ['F#', 'diminished'],
    ]
    for (const [root, quality] of degrees) {
      expect(resolvesTo(root, quality)).toBe(true)
    }
  })

  it('every degree of F major resolves, including the vii° (E diminished)', () => {
    const degrees: [NoteName, ChordQuality][] = [
      ['F', 'major'],
      ['G', 'minor'],
      ['A', 'minor'],
      ['A#', 'major'],
      ['C', 'major'],
      ['D', 'minor'],
      ['E', 'diminished'],
    ]
    for (const [root, quality] of degrees) {
      expect(resolvesTo(root, quality)).toBe(true)
    }
  })

  it('every degree of A natural minor resolves, including the ii° (B diminished)', () => {
    const degrees: [NoteName, ChordQuality][] = [
      ['A', 'minor'],
      ['B', 'diminished'],
      ['C', 'major'],
      ['D', 'minor'],
      ['E', 'minor'],
      ['F', 'major'],
      ['G', 'major'],
    ]
    for (const [root, quality] of degrees) {
      expect(resolvesTo(root, quality)).toBe(true)
    }
  })
})
