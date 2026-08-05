import { barreShapeChords } from './barreShapes'
import { openShapeChords } from './openShapes'
import type { Chord } from './types'

/**
 * The full seeded chord library: every major and minor root (open shape
 * where a well-known one exists, moveable barre shape otherwise) plus the
 * common open 7th chords (A7, D7, E7, G7, C7, B7).
 *
 * This is the canonical, ordered list other data/features should treat as
 * the source of truth — prefer the accessors in `index.ts` over reading
 * this array directly.
 */
export const chordLibrary: Chord[] = [...openShapeChords, ...barreShapeChords]
