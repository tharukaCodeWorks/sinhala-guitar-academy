import { describe, expect, it } from 'vitest'
import { getChordById } from '../data/keyboardChords'
import type { ChordVariant } from '../data/keyboardChords/types'
import {
  highestOctaveOffset,
  isBlackKey,
  KEYBOARD_DIAGRAM_MIN_OCTAVES,
  keyWhiteIndex,
  lowestOctaveOffset,
  pressedKeyPositions,
  visibleOctaveCount,
  WHITE_KEYS_PER_OCTAVE,
} from './keyboardDiagram'

const cMajorRoot = getChordById('c-major')!.variants.find(
  (v) => v.id === 'c-major-root',
)!
const bMaj7Root = getChordById('b-maj7')!.variants.find(
  (v) => v.id === 'b-maj7-root',
)!
const bMajorFirstInversion = getChordById('b-major')!.variants.find(
  (v) => v.id === 'b-major-first',
)!

describe('isBlackKey', () => {
  it('is true for the 5 sharp notes', () => {
    expect(isBlackKey('C#')).toBe(true)
    expect(isBlackKey('D#')).toBe(true)
    expect(isBlackKey('F#')).toBe(true)
    expect(isBlackKey('G#')).toBe(true)
    expect(isBlackKey('A#')).toBe(true)
  })

  it('is false for the 7 natural notes', () => {
    expect(isBlackKey('C')).toBe(false)
    expect(isBlackKey('D')).toBe(false)
    expect(isBlackKey('E')).toBe(false)
    expect(isBlackKey('F')).toBe(false)
    expect(isBlackKey('G')).toBe(false)
    expect(isBlackKey('A')).toBe(false)
    expect(isBlackKey('B')).toBe(false)
  })
})

describe('keyWhiteIndex', () => {
  it('gives white keys their own 0-6 index', () => {
    expect(keyWhiteIndex('C')).toBe(0)
    expect(keyWhiteIndex('D')).toBe(1)
    expect(keyWhiteIndex('E')).toBe(2)
    expect(keyWhiteIndex('F')).toBe(3)
    expect(keyWhiteIndex('G')).toBe(4)
    expect(keyWhiteIndex('A')).toBe(5)
    expect(keyWhiteIndex('B')).toBe(6)
  })

  it('places black keys on the white-key boundary to their right', () => {
    expect(keyWhiteIndex('C#')).toBe(1) // between C and D
    expect(keyWhiteIndex('D#')).toBe(2) // between D and E
    expect(keyWhiteIndex('F#')).toBe(4) // between F and G
    expect(keyWhiteIndex('G#')).toBe(5) // between G and A
    expect(keyWhiteIndex('A#')).toBe(6) // between A and B
  })

  it('never places a black key between E/F or B/C, matching a real keyboard', () => {
    // No NoteName exists for a black key there in the first place, but
    // guard the indices used by adjacent naturals don't collide with one.
    expect(keyWhiteIndex('E')).not.toBe(keyWhiteIndex('F'))
    expect(keyWhiteIndex('B')).not.toBe(keyWhiteIndex('C'))
  })
})

describe('lowestOctaveOffset / highestOctaveOffset', () => {
  it('are both 0 when every key shares the same octave', () => {
    // C major root position: C0, E0, G0.
    expect(cMajorRoot.keys.every((k) => k.octaveOffset === 0)).toBe(true)
    expect(lowestOctaveOffset(cMajorRoot)).toBe(0)
    expect(highestOctaveOffset(cMajorRoot)).toBe(0)
  })

  it('spans two octaves for a voicing whose top notes wrap past B', () => {
    // B maj7 root position: B0, D#1, F#1, A#1.
    expect(bMaj7Root.keys.map((k) => k.note)).toEqual(['B', 'D#', 'F#', 'A#'])
    expect(lowestOctaveOffset(bMaj7Root)).toBe(0)
    expect(highestOctaveOffset(bMaj7Root)).toBe(1)
  })

  it('shifts entirely into octave 1 for an inversion that raises every note', () => {
    // B major 1st inversion: D#1, F#1, B1 (root pushed above the other tones).
    expect(lowestOctaveOffset(bMajorFirstInversion)).toBe(1)
    expect(highestOctaveOffset(bMajorFirstInversion)).toBe(1)
  })
})

describe('visibleOctaveCount', () => {
  it('floors at KEYBOARD_DIAGRAM_MIN_OCTAVES for single-octave voicings', () => {
    expect(visibleOctaveCount(cMajorRoot)).toBe(KEYBOARD_DIAGRAM_MIN_OCTAVES)
    expect(visibleOctaveCount(bMajorFirstInversion)).toBe(
      KEYBOARD_DIAGRAM_MIN_OCTAVES,
    )
  })

  it('grows to cover the full octave span when it exceeds the minimum', () => {
    expect(visibleOctaveCount(bMaj7Root)).toBe(2)
  })

  it('grows for a synthetic 3-octave span', () => {
    const wideSpan: ChordVariant = {
      id: 'test',
      label: 'Test',
      inversion: 'root',
      keys: [
        { note: 'C', octaveOffset: 0, finger: 1 },
        { note: 'E', octaveOffset: 1, finger: 3 },
        { note: 'G', octaveOffset: 2, finger: 5 },
      ],
      difficulty: 'advanced',
    }
    expect(visibleOctaveCount(wideSpan)).toBe(3)
  })
})

describe('pressedKeyPositions', () => {
  it('positions a single-octave voicing at octaveIndex 0 with correct white/black flags', () => {
    const positions = pressedKeyPositions(cMajorRoot)
    expect(positions).toEqual([
      {
        key: cMajorRoot.keys[0],
        isBlack: false,
        octaveIndex: 0,
        whiteIndex: 0,
      }, // C
      {
        key: cMajorRoot.keys[1],
        isBlack: false,
        octaveIndex: 0,
        whiteIndex: 2,
      }, // E
      {
        key: cMajorRoot.keys[2],
        isBlack: false,
        octaveIndex: 0,
        whiteIndex: 4,
      }, // G
    ])
  })

  it('offsets keys into octaveIndex 1 relative to the lowest pressed octave', () => {
    const positions = pressedKeyPositions(bMaj7Root)
    expect(positions).toEqual([
      { key: bMaj7Root.keys[0], isBlack: false, octaveIndex: 0, whiteIndex: 6 }, // B0
      { key: bMaj7Root.keys[1], isBlack: true, octaveIndex: 1, whiteIndex: 2 }, // D#1
      { key: bMaj7Root.keys[2], isBlack: true, octaveIndex: 1, whiteIndex: 4 }, // F#1
      { key: bMaj7Root.keys[3], isBlack: true, octaveIndex: 1, whiteIndex: 6 }, // A#1
    ])
  })

  it('re-bases octaveIndex to 0 even when every key is in the same non-zero octave', () => {
    const positions = pressedKeyPositions(bMajorFirstInversion)
    expect(positions.every((p) => p.octaveIndex === 0)).toBe(true)
  })

  it('preserves ascending-pitch key order from the variant', () => {
    const positions = pressedKeyPositions(bMaj7Root)
    expect(positions.map((p) => p.key.note)).toEqual(
      bMaj7Root.keys.map((k) => k.note),
    )
  })
})

describe('WHITE_KEYS_PER_OCTAVE', () => {
  it('is 7, matching the 7 natural notes per octave', () => {
    expect(WHITE_KEYS_PER_OCTAVE).toBe(7)
  })
})
