import { describe, expect, it } from 'vitest'
import { getScale } from '../data/scales'
import {
  scaleKeyPresses,
  scaleSteps,
  scaleToKeyboardVariant,
} from './scaleFingering'

describe('scaleSteps', () => {
  it('returns 8 ascending note+finger pairs for C major, right hand', () => {
    const scale = getScale('C', 'major')
    expect(scale).toBeDefined()
    if (!scale) return
    const steps = scaleSteps(scale, 'right')
    expect(steps).toEqual([
      { note: 'C', finger: 1 },
      { note: 'D', finger: 2 },
      { note: 'E', finger: 3 },
      { note: 'F', finger: 1 },
      { note: 'G', finger: 2 },
      { note: 'A', finger: 3 },
      { note: 'B', finger: 4 },
      { note: 'C', finger: 5 },
    ])
  })

  it('uses leftHandFingering for the left hand', () => {
    const scale = getScale('C', 'major')
    expect(scale).toBeDefined()
    if (!scale) return
    const steps = scaleSteps(scale, 'left')
    expect(steps.map((s) => s.finger)).toEqual(scale.leftHandFingering)
  })
})

describe('scaleKeyPresses', () => {
  it('increments octaveOffset every time the ascending line wraps past B to C (C major)', () => {
    const scale = getScale('C', 'major')
    expect(scale).toBeDefined()
    if (!scale) return
    const keys = scaleKeyPresses(scale, 'right')
    expect(keys.map((k) => k.octaveOffset)).toEqual([0, 0, 0, 0, 0, 0, 0, 1])
    expect(keys[keys.length - 1]).toEqual({
      note: 'C',
      octaveOffset: 1,
      finger: 5,
    })
  })

  it('wraps octave correctly for a scale starting mid-octave (G major)', () => {
    const scale = getScale('G', 'major')
    expect(scale).toBeDefined()
    if (!scale) return
    const keys = scaleKeyPresses(scale, 'right')
    // G,A,B,C,D,E,F#,G — wraps from B (chromatic index 11) down to C (index 0)
    // between steps 2 and 3 (0-indexed); the closing G (index 7) continues
    // upward from F# (index 6) without a further wrap, since it's still
    // exactly one octave above the starting G, not two.
    expect(keys.map((k) => k.note)).toEqual([
      'G',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F#',
      'G',
    ])
    expect(keys.map((k) => k.octaveOffset)).toEqual([0, 0, 0, 1, 1, 1, 1, 1])
  })

  it('carries the finger numbers through unchanged', () => {
    const scale = getScale('F', 'major')
    expect(scale).toBeDefined()
    if (!scale) return
    const keys = scaleKeyPresses(scale, 'right')
    expect(keys.map((k) => k.finger)).toEqual(scale.rightHandFingering)
  })
})

describe('scaleToKeyboardVariant', () => {
  it('produces a ChordVariant-shaped object with 8 keys for KeyboardDiagram to render', () => {
    const scale = getScale('D', 'natural-minor')
    expect(scale).toBeDefined()
    if (!scale) return
    const variant = scaleToKeyboardVariant(scale, 'right')
    expect(variant.keys).toHaveLength(8)
    expect(variant.keys.map((k) => k.note)).toEqual([
      ...scale.notes,
      scale.notes[0],
    ])
    expect(variant.id).toContain('D')
    expect(variant.id).toContain('right')
  })
})
