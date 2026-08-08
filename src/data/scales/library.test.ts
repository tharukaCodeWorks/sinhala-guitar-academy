import { describe, expect, it } from 'vitest'
import { getScale, listScaleRoots, scaleLibrary } from './index'
import type { NoteName, ScaleType } from './types'

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

/** Expected 7-note ascending major scale, by root — independently spelled
 * out (not derived from the same interval table `library.ts` uses) so this
 * test can catch a real regression in the generator, not just echo it. */
const EXPECTED_MAJOR_NOTES: Record<NoteName, NoteName[]> = {
  C: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  'C#': ['C#', 'D#', 'F', 'F#', 'G#', 'A#', 'C'],
  D: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
  'D#': ['D#', 'F', 'G', 'G#', 'A#', 'C', 'D'],
  E: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
  F: ['F', 'G', 'A', 'A#', 'C', 'D', 'E'],
  'F#': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'F'],
  G: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
  'G#': ['G#', 'A#', 'C', 'C#', 'D#', 'F', 'G'],
  A: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
  'A#': ['A#', 'C', 'D', 'D#', 'F', 'G', 'A'],
  B: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
}

/** Expected 7-note ascending natural minor scale, by root, spelled out independently. */
const EXPECTED_NATURAL_MINOR_NOTES: Record<NoteName, NoteName[]> = {
  C: ['C', 'D', 'D#', 'F', 'G', 'G#', 'A#'],
  'C#': ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B'],
  D: ['D', 'E', 'F', 'G', 'A', 'A#', 'C'],
  'D#': ['D#', 'F', 'F#', 'G#', 'A#', 'B', 'C#'],
  E: ['E', 'F#', 'G', 'A', 'B', 'C', 'D'],
  F: ['F', 'G', 'G#', 'A#', 'C', 'C#', 'D#'],
  'F#': ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E'],
  G: ['G', 'A', 'A#', 'C', 'D', 'D#', 'F'],
  'G#': ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#'],
  A: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  'A#': ['A#', 'C', 'C#', 'D#', 'F', 'F#', 'G#'],
  B: ['B', 'C#', 'D', 'E', 'F#', 'G', 'A'],
}

describe('scaleLibrary — completeness', () => {
  it('seeds all 12 major and all 12 natural-minor scales (24 total)', () => {
    expect(scaleLibrary).toHaveLength(24)
  })

  it('has exactly one entry per root x type combination', () => {
    for (const root of ALL_ROOTS) {
      for (const type of ['major', 'natural-minor'] as ScaleType[]) {
        const matches = scaleLibrary.filter(
          (scale) => scale.root === root && scale.type === type,
        )
        expect(matches).toHaveLength(1)
      }
    }
  })

  it('listScaleRoots returns all 12 roots in chromatic order', () => {
    expect(listScaleRoots()).toEqual(ALL_ROOTS)
  })
})

describe('scaleLibrary — note correctness', () => {
  it.each(ALL_ROOTS)('%s major has the musically-correct 7 notes', (root) => {
    const scale = getScale(root, 'major')
    expect(scale?.notes).toEqual(EXPECTED_MAJOR_NOTES[root])
  })

  it.each(ALL_ROOTS)(
    '%s natural minor has the musically-correct 7 notes',
    (root) => {
      const scale = getScale(root, 'natural-minor')
      expect(scale?.notes).toEqual(EXPECTED_NATURAL_MINOR_NOTES[root])
    },
  )
})

describe('scaleLibrary — fingering shape', () => {
  it.each(scaleLibrary)(
    '$root $type has 8-entry right/left hand fingering, each 1-5',
    (scale) => {
      expect(scale.rightHandFingering).toHaveLength(8)
      expect(scale.leftHandFingering).toHaveLength(8)
      for (const finger of [
        ...scale.rightHandFingering,
        ...scale.leftHandFingering,
      ]) {
        expect(finger).toBeGreaterThanOrEqual(1)
        expect(finger).toBeLessThanOrEqual(5)
        expect(Number.isInteger(finger)).toBe(true)
      }
    },
  )
})

