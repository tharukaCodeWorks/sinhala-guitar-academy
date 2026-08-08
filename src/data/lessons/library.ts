import { basicTriadsIivV } from './beginner/basicTriadsIivV'
import { fiveFingerPatterns } from './beginner/fiveFingerPatterns'
import { noteReadingGrandStaff } from './beginner/noteReadingGrandStaff'
import { postureHandPosition } from './beginner/postureHandPosition'
import { puttingItTogether } from './beginner/puttingItTogether'
import { rhythmNoteValues } from './beginner/rhythmNoteValues'
import { chordInversions } from './intermediate/chordInversions'
import { expandingRhythm } from './intermediate/expandingRhythm'
import { leadSheetsChordSymbols } from './intermediate/leadSheetsChordSymbols'
import { readingBeyondStaffDynamics } from './intermediate/readingBeyondStaffDynamics'
import { scaleTechniqueThumbUnder } from './intermediate/scaleTechniqueThumbUnder'
import type { Lesson } from './types'

/**
 * The lesson catalog: a sequential, pedagogy-grounded method course for
 * keyboard/piano, grounded in the common progression shared by Faber Piano
 * Adventures, Alfred's Basic Piano Library, and RCM/ABRSM's early grades —
 * posture/hand position, keyboard geography, note reading, rhythm,
 * five-finger patterns/hand independence, basic chords, and a simple full
 * piece (beginner tier), then scale fingering technique, chord inversions,
 * expanded rhythm, ledger-line/dynamics reading, and lead-sheet/chord-
 * symbol playing (intermediate tier).
 *
 * Beginner (6 lessons) and intermediate (5 lessons) tiers authored so far;
 * the advanced tier is added by a later task in this feature.
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
  scaleTechniqueThumbUnder,
  chordInversions,
  expandingRhythm,
  readingBeyondStaffDynamics,
  leadSheetsChordSymbols,
]
