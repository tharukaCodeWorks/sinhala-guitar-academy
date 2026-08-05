import { describe, expect, it } from 'vitest'
import {
  chordLibrary,
  findChordByName,
  findChordsByQuality,
  findChordsByRoot,
  getChordById,
  getChordVariant,
  listQualities,
  listRoots,
} from './index'
import type { NoteName } from './types'

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

describe('chordLibrary coverage', () => {
  it('has all 12 major roots', () => {
    const majors = findChordsByQuality('major')
    const majorRoots = majors.map((chord) => chord.root).sort()
    expect(majorRoots).toEqual([...ALL_ROOTS].sort())
  })

  it('has all 12 minor roots', () => {
    const minors = findChordsByQuality('minor')
    const minorRoots = minors.map((chord) => chord.root).sort()
    expect(minorRoots).toEqual([...ALL_ROOTS].sort())
  })

  it('has the 6 required open 7th chords', () => {
    const sevenths = findChordsByQuality('7th')
    const names = sevenths.map((chord) => chord.name).sort()
    expect(names).toEqual(['A7', 'B7', 'C7', 'D7', 'E7', 'G7'])
  })

  it('every chord id is unique', () => {
    const ids = chordLibrary.map((chord) => chord.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every chord has at least one variant', () => {
    for (const chord of chordLibrary) {
      expect(chord.variants.length).toBeGreaterThan(0)
    }
  })

  it('every variant has exactly 6 strings and 6 fingering entries', () => {
    for (const chord of chordLibrary) {
      for (const variant of chord.variants) {
        expect(variant.strings).toHaveLength(6)
        expect(variant.fingering).toHaveLength(6)
      }
    }
  })

  it('every variant id is unique within its chord', () => {
    for (const chord of chordLibrary) {
      const ids = chord.variants.map((variant) => variant.id)
      expect(new Set(ids).size).toBe(ids.length)
    }
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
    expect(qualities).toEqual(['7th', 'major', 'minor'])
  })

  it('findChordByName is case-insensitive', () => {
    expect(findChordByName('am')?.id).toBe('a-minor')
    expect(findChordByName('B7')?.id).toBe('b-7th')
  })

  it('getChordVariant finds a specific voicing', () => {
    const variant = getChordVariant('e-major', 'e-major-open')
    expect(variant?.label).toBe('Open')
    expect(variant?.strings).toEqual(['open', 2, 2, 1, 'open', 'open'])
  })

  it('listRoots returns all 12 roots in chromatic order', () => {
    expect(listRoots()).toEqual(ALL_ROOTS)
  })

  it('listQualities includes major, minor and 7th', () => {
    const qualities = listQualities()
    expect(qualities).toContain('major')
    expect(qualities).toContain('minor')
    expect(qualities).toContain('7th')
  })
})

describe('open shapes', () => {
  it('CAGED major roots use an open (fret-1) shape', () => {
    for (const root of ['C', 'A', 'G', 'E', 'D'] as const) {
      const chord = findChordsByRoot(root).find((c) => c.quality === 'major')
      expect(chord?.variants[0].label).toBe('Open')
      expect(chord?.variants[0].strings).toContain('open')
    }
  })

  it('Am, Dm and Em use an open shape', () => {
    for (const root of ['A', 'D', 'E'] as const) {
      const chord = findChordsByRoot(root).find((c) => c.quality === 'minor')
      expect(chord?.variants[0].label).toBe('Open')
    }
  })
})

describe('barre shapes', () => {
  it('F major is the E-shape barre at fret 1', () => {
    const chord = getChordById('f-major')
    const variant = chord?.variants[0]
    expect(variant?.baseFret).toBe(1)
    expect(variant?.strings).toEqual([1, 3, 3, 2, 1, 1])
  })

  it('F# major is the E-shape barre at fret 2', () => {
    const chord = getChordById('f-sharp-major')
    const variant = chord?.variants[0]
    expect(variant?.baseFret).toBe(2)
    expect(variant?.strings).toEqual([2, 4, 4, 3, 2, 2])
  })

  it('B major is the A-shape barre at fret 2, low E muted', () => {
    const chord = getChordById('b-major')
    const variant = chord?.variants[0]
    expect(variant?.baseFret).toBe(2)
    expect(variant?.strings).toEqual(['muted', 2, 4, 4, 4, 2])
  })

  it('A# major is the A-shape barre at fret 1', () => {
    const chord = getChordById('a-sharp-major')
    const variant = chord?.variants[0]
    expect(variant?.baseFret).toBe(1)
    expect(variant?.strings).toEqual(['muted', 1, 3, 3, 3, 1])
  })

  it('B minor is the A-shape barre at fret 2', () => {
    const chord = getChordById('b-minor')
    const variant = chord?.variants[0]
    expect(variant?.baseFret).toBe(2)
    expect(variant?.strings).toEqual(['muted', 2, 4, 4, 3, 2])
  })

  it('every barre variant has no open strings (only muted or fretted)', () => {
    const barreChords = chordLibrary.filter((chord) =>
      chord.variants[0].label.startsWith('Barre'),
    )
    expect(barreChords.length).toBeGreaterThan(0)
    for (const chord of barreChords) {
      for (const variant of chord.variants) {
        expect(variant.strings).not.toContain('open')
      }
    }
  })
})
