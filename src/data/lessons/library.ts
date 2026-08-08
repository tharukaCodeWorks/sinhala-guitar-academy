import { basicTriadsIivV } from './beginner/basicTriadsIivV'
import { fiveFingerPatterns } from './beginner/fiveFingerPatterns'
import { noteReadingGrandStaff } from './beginner/noteReadingGrandStaff'
import { postureHandPosition } from './beginner/postureHandPosition'
import { puttingItTogether } from './beginner/puttingItTogether'
import { rhythmNoteValues } from './beginner/rhythmNoteValues'
import type { Lesson } from './types'

/**
 * The lesson catalog: a sequential, pedagogy-grounded beginner method
 * course for keyboard/piano, grounded in the common progression shared by
 * Faber Piano Adventures, Alfred's Basic Piano Library, and RCM/ABRSM's
 * early grades — posture/hand position, keyboard geography, note reading,
 * rhythm, five-finger patterns/hand independence, basic chords, and a
 * simple full piece.
 *
 * Beginner tier only so far (6 lessons); intermediate and advanced tiers
 * are added by later tasks in this feature.
 *
 * This is the canonical, ordered list other data/features should treat as
 * the source of truth — prefer the accessors in `index.ts` over reading
 * this array directly.
 */
export const lessonLibrary: Lesson[] = [
  postureHandPosition,
  noteReadingGrandStaff,
  rhythmNoteValues,
  fiveFingerPatterns,
  basicTriadsIivV,
  puttingItTogether,
]
