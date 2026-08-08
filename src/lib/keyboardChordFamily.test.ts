import { describe, expect, it } from 'vitest'
import {
  buildChordFamily,
  progressionsFor,
  resolveProgression,
  resolveProgressionsForFamily,
} from './keyboardChordFamily'
import type { NoteName } from '../data/keyboardChords/types'

describe('buildChordFamily — major', () => {
  it('builds the 7 diatonic degrees for C major with correct roots/qualities', () => {
    const family = buildChordFamily('C', 'major')
    expect(family.degrees).toHaveLength(7)
    expect(family.degrees.map((d) => d.root)).toEqual([
      'C',
      'D',
      'E',
      'F',
      'G',
      'A',
      'B',
    ])
    expect(family.degrees.map((d) => d.quality)).toEqual([
      'major',
      'minor',
      'minor',
      'major',
      'major',
      'minor',
      'diminished',
    ])
    expect(family.degrees.map((d) => d.romanNumeral)).toEqual([
      'I',
      'ii',
      'iii',
      'IV',
      'V',
      'vi',
      'vii°',
    ])
  })

  it('resolves every degree of C major to a real library chord, including vii°', () => {
    const family = buildChordFamily('C', 'major')
    expect(family.degrees.map((d) => d.chord?.name)).toEqual([
      'C',
      'Dm',
      'Em',
      'F',
      'G',
      'Am',
      'Bdim',
    ])
    expect(family.degrees.every((d) => d.chord != null)).toBe(true)
  })

  it('wraps chromatically for a key near the top of the octave (G major)', () => {
    const family = buildChordFamily('G', 'major')
    expect(family.degrees.map((d) => d.root)).toEqual([
      'G',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F#',
    ])
  })
})

describe('buildChordFamily — minor', () => {
  it('builds the 7 diatonic degrees for A minor with correct roots/qualities', () => {
    const family = buildChordFamily('A', 'minor')
    expect(family.degrees.map((d) => d.root)).toEqual([
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
    ])
    expect(family.degrees.map((d) => d.quality)).toEqual([
      'minor',
      'diminished',
      'major',
      'minor',
      'minor',
      'major',
      'major',
    ])
    expect(family.degrees.map((d) => d.romanNumeral)).toEqual([
      'i',
      'ii°',
      'III',
      'iv',
      'v',
      'VI',
      'VII',
    ])
  })

  it('resolves every degree of A minor to a real library chord, including ii°', () => {
    const family = buildChordFamily('A', 'minor')
    expect(family.degrees.map((d) => d.chord?.name)).toEqual([
      'Am',
      'Bdim',
      'C',
      'Dm',
      'Em',
      'F',
      'G',
    ])
    expect(family.degrees.every((d) => d.chord != null)).toBe(true)
  })
})

describe('buildChordFamily — every root resolves all 7 of 7 degrees', () => {
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

  it.each(ALL_ROOTS)(
    'major family for %s has no unresolved degrees, including the diminished one',
    (root) => {
      const family = buildChordFamily(root, 'major')
      expect(family.degrees.every((d) => d.chord != null)).toBe(true)
      const diminished = family.degrees.find((d) => d.quality === 'diminished')
      expect(diminished?.chord).not.toBeUndefined()
    },
  )

  it.each(ALL_ROOTS)(
    'minor family for %s has no unresolved degrees, including the diminished one',
    (root) => {
      const family = buildChordFamily(root, 'minor')
      expect(family.degrees.every((d) => d.chord != null)).toBe(true)
      const diminished = family.degrees.find((d) => d.quality === 'diminished')
      expect(diminished?.chord).not.toBeUndefined()
    },
  )
})

describe('progressionsFor', () => {
  it('returns generic degree-based templates for major', () => {
    const templates = progressionsFor('major')
    expect(templates.length).toBeGreaterThan(0)
    const oneFourFive = templates.find((t) => t.id === 'I-IV-V')
    expect(oneFourFive?.degrees).toEqual([1, 4, 5])
  })

  it('returns generic degree-based templates for minor', () => {
    const templates = progressionsFor('minor')
    expect(templates.length).toBeGreaterThan(0)
    const oneFourFive = templates.find((t) => t.id === 'i-iv-v')
    expect(oneFourFive?.degrees).toEqual([1, 4, 5])
  })
})

describe('resolveProgression', () => {
  it('substitutes actual chord names for I-IV-V in C major', () => {
    const family = buildChordFamily('C', 'major')
    const template = progressionsFor('major').find((t) => t.id === 'I-IV-V')!
    const resolved = resolveProgression(family, template)
    expect(resolved.steps.map((s) => s.chordName)).toEqual(['C', 'F', 'G'])
    expect(resolved.steps.map((s) => s.romanNumeral)).toEqual(['I', 'IV', 'V'])
  })

  it('substitutes actual chord names for ii-V-I in G major', () => {
    const family = buildChordFamily('G', 'major')
    const template = progressionsFor('major').find((t) => t.id === 'ii-V-I')!
    const resolved = resolveProgression(family, template)
    expect(resolved.steps.map((s) => s.chordName)).toEqual(['Am', 'D', 'G'])
  })

  it('substitutes actual chord names for i-iv-v in A minor', () => {
    const family = buildChordFamily('A', 'minor')
    const template = progressionsFor('minor').find((t) => t.id === 'i-iv-v')!
    const resolved = resolveProgression(family, template)
    expect(resolved.steps.map((s) => s.chordName)).toEqual(['Am', 'Dm', 'Em'])
  })

  it('resolves a step landing on the diminished degree too (unlike the guitar version)', () => {
    const family = buildChordFamily('C', 'major')
    // vii° is degree 7; craft a template that touches it.
    const resolved = resolveProgression(family, {
      id: 'test-vii',
      name: 'test',
      description: 'test',
      degrees: [1, 7],
    })
    expect(resolved.steps[1].chordName).toBe('Bdim')
    expect(resolved.steps[1].chord).not.toBeUndefined()
    expect(resolved.steps[1].romanNumeral).toBe('vii°')
  })
})

describe('resolveProgressionsForFamily', () => {
  it('resolves every major progression template for the family key', () => {
    const family = buildChordFamily('D', 'major')
    const resolved = resolveProgressionsForFamily(family)
    expect(resolved).toHaveLength(progressionsFor('major').length)
    for (const progression of resolved) {
      expect(progression.steps.length).toBeGreaterThan(0)
    }
  })

  it('resolves every minor progression template for the family key', () => {
    const family = buildChordFamily('E', 'minor')
    const resolved = resolveProgressionsForFamily(family)
    expect(resolved).toHaveLength(progressionsFor('minor').length)
  })
})
