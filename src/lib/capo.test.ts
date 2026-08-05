import { describe, expect, it } from 'vitest'
import { getChordById } from '../data/chords'
import type { Chord } from '../data/chords/types'
import {
  chordDisplayName,
  MAX_CAPO_FRET,
  MIN_CAPO_FRET,
  suggestCapoOptions,
  transposeChordWithCapo,
  transposeNote,
  transposeProgressionWithCapo,
} from './capo'

const cMajor = getChordById('c-major')!
const gMajor = getChordById('g-major')!
const aMinor = getChordById('a-minor')!
const eMajor = getChordById('e-major')!
const bMinor = getChordById('b-minor')!
const b7 = getChordById('b-7th')!

describe('transposeNote', () => {
  it('shifts up within the octave without wrapping', () => {
    expect(transposeNote('C', 2)).toBe('D')
    expect(transposeNote('E', 1)).toBe('F')
  })

  it('wraps around past B back to C', () => {
    expect(transposeNote('B', 1)).toBe('C')
    expect(transposeNote('A', 4)).toBe('C#')
  })

  it('is a no-op for 0 semitones', () => {
    expect(transposeNote('G', 0)).toBe('G')
  })

  it('supports negative shifts (transposing down)', () => {
    expect(transposeNote('C', -1)).toBe('B')
  })
})

describe('chordDisplayName', () => {
  it('renders major chords with no suffix', () => {
    expect(chordDisplayName('D', 'major')).toBe('D')
  })

  it('renders minor chords with an "m" suffix', () => {
    expect(chordDisplayName('F#', 'minor')).toBe('F#m')
  })

  it('renders dominant 7th chords with a "7" suffix', () => {
    expect(chordDisplayName('A', '7th')).toBe('A7')
  })
})

describe('transposeChordWithCapo', () => {
  it('leaves the shape (fretting) completely unchanged', () => {
    const result = transposeChordWithCapo(cMajor, 2)
    expect(result.shapeChord).toBe(cMajor)
    expect(result.shapeChord.variants[0].strings).toEqual(
      cMajor.variants[0].strings,
    )
  })

  it("capo 0 sounds as the shape's own name (no capo)", () => {
    const result = transposeChordWithCapo(cMajor, 0)
    expect(result.soundingRoot).toBe('C')
    expect(result.soundingName).toBe('C')
  })

  it('a C-shape with capo 2 sounds as D', () => {
    const result = transposeChordWithCapo(cMajor, 2)
    expect(result.soundingRoot).toBe('D')
    expect(result.soundingName).toBe('D')
  })

  it('a G-shape with capo 3 sounds as A#/Bb (wraps past B)', () => {
    const result = transposeChordWithCapo(gMajor, 3)
    expect(result.soundingRoot).toBe('A#')
    expect(result.soundingName).toBe('A#')
  })

  it('preserves quality: an Am shape with capo 2 sounds as Bm, not B', () => {
    const result = transposeChordWithCapo(aMinor, 2)
    expect(result.soundingQuality).toBe('minor')
    expect(result.soundingName).toBe('Bm')
  })

  it('a B7 shape with capo 1 sounds as C7', () => {
    const result = transposeChordWithCapo(b7, 1)
    expect(result.soundingName).toBe('C7')
  })

  it('throws for a capo fret outside 0-7', () => {
    expect(() => transposeChordWithCapo(cMajor, -1)).toThrow(RangeError)
    expect(() => transposeChordWithCapo(cMajor, 8)).toThrow(RangeError)
  })

  it('throws for a non-integer capo fret', () => {
    expect(() => transposeChordWithCapo(cMajor, 1.5)).toThrow(RangeError)
  })

  it('accepts the boundary fret values', () => {
    expect(() => transposeChordWithCapo(cMajor, MIN_CAPO_FRET)).not.toThrow()
    expect(() => transposeChordWithCapo(cMajor, MAX_CAPO_FRET)).not.toThrow()
  })
})

describe('transposeProgressionWithCapo', () => {
  it('transposes every chord in the progression, preserving order', () => {
    const progression: Chord[] = [cMajor, gMajor, aMinor]
    const results = transposeProgressionWithCapo(progression, 2)
    expect(results.map((r) => r.soundingName)).toEqual(['D', 'A', 'Bm'])
  })

  it('returns an empty array for an empty progression', () => {
    expect(transposeProgressionWithCapo([], 3)).toEqual([])
  })
})

describe('suggestCapoOptions', () => {
  it('suggests capo 0 when a known shape already matches the target', () => {
    const options = suggestCapoOptions('C', 'major', [cMajor, gMajor, aMinor])
    expect(options[0]).toMatchObject({ shapeChord: cMajor, capoFret: 0 })
  })

  it('finds the shape + fret that produces the target, sorted by lowest fret', () => {
    // Target: D major. Known shapes: C (capo 2), G (capo 7... wraps to 7).
    const options = suggestCapoOptions('D', 'major', [cMajor, gMajor])
    expect(options).toEqual([
      { shapeChord: cMajor, capoFret: 2 },
      { shapeChord: gMajor, capoFret: 7 },
    ])
  })

  it('never suggests a shape whose quality does not match the target', () => {
    const options = suggestCapoOptions('B', 'minor', [cMajor, gMajor, eMajor])
    expect(options).toEqual([])
  })

  it('matches quality correctly when a minor shape is known', () => {
    // Target: B minor. Known: A minor shape -> capo 2 sounds Bm.
    const options = suggestCapoOptions('B', 'minor', [aMinor, bMinor])
    expect(options).toEqual([
      { shapeChord: bMinor, capoFret: 0 },
      { shapeChord: aMinor, capoFret: 2 },
    ])
  })

  it('excludes options beyond maxCapoFret', () => {
    const options = suggestCapoOptions('D', 'major', [gMajor], 5)
    expect(options).toEqual([])
  })

  it('returns an empty array when no known shapes are given', () => {
    expect(suggestCapoOptions('C', 'major', [])).toEqual([])
  })
})