describe('scaleLibrary — known fingering exceptions', () => {
  it('F major RH uses the 1-2-3-4-1-2-3-4 thumb-crossing pattern, not the naive 1-2-3-1-2-3-4-5', () => {
    const scale = getScale('F', 'major')
    expect(scale?.rightHandFingering).toEqual([1, 2, 3, 4, 1, 2, 3, 4])
  })

  it('C, G, D, A, E and B major all share the same RH fingering (1-2-3-1-2-3-4-5)', () => {
    const sameFingeringRoots: NoteName[] = ['C', 'G', 'D', 'A', 'E', 'B']
    for (const root of sameFingeringRoots) {
      expect(getScale(root, 'major')?.rightHandFingering).toEqual([
        1, 2, 3, 1, 2, 3, 4, 5,
      ])
    }
  })

  it('the thumb (finger 1) never lands on a black key for any major scale, either hand', () => {
    for (const root of ALL_ROOTS) {
      const scale = getScale(root, 'major')
      expect(scale).toBeDefined()
      if (!scale) continue
      const notes = [...scale.notes, scale.notes[0]]
      notes.forEach((note, index) => {
        if (scale.rightHandFingering[index] === 1) {
          expect(note).not.toMatch(/#/)
        }
        // Regression guard: an earlier seeding had G# natural minor's left
        // hand crossing the thumb under on F# (a black key) — this class of
        // bug only shows up when the left hand is checked too, since the
        // right-hand-only version of this assertion still passes.
        if (scale.leftHandFingering[index] === 1) {
          expect(note).not.toMatch(/#/)
        }
      })
    }
  })

  it('the thumb (finger 1) never lands on a black key for any natural minor scale, either hand', () => {
    for (const root of ALL_ROOTS) {
      const scale = getScale(root, 'natural-minor')
      expect(scale).toBeDefined()
      if (!scale) continue
      const notes = [...scale.notes, scale.notes[0]]
      notes.forEach((note, index) => {
        if (scale.rightHandFingering[index] === 1) {
          expect(note).not.toMatch(/#/)
        }
        if (scale.leftHandFingering[index] === 1) {
          expect(note).not.toMatch(/#/)
        }
      })
    }
  })
})

describe('scaleLibrary — black-tonic scale fingering, exact match', () => {
  /**
   * The generic "8 entries, 1-5" shape check plus the shared-pattern and
   * thumb-placement invariant checks above all still pass for *wrong but
   * plausible* finger numbers — that's exactly the class of bug review
   * caught twice in this data (both `MAJOR_FINGERING` and, less severely,
   * `NATURAL_MINOR_FINGERING`). Pin every black-tonic scale's fingering
   * down exactly, independently of `library.ts`'s own literals, so a
   * regression here fails loudly instead of slipping through as "still
   * shape-valid".
   */
  const EXPECTED_MAJOR_FINGERING: Record<
    'C#' | 'D#' | 'F#' | 'G#' | 'A#',
    { rightHand: number[]; leftHand: number[] }
  > = {
    'C#': {
      rightHand: [2, 3, 1, 2, 3, 4, 1, 2],
      leftHand: [3, 2, 1, 4, 3, 2, 1, 2],
    },
    'D#': {
      rightHand: [2, 1, 2, 3, 4, 1, 2, 3],
      leftHand: [3, 2, 1, 4, 3, 2, 1, 2],
    },
    'F#': {
      rightHand: [2, 3, 4, 1, 2, 3, 1, 2],
      leftHand: [4, 3, 2, 1, 3, 2, 1, 2],
    },
    'G#': {
      rightHand: [2, 3, 1, 2, 3, 1, 2, 3],
      leftHand: [3, 2, 1, 4, 3, 2, 1, 2],
    },
    'A#': {
      rightHand: [2, 1, 2, 3, 1, 2, 3, 4],
      leftHand: [3, 2, 1, 4, 3, 2, 1, 2],
    },
  }

  const EXPECTED_NATURAL_MINOR_FINGERING: Record<
    'C#' | 'D#' | 'F#' | 'G#' | 'A#',
    { rightHand: number[]; leftHand: number[] }
  > = {
    'C#': {
      rightHand: [2, 3, 1, 2, 3, 1, 2, 3],
      leftHand: [3, 2, 1, 4, 3, 2, 1, 2],
    },
    'D#': {
      rightHand: [2, 1, 2, 3, 4, 1, 2, 3],
      leftHand: [2, 1, 4, 3, 2, 1, 3, 2],
    },
    'F#': {
      rightHand: [2, 3, 1, 2, 3, 1, 2, 3],
      leftHand: [4, 3, 2, 1, 3, 2, 1, 2],
    },
    'G#': {
      rightHand: [2, 3, 1, 2, 3, 1, 2, 3],
      leftHand: [3, 2, 1, 4, 3, 1, 2, 3],
    },
    'A#': {
      rightHand: [2, 1, 2, 3, 1, 2, 3, 4],
      leftHand: [2, 1, 3, 2, 1, 4, 3, 2],
    },
  }

  it.each(
    Object.keys(
      EXPECTED_MAJOR_FINGERING,
    ) as (keyof typeof EXPECTED_MAJOR_FINGERING)[],
  )('%s major has the exact published right/left hand fingering', (root) => {
    const scale = getScale(root, 'major')
    expect(scale?.rightHandFingering).toEqual(
      EXPECTED_MAJOR_FINGERING[root].rightHand,
    )
    expect(scale?.leftHandFingering).toEqual(
      EXPECTED_MAJOR_FINGERING[root].leftHand,
    )
  })

  it.each(
    Object.keys(
      EXPECTED_NATURAL_MINOR_FINGERING,
    ) as (keyof typeof EXPECTED_NATURAL_MINOR_FINGERING)[],
  )(
    '%s natural minor has the exact published right/left hand fingering',
    (root) => {
      const scale = getScale(root, 'natural-minor')
      expect(scale?.rightHandFingering).toEqual(
        EXPECTED_NATURAL_MINOR_FINGERING[root].rightHand,
      )
      expect(scale?.leftHandFingering).toEqual(
        EXPECTED_NATURAL_MINOR_FINGERING[root].leftHand,
      )
    },
  )
})
