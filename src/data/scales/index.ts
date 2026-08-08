export type { FingerNumber, NoteName, Scale, ScaleType } from './types'
export { scaleLibrary } from './library'

import { scaleLibrary } from './library'
import type { NoteName, Scale, ScaleType } from './types'

/** Look up a single scale by root + type. Every root/type combination is seeded. */
export function getScale(root: NoteName, type: ScaleType): Scale | undefined {
  return scaleLibrary.find(
    (scale) => scale.root === root && scale.type === type,
  )
}

/** The distinct roots present in the library, in a fixed chromatic order. */
export function listScaleRoots(): NoteName[] {
  const chromaticOrder: NoteName[] = [
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
  const present = new Set(scaleLibrary.map((scale) => scale.root))
  return chromaticOrder.filter((root) => present.has(root))
}
